"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth";
import "../login/login.css";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await authService.register({ fullName, email, password });
      if (res?.success && res.data) {
        if (typeof window !== "undefined") {
          if (res.data.accessToken) localStorage.setItem("accessToken", res.data.accessToken);
          if (res.data.refreshToken) localStorage.setItem("refreshToken", res.data.refreshToken);
        }
        router.push('/home');
      } else {
        setError(res?.message || 'Register failed');
      }
    } catch (err: any) {
      setError(err?.message || 'Register error');
    } finally {
      setLoading(false);
    }
  };

  return (
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
            <span className="poem-line">Knowledge is no stone left still in sleep,</span>
            <span className="poem-line">but flame — that lights each claim we dare to keep,</span>
            <span className="poem-line">through peer review, truth surfaces at last,</span>
            <span className="poem-line">science stands firm when integrity holds fast.</span>
            <p className="poem-attr">— RIPQMS · For a foundation of honest research</p>
          </div>
        </div>

        <div className="right">
          <div className="tabs">
            <div className="tab" onClick={() => router.push('/login')}>Sign In</div>
            <div className="tab active">Register</div>
          </div>

          <div className="form-content fade-in">
            <p className="welcome-title">Create an account</p>
            <p className="welcome-sub">Join the research governance platform</p>

            <div className="field-group">
              <label className="field-label">Full Name</label>
              <input className="field-input" type="text" placeholder="Dr. John Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Institution Email</label>
              <input className="field-input" type="email" placeholder="you@university.edu" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <input className="field-input" type="password" placeholder="Create a password..." value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button className="btn-login" onClick={handleRegister} disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </button>

            <div className="or-divider">OR</div>

            <button className="social-btn">
              <i className="ti ti-brand-google"></i>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
