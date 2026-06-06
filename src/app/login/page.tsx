"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div className="login-wrapper">
        <div className="page">
          <div className="left">
            <div>
              <p className="eyebrow">Research Management Platform</p>
              <h1 className="hero-title">
                Research Integrity
                <br />
                <span className="accent">&amp; Publication</span>
                <br />
                Quality Management
                <br />
                System
              </h1>
              <div className="badges">
                <span className="badge">Peer Review</span>
                <span className="badge">Plagiarism Check</span>
                <span className="badge">Open Access</span>
                <span className="badge">Analytics</span>
              </div>
            </div>
            <div className="poem-area">
              <span className="poem-line">
                Knowledge is no stone left still in sleep,
              </span>
              <span className="poem-line">
                but flame — that lights each claim we dare to keep,
              </span>
              <span className="poem-line">
                through peer review, truth surfaces at last,
              </span>
              <span className="poem-line">
                science stands firm when integrity holds fast.
              </span>
              <p className="poem-attr">
                — RIPQMS · For a foundation of honest research
              </p>
            </div>
          </div>

          <div className="right">
            <div className="tabs">
              <div className={`tab active`}>Sign In</div>
              <div className={`tab`} onClick={() => router.push('/register')}>Register</div>
            </div>

              <div className="form-content fade-in">
                <p className="welcome-title">Welcome back</p>
                <p className="welcome-sub">Continue your research journey</p>

                <div className="field-group">
                  <label className="field-label">Email</label>
                  <input
                    className="field-input"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Password</label>
                  <input
                    className="field-input"
                    type="password"
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="field-footer">
                    <button className="forgot">Forgot password?</button>
                  </div>
                </div>

                {error && <p className="error-text">{error}</p>}

                <button
                  className="btn-login"
                  onClick={async () => {
                    setError(null);
                    setLoading(true);
                    try {
                      const res = await authService.login({ email, password });

                      if (res?.success && res.data) {
                        // store tokens
                        if (typeof window !== "undefined") {
                          if (res.data.accessToken)
                            localStorage.setItem(
                              "accessToken",
                              res.data.accessToken,
                            );
                          if (res.data.refreshToken)
                            localStorage.setItem(
                              "refreshToken",
                              res.data.refreshToken,
                            );
                        }
                        router.push("/home");
                      } else {
                        setError(res?.message || "Login failed");
                      }
                    } catch (err: any) {
                      setError(err?.message || "Login error");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>

            <div className="or-divider">OR</div>

            <button className="social-btn">
              <i className="ti ti-brand-google"></i>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
