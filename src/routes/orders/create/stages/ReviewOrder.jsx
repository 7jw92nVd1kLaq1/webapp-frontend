import { useDispatch, useSelector } from "react-redux";
import { ItemBasketDisplayBox } from "../components/ItemBasketDisplayBox";

import { increment, decrement } from "@/redux/orderCreationStepsSlice";

const ShippingAddressBox = () => {
  const shippingAddress = useSelector(
    (state) => state.shoppingBasket.shippingAddress
  );

  return (
    <div className="bg-white rounded-md border border-slate-300 p-7">
      <p className="text-normal font-medium">Delivery Address</p>
      <div className="mt-7 flex flex-col gap-1 text-slate-500">
        <p className="text-sm">{shippingAddress.recipient_name}</p>
        <p className="text-sm">{shippingAddress.street_address1}</p>
        {shippingAddress.street_address2 && (
          <p className="text-sm">{shippingAddress.street_address2}</p>
        )}
        <p className="text-sm">
          {shippingAddress.city}, {shippingAddress.state}
        </p>
        <p className="text-sm">{shippingAddress.zipcode}</p>
        <p className="text-sm">{shippingAddress.country}</p>
      </div>
    </div>
  );
};

const AdditionaRequestBox = () => {
  const personalRequest = useSelector(
    (state) => state.shoppingBasket.additionalRequest
  );

  return (
    <div className="bg-white rounded-md border border-slate-300 p-7">
      <p className="text-normal font-medium">Your Personal Request</p>
      <div className="mt-7 flex flex-col gap-1">
        {!personalRequest && (
          <p className="text-sm text-slate-500">
            You have not provided any additional instruction
          </p>
        )}
        <p className="text-sm">{personalRequest}</p>
      </div>
    </div>
  );
};

export default function ReviewOrder() {
  const dispatch = useDispatch();
  return (
    <div className="text-center text-black lg:w-11/12 w-full mx-auto">
      <h1 className="font-bold text-3xl">Review Order</h1>
      <p className="text-lg font-semibold text-gray-500 mt-5">
        Check the information you are going to submit for the final time before
        submission
      </p>
      <div className="w-full md:w-5/6 mt-20 md:flex items-start justify-between mx-auto gap-3 ">
        <div className="md:w-7/12 text-left flex flex-col gap-3">
          <ShippingAddressBox />
          <AdditionaRequestBox />
        </div>
        <div className="md:w-5/12">
          <ItemBasketDisplayBox />
        </div>
      </div>
      <div className="mt-14 flex justify-center items-stretch font-semibold mb-14 gap-5">
        <button
          className="p-3 rounded-lg shadow-md border border-cyan-600 bg-cyan-600 text-white"
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Prev
        </button>
        <button
          className="p-3 rounded-lg shadow-md border border-cyan-600 bg-cyan-600 text-white"
          onClick={() => {
            dispatch(increment());
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
