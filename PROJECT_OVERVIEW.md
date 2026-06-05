# RIPQMS Frontend - Project Overview

## 1. Du an hien tai la gi

Day la frontend Next.js cho he thong **RIPQMS - Research Integrity and Publication Quality Management System**.

Muc tieu hien tai cua giao dien la gioi thieu va khoi dau mot nen tang quan ly:

- Research integrity audit
- Publication quality review
- Manuscript readiness assessment
- Academic workflow governance

## 2. Cong nghe dang dung

- **Next.js 16** voi App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** cho animation
- **Lucide React** cho icon

## 3. Cau truc file chinh

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    login/
      page.tsx
      login.css
  components/
    AcademicBookHero.tsx
public/
  image.png
package.json
tailwind.config.js
tsconfig.json
```

## 4. Nhung phan da co

### Landing page

File: `src/app/page.tsx`

Route: `/`

Da co:

- Header voi logo RIPQMS
- Navigation: Integrity Audit, Quality Review, Workflow, Resources
- Nut Sign In tro den `/login`
- Hero section gioi thieu he thong
- CTA Sign In va Explore Audit Workflow
- Badge gia tri san pham
- Feature cards:
  - Integrity Audit
  - Publication Quality Assessment
  - Research Governance Workflow
- Workflow section gom 4 buoc
- Trusted by section

### Animated academic book hero

File: `src/components/AcademicBookHero.tsx`

Da co:

- Component client-side dung `framer-motion`
- Hieu ung sach mo va lat trang
- 20 trang noi dung academic/research review
- Co xu ly `prefers-reduced-motion`
- Co animation floating particles, book shadow, seal rotation

### Login page

File: `src/app/login/page.tsx`

Route: `/login`

Da co:

- Layout dang nhap 2 cot
- Form email/password
- Forgot password button
- Sign In button
- Continue with Google button
- Tab Sign In/Register dang o muc UI tinh

### Styling

File:

- `src/app/globals.css`
- `src/app/login/login.css`

Da co:

- Tailwind base/components/utilities
- Global reset
- Font setup
- Watermark backgrounds
- Navigation hover effect
- Book animation CSS
- Login page custom CSS

## 5. Nhung phan chua co

Hien tai du an moi chu yeu la UI tinh. Chua co cac phan sau:

- Chua co backend API integration
- Chua co authentication that
- Chua co xu ly token/session
- Chua co register flow
- Chua co dashboard sau khi dang nhap
- Chua co role-based UI
- Chua co upload manuscript
- Chua co integrity audit workflow that
- Chua co publication quality assessment that
- Chua co plagiarism check logic
- Chua co citation/reference verification
- Chua co state management ro rang
- Chua co form validation
- Chua co test

## 6. Tinh trang build va lint

### Build

Lenh da kiem tra:

```bash
npm run build
```

Ket qua:

- Build thanh cong
- TypeScript pass
- Static routes duoc generate:
  - `/`
  - `/login`
  - `/_not-found`

### Lint

Lenh da kiem tra:

```bash
npm run lint
```

Ket qua: dang loi.

Ly do:

```text
Invalid project directory provided, no such directory: ...\lint
```

Nguyen nhan kha nang cao la script `next lint` khong con phu hop voi Next.js 16. Can chuyen sang cau hinh ESLint moi hoac cap nhat script lint.

## 7. Van de dang thay trong code

### 1. Loi encoding/mojibake

Nhieu ky tu dang bi loi, vi du:

```text
â€”
âœ“
ðŸ“„
Â·
```

Xuat hien trong:

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/login/page.tsx`
- `src/components/AcademicBookHero.tsx`
- `src/app/globals.css`

Anh huong:

- Build van chay duoc
- Nhung UI/comment/text co the hien thi sai ky tu
- Code kho doc va kho bao tri hon

### 2. package.json dang qua phinh

`package.json` hien dang liet ke rat nhieu dependency transitive truc tiep.

Nen don lai chi giu cac dependency can dung truc tiep, vi du:

- `next`
- `react`
- `react-dom`
- `framer-motion`
- `lucide-react`
- `zod` neu dung validation

Va devDependencies:

- `typescript`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `eslint`
- `eslint-config-next`
- `@types/node`
- `@types/react`

### 3. package-lock.json dang co thay doi chua commit

Git status hien tai bao:

```text
M package-lock.json
```

Thay doi nay chu yeu la optional/native dependency entries, co the phat sinh khi cai package tren Windows.

## 8. De xuat viec nen lam tiep

Thu tu nen lam:

1. Sua loi encoding/mojibake trong cac file source.
2. Don lai `package.json` va regenerate `package-lock.json`.
3. Sua script lint cho phu hop voi Next.js 16.
4. Tach layout/component cho landing page de code gon hon.
5. Lam login that:
   - Form state
   - Validation
   - API call
   - Token/session handling
   - Redirect sau dang nhap
6. Tao dashboard sau dang nhap.
7. Lam module nghiep vu dau tien, nen chon mot trong cac module:
   - Manuscript upload
   - Integrity audit
   - Publication quality review
   - Submission readiness checklist

## 9. Huong di de tiep tuc nhanh nhat

Neu muon tiep tuc phat trien dung nen tang, nen bat dau bang goi viec:

```text
Foundation cleanup
```

Bao gom:

- Fix encoding
- Fix lint
- Clean dependencies
- Chuan hoa metadata/title
- Tach component neu can
- Dam bao `npm run build` va lint deu pass

Sau do moi nen lam:

```text
Authentication + Dashboard
```

Bao gom:

- Login form co logic
- Register form that
- Auth service layer
- Dashboard route
- Protected route
- Logout

## 10. Ket luan ngan gon

Du an hien dang o giai doan **frontend prototype / landing + login UI**.

Nen tang visual da co kha tot, nhat la landing page va animated book hero. Tuy nhien chua co logic nghiep vu, chua co auth that, va can don dep nen tang ky thuat truoc khi mo rong thanh san pham hoan chinh.
