import "./animations.css";
import { useRef } from "react";

import useOrderCreateRequestItem from "@/hooks/useOrderCreateRequestItem";
import useOrderCreateRequestURL from "@/hooks/useOrderCreateRequestURL";

const URLInputBox = () => {
  const { requestItem } = useOrderCreateRequestItem();
  const { url, changeUrl } = useOrderCreateRequestURL();

  const inputElement = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    handleClickAsync(e);
  };

  const handleClickAsync = async (e) => {
    await requestItem(inputElement.current.value);
  };
  return (
    <div className="bg-white rounded-md border border-slate-300 p-7">
      <p className="text-center font-medium text-lg">
        Insert an URL and Submit
      </p>
      <p className="text-slate-500 text-sm mt-5 leading-relaxed">
        Select options for your item when the result is shown in the box below
      </p>
      <div className="mt-5">
        <input
          ref={inputElement}
          name="itemSearchInputBox"
          id="itemSearchInputBox"
          className="block px-4 py-3 border border-slate-500 w-full bg-slate-100 font-light rounded text-black"
          placeholder="Copy and paste the URL of the item here"
          onChange={changeUrl}
          value={url}
        />
        <button
          onClick={handleClick}
          className="mt-6 p-3 rounded-lg shadow-md border border-rose-500 bg-rose-500 font-medium text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default URLInputBox;
