import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/api";

function AppLogo() {
  return (
    <div className="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 18C12 15.7909 13.7909 14 16 14H36C42.6274 14 48 19.3726 48 26V48C48 50.2091 46.2091 52 44 52H20C15.5817 52 12 48.4183 12 44V18Z" fill="white" fillOpacity="0.22" />
        <path d="M20 20H38" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 28H34" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M38 36C42.4183 36 46 32.4183 46 28C46 23.5817 42.4183 20 38 20C33.5817 20 30 23.5817 30 28C30 32.4183 33.5817 36 38 36Z" stroke="white" strokeWidth="2" />
        <path d="M35 28H41" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M38 25V31" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <text x="40" y="50" fill="white" fontSize="13" fontWeight="700">AI</text>
      </svg>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/chat");
    } catch (loginError) {
      setError(loginError.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="app-shell">
        <div className="floating-particle" />
        <div className="floating-particle" />
        <div className="floating-particle" />
        <div className="floating-particle" />
        <div className="floating-particle" />

        <div className="auth-shell glass-card auth-card">
          <div className="text-center">
            <div className="auth-title">
              <AppLogo />
            </div>
            <h1 className="hero-heading text-gradient">RAG Assistant</h1>
            <p className="auth-helper">Enterprise Knowledge Base</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label className="field-label">Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">📧</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  className="glass-input"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="field-label">Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  className="glass-input"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error ? <div className="message-box error">❌ {error}</div> : null}

            <button type="submit" disabled={loading} className="btn-gradient btn-pulse send-button">
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          <p className="small-muted" style={{ textAlign: "center", margin: 0 }}>
            Don't have an account?{' '}
            <Link to="/register" className="text-gradient underline-animated" style={{ fontWeight: 700 }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}