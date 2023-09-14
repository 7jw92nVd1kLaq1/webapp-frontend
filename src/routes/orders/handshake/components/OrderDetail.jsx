import close from "@/assets/close.svg";
import useCustomersOrdersDetails from "@/hooks/useCustomersOrdersDetails";

import CustomerInfo from "./CustomerInfo";
import OrderInfo from "./OrderInfo";
import OrderItems from "./OrderItems";

const OrderDetail = () => {
  const { orderDetail } = useCustomersOrdersDetails();

  const toggleOrderDetail = () => {
    const elem = document.getElementById("itemDetail");
    if (elem.classList.contains("w-0")) {
      elem.classList.remove("w-0");
      elem.classList.add("lg:w-1/3");
      elem.classList.add("md:w-1/2");
      elem.classList.add("w-full");
    } else {
      elem.classList.add("w-0");
      elem.classList.remove("lg:w-1/3");
      elem.classList.remove("md:w-1/2");
      elem.classList.remove("w-full");
    }
  };
  return (
    <div
      className="fixed top-0 bottom-0 right-0 h-full bg-white text-black w-0 shadow-lg overflow-y-auto"
      id="itemDetail"
    >
      <div className="p-4 px-8 invisible w-0">
        <p className="font-semibold text-lg">BitShop</p>
      </div>
      <div className="p-7">
        <div className="text-right flex justify-end">
          <img src={close} className="w-5 h-5" onClick={toggleOrderDetail} />
        </div>
        <h3 className="text-2xl font-semibold flex gap-2 text-black items-center">
          <p>Order Detail</p>
        </h3>
        {orderDetail && (
          <div>
            <CustomerInfo customer={orderDetail.customer.customer} />
            <OrderInfo entry={orderDetail} />
            <OrderItems entry={orderDetail} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
