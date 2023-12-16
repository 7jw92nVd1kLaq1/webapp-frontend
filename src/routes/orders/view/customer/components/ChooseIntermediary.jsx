import { useEffect, useRef } from "react";
import { useIsModalOpen } from "@/hooks/useIsModalOpen";
import { useSimpleAPICall } from "@/hooks/useSimpleAPICall";

import { backendURL } from "@/constants";
import Modal from "@/components/Modal";

import star from "@/assets/star.svg";
import chat from "@/assets/chat_white.svg";
import check from "@/assets/check_white.svg";
import refuse from "@/assets/refuse.svg";
import confetti from "@/assets/confetti.png";
import addIntermediary from "@/assets/add_intermediary.svg";
import btc from "@/assets/bitcoin.svg";

import {
  setOrder,
  setChatOpen,
  setChatRecipient,
} from "@/redux/viewOrderAsCustomerSlice";

import { getCSRFToken } from "@/utils/cookie";
import { calculateTotalPriceUSD, calculateDiscountPriceUSD } from "@/utils/etc";
import { FailureCircle, WaitingCircle } from "@/utils/waitingCircle";

import { useDispatch, useSelector } from "react-redux";

const IntermediaryEntryBoxUserInfo = ({ username, reference }) => {
  return (
    <div
      className="absolute shadow-md rounded-xl p-5 bg-stone-100 left-0 top-[99%] hidden"
      ref={reference}
    >
      <p className="text-[18px] font-medium">{username}</p>
      <div className="flex gap-1 items-center mt-1">
        <img src={star} className="block w-[20px] h-[20px]" />
        <div className="text-[16px] flex gap-1 items-end text-stone-600">
          <p>5.00</p>
          <p>/</p>
          <p>5.00</p>
          <p className="text-black font-medium">(168)</p>
        </div>
      </div>
      <p className="text-[16px] mt-1">Joined 2 months ago</p>
    </div>
  );
};

const IntermediaryEntryBoxNew = ({
  username,
  data,
  toggleModal,
  totalCost,
}) => {
  console.log(data);
  return (
    <div className="sm:w-96 bg-white rounded-xl shadow-md">
      <IntermediaryEntryBoxUserInformation
        username={username}
        rating={!data.average_rating ? 0 : data.average_rating}
        reviewCount={!data.review_count ? 0 : data.review_count}
      />
      <div className="p-6">
        <div className="flex items-stretch gap-3 mb-4">
          <button
            className="rounded-xl p-3 bg-sky-600 flex justify-center items-center gap-2 w-1/2 shadow-md"
            onClick={() => {
              toggleModal(username);
            }}
          >
            <img src={check} className="block w-7 h-7" />
            <p className="text-[16px] text-white">Accept</p>
          </button>
          <button className="rounded-xl p-3 bg-red-600 flex justify-center items-center gap-2 w-1/2 shadow-md">
            <img src={refuse} className="block w-7 h-7" />
            <p className="text-[16px] text-white">Reject</p>
          </button>
        </div>
        <p className="text-[14px] font-medium mb-2">Current Offer</p>
        <div className="flex flex-col gap-2 p-2">
          <IntermediaryEntryBoxCurrentOffer
            rate={data.offers[0].rate}
            totalCost={totalCost}
          />
        </div>
        {data.offers.length > 1 && (
          <div>
            <p className="text-[14px] font-medium mt-3 mb-2">
              Rejected Offer(s)
            </p>
            <div className="flex flex-col gap-2 p-2">
              {data.offers.slice(1).map((offer) => {
                return (
                  <IntermediaryEntryBoxRejectedOffer
                    rate={offer.rate}
                    totalCost={totalCost}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const IntermediaryEntryBoxUserInformation = ({
  username,
  rating,
  reviewCount,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="border-b border-stone-300 p-6 flex items-center justify-between">
      <div className="flex flex-col items-start gap-2">
        <p className="font-medium">{username}</p>
        <button
          className="p-2 flex items-center text-white text-[14px] gap-2 bg-green-600 rounded-lg shadow-md"
          onClick={() => {
            dispatch(setChatOpen(true));
            dispatch(setChatRecipient(username));
          }}
        >
          <img src={chat} className="block w-5 h-5" />
          <p>Chat</p>
        </button>
      </div>
      <div className="flex flex-col items-end text-[16px] gap-1">
        <div className="flex items-center gap-2">
          <img src={star} className="block w-6 h-6" />
          <p className="font-medium">{rating}</p>
          <p className="font-light">/</p>
          <p className="font-medium">5</p>
        </div>
        <p className="text-[14px]">({reviewCount})</p>
      </div>
    </div>
  );
};

const IntermediaryEntryBoxCurrentOffer = ({ rate, totalCost }) => {
  const rateInDollar = calculateDiscountPriceUSD(totalCost, rate);
  const finalCost = (totalCost - rateInDollar).toFixed(2);
  return (
    <div className="p-6 border border-stone-300 rounded-lg flex items-center justify-between">
      <img src={btc} className="block w-12 h-12" />
      <div className="text-right">
        <p className="font-medium">${finalCost}</p>
        <p className="font-medium text-[14px] text-green-600">
          -${rateInDollar}
        </p>
      </div>
    </div>
  );
};

const IntermediaryEntryBoxRejectedOffer = ({ rate, totalCost }) => {
  const rateInDollar = calculateDiscountPriceUSD(totalCost, rate);
  const finalCost = (totalCost - rateInDollar).toFixed(2);
  return (
    <div className="p-6 border border-stone-300 rounded-lg flex items-center justify-between">
      <img src={btc} className="block w-12 h-12 opacity-50" />
      <div className="text-right">
        <p className="font-medium text-gray-400">${finalCost}</p>
        <p className="font-medium text-[14px] text-green-600">
          -${rateInDollar}
        </p>
      </div>
    </div>
  );
};

const ChooseIntermediaryConfirmation = ({ username, toggleModal }) => {
  const dispatch = useDispatch();
  const csrfToken = useRef(null);
  const access_token = localStorage.getItem("access_token");
  const order = useSelector((state) => state.viewOrderAsCustomer.order);

  const {
    responseData,
    responseStatusCode,
    makeAPICall,
    isLoading,
    callCount,
  } = useSimpleAPICall();

  const submitData = async () => {
    if (!access_token) {
      console.log("No access_token");
      return;
    }
    if (!order) {
      console.log("No order");
      return;
    }
    if (!csrfToken.current) {
      console.log("No CSRFToken");
      return;
    }

    const url = `${backendURL}/api/modify-order/`;
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": csrfToken.current,
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: order.url_id,
        username: username,
      }),
    };

    await makeAPICall(url, fetchOptions);
  };

  const useEffectAsync = async () => {
    const csrf = await getCSRFToken();
    csrfToken.current = csrf[0];
  };

  useEffect(() => {
    useEffectAsync();
  }, []);

  useEffect(() => {
    if (callCount > 0 && responseStatusCode === 201) {
      toggleModal();
      dispatch(setOrder(responseData));
    }
  }, [callCount]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 text-[16px] w-96">
        <div className="w-full flex justify-center">
          <WaitingCircle numbers={100} unit={"px"} />
        </div>
      </div>
    );
  }

  if (responseStatusCode > 201) {
    return (
      <div className="bg-white rounded-2xl p-6 text-[16px] w-96">
        <div className="w-full flex justify-center">
          <FailureCircle numbers={100} unit={"px"} />
        </div>
        <div className="flex flex-col gap-1 items-center mt-5">
          <p className="">Something has gone wrong.</p>
          <p className="">Please try again.</p>
        </div>
        <div className="flex gap-3 items-center justify-center text-white mt-5">
          <button
            className="p-3 rounded-lg bg-green-500"
            onClick={() => submitData()}
          >
            Retry
          </button>
          <button
            className="p-3 rounded-lg bg-red-500"
            onClick={() => toggleModal()}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 text-[16px] w-96">
      <div>
        <p className="">
          Are you sure that you will go with the user{" "}
          <span className="font-bold">‘{username}’</span>?
        </p>
        <p className="mt-2">
          <span className="text-red-500 font-bold">Warning:</span> You will not
          be able to reverse your decision after this confirmation.
        </p>
        <div className="mt-5 text-white flex gap-3">
          <button
            className="p-3 rounded-lg bg-green-500"
            onClick={() => submitData()}
          >
            Submit
          </button>
          <button
            className="p-3 rounded-lg bg-red-500"
            onClick={() => toggleModal()}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

const ChooseIntermediary = ({ intermediaryChat }) => {
  /*
   * Assign to each entry the total price of the order.
   */

  const intermediaries = useSelector(
    (state) => state.viewOrderAsCustomer.order.orderintermediarycandidate_set
  );
  const orderItems = useSelector(
    (state) => state.viewOrderAsCustomer.order.order_items
  );
  const additionalCost = useSelector(
    (state) => state.viewOrderAsCustomer.order.payment.payment.additional_cost
  );
  const totalCost = calculateTotalPriceUSD(orderItems, additionalCost);

  const { isModalOpen, openModal, closeModal } = useIsModalOpen();
  const chosenUsername = useRef(null);

  const toggleModal = (username = null) => {
    if (isModalOpen) {
      closeModal();
    } else {
      chosenUsername.current = username;
      openModal();
    }
  };

  console.log(intermediaries);

  return (
    <div>
      <Modal isModalOpen={isModalOpen}>
        <ChooseIntermediaryConfirmation
          username={chosenUsername.current}
          toggleModal={toggleModal}
        />
      </Modal>
      <div>
        <div className="mt-16">
          <p className="text-[28px] font-semibold">Select Intermediary</p>
        </div>
        <div className="text-[20px] mt-10">
          <div className="sm:flex items-start flex-wrap gap-4 my-10">
            {intermediaries.length >= 1 &&
              intermediaries.map((intermediary) => {
                return (
                  <IntermediaryEntryBoxNew
                    data={intermediary}
                    username={intermediary.user.username}
                    toggleModal={toggleModal}
                    totalCost={totalCost}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseIntermediary;
