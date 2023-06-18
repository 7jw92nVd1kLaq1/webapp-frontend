import { useState } from "react";

export default function Buy() {
  const [stages, setStages] = useState();
  const [currentStage, setCurrentStage] = useState(0);

  return (
    <div
      className="flex flex-col items-stretch min-h-screen w-full mx-auto overflow-hidden bg-slate-100"
      id="parentBox"
    >
      <div className="flex justify-center items-center w-full py-3 text-black font-semibold divide-x divide-gray-500 border-b border-gray-300 shadow-sm bg-white">
        <div className="flex items-center gap-3 px-4">
          <div className="relative p-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white border border-cyan-600">
            <p
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              1
            </p>
          </div>
          <p className="text-sm">Choose Provider</p>
        </div>
        <div className="flex items-center gap-3 px-4">
          <div className="relative p-3 rounded-full border border-black">
            <p
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              2
            </p>
          </div>
          <p className="text-sm">Add Items</p>
        </div>
        <div className="flex items-center gap-3 px-4">
          <div className="relative p-3 rounded-full border border-black">
            <p
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              3
            </p>
          </div>
          <p className="text-sm">Check Address</p>
        </div>
      </div>
      <div className="grow w-full"></div>
    </div>
  );
}
