import add from "../assets/add.svg";
import shipping from "../assets/shipping.svg";
import shopping_basket from "../assets/basket.svg";
import shopping_cart from "../assets/shopping_cart.svg";
import store from "../assets/store.svg";
import start from "../assets/start.svg";
import remove from "../assets/remove.svg";
import ps5 from "../assets/ps5.jpeg";

import amazon from "../assets/amazon.png";
import ebay from "../assets/ebay.png";
import shopify from "../assets/shopify.png";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const sleep1 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const styles = {
  transitionProperty: "margin-left,margin-right,height",
  transitionDuration: "750ms",
};

const CorporationImage = (props) => {
  return (
    <div className="grow flex flex-col items-center gap-3">
      <button className="flex flex-col items-center justify-center border rounded-lg font-light p-6 bg-white hover:bg-yellow-200 grow">
        <img src={props.image} className="w-3/5 h-auto" />
      </button>
      <p className="text-sm font-light">{props.corporationName}</p>
    </div>
  );
};

const AddItemsModalAmazon = () => {
  const [requestedItemInfoJSON, setRequestedItemInfoJSON] = useState({});
  const handleClick = () => {
    const box = document.getElementById("modalBox");
    box.classList.add("hidden");
    box.classList.remove("flex");
  };

  const handleFocus = () => {
    const address = document.getElementById("amzAddressLabelInside");
    const inputBox = document.getElementById("amzAddress");
    address.style.top = `-${inputBox.offsetHeight / 3}px`;
    address.style.paddingTop = "0.5rem";
    address.style.paddingBottom = "0.5rem";
    address.style.fontSize = "0.75rem";
    address.style.color = "rgb(229 231 235)";
    inputBox.style.borderBottomColor = "rgb(229 231 235)";
  };

  const handleBlur = () => {
    const address = document.getElementById("amzAddressLabelInside");
    const inputBox = document.getElementById("amzAddress");
    inputBox.style.borderBottomColor = "rgb(107 114 128)";

    if (!inputBox.value) {
      address.style.color = "rgb(107 114 128)";
      address.style.paddingTop = "1rem";
      address.style.paddingBottom = "1rem";
      address.style.fontSize = "1rem";
      address.style.top = `0px`;
    }
  };

  const handleSubmit = () => {
    const box = document.getElementById("addItemsSubmitResult");
    box.parentElement.style.height = `${box.offsetHeight}px`;
    box.parentElement.classList.remove("mb-8");
    box.parentElement.classList.add("mb-8");
    document.getElementById("addItemsInstruction").style.display = "none";
  };

  useEffect(() => {
    const label = document.getElementById("amzAddressLabelInside");
    document.getElementById("amzAddress").style.outline = "none";
    label.style.top = "0px";
    label.style.left = "0px";
    label.style.paddingTop = "1rem";
    label.style.paddingBottom = "1rem";
    label.style.fontSize = "1rem";
  });

  return (
    <div className="bg-gray-800 rounded-lg w-1/2">
      <div className="p-8">
        <h1 className="font-light">Add Item</h1>
      </div>
      <div
        className="h-0 w-full overflow-hidden relative"
        style={{ transition: "all 0.4s" }}
      >
        <div className="absolute top-0 left-0 w-full" id="addItemsSubmitResult">
          <div className="bg-gray-700 flex items-stretch divide-x-2 divide-gray-800">
            <div className="flex flex-col items-stretch w-3/4">
              <div className="grow flex flex-col divide-y-2 divide-gray-800">
                <div
                  className="flex items-center justify-center gap-3"
                  id="item-description"
                >
                  <div className="w-2/5 flex flex-col justify-center items-center">
                    <img src={ps5} className="w-full h-auto shadow-lg" />
                  </div>
                  <div className="grow flex flex-col items-center justify-center">
                    <p className="text-center text-xl font-light">
                      Playstation 5
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <h6 className="font-light text-center mb-6">
                    Choose Options
                  </h6>
                  <div className="flex flex-wrap item-start gap-7 justify-center">
                    <div className="flex flex-col gap-2 items-center w-min">
                      <label
                        className="block text-sm font-extralight"
                        htmlFor="item-quantity"
                      >
                        Quantity
                      </label>
                      <select
                        id="item-quantity"
                        name="item-quantity"
                        className="block bg-gray-800 p-2 rounded-lg text-sm font-light"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 items-center ">
                      <label
                        htmlFor="colors"
                        className="block text-sm font-extralight"
                      >
                        Color
                      </label>
                      <select
                        id="colors"
                        name="colors"
                        className="block bg-gray-800 p-2 rounded-lg text-sm font-light"
                      >
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="White">White</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <label
                        htmlFor="PSPlus"
                        className="block text-sm font-extralight"
                      >
                        Playstation +
                      </label>
                      <select
                        id="PSPlus"
                        name="psplus"
                        className="block bg-gray-800 p-2 rounded-lg text-sm font-light"
                      >
                        <option value="1-month">1 Month</option>
                        <option value="3-month">3 Months</option>
                        <option value="6-month">6 Months</option>
                      </select>
                    </div>
                  </div>
                  <div
                    className="flex flex-col items-center justify-center mt-3 p-3 px-6"
                    id="options-instruction"
                  >
                    <ol className="list-disc text-sm font-light">
                      <li>
                        Please check the products with the options you select
                        are available
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 grow flex flex-col items-center justify-center gap-1">
              <p className="font-extralight">Cost</p>
              <p className="font-light text-2xl">$100.00</p>
              <p className="font-light text-xs text-center mt-1">
                (W/e Tax and Shipping)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 py-4">
        <p
          className="mb-2 text-center text-xs font-light"
          id="addItemsInstruction"
        >
          Place an URL to the box below and verify by clicking
          <span className="font-normal"> "Submit"</span>
        </p>
        <div className="mb-3 flex gap-4 items-stretch">
          <div className="w-full grow">
            <label
              id="amzAddressLabel"
              htmlFor="amzAddress"
              className="font-light relative block"
            >
              <span
                id="amzAddressLabelInside"
                className="block px-2 py-4 w-full top-0 left-0 absolute text-gray-500"
                style={{ transition: "all 0.4s" }}
              >
                Product Address
              </span>
            </label>
            <input
              name="amzAddress"
              id="amzAddress"
              className="block px-2 py-4 border-b-2 border-b-gray-500 w-full bg-gray-800 font-light"
              onClick={handleFocus}
              onBlur={handleBlur}
              style={{ transition: "all 0.4s" }}
            />
          </div>
          <button
            className="w-fit rounded bg-green-600 flex flex-col justify-center p-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="flex gap-2 mt-10 mb-2">
          <button onClick={handleClick} className="rounded p-2 bg-red-600">
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

const AddItemsModal = (props) => {
  return (
    <div
      className="hidden flex-col items-center justify-center fixed w-screen h-screen left-0 top-0 overflow-auto bg-black/50 z-20"
      id="modalBox"
    >
      {props.children}
    </div>
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

const ChooseRetailers = (props) => {
  return (
    <div className="p-3 stagePart shrink-0">
      <div
        id="2"
        className="p-7 py-10 bg-gray-800 rounded-lg w-full shadow-lg"
        style={styles}
      >
        <div className="w-11/12 mx-auto">
          <p className="text-xl font-light">Choose the Retailer</p>
          <p className="mt-12 text-center text-sm font-light">
            Pick the retailer to make an order from
          </p>
          <div className="py-1 px-3">
            <div className="mt-3 flex flex-col md:flex-row gap-3 p-3 items-stretch">
              <CorporationImage image={amazon} corporationName="Amazon" />
              <CorporationImage image={ebay} corporationName="eBay" />
              <CorporationImage image={shopify} corporationName="Shopify" />
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

const AddItems = (props) => {
  const handleClick = () => {
    const box = document.getElementById("addItems-items-list");
    const elem = box.firstElementChild.cloneNode(true);
    elem.style.height = "0px";
    box.insertBefore(elem, box.firstElementChild);
    elem.style.height = `${box.lastElementChild.offsetHeight}px`;

    document.getElementById("modalBox").classList.remove("hidden");
    document.getElementById("modalBox").classList.add("flex");
  };

  const handleDeleteClick = () => {
    const box = document.getElementById("addItems-items-list");
    const elem = box.firstElementChild;
    elem.remove();
  };

  return (
    <div className="p-3 stagePart shrink-0">
      <div
        id="3"
        className="p-7 py-10 bg-gray-800 rounded-lg w-full shadow-lg"
        style={styles}
      >
        <div className="w-11/12 mx-auto">
          <p className="text-xl font-light">Add Products</p>
          <div className="mt-8 flex items-start lg:flex-row flex-col">
            <div className="w-full">
              <div className="p-5 ">
                <div className="flex justify-end gap-2 items-start">
                  <button>
                    <img
                      src={add}
                      className="w-6 h-auto"
                      onClick={handleClick}
                    />
                  </button>
                  <button>
                    <img
                      src={remove}
                      className="w-6 h-auto"
                      onClick={handleDeleteClick}
                    />
                  </button>
                </div>
                <div
                  id="addItems-items-list"
                  className="mt-6 text-xs flex flex-col gap-2"
                >
                  <div
                    className="h-0 relative addItem-entry-container"
                    style={{ transition: "all 1s ease-out" }}
                  >
                    <div
                      className="absolute w-full top-0 left-0 rounded-lg p-3 flex items-center border border-gray-800 gap-6 bg-gray-800 shadow border border-gray-500"
                      style={{ transition: "all 1s ease-out" }}
                    >
                      <p className="w-4/6 text-sm font-light break-words">
                        asdvnonoasdnvonaosndvonaosdnvnasodnvoansdnvinsdoivnonsdvonosvona
                      </p>
                      <div className="flex justify-between grow">
                        <p>1</p>
                        <p>$100.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
        id="4"
        className="p-7 py-10 bg-gray-800 rounded-lg w-full shadow-lg"
        style={styles}
      >
        <div className="w-11/12 mx-auto">
          <p className="text-xl font-light">Shipping Information</p>
        </div>
        <div className="mt-12 flex justify-center gap-3">
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

  const handleNextClick = () => {
    const stage = document.getElementById("slidesBox");
    if (stage) {
      const width = document.getElementById("parentBox").offsetWidth;
      stage.style.marginLeft = `-${width * (currentStage + 1)}px`;
    }

    setCurrentStage((prev) => {
      if (prev === 3) return prev;
      else return prev + 1;
    });
  };

  const handlePrevClick = () => {
    const stage = document.getElementById("slidesBox");
    if (stage) {
      const width = document.getElementById("parentBox").offsetWidth;
      stage.style.marginLeft = `-${width * (currentStage - 1)}px`;
    }

    setCurrentStage((prev) => {
      if (prev === 0) return prev;
      else return prev - 1;
    });
  };

  useEffect(() => {
    const width = document.getElementById("parentBox").offsetWidth;
    document.getElementById("slidesBox").style.width = `${width * 3}px`;
    const currentElement = document.getElementsByClassName("stagePart");
    for (let i = 0; i < currentElement.length; i++) {
      currentElement[i].style.width = `${width}px`;
      console.log(currentElement[i].style.width);
    }

    const parentBox = document.getElementsByClassName(
      "addItem-entry-container"
    );
    const parentBoxFirstElement = parentBox[0].firstElementChild;
    parentBox[0].style.height = `${parentBoxFirstElement.offsetHeight}px`;
    parentBoxFirstElement.style.left = "0px";
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen lg:w-3/6 w-10/12 mx-auto overflow-hidden"
      id="parentBox"
    >
      <AddItemsModal>
        <AddItemsModalAmazon />
      </AddItemsModal>
      <div className="p-3">
        <p className="font-semibold text-lg">BitShop</p>
      </div>
      <div className="px-3">
        <div className="mt-10 lg:mt-20 p-7 bg-gray-800 rounded-lg shadow-lg w-full flex items-center justify-center gap-12">
          <div>
            <div className="rounded-full p-3 bg-green-600 shadow-xl">
              <img className="w-8 h-auto" src={start} />
            </div>
            <p className="mt-2 font-light text-sm text-center">Start</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="rounded-full p-3 bg-gray-700 shadow-xl">
              <img className="w-8 h-auto" src={store} />
            </div>
            <p className="font-light text-sm text-center">Retailer</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="rounded-full p-3 bg-gray-700 shadow-xl">
              <img className="w-8 h-auto" src={shopping_basket} />
            </div>
            <p className="font-light text-sm text-center">Add Items</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="rounded-full p-3 bg-gray-700 shadow-xl">
              <img className="w-8 h-auto" src={shipping} />
            </div>
            <p className="font-light text-sm text-center">Shipping</p>
          </div>
        </div>
      </div>
      <div id="slidesBox" className="mt-4 grow flex items-start" style={styles}>
        <Intro handleNextClick={handleNextClick} />
        <ChooseRetailers
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
        <AddItems
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
        <UserShippingInfo handlePrevClick={handlePrevClick} />
      </div>
    </div>
  );
}
