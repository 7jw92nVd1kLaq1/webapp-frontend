import star from "@/assets/star.svg";
import "./animations.css";

import { useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { addItem } from "@/redux/shoppingBasketSlice";

import ItemResultDisplayBoxOptionBox from "./ItemResultDisplayBoxOptionBox";

const ItemResultDisplayBox = ({ requestItemJSON, itemJSON }) => {
  const dispatch = useDispatch();
  const elemRef = useRef(null);
  const optionKeys = Object.keys(itemJSON.options);

  useEffect(() => {
    elemRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [itemJSON]);

  return (
    <div
      className="bg-white rounded-md border border-slate-300 mt-3 divide-y divide-slate-300 overflow-hidden"
      id="itemResultDisplay"
      ref={elemRef}
    >
      <div className="p-7">
        <img
          src={itemJSON.imageurl}
          className="block mx-auto w-auto h-40 rounded-xl"
        />
      </div>
      <div className="p-7 text-left">
        <p className="text-xl font-medium">{itemJSON.productName}</p>
        <p className="mt-3 font-medium text-slate-500">{itemJSON.brand}</p>
        <p className="mt-3 font-medium text-slate-500 flex items-center gap-2">
          <img src={star} className="w-5 h-auto" />{" "}
          <span>{`${itemJSON.rating} out of 5.0`}</span>
        </p>
        <p className="mt-3 text-lg font-medium">${itemJSON.price}</p>
      </div>
      {optionKeys.map((key) => {
        return (
          <ItemResultDisplayBoxOptionBox
            requestItemJSON={requestItemJSON}
            optionsKey={key}
            options={itemJSON.options[key]}
            itemId={itemJSON.url}
            itemDomain={itemJSON.domain}
          />
        );
      })}
      <div className="p-7 text-left">
        <button
          className="w-fit block mx-auto p-3 rounded-lg shadow-md bg-rose-600 text-white"
          onClick={() => {
            dispatch(addItem(itemJSON));
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemResultDisplayBox;
