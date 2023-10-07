import "./animations.css";
import checkmark from "@/assets/checkmark.svg";
import failure from "@/assets/failure.svg";

export const WaitingCircle = ({ numbers, unit }) => {
  const insideCircleWidth = parseInt(numbers * 0.85);
  return (
    <div
      style={{
        width: `${numbers}${unit}`,
        height: `${numbers}${unit}`,
        borderRadius: "50%",
        background: "conic-gradient(transparent 30%, rgb(125 211 252) 50%)",
        animationName: "spinning",
        animationDuration: "1s",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
      }}
      className="relative"
    >
      <div
        className="absolute bg-slate-100"
        style={{
          width: `${insideCircleWidth}${unit}`,
          height: `${insideCircleWidth}${unit}`,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </div>
  );
};

export const CompleteCircle = ({ numbers, unit }) => {
  const insideCircleWidth = parseInt(numbers * 0.85);
  const checkMarkWidth = parseInt(numbers * 0.65);
  return (
    <div
      style={{
        width: `${numbers}${unit}`,
        height: `${numbers}${unit}`,
        borderRadius: "50%",
        backgroundColor: "rgba(66,160,70,255)",
      }}
      className="relative"
    >
      <div
        className="absolute bg-slate-100"
        style={{
          width: `${insideCircleWidth}${unit}`,
          height: `${insideCircleWidth}${unit}`,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          className="absolute"
          src={checkmark}
          style={{
            width: `${checkMarkWidth}${unit}`,
            height: `${checkMarkWidth}${unit}`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
};

export const FailureCircle = ({ numbers, unit }) => {
  const insideCircleWidth = parseInt(numbers * 0.85);
  const failureMarkWidth = parseInt(numbers * 0.65);

  return (
    <div
      style={{
        width: `${numbers}${unit}`,
        height: `${numbers}${unit}`,
        borderRadius: "50%",
        backgroundColor: "rgba(244,67,54,255)",
      }}
      className="relative"
    >
      <div
        className="absolute bg-slate-100"
        style={{
          width: `${insideCircleWidth}${unit}`,
          height: `${insideCircleWidth}${unit}`,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          className="absolute"
          src={failure}
          style={{
            width: `${failureMarkWidth}${unit}`,
            height: `${failureMarkWidth}${unit}`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
};
