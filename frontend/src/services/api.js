const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
}

async function handleResponse(response) {
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.detail || "Request failed");
  }
  return response.json();
}

export async function login(email, password) {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  const response = await fetch(`${API_URL}/api/auth/login`, { method: "POST", body: formData });
  return handleResponse(response);
}

export async function register(payload) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${API_URL}/api/upload/document`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    body: formData,
  });
  return handleResponse(response);
}

export async function queryChat(question) {
  const response = await fetch(`${API_URL}/api/chat/query`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ question }),
  });
  return handleResponse(response);
}
