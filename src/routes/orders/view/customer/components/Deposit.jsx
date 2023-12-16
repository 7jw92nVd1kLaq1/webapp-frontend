import { useEffect, useRef } from "react";

import {
  createCentrifugeClientObj,
  subscribeToChannelForAcceptingPaymentInfo,
} from "@/utils/websocket";
import { calculateTotalPriceUSD } from "@/utils/etc";
import { getSubscriptionToken } from "@/utils/authentication";
import { getCSRFToken } from "@/utils/cookie";
import useOrderViewCustomerPaymentInfo from "@/hooks/useOrderViewCustomerPaymentInfo";
import { setOrder } from "@/redux/viewOrderAsCustomerSlice";

import btc from "@/assets/bitcoin.svg";
import xmr from "@/assets/xmr.png";
import pay from "@/assets/pay.svg";

import expand from "@/assets/expand.svg";
import shrink from "@/assets/shrink.svg";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const PaymentDueInfo = ({ paymentHistoryRef }) => {
  const order = useSelector((state) => state.viewOrderAsCustomer.order);
  const expandRef = useRef(null);
  const shrinkRef = useRef(null);

  const openPaymentHistory = () => {
    expandRef.current.classList.toggle("hidden");
    shrinkRef.current.classList.toggle("hidden");
    paymentHistoryRef.current.classList.toggle("hidden");
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6 pb-3 text-[16px]">
      <div className="shadow-md w-full rounded-xl flex overflow-hidden relative">
        <p
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="absolute text-[14px] font-medium"
        >
          12%
        </p>
        <div className="py-3 w-full bg-gradient-to-r from-cyan-500 to-sky-500"></div>
      </div>
      <div className="flex justify-between items-center mt-8">
        <img src={btc} alt="btc" className="w-16 h-16" />
        <div className="text-right">
          <p className="text-[16px] text-gray-400">Payment Due</p>
          <p className="mt-2 text-[24px]">
            {order.paymentInfo.payment_method.due}{" "}
            <span className="text-[16px]">
              {order.paymentInfo.payment_method.cryptoCode}
            </span>
          </p>
          <p className="text-[14px] text-gray-500">
            {order.paymentInfo.payment_method.rate} {order.paymentInfo.currency}{" "}
            / {order.paymentInfo.payment_method.cryptoCode}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <img
          src={shrink}
          alt="shrink"
          className="w-10 h-auto hidden"
          onClick={openPaymentHistory}
          ref={shrinkRef}
        />
        <img
          src={expand}
          alt="expand"
          className="w-10 h-auto"
          onClick={openPaymentHistory}
          ref={expandRef}
        />
      </div>
    </div>
  );
};

const PaymentHistoryEntryDetail = ({ reference }) => {
  return (
    <div className="text-[14px] hidden" ref={reference}>
      <div>
        <p className="text-gray-400">Payment ID</p>
        <p className="mt-1">idisthisasdfoansodfnoansdf</p>
      </div>
      <div className="mt-4">
        <p className="text-gray-400">Destination Address</p>
        <p className="mt-1">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
      </div>
      <div className="mt-4">
        <p className="text-gray-400">Status</p>
        <p className="mt-1 text-green-500 font-medium">Settled</p>
      </div>
    </div>
  );
};

const PaymentHistoryEntry = () => {
  const openDetailButtonRef = useRef(null);
  const openDetailDownButtonRef = useRef(null);
  const openDetailUpButtonRef = useRef(null);
  const paymentDetailRef = useRef(null);
  const ref = useRef(null);

  const displayDetail = () => {
    openDetailDownButtonRef.current.classList.toggle("hidden");
    openDetailUpButtonRef.current.classList.toggle("hidden");
    paymentDetailRef.current.classList.toggle("hidden");
  };
  const displayDetailButton = () => {
    if (paymentDetailRef.current.classList.contains("hidden")) {
      ref.current.classList.toggle("pb-5");
      openDetailButtonRef.current.classList.toggle("hidden");
    }
  };

  useEffect(() => {
    const refCopy = ref.current;
    refCopy.addEventListener("mouseover", displayDetailButton);
    refCopy.addEventListener("mouseout", displayDetailButton);

    return () => {
      refCopy.removeEventListener("mouseover", displayDetailButton);
      refCopy.removeEventListener("mouseout", displayDetailButton);
    };
  }, []);

  return (
    <div className="p-6 border-t border-stone-300" ref={ref}>
      <div className="flex justify-between items-center">
        <p className="">10:12</p>
        <div className="text-right">
          <p className="text-[20px] text-green-500">+ 0.12342345</p>
          <p className="text-[14px]">bc1qxy...2kgdyg</p>
        </div>
      </div>
      <div
        className="flex hidden flex-col items-center mt-2"
        ref={openDetailButtonRef}
      >
        <img
          src={shrink}
          alt="shrink"
          className="w-8 h-auto hidden"
          onClick={displayDetail}
          ref={openDetailUpButtonRef}
        />
        <img
          src={expand}
          alt="expand"
          className="w-8 h-auto"
          onClick={displayDetail}
          ref={openDetailDownButtonRef}
        />
      </div>
      <PaymentHistoryEntryDetail reference={paymentDetailRef} />
    </div>
  );
};

const PaymentHistory = () => {
  const paymentInfo = useSelector(
    (state) => state.viewOrderAsCustomer.order.paymentInfo
  );
  return (
    <div className="bg-white shadow-md rounded-lg text-[16px]">
      <div className="p-6">
        <p className="text-gray-400">Payment History</p>
      </div>
      {paymentInfo.payment_method.payments.map((payment) => (
        <PaymentHistoryEntry />
      ))}
      <div className="p-6 border-t border-stone-300 flex justify-center items-center">
        There is no payment history
      </div>
    </div>
  );
};

const InvoiceInfo = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-[16px]">
      <div className="">
        <div className="flex justify-center items-center flex-col text-[16px]">
          <p className="text-slate-500 text-[14px]">Time Left for Deposit</p>
          <p className="text-[28px] w-fit font-medium">10:00:00</p>
        </div>
      </div>
    </div>
  );
};

const BillingInfo = () => {
  const order = useSelector((state) => state.viewOrderAsCustomer.order);
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-[16px]">
      <div className="">
        <p className="text-gray-400">Billing Information</p>
        <div className="flex justify-between items-center mt-10">
          <p className="text-slate-500">Subtotal</p>
          <p className="text-[20px]">
            ${calculateTotalPriceUSD(order.order_items, 0)}
          </p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="text-slate-500">Additional Cost</p>
          <p className="text-[20px]">
            ${order.payment.payment.additional_cost}
          </p>
        </div>
        <div className="my-6 border-t border-stone-300"></div>
        <div className="flex justify-between items-center mt-5">
          <p className="text-slate-500">Total</p>
          <p className="text-[24px] font-medium">
            $
            {calculateTotalPriceUSD(
              order.order_items,
              order.payment.payment.additional_cost
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

const Deposit = () => {
  const dispatch = useDispatch();
  const { paymentInfo, isLoading, changePaymentInfo, loadPaymentInfo } =
    useOrderViewCustomerPaymentInfo();
  const { orderId } = useParams();

  const paymentHistoryRef = useRef(null);
  const subToken = useRef(null);
  const subObj = useRef(null);
  const centrifugeObj = useRef(null);

  const username = useSelector((state) => state.userSession.username);
  const order = useSelector((state) => state.viewOrderAsCustomer.order);
  const access_token = localStorage.getItem("access_token");

  const useEffectAsync = async () => {
    const csrfToken = await getCSRFToken();
    localStorage.setItem("CSRFToken", csrfToken);

    const channel = `${orderId}#${username}`;
    const freshSubToken = await getSubscriptionToken(channel);
    subToken.current = freshSubToken;

    const centrifugeClient = createCentrifugeClientObj(access_token);
    centrifugeObj.current = centrifugeClient;

    const subChannel = subscribeToChannelForAcceptingPaymentInfo(
      centrifugeClient,
      subToken.current,
      changePaymentInfo,
      orderId
    );
    subObj.current = subChannel;

    subObj.current.subscribe();
    centrifugeObj.current.connect();

    loadPaymentInfo(orderId);
  };

  useEffect(() => {
    useEffectAsync();
    return () => {
      subObj.current.unsubscribe();
      centrifugeObj.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (Object.keys(paymentInfo).length === 0) return;
    dispatch(setOrder({ ...order, paymentInfo: paymentInfo }));
  }, [paymentInfo]);

  if (order.hasOwnProperty("paymentInfo"))
    return (
      <div>
        <div>
          <div className="mt-16">
            <p className="text-[28px] font-medium">Make Payment</p>
          </div>
          <div className="my-10">
            <div className="flex items-start flex-wrap gap-8 justify-end flex-row-reverse mb-3">
              <div className="w-full sm:w-96 h-0"></div>
              <button className="flex gap-3 items-center rounded-lg bg-black hover:bg-stone-600 text-white text-[16px] justify-center p-3 shadow-lg w-full sm:w-96">
                <img src={pay} alt="pay" className="w-8 h-8" />
                <p>Click Here to Pay</p>
              </button>
            </div>
            <div className="flex items-start flex-wrap gap-8 justify-start">
              <div className="w-full flex flex-col items-stretch sm:w-96 gap-3">
                <PaymentDueInfo paymentHistoryRef={paymentHistoryRef} />
                <div className="hidden" ref={paymentHistoryRef}>
                  <PaymentHistory />
                </div>
              </div>
              <div className="w-full flex flex-col items-stretch sm:w-96 gap-3">
                <InvoiceInfo />
                <BillingInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

export default Deposit;
