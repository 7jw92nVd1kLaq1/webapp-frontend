import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

import up from "../../assets/up.svg";
import down from "../../assets/down.svg";

const usersListSort = (arr, key, order) => {
  // ascending order
  if (key === "username") {
    arr.sort((a, b) => {
      const nameA = a.username.toLowerCase(),
        nameB = b.username.toLowerCase();
      if (nameA < nameB)
        //sort string ascending
        return order ? -1 : 1;
      else if (nameA > nameB) return order ? 1 : -1;
      return 0;
    });
  } else if (key === "date_joined") {
    if (order) arr.sort((a, b) => a.date_joined - b.date_joined);
    else arr.sort((a, b) => b.date_joined - a.date_joined);
  } else if (key === "email") {
    arr.sort((a, b) => {
      const nameA = a.email.toLowerCase(),
        nameB = b.email.toLowerCase();
      if (nameA < nameB)
        //sort string ascending
        return order ? -1 : 1;
      else if (nameA > nameB) return order ? 1 : -1;
      return 0;
    });
  }

  return arr;
};

const reducer = (state, action) => {
  if (action.type === "toggle_username") {
    if ("username" in state) {
      const switched_state = state.username ? false : true;
      const userList = usersListSort(
        state.userList,
        "username",
        switched_state
      );
      return {
        username: switched_state,
        userList: userList,
      };
    }
    const userList = usersListSort(state.userList, "username", true);
    return {
      username: true,
      userList: userList,
    };
  } else if (action.type === "toggle_email") {
    if ("email" in state) {
      const switched_state = state.email ? false : true;
      const userList = usersListSort(state.userList, "email", switched_state);
      return {
        email: switched_state,
        userList: userList,
      };
    }
    const userList = usersListSort(state.userList, "email", true);
    return {
      email: true,
      userList: userList,
    };
  } else if (action.type === "toggle_date_joined") {
    if ("date_joined" in state) {
      const switched_state = state.date_joined ? false : true;
      const userList = usersListSort(
        state.userList,
        "date_joined",
        switched_state
      );
      return {
        date_joined: switched_state,
        userList: userList,
      };
    }
    const userList = usersListSort(state.userList, "date_joined", true);
    return {
      date_joined: true,
      userList: userList,
    };
  } else if (action.type === "toggle_is_admin") {
    if ("is_admin" in state) {
      const switched_state = state.is_admin ? false : true;
      return {
        is_admin: switched_state,
        ...state,
      };
    }
    return {
      is_admin: true,
      ...state,
    };
  } else if (action.type === "add_user_entry") {
    if ("userList" in state) {
      return {
        ...state,
        userList: [...state.userList, action.payload],
      };
    }
    return {
      ...state,
      userList: [action.payload],
    };
  }
  throw Error("Unknown action.");
};

const UsersEntry = (props) => {
  return (
    <div
      id={props.username}
      className="flex justify-end rounded-lg bg-gray-800 w-full p-3 py-5"
    >
      <div className="flex font-light w-11/12">
        <button className="username text-sm w-3/12 font-normal text-left">
          <Link to={props.username}>{props.username}</Link>
        </button>
        <button className="email text-sm w-4/12 text-left">
          {props.email}
        </button>
        <button className="reg-date text-sm w-2/12 text-center">
          {new Date(props.registeredDate).toDateString()}
        </button>
        <button className="isAdmin text-sm w-1/12 text-center">
          {props.isAdmin}
        </button>
        <button className="something text-sm w-2/12 text-center">1</button>
      </div>
    </div>
  );
};

export default function Users() {
  const [state, dispatch] = useReducer(reducer, {});

  const load_users = async () => {
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      credentials: "include",
    };
    const response = await fetch(
      "http://127.0.0.1:8000/api/admin-user-management/",
      fetchOptions
    );
    const data = await response.json();
    console.log(data);

    data.forEach((data) => {
      const entry = {
        username: data.username,
        email: data.email,
        date_joined: Date.parse(data.date_joined),
        is_admin: data.is_staff ? "Yes" : "No",
      };
      dispatch({ type: "add_user_entry", payload: entry });
    });
  };

  useEffect(() => {
    load_users();
  }, []);

  console.log(state);

  return (
    <div className="px-10 p-8 text-white">
      <div>
        <h2 className="font-light text-2xl">Users</h2>
      </div>
      <div className="mt-24">
        <div className="flex justify-end rounded-lg bg-gray-700 w-full p-3 py-4">
          <div className="flex items-center w-11/12">
            <div className="flex items-center gap-1 font-light text-sm w-3/12 ">
              <button
                onClick={() => {
                  dispatch({ type: "toggle_username" });
                }}
              >
                Username
              </button>
              {"username" in state && (
                <img
                  src={state.username ? up : down}
                  className="w-6 h-auto"
                  onClick={() => {
                    dispatch({ type: "toggle_username" });
                  }}
                />
              )}
            </div>
            <div className="flex items-center gap-1 font-light text-sm w-4/12">
              <button
                onClick={() => {
                  dispatch({ type: "toggle_email" });
                }}
              >
                Email
              </button>
              {"email" in state && (
                <img
                  src={state.email ? up : down}
                  className="w-6 h-auto"
                  onClick={() => {
                    dispatch({ type: "toggle_email" });
                  }}
                />
              )}
            </div>
            <div className="flex items-center gap-1 font-light text-sm w-2/12 justify-center">
              <button
                onClick={() => {
                  dispatch({ type: "toggle_date_joined" });
                }}
              >
                Joined
              </button>
              {"date_joined" in state && (
                <img
                  src={state.date_joined ? up : down}
                  className="w-6 h-auto"
                  onClick={() => {
                    dispatch({ type: "toggle_date_joined" });
                  }}
                />
              )}
            </div>
            <div className="flex items-center gap-1 font-light text-sm w-1/12 justify-center">
              <button
                onClick={() => {
                  dispatch({ type: "toggle_is_admin" });
                }}
              >
                Admin
              </button>
              {"is_admin" in state && (
                <img
                  src={state.is_admin ? up : down}
                  className="w-6 h-auto"
                  onClick={() => {
                    dispatch({ type: "toggle_is_admin" });
                  }}
                />
              )}
            </div>
            <button className="font-light text-sm w-2/12 text-center"></button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4" id="admin-users-list">
          {"userList" in state &&
            state.userList.map((data) => {
              return (
                <UsersEntry
                  username={data.username}
                  email={data.email}
                  registeredDate={data.date_joined}
                  isAdmin={data.is_staff ? "Yes" : "No"}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
