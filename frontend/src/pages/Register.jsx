import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../services/api";

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

function strengthInfo(password) {
  if (!password) return { label: "", percent: 0, className: "" };
  if (password.length < 6) return { label: "Weak", percent: 33, className: "strength-weak" };
  if (password.length < 10 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    return { label: "Medium", percent: 66, className: "strength-medium" };
  }
  return { label: "Strong", percent: 100, className: "strength-strong" };
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const strength = strengthInfo(password);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password });
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (registerError) {
      setError(registerError.message || "Registration failed");
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
            <h1 className="hero-heading text-gradient">🚀 Create Account</h1>
            <p className="auth-helper">Join your enterprise knowledge base</p>
          </div>

          {success ? <div className="message-box success">✅ {success}</div> : null}
          {error ? <div className="message-box error">❌ {error}</div> : null}

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label className="field-label">Full Name</label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  className={`glass-input ${name ? "valid" : ""}`}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="field-label">Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">📧</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  className={`glass-input ${email ? "valid" : ""}`}
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
                  className={`glass-input ${password ? "valid" : ""}`}
                  placeholder="At least 6 characters"
                  required
                />
              </div>
              <div className="password-meter" style={{ marginTop: 10 }}>
                <div className="meter-track">
                  <div className={`meter-fill ${strength.className}`} style={{ width: `${strength.percent}%` }} />
                </div>
                <div className="small-muted" style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{strength.label || "Password strength"}</span>
                  <span>{strength.percent ? `${strength.percent}%` : ""}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="field-label">Confirm Password</label>
              <div className="input-wrap">
                <span className="input-icon">✅</span>
                <input
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type="password"
                  className={`glass-input ${confirmPassword && confirmPassword === password ? "valid" : ""}`}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                className="styled-checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
              />
              <span>I agree to the terms and conditions</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-gradient btn-pulse btn-gradient send-button"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="small-muted" style={{ textAlign: "center", margin: 0 }}>
            Already have an account?{' '}
            <Link to="/login" className="text-gradient underline-animated" style={{ fontWeight: 700 }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
