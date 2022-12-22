const backendAddr = "http://127.0.0.1:8000";

export const getCSRFToken = async () => {
  try {
    const response = await fetch(`${backendAddr}/api/csrf/`, {
      method: "GET",
    });
    const json = response.json();
    return json.csrfToken;
  } catch (err) {
    return "";
  }
};

export const validateCookie = async () => {
  const resp = await fetch(`${backendAddr}/api/token/refresh/validity/`, {
    method: "GET",
    credentials: "include",
  });

  const json = await resp.json();
  if (json.status != -1) return true;
  return false;
};

export const logoutUser = async () => {
  const resp = await fetch(`${backendAddr}/api/token/delete/`, {
    method: "GET",
    credentials: "include",
  });

  const json = await resp.json();
  if (json.status != -1) return true;
  return false;
};
