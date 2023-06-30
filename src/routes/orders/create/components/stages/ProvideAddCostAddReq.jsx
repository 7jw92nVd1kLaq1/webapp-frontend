import { useDispatch, useSelector } from "react-redux";
import { ItemBasketDisplayBox } from "../ItemBasketDisplayBox";
import {
  modifyAdditionalCost,
  modifyAdditionalRequest,
} from "@/redux/shoppingBasketSlice";
import { increment, decrement } from "@/redux/orderCreationStepsSlice";

const AddCostFormBox = () => {
  const dispatch = useDispatch();
  const additionalCost = useSelector(
    (state) => state.shoppingBasket.additionalCost
  );

  const handleChange = ({ target }) => {
    dispatch(modifyAdditionalCost(parseFloat(target.value)));
  };

  return (
    <div className="bg-white rounded-md border border-slate-300 p-7">
      <p className="text-lg font-medium">Additional Cost</p>
      <p className="mt-3 text-slate-500 text-sm leading-relaxed">
        Calculate, combine and insert cost such as shipping cost, taxes, etc.
      </p>
      <div className="mt-7">
        <label
          htmlFor="additionalCostBox"
          className="relative font-light block"
        >
          <span className="block px-4 py-3 border border-transparent w-full top-0 left-0 absolute text-slate-400 rounded">
            {additionalCost === 0 ||
              (isNaN(additionalCost) && "Type in the extra cost here")}
          </span>
        </label>
        <input
          name="additionalCostBox"
          id="additionalCostBox"
          className="block px-4 py-3 border border-slate-500 w-full bg-slate-200 font-light rounded text-black"
          type="number"
          inputMode="decimal"
          onChange={handleChange}
          value={additionalCost}
        />
      </div>
    </div>
  );
};

const AddReqFormBox = () => {
  const dispatch = useDispatch();
  const additionalRequest = useSelector(
    (state) => state.shoppingBasket.additionalRequest
  );

  const handleChange = ({ target }) => {
    dispatch(modifyAdditionalRequest(target.value));
  };

  return (
    <div className="bg-white rounded-md border border-slate-300 p-7">
      <p className="text-lg font-medium">Additional Request</p>
      <p className="mt-3 text-slate-500 text-sm leading-relaxed">
        Type in your personal request to a potential intermediary.
      </p>
      <div className="mt-7">
        <textarea
          name="additionalRequestBox"
          id="additionalRequestBox"
          placeholder="Type in your personal request"
          className="block px-4 py-3 border border-slate-500 w-full bg-slate-200 font-light rounded text-black"
          style={{ resize: "none" }}
          rows="4"
          cols="50"
          onChange={handleChange}
          value={additionalRequest}
        />
      </div>
    </div>
  );
};

export default function ProvideAddCostAddReq() {
  const dispatch = useDispatch();
  const handlePrevClick = () => {
    dispatch(decrement());
  };
  const handleNextClick = () => {
    dispatch(increment());
  };
  return (
    <div className="text-center text-black lg:w-11/12 w-full mx-auto">
      <h1 className="font-bold text-3xl">Provide Extra Information</h1>
      <p className="text-lg font-semibold text-gray-500 mt-5">
        Provide your personal request and extra cost of an order, including
        shipping, taxes, etc.
      </p>
      <div className="w-full md:w-5/6 mt-20 md:flex items-start justify-between mx-auto gap-3 ">
        <div className="md:w-7/12 text-left flex flex-col gap-3">
          <AddCostFormBox />
          <AddReqFormBox />
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
