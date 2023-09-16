import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "@/routes/root.css";
import { getCSRFToken } from "@/utils/cookie";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const displayLoginError = (data) => {
    const box = document.getElementById("error-box");

    while (box.hasChildNodes()) box.removeChild(box.firstChild);

    const newElement = document.createElement("P");
    const newElementAttr = document.createAttribute("class");
    newElementAttr.value = "mt-4 text-red-500 text-sm font-medium";
    const newElementTextNode = document.createTextNode(data.reason);
    newElement.setAttributeNode(newElementAttr);
    newElement.append(newElementTextNode);
    box.append(newElement);
  };

  const useEffectAsync = async () => {
    const csrf = await getCSRFToken();
    setCsrfToken(csrf);
  };

  const handleSubmitAsync = async (e) => {
    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const formDataObjectString = JSON.stringify(formDataObject);

    const fetchOptions = {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
        "Content-Type": "application/json",
      },
      body: formDataObjectString,
      credentials: "include",
    };

    const response = await fetch(
      "http://127.0.0.1:8000/api/request-tokens/",
      fetchOptions
    );

    const data = await response.json();

    if (!response.ok) {
      displayLoginError(data);
      return;
    }

    localStorage.setItem("username", data.data.username);
    localStorage.setItem("access_token", data.data.token);
    navigate("/");
  };

  const handleSubmitSocialAsync = async (e) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
        "Content-Type": "application/json",
        Host: "127.0.0.1:8000",
        Referer: "127.0.0.1:8000",
      },
      credentials: "include",
    };

    const response = await fetch(
      "http://127.0.0.1:8000/accounts/github/login/",
      fetchOptions
    );

    const data = await response.json();

    if (!response.ok) {
      displayLoginError(data);
      return;
    }

    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitAsync(e);
  };

  const handleSubmitSocial = (e) => {
    e.preventDefault();
    handleSubmitSocialAsync(e);
  };

  useEffect(() => {
    useEffectAsync();
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center w-full bg-gray-900 min-h-screen opacity-100 text-white z-10 shadow-xl"
      id="login"
    >
      <div className="bg-gray-800 lg:w-1/3 md:w-2/3 w-11/12 p-10 rounded-lg shadow-xl">
        <p className="text-xl font-light">Login</p>
        <div id="error-box"></div>
        <form
          onSubmit={handleSubmit}
          method="POST"
          action="http://127.0.0.1:8000/api/token/"
        >
          <div className="mt-8" id="username-box">
            <label className="text-sm block mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mt-3" id="password-box">
            <label className="text-sm block mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
          </div>
          <div className="flex gap-2">
            <button
              className="mt-8 rounded-lg bg-sky-800 shadow-lg p-3"
              type="submit"
            >
              Login
            </button>
            <button className="mt-8 rounded-lg bg-blue-800 shadow-lg p-3">
              <Link to="/register">Register</Link>
            </button>
            <button className="mt-8 rounded-lg bg-blue-800 shadow-lg p-3">
              <a href="http://127.0.0.1:8000/accounts/github/login/">GitHub</a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
