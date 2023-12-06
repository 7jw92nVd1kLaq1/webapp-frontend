import ChooseIntermediary from "./ChooseIntermediary";
import Deposit from "./Deposit";

export default function OrderStageChooser({ order, intermediaryChat }) {
  if (order.status == 0) {
    return (
      <ChooseIntermediary
        intermediaries={order.orderintermediarycandidate_set}
        intermediaryChat={intermediaryChat}
      />
    );
  } else if (order.status == 1) {
    if (true) {
      return <Deposit />;
    }
  } else {
    return <div></div>;
  }
}
