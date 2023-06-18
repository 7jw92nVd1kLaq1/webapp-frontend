export default function BuyStageIndicator(props) {
  const inactiveCircleClass =
    "relative p-3 rounded-full border border-gray-500";
  return (
    <div
      className="flex items-center gap-3 px-4"
      onClick={() => {
        props.setStage(props.stageNumber - 1);
      }}
    >
      <div
        className={
          props.active === false
            ? inactiveCircleClass
            : inactiveCircleClass +
              " bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-600"
        }
      >
        <p
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {props.stageNumber}
        </p>
      </div>
      {props.active && <p className="text-sm">{props.stageDescription}</p>}
    </div>
  );
}
