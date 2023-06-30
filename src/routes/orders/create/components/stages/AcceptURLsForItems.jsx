import trash from "@/assets/delete.svg";
import star from "@/assets/star.svg";

import "./animations.css";

import {
  createCentrifugeClientObj,
  subscribeToChannelForAcceptingItem,
} from "@/utils/websocket";
import { getSubscriptionToken } from "@/utils/authentication";
import { getCSRFToken } from "@/utils/cookie";
import { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "@/redux/shoppingBasketSlice";
import { increment } from "@/redux/orderCreationStepsSlice";

import { ItemBasketDisplayBox } from "../ItemBasketDisplayBox";

const ItemResultWaitingBox = () => {
  return (
    <div className="bg-white rounded-md border border-slate-300 mt-3 divide-y divide-slate-300 overflow-hidden">
      <div className="p-7 flex flex-col items-center justify-center h-20">
        <div className="flex gap-4 items-center justify-between w-24">
          <div
            className="p-2 bg-red-600 rounded-full"
            style={{
              animationName: "shrinkExpand",
              animationIterationCount: "infinite",
              animationDuration: "2s",
            }}
          ></div>
          <div
            className="p-2 bg-red-600 rounded-full"
            style={{
              animationName: "shrinkExpand",
              animationIterationCount: "infinite",
              animationDuration: "2s",
              animationDelay: "0.5s",
            }}
          ></div>
          <div
            className="p-2 bg-red-600 rounded-full"
            style={{
              animationName: "shrinkExpand",
              animationIterationCount: "infinite",
              animationDuration: "2s",
              animationDelay: "1s",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const ItemResultDisplayBoxOptionBox = ({
  updateItemJSON,
  options,
  itemId,
  itemDomain,
}) => {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.userSession.access_token);

  const handleClick = (e) => {
    handleClickAsync(e);
  };
  const handleClickAsync = async (e) => {
    let url = e.currentTarget.id;
    if (!url) return;

    document.getElementById("itemResultDisplay").classList.add("blur-[2px]");

    const target_url = `${itemDomain}dp/${url}`;
    const fetchOptions = {
      method: "POST",
      headers: {
        "X-CSRFToken": localStorage.getItem("CSRFToken"),
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        url: target_url,
      }),
      credentials: "include",
    };
    const resp = await fetch(
      "http://127.0.0.1:8000/api/parseItemURL/",
      fetchOptions
    );
    if (resp.ok) {
      updateItemJSON(null);
    } else {
      document
        .getElementById("itemResultDisplay")
        .classList.remove("blur-[2px]");
    }
  };

  const optionName = options[0];
  const unavailable = " text-slate-300";
  return (
    <div className="p-7 text-left">
      <p className="font-medium text-lg">{optionName}</p>
      <div className="mt-6 flex flex-wrap gap-5">
        {options.slice(1).map((elem) => {
          const chosenOption = elem.hasOwnProperty("selectedOption")
            ? " bg-sky-200"
            : "";

          const unavailable = !elem.available ? " text-slate-300" : "";
          return (
            <button
              className={
                "block rounded-md border border-slate-300 p-3" +
                chosenOption +
                unavailable
              }
              id={elem.url}
              onClick={handleClick}
            >
              <p className="font-medium">
                {elem.name.replace("Click to select ", "")}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ItemResultDisplayBox = ({ updateItemJSON, itemJSON }) => {
  const dispatch = useDispatch();
  const elemRef = useRef(null);

  useEffect(() => {
    elemRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, []);

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
      {itemJSON.options.map((elem) => {
        return (
          <ItemResultDisplayBoxOptionBox
            updateItemJSON={updateItemJSON}
            options={elem}
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

export default function AcceptURLsForItems() {
  const [itemUrl, setItemUrl] = useState("");
  const [itemInfo, setItemInfo] = useState({});

  const subToken = useRef("");
  const subObj = useRef(null);
  const centrifugeObj = useRef(null);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.shoppingBasket.value);
  const access_token = useSelector((state) => state.userSession.access_token);

  const handleClick = (e) => {
    e.preventDefault();
    setItemInfo(null);
    handleClickAsync(e);
  };

  const handleNextClick = () => {
    if (items.length < 1) return;
    dispatch(increment());
  };

  const handleChange = ({ target }) => {
    setItemUrl(target.value);
  };

  const handleClickAsync = async (e) => {
    const target_url = document.getElementById("itemSearchInputBox");
    if (!target_url) return;
    const fetchOptions = {
      method: "POST",
      headers: {
        "X-CSRFToken": localStorage.getItem("CSRFToken"),
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        url: target_url.value,
      }),
      credentials: "include",
    };

    await fetch("http://127.0.0.1:8000/api/parseItemURL/", fetchOptions);
  };

  const useEffectAsync = async () => {
    const username = localStorage.getItem("username");
    localStorage.setItem("channel", `${username}#${username}`);

    const token = await getCSRFToken();
    localStorage.setItem("CSRFToken", token);
    console.log("CSRFToken Set!");

    const sub_token = await getSubscriptionToken();
    subToken.current = sub_token;
    console.log("Subscription Token Set!");

    const centrifugeClient = createCentrifugeClientObj(
      localStorage.getItem("access_token")
    );
    console.log("Centrifuge Client Created!");
    centrifugeObj.current = centrifugeClient;

    const subChannel = subscribeToChannelForAcceptingItem(
      centrifugeClient,
      subToken.current,
      setItemInfo
    );

    console.log("Subscrption Obj Created!");
    subObj.current = subChannel;

    subObj.current.subscribe();
    centrifugeObj.current.connect();
  };

  useEffect(() => {
    useEffectAsync();

    return () => {
      if (subObj.current != null && centrifugeObj.current != null) {
        subObj.current.unsubscribe();
        centrifugeObj.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="text-center text-black lg:w-11/12 w-full mx-auto">
      <h1 className="font-bold text-3xl">Provide URLs of Items</h1>
      <p className="text-lg font-semibold text-gray-500 mt-5">
        Provide links to items that you would like to purchase
      </p>
      <div className="w-full md:w-5/6 mt-20 md:flex items-start justify-between mx-auto gap-3 ">
        <div className="md:w-7/12">
          <div className="bg-white rounded-md border border-slate-300 p-7">
            <p className="text-center font-medium text-lg">
              Insert an URL and Submit
            </p>
            <p className="text-slate-500 text-sm mt-5 leading-relaxed">
              Select options for your item when the result is shown in the box
              below
            </p>
            <div className="mt-5">
              <input
                name="itemSearchInputBox"
                id="itemSearchInputBox"
                className="block px-4 py-3 border border-slate-500 w-full bg-slate-100 font-light rounded text-black"
                placeholder="Copy and paste the URL of the item here"
                onChange={handleChange}
                value={itemUrl}
              />
              <button
                onClick={handleClick}
                className="mt-6 p-3 rounded-lg shadow-md border border-rose-500 bg-rose-500 font-medium text-white"
              >
                Submit
              </button>
            </div>
          </div>
          {itemInfo && Object.keys(itemInfo).length > 0 && (
            <ItemResultDisplayBox
              updateItemJSON={setItemInfo}
              itemJSON={itemInfo}
              key={Math.random()}
            />
          )}
          {itemInfo === null && <ItemResultWaitingBox />}
        </div>
        <div className="md:w-5/12">
          <ItemBasketDisplayBox />
        </div>
      </div>
      <div className="mt-14 flex justify-center items-stretch font-semibold mb-14">
        <button
          className="p-3 rounded-lg shadow-md border border-cyan-600 bg-cyan-600 text-white"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
}
