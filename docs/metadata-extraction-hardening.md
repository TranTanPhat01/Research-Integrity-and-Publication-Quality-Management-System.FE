# RIPQMS Full Metadata Extraction Hardening

## Summary

This frontend repository does not contain the backend PDF metadata extraction pipeline. The required implementation belongs in the RIPQMS backend service that handles PDF ingestion, GROBID, Crossref, OpenAlex, persistence, and metadata quality scoring.

The backend must use a layered extraction strategy:

```text
PDF
-> GROBID
-> DOI extraction hardening
-> Crossref enrichment
-> OpenAlex/title search fallback
-> Header/page fallback
-> Canonical merge
-> Metadata quality scoring
```

The goal is to support many journal and conference PDF templates, not only Elsevier-style papers where GROBID and DOI metadata are already strong.

## Required Backend Components

```text
IMetadataExtractor
├── GrobidMetadataExtractor
├── DoiCandidateExtractor
├── CrossrefMetadataEnricher
├── OpenAlexTitleSearchEnricher
├── HeaderMetadataFallbackExtractor
├── MetadataMergeService
└── MetadataQualityScoringService
```

### `IMetadataExtractor`

Coordinates the full pipeline and returns canonical metadata plus source/confidence details.

Required output fields:

- `title`
- `authors`
- `doi`
- `journal`
- `publisher`
- `volume`
- `issue`
- `publicationYear`
- `pages`
- `articleNumber`
- `sourceBreakdown`
- `qualityScore`
- `missingFields`
- `warnings`

### `GrobidMetadataExtractor`

Extracts structured metadata from GROBID TEI output.

Must parse at minimum:

- title
- authors
- DOI
- journal/container title if present
- publisher if present
- volume
- issue
- publication year/date
- page range

GROBID output must be treated as a strong source for title/authors/DOI, but not as the only source for journal, volume, issue, year, or pages.

### `DoiCandidateExtractor`

Extracts DOI candidates from multiple text regions:

- GROBID TEI fields
- first page text
- header/footer text
- all-page raw text fallback
- Crossref/OpenAlex URLs, if present

Required DOI normalization:

- Trim whitespace and trailing punctuation.
- Strip URL prefixes such as `https://doi.org/`, `http://dx.doi.org/`, and `doi:`.
- Match DOI pattern beginning with `10.`.
- Deduplicate candidates case-insensitively.
- Prefer candidates that also resolve through Crossref.

### `CrossrefMetadataEnricher`

Uses DOI-first lookup against Crossref.

Must enrich:

- journal/container title
- publisher
- volume
- issue
- publication year
- page range or article number
- title and authors when GROBID is missing or low-confidence

Example DOI that must extract well:

```text
10.1016/j.comnet.2024.110675
```

Expected enriched values:

- Journal: `Computer Networks`
- Publisher: `Elsevier B.V.`
- Volume: `252`
- Year: `2024`
- Pages/article number: `110675`

### `OpenAlexTitleSearchEnricher`

Runs only when DOI lookup fails or key publication fields remain missing.

Search keys:

- normalized title
- first author surname when available
- publication year hint when available

Must enrich:

- DOI
- journal/source title
- publisher/source host when available
- publication year
- OpenAlex work/source IDs for traceability

Matches must be accepted only when title similarity and year/author hints are strong enough to avoid false positives.

### `HeaderMetadataFallbackExtractor`

Extracts visible publication metadata from first-page headers/footers when structured sources are incomplete.

Must inspect at least:

- first page top header lines
- first page footer lines
- second page header/footer if first page is incomplete

Required IJACSA-style patterns:

```text
(IJACSA) International Journal of Advanced Computer Science and Applications
Vol. 16, No. 9, 2025
31 | Page
```

Expected extraction:

- `journal = International Journal of Advanced Computer Science and Applications`
- `volume = 16`
- `issue = 9`
- `publicationYear = 2025`
- `pages = 31` when only a single visible page marker exists

Header fallback must not overwrite higher-confidence Crossref values unless Crossref is missing or clearly incompatible with the uploaded PDF.

### `MetadataMergeService`

Builds one canonical metadata record from all sources.

Default precedence:

1. DOI-verified Crossref fields
2. GROBID structured fields
3. DOI-verified OpenAlex fields
4. Header/page fallback fields
5. raw PDF text heuristics

Merge rules:

- Keep source attribution for every canonical field.
- Do not replace non-empty high-confidence values with lower-confidence values.
- Normalize DOI, journal title, page/article-number, volume, issue, and year before comparison.
- Preserve conflicts in `warnings`.
- Treat article numbers like `110675` as valid `articleNumber` when no page range exists.
- Treat single visible page markers like `31 | Page` as `pages = 31` only when no better page range exists.

### `MetadataQualityScoringService`

Scores completeness and reliability after canonical merge.

Suggested scoring:

- DOI present and valid: 20
- title present: 15
- authors present: 15
- journal/source present: 15
- publication year present: 10
- volume present: 5
- issue present: 5
- pages or article number present: 5
- publisher present: 5
- external source match confidence: 5

Return:

- numeric `qualityScore` from 0 to 100
- quality band: `high`, `medium`, or `low`
- missing fields
- conflict warnings
- source coverage summary

## Acceptance Tests

### Elsevier DOI Paper

Input PDF contains DOI:

```text
10.1016/j.comnet.2024.110675
```

Expected:

- DOI normalized to `10.1016/j.comnet.2024.110675`
- Journal extracted as `Computer Networks`
- Publisher extracted as `Elsevier B.V.`
- Volume extracted as `252`
- Publication year extracted as `2024`
- Article number or pages extracted as `110675`
- Quality score is `high`

### IJACSA Header Paper

Input first page contains:

```text
(IJACSA) International Journal of Advanced Computer Science and Applications
Vol. 16, No. 9, 2025
31 | Page
```

Expected:

- Journal extracted as `International Journal of Advanced Computer Science and Applications`
- Volume extracted as `16`
- Issue extracted as `9`
- Publication year extracted as `2025`
- Pages extracted as `31` if no stronger page range exists
- Quality score is at least `medium` when title/authors are also present

### Missing DOI Paper

Expected:

- GROBID title/authors are retained when present.
- OpenAlex title search runs.
- Header fallback fills journal/volume/issue/year/page fields when external enrichment fails.
- Canonical output does not contain null publication metadata when visible header metadata exists.

### Conflict Case

Expected:

- Crossref DOI-verified metadata wins over header text.
- Conflicting header values are recorded in `warnings`.
- Quality score is reduced only when the conflict is material.

## Backend Implementation Notes

- Add unit tests for each component and integration tests for the full pipeline.
- Store raw source snippets used by header fallback for auditability.
- Log enrichment attempts and failures without failing the whole extraction pipeline.
- Cache Crossref/OpenAlex responses by DOI/title to avoid repeated external calls.
- Use timeouts and retry policies for external services.
- Return partial metadata rather than throwing when one layer fails.

