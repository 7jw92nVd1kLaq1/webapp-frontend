import { useEffect, useRef } from "react";
import { useIsModalOpen } from "@/hooks/useIsModalOpen";
import { useSimpleAPICall } from "@/hooks/useSimpleAPICall";

import { backendURL } from "@/constants";
import Modal from "@/components/Modal";

import star from "@/assets/star.svg";
import confetti from "@/assets/confetti.png";
import addIntermediary from "@/assets/add_intermediary.svg";

import { setOrder } from "@/redux/viewOrderAsCustomerSlice";

import { getCSRFToken } from "@/utils/cookie";
import { FailureCircle, WaitingCircle } from "@/utils/waitingCircle";

import { useDispatch, useSelector } from "react-redux";

const IntermediaryEntryBoxUserInfo = ({ username, reference }) => {
  return (
    <div
      className="absolute shadow-md rounded-xl p-5 bg-white left-0 top-[99%] hidden"
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

const IntermediaryEntryBox = ({
  username,
  rate,
  chatToggleCallback,
  modalToggleCallback,
}) => {
  /*
   * Calculate the total price of the order in both dollar and Cryptocurrency by applying
   * the rate offered by a candidate
   */
  const usernameElement = useRef(null);
  const userInfo = useRef();

  const displayUserInfo = () => {
    userInfo.current.classList.remove("hidden");
  };
  const hideUserInfo = () => {
    userInfo.current.classList.add("hidden");
  };

  useEffect(() => {
    const usernameElementCopy = usernameElement.current;
    usernameElementCopy.addEventListener("mouseover", displayUserInfo);
    usernameElementCopy.addEventListener("mouseout", hideUserInfo);

    return () => {
      usernameElementCopy.removeEventListener("mouseover", displayUserInfo);
      usernameElementCopy.removeEventListener("mouseout", hideUserInfo);
    };
  }, []);

  return (
    <div className="p-10 rounded-2xl bg-stone-100 w-96 border border-stone-300">
      <div className="text-[24px]">
        <div className="relative w-full" ref={usernameElement}>
          <p className="font-semibold">{username}</p>
          <IntermediaryEntryBoxUserInfo
            username={username}
            reference={userInfo}
          />
        </div>
        <p className="font-medium">Offered you</p>
        <p className="font-semibold">{rate}% off!</p>
      </div>
      <div className="mt-14 text-[24px]">
        <p className="font-medium">You Pay</p>
        <div className="font-semibold">
          <p>0.20000000</p>
          <p>BTC</p>
        </div>
      </div>
      <div className="w-full mt-14 flex gap-3 text-[16px]">
        <button
          className="block bg-green-600 text-white py-5 px-auto grow rounded-lg"
          onClick={chatToggleCallback}
        >
          <p className="text-center font-medium">Message</p>
        </button>
        <button
          className="block bg-sky-600 text-white py-5 px-auto grow rounded-lg"
          onClick={() => modalToggleCallback(username)}
        >
          <p className="text-center font-medium">Select</p>
        </button>
      </div>
    </div>
  );
};

const ChooseIntermediaryConfirmation = ({ username, toggleModal }) => {
  const dispatch = useDispatch();
  const csrfToken = useRef(null);
  const access_token = useSelector((state) => state.userSession.access_token);
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

const ChooseIntermediary = ({ intermediaries, intermediaryChat }) => {
  /*
   * Assign to each entry the total price of the order.
   */
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

  const toggleChat = () => {
    const elem = intermediaryChat.current;
    if (elem.classList.contains("w-0")) {
      elem.classList.remove("w-0");
      elem.classList.add("lg:w-2/5");
      elem.classList.add("md:w-1/2");
      elem.classList.add("w-full");
    } else {
      elem.classList.add("w-0");
      elem.classList.remove("lg:w-2/5");
      elem.classList.remove("md:w-1/2");
      elem.classList.remove("w-full");
    }
  };

  return (
    <div>
      <Modal isModalOpen={isModalOpen}>
        <ChooseIntermediaryConfirmation
          username={chosenUsername.current}
          toggleModal={toggleModal}
        />
      </Modal>
      <div className="divide-y divide-slate-300">
        <div className="flex flex-col items-center">
          <div className="mt-28 relative w-48">
            <img
              src={confetti}
              className="w-48 h-48 absolute"
              style={{
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
              }}
            />
            <div
              style={{
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
              }}
              className="w-32 h-32 rounded-full border-4 border-black absolute bg-white mx-auto"
            ></div>
            <div className="w-32 h-32 rounded-full border-4 border-black relative mx-auto">
              <img
                src={addIntermediary}
                className="w-16 h-16 absolute"
                style={{
                  transform: "translate(-50%, -50%)",
                  top: "50%",
                  left: "50%",
                }}
              />
            </div>
          </div>
          <p className="mt-16 text-[24px] font-semibold">Assign Intermediary</p>
          <p className="mt-2 mb-20 text-[16px] text-center">
            It's time to choose an intermediary for your order!
          </p>
        </div>
        <div className="text-[20px] py-10">
          <div className="flex items-start flex-wrap gap-4 my-10">
            {intermediaries &&
              intermediaries.length >= 1 &&
              intermediaries.map((intermediary) => {
                return (
                  <IntermediaryEntryBox
                    username={intermediary.user.username}
                    rate={30}
                    chatToggleCallback={toggleChat}
                    modalToggleCallback={toggleModal}
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
