import { useState } from "react";

import search from "../../../assets/search.svg";

const UserSearchBox = () => {
  const [userSearch, setUserSearch] = useState("");
  const handleChange = ({ target }) => {
    setUserSearch(target.value);
  };
  return (
    <div className="flex grow items-stretch gap-2">
      <button className="block bg-gray-700 rounded flex flex-col items-center justify-center p-2">
        <img src={search} className="w-8 h-auto" />
      </button>
      <div className="grow">
        <label
          id="userSearchLabel"
          htmlFor="userSearch"
          className="font-light relative block"
        >
          <span
            id="userSearchLabelInside"
            className="block px-4 py-3 border-2 border-transparent w-full top-0 left-0 absolute text-gray-700 rounded"
          >
            {!userSearch && "Search Users (Type in Username or Email)"}
          </span>
        </label>
        <input
          name="userSearch"
          id="userSearch"
          value={userSearch}
          onChange={handleChange}
          className="block px-4 py-3 border-2 border-gray-400 w-full bg-white font-light rounded text-black"
        />
      </div>
    </div>
  );
};

export default UserSearchBox;
