const backend = "http://127.0.0.1:8000";

export const checkAccessTokenValidity = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;

  const response = await fetch(`${backend}/api/check-acc-token/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) return false;
  return true;
};
