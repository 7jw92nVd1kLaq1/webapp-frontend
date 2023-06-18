import { useState } from "react";

import BuyStageIndicator from "./components/BuyStageIndicator";
import ChooseProvider from "./components/stages/ChooseProvider";
import AcceptURLsForItems from "./components/stages/AcceptURLsForItems";

const renderStageIndicator = (data, currentStage, callback) => {
  const returnArray = [];
  for (let [key, value] of Object.entries(data)) {
    returnArray.push(
      <BuyStageIndicator
        stageNumber={parseInt(key) + 1}
        stageDescription={value}
        active={key == currentStage ? true : false}
        setStage={callback}
      />
    );
  }
  return returnArray;
};

export default function Buy() {
  const [stagesName, setStagesName] = useState([
    "Choose Provider",
    "Add Items",
    "Provide Details",
    "Make Payment",
    "Finalize",
  ]);
  const [stages, setStages] = useState([<ChooseProvider />]);
  const [currentStage, setCurrentStage] = useState(0);

  return (
    <div
      className="flex flex-col items-stretch min-h-screen w-full mx-auto overflow-hidden bg-slate-100"
      id="parentBox"
    >
      <div className="flex justify-center items-center w-full py-3 text-black font-semibold divide-x divide-gray-500 border-b border-gray-300 shadow-sm bg-white">
        {renderStageIndicator(stagesName, currentStage, setCurrentStage)}
      </div>
      <div className="grow w-full mx-auto pt-20">
        <AcceptURLsForItems />
      </div>
    </div>
  );
}
