import ChooseIntermediary from "./ChooseIntermediary";

export default function OrderStageChooser({ order, intermediaryChat }) {
  if (order.status == 1) {
    return (
      <ChooseIntermediary
        intermediaries={order.orderintermediarycandidate_set}
        totalPrice={123}
        intermediaryChat={intermediaryChat}
      />
    );
  } else {
    return <div></div>;
  }
}
