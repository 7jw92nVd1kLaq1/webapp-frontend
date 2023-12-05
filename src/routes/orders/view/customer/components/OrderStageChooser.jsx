import ChooseIntermediary from "./ChooseIntermediary";
import Deposit from "./Deposit";

export default function OrderStageChooser({ order, intermediaryChat }) {
  if (order.status == 1) {
    if (true) {
      return <Deposit />;
    }
    return (
      <ChooseIntermediary
        intermediaries={order.orderintermediarycandidate_set}
        intermediaryChat={intermediaryChat}
      />
    );
  } else {
    return <div></div>;
  }
}
