import { useDispatch, useSelector } from "react-redux";
import { ItemBasketDisplayBox } from "../components/ItemBasketDisplayBox";
import {
  modifyShippingAddress,
  modifyShippingAddressCountry,
} from "@/redux/shoppingBasketSlice";
import { increment, decrement } from "@/redux/orderCreationStepsSlice";
import { CountryDropdown } from "react-country-region-selector";
import { useEffect, useRef, useState } from "react";

const AddShippingAddressFormBox = (props) => {
  const dispatch = useDispatch();
  const shippingAddress = useSelector(
    (state) => state.shoppingBasket.shippingAddress
  );

  const handleChange = ({ target }) => {
    dispatch(modifyShippingAddress({ [target.id]: target.value }));
  };

  const inputClasses = "block px-4 py-3 w-full font-light rounded text-black";
  const errorClasses = " bg-red-100 border-2 border-red-500";
  const validClasses = " bg-slate-100 border border-slate-500";

  return (
    <div className="bg-white rounded-md border border-slate-300 p-7">
      <p className="text-lg font-medium">Delivery Address</p>
      <div className="mt-10 flex flex-col gap-5">
        <input
          name="recipient_name"
          id="recipient_name"
          className={
            inputClasses +
            ("recipient_name" in props.error ? errorClasses : validClasses)
          }
          placeholder="Full Name"
          value={shippingAddress.recipient_name}
          onChange={handleChange}
        />
        <input
          name="street_address1"
          id="street_address1"
          className={
            inputClasses +
            ("street_address1" in props.error ? errorClasses : validClasses)
          }
          placeholder="Street Address"
          value={shippingAddress.street_address1}
          onChange={handleChange}
        />
        <input
          name="street_address2"
          id="street_address2"
          className={inputClasses + validClasses}
          placeholder="(Optional) Apt/Suite/Floor"
          value={shippingAddress.street_address2}
          onChange={handleChange}
        />
        <div className="flex gap-3">
          <input
            name="city"
            id="city"
            className={
              inputClasses +
              ("city" in props.error ? errorClasses : validClasses)
            }
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleChange}
          />
          <input
            name="state"
            id="state"
            className={
              inputClasses +
              ("state" in props.error ? errorClasses : validClasses)
            }
            placeholder="State (Province)"
            value={shippingAddress.state}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3">
          <input
            name="zipcode"
            id="zipcode"
            className={
              inputClasses +
              ("zipcode" in props.error ? errorClasses : validClasses)
            }
            placeholder="Zip Code"
            value={shippingAddress.zipcode}
            onChange={handleChange}
          />
          <CountryDropdown
            name="country"
            id="country"
            classes={
              inputClasses +
              ("country" in props.error ? errorClasses : validClasses)
            }
            value={shippingAddress.country}
            valueType="short"
            onChange={(val) => {
              dispatch(modifyShippingAddressCountry(val));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function ProvideShippingAddress() {
  const currentElement = useRef();
  const dispatch = useDispatch();
  const addr = useSelector((state) => state.shoppingBasket.shippingAddress);
  const [error, setError] = useState({});

  const handlePrevClick = () => {
    dispatch(decrement());
  };
  const handleNextClick = () => {
    const newError = {};
    for (const key in addr) {
      if (key === "street_address2") continue;
      if (!addr[key]) newError[key] = null;
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    } else dispatch(increment());
  };

  useEffect(() => {
    currentElement.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, []);

  return (
    <div
      className="text-center text-black lg:w-11/12 w-full mx-auto"
      ref={currentElement}
    >
      <h1 className="font-bold text-3xl">Provide Shipping Address</h1>
      <p className="text-lg font-semibold text-gray-500 mt-5">
        Provide a shipping address to which items will be delivered
      </p>
      <div className="w-full md:w-5/6 mt-20 md:flex items-start justify-between mx-auto gap-3 ">
        <div className="md:w-7/12 text-left flex flex-col gap-3">
          <AddShippingAddressFormBox error={error} />
        </div>
        <div className="md:w-5/12">
          <ItemBasketDisplayBox />
        </div>
      </div>
      <div className="mt-14 flex justify-center items-stretch font-semibold mb-14 gap-5">
        <button
          className="p-3 rounded-lg shadow-md border border-cyan-600 bg-cyan-600 text-white"
          onClick={handlePrevClick}
        >
          Prev
        </button>
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
