const backendAddr = "http://127.0.0.1:8000";

export const getCSRFToken = async () => {
  try {
    const response = await fetch(`${backendAddr}/api/csrftoken/`, {
      method: "GET",
      credentials: "include",
    });
    const json = response.json();
    return json.csrfToken;
  } catch (err) {
    return "";
  }
};

export const validateCookie = async () => {
  const resp = await fetch(`${backendAddr}/api/check-ref-token/`, {
    method: "GET",
    credentials: "include",
  });
  if (!resp.ok) return false;
  return true;
};

export const logoutUser = async () => {
  await fetch(`${backendAddr}/api/delete-tokens/`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  localStorage.clear();
};
