const API_BASE = process.env.REACT_APP_API_BASE || "";

async function parseResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

function buildError(resBody, res) {
  if (!resBody) return new Error(res.statusText || "Request failed");
  if (typeof resBody === "string") return new Error(resBody);
  if (resBody.message) return new Error(resBody.message);
  return new Error(JSON.stringify(resBody));
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await parseResponse(res);
  if (!res.ok) throw buildError(body, res);
  return body;
}

export async function register(name, email, password) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const body = await parseResponse(res);
  if (!res.ok) throw buildError(body, res);
  return body;
}

export async function me(token) {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await parseResponse(res);
  if (!res.ok) throw buildError(body, res);
  return body;
}

export default { login, register, me };
