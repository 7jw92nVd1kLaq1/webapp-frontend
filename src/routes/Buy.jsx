import shipping from "../assets/shipping.svg";
import shopping_basket from "../assets/basket.svg";
import shopping_cart from "../assets/shopping_cart.svg";
import start from "../assets/start.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Intro = (props) => {
  const navigate = useNavigate();
  return (
    <div className="p-7 py-10 bg-gray-800 rounded-lg lg:w-3/6 w-10/12 shadow-lg">
      <img
        className="mt-5 mb-10 block mx-auto w-32 h-auto"
        src={shopping_cart}
      />
      <p className="text-xl font-normal text-center">Buy Process Wizard</p>
      <p className="mt-5 text-center text-sm font-extralight px-6 leading-7">
        Welcome to an order placing page, where you can order any items from the
        retailer of your choice! Please click the
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
  );
};

const AddItems = (props) => {
  return (
    <div className="p-7 py-10 bg-gray-800 rounded-lg lg:w-3/6 w-10/12 shadow-lg">
      <div className="mt-8 flex justify-center gap-3">
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
  );
};

const UserShippingInfo = (props) => {
  return (
    <div className="p-7 py-10 bg-gray-800 rounded-lg lg:w-3/6 w-10/12 shadow-lg">
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
  );
};

export default function Buy() {
  const [currentStage, setCurrentStage] = useState(0);

  const handleNextClick = () => {
    setCurrentStage((prev) => {
      if (prev === 2) return prev;
      else return prev + 1;
    });
  };

  const handlePrevClick = () => {
    setCurrentStage((prev) => {
      if (prev === 0) return prev;
      else return prev - 1;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-3">
        <p className="font-semibold text-lg">BitShop</p>
      </div>
      <div className="grow flex flex-col justify-center items-center gap-4">
        <div className="p-7 bg-gray-800 rounded-lg lg:w-3/6 w-10/12 shadow-lg flex items-center justify-center gap-12">
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
        {currentStage === 0 && <Intro handleNextClick={handleNextClick} />}
        {currentStage === 1 && (
          <AddItems
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
          />
        )}
        {currentStage === 2 && (
          <UserShippingInfo handlePrevClick={handlePrevClick} />
        )}
      </div>
    </div>
  );
}
