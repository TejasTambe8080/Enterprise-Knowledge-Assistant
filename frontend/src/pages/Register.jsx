import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await register({ name, email, password });
      navigate("/login");
    } catch (registerError) {
      setError(registerError.message || "Registration failed");
    }
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create account</h1>
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} type="text" required />
        </label>
        <label>
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
        </label>
        <label>
          Password
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
        </label>
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
