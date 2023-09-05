import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BuyStageIndicator from "./components/BuyStageIndicator";
import AcceptURLsForItems from "./stages/AcceptURLsForItems";
import ProvideAddCostAddReq from "./stages/ProvideAddCostAddReq";
import ProvideShippingAddress from "./stages/ProvideShippingAddress";
import ReviewOrder from "./stages/ReviewOrder";
import ProcessOrder from "./stages/ProcessOrder";

import { resetState } from "@/redux/shoppingBasketSlice";
import { setTotal, reset } from "@/redux/orderCreationStepsSlice";

const renderStageIndicator = (data, currentStage) => {
  const returnArray = [];
  for (let [key, value] of Object.entries(data)) {
    returnArray.push(
      <BuyStageIndicator
        stageNumber={parseInt(key) + 1}
        stageDescription={value}
        active={key == currentStage ? true : false}
      />
    );
  }
  return returnArray;
};

export default function Buy() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.orderCreationSteps.step);
  const [stagesName, setStagesName] = useState([
    "Add Items",
    "Provide Details",
    "Make Payment",
    "Finalize",
    "Processing Order",
  ]);
  const [stages, setStages] = useState([
    <AcceptURLsForItems />,
    <ProvideAddCostAddReq />,
    <ProvideShippingAddress />,
    <ReviewOrder />,
    <ProcessOrder />,
  ]);

  useEffect(() => {
    dispatch(setTotal(stagesName.length));

    return () => {
      dispatch(resetState());
      dispatch(reset());
    };
  }, []);

  return (
    <div
      className="flex flex-col items-stretch min-h-screen w-full mx-auto overflow-hidden bg-slate-100"
      id="parentBox"
    >
      <div className="flex justify-center items-center w-full py-3 text-black font-semibold divide-x divide-gray-500 border-b border-gray-300 shadow-sm bg-white">
        {renderStageIndicator(stagesName, currentStep)}
      </div>
      <div className="grow w-full mx-auto pt-20">{stages[currentStep]}</div>
    </div>
  );
}
