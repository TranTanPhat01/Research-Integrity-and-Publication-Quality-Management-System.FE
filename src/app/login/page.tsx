import './login.css';

export const metadata = {
  title: 'RIPQMS – Sign In',
};

export default function LoginPage() {
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      <div className="login-wrapper">
        <div className="page">
          <div className="left">
            <div>
              <p className="eyebrow">Research Management Platform</p>
              <h1 className="hero-title">
                Research Integrity<br />
                <span className="accent">&amp; Publication</span><br />
                Quality Management<br />System
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
              <div className="tab active">Sign In</div>
              <div className="tab">Register</div>
            </div>

            <p className="welcome-title">Welcome back</p>
            <p className="welcome-sub">Continue your research journey</p>

            <div className="field-group">
              <label className="field-label">Email</label>
              <input className="field-input" type="email" placeholder="you@email.com" />
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <input className="field-input" type="password" placeholder="Enter your password..." />
              <div className="field-footer">
                <button className="forgot">Forgot password?</button>
              </div>
            </div>

            <button className="btn-login">Sign In</button>

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
