import "./animations.css";

import {
  createCentrifugeClientObj,
  subscribeToChannelForAcceptingItem,
} from "@/utils/websocket";
import { getSubscriptionToken } from "@/utils/authentication";
import { getCSRFToken } from "@/utils/cookie";
import { useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { increment } from "@/redux/orderCreationStepsSlice";
import { ItemBasketDisplayBox } from "../components/ItemBasketDisplayBox";

import URLInputBox from "../components/URLInputBox";
import ItemResultDisplayBox from "../components/ItemResultDisplayBox";

import useOrderCreateRequestItem from "@/hooks/useOrderCreateRequestItem";

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

export default function AcceptURLsForItems() {
  const { item, displayItem, requestItem, isLoading } =
    useOrderCreateRequestItem();

  const subToken = useRef("");
  const subObj = useRef(null);
  const centrifugeObj = useRef(null);

  const currentElement = useRef();

  const dispatch = useDispatch();
  const items = useSelector((state) => state.shoppingBasket.value);
  const access_token = useSelector((state) => state.userSession.access_token);
  const username = useSelector((state) => state.userSession.username);

  const handleNextClick = () => {
    if (items.length < 1) return;
    dispatch(increment());
  };

  const useEffectAsync = async () => {
    const token = await getCSRFToken();
    localStorage.setItem("CSRFToken", token);
    console.log("CSRFToken Set!");

    const channel = `${username}#${username}`;
    const sub_token = await getSubscriptionToken(channel);
    subToken.current = sub_token;
    console.log("Subscription Token Set!");

    const centrifugeClient = createCentrifugeClientObj(access_token);
    console.log("Centrifuge Client Created!");
    centrifugeObj.current = centrifugeClient;

    const subChannel = subscribeToChannelForAcceptingItem(
      centrifugeClient,
      subToken.current,
      displayItem
    );

    console.log("Subscrption Obj Created!");
    subObj.current = subChannel;

    subObj.current.subscribe();
    centrifugeObj.current.connect();
  };

  useEffect(() => {
    useEffectAsync();
    currentElement.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    return () => {
      if (subObj.current != null && centrifugeObj.current != null) {
        subObj.current.unsubscribe();
        centrifugeObj.current.disconnect();
      }
    };
  }, []);

  return (
    <div
      className="text-center text-black lg:w-11/12 w-full mx-auto"
      ref={currentElement}
    >
      <h1 className="font-bold text-3xl">Provide URLs of Items</h1>
      <p className="text-lg font-semibold text-gray-500 mt-5">
        Provide links to items that you would like to purchase
      </p>
      <div className="w-full md:w-5/6 mt-20 md:flex items-start justify-between mx-auto gap-3 ">
        <div className="md:w-7/12">
          <URLInputBox />
          {!isLoading && item && Object.keys(item).length > 0 && (
            <ItemResultDisplayBox
              itemJSON={item}
              requestItemJSON={requestItem}
            />
          )}
          {isLoading && <ItemResultWaitingBox />}
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
