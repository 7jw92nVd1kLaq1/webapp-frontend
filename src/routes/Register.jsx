import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./root.css";

const placeErrorMessage = (e, msg) => {
  e.getElementsByTagName("input")[0].style.border = "thin solid #EF4444";
  const newElement = document.createElement("P");
  const classForElement = document.createAttribute("class");
  classForElement.value = "font-light my-2 text-sm text-red-500";
  const textForElement = document.createTextNode(msg);
  newElement.setAttributeNode(classForElement);
  newElement.append(textForElement);
  errorBox.append(newElement);
};

const checkFormRequired = (form) => {
  const keys = Object.keys(form);
  let result = true;
  keys.forEach((key) => {
    if (form[key]) return;
    result = false;
    const box = document.getElementById(`${key}-box`);
    placeErrorMessage(box, "This field is required.");
  });

  return result;
};

const checkSubmittedFormResponse = (obj, obj_keys) => {
  obj_keys.forEach((obj_key) => {
    if (obj_key == "__all__") return;
    const box = document.getElementById(`${obj_key}-box`);
    placeErrorMessage(box, obj[obj_key][0]["message"]);
  });
};

const resetInputBorder = (selectors) => {
  const divBoxes = document.querySelectorAll(selectors);
  divBoxes.forEach((box) => {
    box.getElementsByTagName("input")[0].style.border = "";
    const errorBox = box.getElementsByClassName("error-msg")[0];

    while (errorBox.hasChildNodes()) {
      errorBox.removeChild(errorBox.firstChild);
    }
  });
};

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [secondPasswordConfirm, setSecondPasswordConfirm] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };
  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };
  const handleNicknameChange = ({ target }) => {
    setNickname(target.value);
  };
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };
  const handlePasswordConfirmChange = ({ target }) => {
    setPasswordConfirm(target.value);
  };
  const handleSecondPasswordChange = ({ target }) => {
    setSecondPassword(target.value);
  };
  const handleSecondPasswordConfirmChange = ({ target }) => {
    setSecondPasswordConfirm(target.value);
  };

  const checkPasswordMatching = () => {
    let passwordRulesMet = true;
    if (password != passwordConfirm) {
      const box = document.getElementById("passwordConfirm-box");
      placeErrorMessage(box, "Your password and re-typed password don't match");

      passwordRulesMet = false;
    }

    if (secondPassword != secondPasswordConfirm) {
      const box = document.getElementById("secondPasswordConfirm-box");
      placeErrorMessage(
        box,
        "Your second password and re-typed password don't match"
      );

      passwordRulesMet = false;
    }

    return passwordRulesMet;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const real_work = async () => {
      document.getElementById("checking").textContent = "";
      const formData = new FormData(e.currentTarget);
      const formDataObject = Object.fromEntries(formData.entries());
      resetInputBorder('div[id$="box"]');
      if (!checkFormRequired(formDataObject) || !checkPasswordMatching())
        return;

      const formDataJsonString = JSON.stringify(formDataObject);

      const fetchOptions = {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        body: formDataJsonString,
        credentials: "include",
      };

      const response = await fetch(
        "http://127.0.0.1:8000/api/test_csrf/",
        fetchOptions
      );
      const json = await response.json();

      if (json.status == -1) {
        document.getElementById("checking").textContent = json.data;
        const obj = JSON.parse(json.data);
        const obj_keys = Object.keys(obj);

        if (obj_keys.length) {
          checkSubmittedFormResponse(obj, obj_keys);
        }
        return;
      }

      sessionStorage.setItem("username", json.username);
      navigate("/");
    };
    real_work();
  };

  const afterLoadFunction = async () => {
    try {
      const apiHost = "http://127.0.0.1:8000";
      const resp = await fetch(`${apiHost}/api/csrf/`, {
        method: "GET",
      });

      const data = await resp.json();
      setCsrfToken(data.csrfToken);
    } catch (err) {
      document.getElementById("checking").textContent = err.message;
    }
  };

  useEffect(() => {
    afterLoadFunction();
  }, []);

  const PasswordRules = () => {
    const rulesClassNameValues = [
      password.length >= 8 ? "text-green-500" : "text-red-500",
      password.match(/\W/) ? "text-green-500" : "text-red-500",
      !password.match(new RegExp(`${username}`, "g"))
        ? "text-green-500"
        : "text-red-500",
      password == passwordConfirm ? "text-green-500" : "text-red-500",
    ];

    return (
      <ol className="mt-2 ml-6 list-disc">
        <li className={rulesClassNameValues[0]}>
          It must be at least 8 characters
        </li>
        <li className={rulesClassNameValues[1]}>
          It must contain at least one special character
        </li>
        <li className={rulesClassNameValues[2]}>
          It must <span className="font-semibold">NOT</span> contain your
          username
        </li>
        <li className={rulesClassNameValues[3]}>Both fields must match</li>
      </ol>
    );
  };

  const SecondPasswordRules = () => {
    const rulesClassNameValues = [
      secondPassword.length >= 8 ? "text-green-500" : "text-red-500",
      secondPassword.match(/\W/) ? "text-green-500" : "text-red-500",
      !secondPassword.match(new RegExp(`${username}`, "g")) ||
      !secondPassword.match(new RegExp(`${password}`, "g"))
        ? "text-green-500"
        : "text-red-500",
      secondPassword == secondPasswordConfirm
        ? "text-green-500"
        : "text-red-500",
    ];

    return (
      <ol className="mt-2 ml-6 list-disc">
        <li className={rulesClassNameValues[0]}>
          It must be at least 8 characters
        </li>
        <li className={rulesClassNameValues[1]}>
          It must contain at least one special character
        </li>
        <li className={rulesClassNameValues[2]}>
          It must <span className="font-semibold">NOT</span> contain your
          username or password
        </li>
        <li className={rulesClassNameValues[3]}>Both fields must match</li>
      </ol>
    );
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-900 min-h-screen text-white z-10 shadow-xl"
      id="login"
    >
      <form
        onSubmit={handleSubmit}
        id="registerForm"
        method="POST"
        action="http://127.0.0.1:8000/api/test_csrf/"
        className="w-11/12"
      >
        <div className="bg-gray-800 mx-auto my-4 lg:w-1/2 w-full p-10 rounded-lg shadow-xl divide-y-2">
          <div className="pb-8">
            <p className="text-xl font-light">Register</p>
            <p
              className="text-xl font-light w-96 overflow-hidden"
              id="checking"
            ></p>
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

              <div className="error-msg"></div>
            </div>
            <div className="mt-3" id="email-box">
              <label className="text-sm block mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="error-msg"></div>
            </div>
            <div className="mt-3" id="nickname-box">
              <label className="text-sm block mb-2" htmlFor="nickname">
                Nickname
              </label>
              <input
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={handleNicknameChange}
              />
              <div className="error-msg"></div>
            </div>
          </div>
          <div className="py-8">
            <div id="password-box">
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
              <div className="error-msg"></div>
              <div className="mt-1 p-1 text-xs">
                <p className="text-gray-200 font-medium">
                  The password must meet the following requirements:
                </p>
                <PasswordRules />
              </div>
            </div>
            <div className="mt-3" id="passwordConfirm-box">
              <label className="text-sm block mb-2" htmlFor="passwordConfirm">
                Re-Type Password
              </label>
              <input
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                type="password"
              />
              <div className="error-msg"></div>
            </div>
          </div>
          <div className="py-8">
            <div id="secondPassword-box">
              <label className="text-sm block mb-2" htmlFor="secondPassword">
                Second Password
              </label>
              <input
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="secondPassword"
                name="secondPassword"
                value={secondPassword}
                onChange={handleSecondPasswordChange}
                type="password"
              />
              <div className="error-msg"></div>
              <div className="mt-1 p-1 text-xs">
                <p className="text-gray-200 font-medium">
                  The password must meet the following requirements:
                </p>
                <SecondPasswordRules />
              </div>
            </div>
            <div className="mt-3" id="secondPasswordConfirm-box">
              <label
                className="text-sm block mb-2"
                htmlFor="secondPasswordConfirm"
              >
                Re-Type Second Password
              </label>
              <input
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="secondPasswordConfirm"
                name="secondPasswordConfirm"
                value={secondPasswordConfirm}
                onChange={handleSecondPasswordConfirmChange}
                type="password"
              />
              <div className="error-msg"></div>
            </div>
          </div>
          <div className="py-8">
            <button className="bg-blue-500 shadow-lg rounded-lg p-2">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
