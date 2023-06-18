import tshirt from "@/assets/reset.jpeg";
import star from "@/assets/star.svg";

import {
  createCentrifugeClientObj,
  subscribeToChannel,
} from "@/utils/websocket";
import { getSubscriptionToken } from "@/utils/authentication";
import { getCSRFToken } from "@/utils/cookie";
import { useEffect, useRef, useState } from "react";

const ItemResultWaitingBox = () => {
  return (
    <div className="bg-white rounded-md border border-slate-300 mt-3 divide-y divide-slate-300 overflow-hidden">
      <div className="p-7"></div>
    </div>
  );
};

const ItemResultDisplayBoxOptionBox = ({ options }) => {
  const handleClick = (e) => {
    handleClickAsync(e);
  };
  const handleClickAsync = async (e) => {
    const url = e.currentTarget.id;
    if (!url) return;
    document.getElementById("itemResultDisplay").classList.add("blur-[2px]");
    const target_url = `https://www.amazon.com${url}`;

    const fetchOptions = {
      method: "POST",
      headers: {
        "X-CSRFToken": localStorage.getItem("CSRFToken"),
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        url: target_url,
      }),
      credentials: "include",
    };

    await fetch("http://127.0.0.1:8000/api/parseItemURL/", fetchOptions);
  };

  const optionName = options[0];
  return (
    <div className="p-7 text-left">
      <p className="font-medium text-lg">{optionName}</p>
      <div className="mt-6 flex flex-wrap gap-5">
        {options.slice(1).map((elem) => {
          const chosenOption = elem.url ? "" : " bg-sky-200";
          return (
            <button
              className={
                "block rounded-md border border-slate-300 p-3" + chosenOption
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

const ItemResultDisplayBox = ({ itemJSON, key }) => {
  itemJSON.options = itemJSON.options.filter((elem) => elem.length > 0);

  return (
    <div
      className="bg-white rounded-md border border-slate-300 mt-3 divide-y divide-slate-300 overflow-hidden"
      id="itemResultDisplay"
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
        <p className="mt-3 text-lg font-medium">{itemJSON.price}</p>
      </div>
      {itemJSON.options.map((elem) => {
        return <ItemResultDisplayBoxOptionBox options={elem} />;
      })}
      <div className="p-7 text-left">
        <button className="w-fit block mx-auto p-3 rounded-lg shadow-md bg-rose-600 text-white">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default function AcceptURLsForItems() {
  const [itemUrl, setItemUrl] = useState("");
  const [itemInfo, setItemInfo] = useState(null);

  const subToken = useRef("");
  const subObj = useRef(null);
  const centrifugeObj = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    setItemInfo(null);
    handleClickAsync(e);
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
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

    const subChannel = subscribeToChannel(
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
      subObj.current.unsubscribe();
      centrifugeObj.current.disconnect();
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
              <label
                htmlFor="itemSearchInputBox"
                className="font-light relative block"
              >
                <span className="block px-4 py-3 border-2 border-transparent w-full top-0 left-0 absolute text-slate-700 rounded text-left">
                  {itemUrl ? "" : "Copy and paste the URL of an item here"}
                </span>
              </label>
              <input
                name="itemSearchInputBox"
                id="itemSearchInputBox"
                className="block px-4 py-3 border-2 border-slate-500 w-full bg-slate-200 font-light rounded text-black"
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
          {itemInfo ? (
            <ItemResultDisplayBox itemJSON={itemInfo} key={Math.random()} />
          ) : (
            <ItemResultWaitingBox />
          )}
        </div>
        <div className="md:w-5/12 border border-slate-300 rounded-md bg-white divide-y divide-slate-300 overflow-hidden">
          <div className="p-7 text-left">
            <p className="font-medium">Order Items</p>
            <div className="mt-7 gap-6 flex flex-col">
              <div className="flex">
                <img src={tshirt} className="w-1/6 h-auto" />
                <div className="grow ml-3 flex flex-col gap-1">
                  <p className="text-sm font-medium">T-Shirt with pants</p>
                  <p className="text-sm text-slate-600">Size: S</p>
                  <p className="text-sm ">$100.00</p>
                </div>
              </div>
              <div className="flex">
                <img src={tshirt} className="w-1/6 h-auto" />
                <div className="grow ml-3 flex flex-col gap-1">
                  <p className="text-sm font-medium">T-Shirt with pants</p>
                  <p className="text-sm text-slate-600">Size: S</p>
                  <p className="text-sm ">$100.00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-7 flex flex-col gap-3 rounded-md bg-sky-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Subtotal</p>
              <p className="text-sm">$200.00</p>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-sm text-slate-500">Additional Cost</p>
              <p className="text-sm">$20.00</p>
            </div>
            <div className="flex items-end justify-between mt-3">
              <p className="text-sm text-slate-500">Total</p>
              <p className="font-medium">$220.00</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 flex justify-center items-stretch font-semibold">
        <button className="p-3 rounded-lg shadow-md border border-cyan-600 bg-cyan-600 text-white">
          Move to Next
        </button>
      </div>
    </div>
  );
}
