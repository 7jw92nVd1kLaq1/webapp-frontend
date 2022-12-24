import shipping from "../assets/shipping.svg";
import shopping_basket from "../assets/basket.svg";
import shopping_cart from "../assets/shopping_cart.svg";
import start from "../assets/start.svg";

import amazon from "../assets/amazon.png";
import ebay from "../assets/ebay.png";
import shopify from "../assets/shopify.png";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sleep1 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const styles = {
  transitionProperty: "margin-left,margin-right",
  transitionDuration: "750ms",
};

const CorporationImage = (props) => {
  return (
    <button className="flex flex-col items-center justify-center border rounded-lg font-light grow p-6 bg-white hover:bg-yellow-200">
      <img src={props.image} className="w-3/5 h-auto" />
    </button>
  );
};

const Intro = (props) => {
  const navigate = useNavigate();
  return (
    <div className="p-3 stagePart shrink-0">
      <div
        id="1"
        className="p-7 py-10 bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        style={styles}
      >
        <img
          className="mt-5 mb-10 block mx-auto w-32 h-auto"
          src={shopping_cart}
        />
        <p className="text-xl font-normal text-center">Buy Process Wizard</p>
        <p className="mt-5 text-center text-sm font-extralight px-6 leading-7">
          Welcome to an order placing page, where you can order any items from
          the retailer of your choice! Please click the
          <span className="font-semibold"> "Continue"</span> button below to
          continue with this process.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            className="rounded bg-rose-700 p-3"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className="rounded bg-sky-800 p-3"
            onClick={props.handleNextClick}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const AddItems = (props) => {
  return (
    <div className="p-3 stagePart shrink-0">
      <div
        id="2"
        className="p-7 py-10 bg-gray-800 rounded-lg w-full shadow-lg"
        style={styles}
      >
        <div className="w-5/6 mx-auto">
          <p className="text-xl font-light">Add Items</p>
          <div className="mt-6 p-3">
            <p className="text-sm">Choose the retailer</p>
            <div className="mt-3 flex gap-3">
              <CorporationImage image={amazon} />
              <CorporationImage image={ebay} />
              <CorporationImage image={shopify} />
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center gap-3">
          <button
            onClick={props.handlePrevClick}
            className="rounded bg-rose-700 p-3"
          >
            Back
          </button>
          <button
            onClick={props.handleNextClick}
            className="rounded bg-sky-800 p-3"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const UserShippingInfo = (props) => {
  return (
    <div className="p-3 stagePart shrink-0">
      <div
        id="3"
        className="p-7 py-10 bg-gray-800 rounded-lg w-full shadow-lg"
        style={styles}
      >
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={props.handlePrevClick}
            className="rounded bg-rose-700 p-3"
          >
            Back
          </button>
          <button className="rounded bg-sky-800 p-3">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default function Buy() {
  const [currentStage, setCurrentStage] = useState(0);

  const asyncHandleNextClick = async () => {
    const stage = document.getElementById("slidesBox");
    if (stage) {
      const width = document.getElementById("parentBox").offsetWidth;
      stage.style.marginLeft = `-${width * (currentStage + 1)}px`;
      await sleep1(850);
    }

    setCurrentStage((prev) => {
      if (prev === 2) return prev;
      else return prev + 1;
    });
  };

  const handleNextClick = () => asyncHandleNextClick();

  const asyncHandlePrevClick = async () => {
    const stage = document.getElementById("slidesBox");
    if (stage) {
      const width = document.getElementById("parentBox").offsetWidth;
      stage.style.marginLeft = `-${width * (currentStage - 1)}px`;
      await sleep1(850);
    }

    setCurrentStage((prev) => {
      if (prev === 0) return prev;
      else return prev - 1;
    });
  };

  const handlePrevClick = () => asyncHandlePrevClick();

  useEffect(() => {
    const width = document.getElementById("parentBox").offsetWidth;
    document.getElementById("slidesBox").width = width * 3;
    const currentElement = document.getElementsByClassName("stagePart");
    for (let i = 0; i < currentElement.length; i++) {
      currentElement[i].style.width = `${width}px`;
      console.log(currentElement[i].style.width);
    }
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen lg:w-3/6 w-10/12 mx-auto overflow-hidden"
      id="parentBox"
    >
      <div className="p-3">
        <p className="font-semibold text-lg">BitShop</p>
      </div>
      <div className="px-3">
        <div className="mt-20 p-7 bg-gray-800 rounded-lg shadow-lg w-full flex items-center justify-center gap-12">
          <div>
            <div className="rounded-full p-3 bg-green-600">
              <img className="w-8 h-auto" src={start} />
            </div>
            <p className="mt-2 font-light text-sm text-center">Start</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="rounded-full p-3 bg-gray-700">
              <img className="w-8 h-auto" src={shopping_basket} />
            </div>
            <p className="font-light text-sm text-center">Add Items</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="rounded-full p-3 bg-gray-700">
              <img className="w-8 h-auto" src={shipping} />
            </div>
            <p className="font-light text-sm text-center">Shipping Info</p>
          </div>
        </div>
      </div>
      <div id="slidesBox" className="mt-4 grow flex items-start" style={styles}>
        <Intro handleNextClick={handleNextClick} />
        <AddItems
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
        <UserShippingInfo handlePrevClick={handlePrevClick} />
      </div>
    </div>
  );
}
