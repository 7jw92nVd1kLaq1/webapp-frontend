import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const sleep1 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getCookie(name) {
  function escape(s) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
  }
  const match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
  );
  return match ? match[1] : null;
}

const checkAccessToken = async () => {
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    credentials: "include",
  };

  console.log(localStorage.getItem("access_token"));

  const response = await fetch(
    "http://127.0.0.1:8000/api/check-acc-token/",
    fetchOptions
  );

  if (response.ok) {
    console.log("SUCCSESSS");
  }
  return true;
};

const updateAccessToken = async (updateCallback) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(
    "http://127.0.0.1:8000/api/renew-acc-token/",
    fetchOptions
  );

  const json = await response.json();
  if (!response.ok) {
    localStorage.clear();
    updateCallback(
      <div className="flex flex-col gap-4">
        <p className="font-light">
          <Link to="/login">Login</Link>
        </p>
        <p className="font-light">
          <Link to="/register">Register</Link>
        </p>
        <p className="font-light">
          <a href="http://127.0.0.1:8000/accounts/github/login/">
            Login With GitHub
          </a>
        </p>
      </div>
    );
    return;
  }

  console.log(json.data);
  if (localStorage.getItem("username") != json.data.username) {
    localStorage.setItem("username", json.data.username);
  }
  if (localStorage.getItem("access_token") != json.data.token) {
    localStorage.setItem("access_token", json.data.token);
  }

  const jsxValue = (
    <div className="flex flex-col gap-4">
      <p className="font-light">Welcome! {localStorage.getItem("username")}!</p>
      <p className="font-light">
        <Link to="/logout">Logout</Link>
      </p>
    </div>
  );

  updateCallback(jsxValue);
};

export default function TopNav() {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleClick = () => {
    const asyncHandle = async () => {
      setIsMenuClicked((prev) => (prev ? false : true));
      const menu = document.getElementById("menu-icon");
      const submenu = document.getElementById("sub-menu");
      if (isMenuClicked) {
        menu.style.transform = "rotate(90deg)";
        submenu.style.visibility = "visible";
        await sleep1(50);
        submenu.style.opacity = 1;
      } else {
        menu.style.transform = "rotate(0deg)";

        submenu.style.opacity = 0;
        await sleep1(500);
        submenu.style.visibility = "hidden";
      }
    };

    asyncHandle();
  };

  const checkToken = () => {
    updateAccessToken(setIsAuthenticated);
    checkAccessToken();
  };

  const menuStyle = {
    transitionProperty: "transform",
    transitionDuration: "500ms",
  };

  useEffect(() => {
    checkToken();
    const id = setInterval(checkToken, 500000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed z-50">
      <div
        id="sub-menu"
        className="bg-gray-700 fixed w-screen z-40 invisible"
        style={{
          transitionProperty: "opacity",
          transitionDuration: "500ms",
        }}
      >
        <div className="p-3">
          <svg
            className="stroke-1 stroke-white fill-white"
            xmlns="http://www.w3.org/2000/svg"
            height="32"
            width="32"
          >
            <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
          </svg>
          <div className="p-10 flex flex-col gap-4">
            <p className="font-light">Buy</p>
            <p className="font-light">Sell</p>
            {isAuthenticated}
            <p className="font-light">Help</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-800 fixed top-0 text-white shadow-lg p-3 z-50 flex justify-between items-center">
        <p className="font-semibold text-lg">BitShop</p>
        <div id="menu-icon" onClick={handleClick} style={menuStyle}>
          <svg
            className="stroke-1 stroke-white fill-white"
            xmlns="http://www.w3.org/2000/svg"
            height="32"
            width="32"
          >
            <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
