import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import Modal from "@/components/Modal";
import {
  formatDateStringMMDDYYYY,
  shortenProductName,
  stringifyOptions,
} from "@/utils/etc";
import edit from "@/assets/edit_black.svg";
import close from "@/assets/close.svg";

import { useIsModalOpen } from "@/hooks/useIsModalOpen";
import { useSimpleAPICall } from "@/hooks/useSimpleAPICall";

import { setOrder } from "@/redux/viewOrderAsCustomerSlice";
import {
  FailureCircle,
  WaitingCircle,
  CompleteCircle,
} from "@/utils/waitingCircle";
import { CountryDropdown } from "react-country-region-selector";

const ButtonsGroup = ({
  children,
  reference = null,
  classStyle = "",
  objectStyle = {},
}) => {
  /*
   * TODO: Move this component to the folder of src/components
   */
  return (
    <div ref={reference} className={classStyle} style={objectStyle}>
      {children}
    </div>
  );
};

const Button = ({
  children,
  onClickCallback = () => {},
  classStyle = "",
  objectStyle = {},
}) => {
  /*
   * TODO: Move this component to the folder of src/components
   */
  return (
    <button
      onClick={onClickCallback}
      className={classStyle}
      style={objectStyle}
    >
      {children}
    </button>
  );
};

const AdditionalRequest = ({ additionalReq = "" }) => {
  /*
   * TODO: Add a callback to send a request to backend to update the additional request
   * of an order
   */
  const elementRef = useRef(null);
  const buttonGroupElementRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [additionalRequest, setAdditionalRequest] = useState(additionalReq);

  const displayEditButton = useCallback(() => {
    buttonGroupElementRef.current.classList.remove("hidden");
  }, [buttonGroupElementRef.current]);
  const hideEditButton = useCallback(() => {
    buttonGroupElementRef.current.classList.add("hidden");
  }, [buttonGroupElementRef.current]);

  const handleEditClick = () => {
    setEditing((prev) => !prev);
  };
  const handleAdditionalRequestChange = (event) => {
    setAdditionalRequest(event.target.value);
  };

  useEffect(() => {
    const referenceCopy = elementRef.current;
    referenceCopy.addEventListener("mouseover", displayEditButton);
    referenceCopy.addEventListener("mouseout", hideEditButton);

    return () => {
      referenceCopy.removeEventListener("mouseover", displayEditButton);
      referenceCopy.removeEventListener("mouseout", hideEditButton);
    };
  }, []);

  return (
    <div className="mt-7 divide-y divide-slate-300">
      <div
        className="shadow-md rounded-2xl border border-slate-300 p-4"
        ref={elementRef}
      >
        <div className="relative">
          <p className="text-stone-600">Additional Request</p>
          <ButtonsGroup
            reference={buttonGroupElementRef}
            classStyle={
              "absolute top-[0%] my-auto text-center right-[0%] flex items-center gap-2 hidden"
            }
          >
            <Button onClickCallback={handleEditClick}>
              <img src={edit} className="w-6 h-6" />
            </Button>
          </ButtonsGroup>
        </div>
        {!editing && additionalRequest && (
          <div className="mt-3">{additionalRequest}</div>
        )}
        {!editing && !additionalRequest && (
          <div className="mt-3 text-stone-500">
            You haven't provided any additional request for an intermediary
          </div>
        )}
        {editing && (
          <textarea
            className="w-full border border-slate-500 rounded-lg p-2 mt-3"
            style={{ resize: "none" }}
            onChange={handleAdditionalRequestChange}
            value={additionalRequest}
          ></textarea>
        )}
      </div>
    </div>
  );
};

const AddressFormSubmitStatus = ({
  isLoading,
  responseStatusCode,
  responseData,
}) => {
  if (isLoading) {
    return (
      <div className="mt-16 hidden lg:flex flex-col items-center gap-8">
        <WaitingCircle numbers={100} unit={"px"} />
        <div className="gap-1 flex flex-col items-center font-semibold text-[20px]">
          <p>Address Change</p>
          <p>Requesting</p>
        </div>
      </div>
    );
  } else {
    if (responseStatusCode == 0) {
      return (
        <div className="mt-10 hidden lg:flex flex-col gap-1">
          <p className="text-[20px]">Change Your</p>
          <p className="text-[20px]">Shipping Address</p>
        </div>
      );
    } else if (responseStatusCode == 200) {
      return (
        <div className="mt-16 hidden lg:flex flex-col items-center gap-8">
          <CompleteCircle numbers={100} unit={"px"} />
          <p className="text-green-600 font-semibold text-[20px]">
            Address Changed
          </p>
        </div>
      );
    } else {
      return (
        <div className="mt-16 hidden lg:flex flex-col items-center gap-8">
          <FailureCircle numbers={100} unit={"px"} />
          <div className="gap-1 flex flex-col items-center font-semibold text-red-600 text-[20px]">
            <p>Address Change</p>
            <p>Failed</p>
          </div>
        </div>
      );
    }
  }
};

const AddressForm = ({ address, setOrderAddress, toggleModalCallback }) => {
  const [addressCopy, setAddressCopy] = useState(address);
  const [addressFormError, setAddressFormError] = useState(null);
  const {
    responseData,
    makeAPICall,
    isLoading,
    responseStatusCode,
    callCount,
    error,
  } = useSimpleAPICall();
  const access_token = useSelector((state) => state.userSession.access_token);
  const order = useSelector((state) => state.viewOrderAsCustomer.order);

  const checkIfRequiredFieldsMissing = () => {
    const addressKeys = Object.keys(addressCopy).sort();

    for (const key of addressKeys) {
      if (key != "address2" && !addressKeys[key].trim()) {
        throw new Error(
          `The field ${key} is required. Please provide the value for the key.`
        );
      }
    }
  };

  const checkIfAddressChanged = () => {
    const validAddressFieldNames = [
      "name",
      "address1",
      "address2",
      "city",
      "state",
      "zipcode",
      "country",
    ];
    const addressKeys = Object.keys(address).sort();
    const addressCopyKeys = Object.keys(addressCopy).sort();

    if (addressKeys.length !== addressCopyKeys.length) {
      throw new Error(
        "The length of the address and the addressCopy are not equal. Please" +
          " refresh the page and try again."
      );
    } else if (
      addressKeys.length !== validAddressFieldNames.length ||
      addressCopyKeys.length !== validAddressFieldNames.length
    ) {
      throw new Error(
        "The length of the address and the addressCopy are not equal to the" +
          " length of the required address field names. Please refresh the page."
      );
    }

    for (const key of validAddressFieldNames) {
      if (!(addressKeys.includes(key) && addressCopyKeys.includes(key))) {
        throw new Error(
          `The field ${key} is not found in the form of address. Please` +
            ` refresh the page and try again.`
        );
      }
    }

    const areEqual = addressKeys.every((key, index) => {
      const objValue1 = address[key];
      const objValue2 = addressCopy[addressCopyKeys[index]];
      return objValue1 === objValue2;
    });

    if (areEqual) return true;
    return false;
  };

  const submitAddress = async () => {
    /*
     * TODO:
     * 1. Specify an address to an endpoint of backend to update the address
     * 2. Turn the content of the address form into a JSON object
     */
    try {
      checkIfRequiredFieldsMissing();
      if (!checkIfAddressChanged()) {
        setAddressFormError("You haven't changed any field of the address.");
        return;
      }
    } catch (error) {
      setAddressFormError(error.message);
      return;
    }
    const url = "";
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
    await makeAPICall(url, fetchOptions);
  };

  const handleAddressChange = (event) => {
    const id = event.target.id;
    setAddressCopy((prev) => ({ ...prev, [id]: event.target.value }));
  };

  return (
    <div className="flex flex-col lg:flex-row p-10 text-[16px] w-[500px] lg:w-[800px] bg-white rounded-2xl h-[70%] overflow-hidden gap-3 relative">
      <button className="absolute top-[10px] right-[10px]">
        <img
          src={close}
          className="w-8 h-8 cursor-pointer"
          onClick={toggleModalCallback}
        />
      </button>
      <div className="lg:w-1/2">
        <h1 className="text-[24px] lg:text-[28px] font-semibold text-left lg:w-1/2">
          Address Change
        </h1>
        <AddressFormSubmitStatus
          isLoading={isLoading}
          responseStatusCode={responseStatusCode}
          responseData={responseData}
        />
      </div>
      <div className="overflow-auto grow">
        <label htmlFor="name" className="block text-gray-700 mt-4 lg:mt-0">
          Name
        </label>
        <input
          name="name"
          id="name"
          value={addressCopy.name}
          className="block px-4 py-4 border border-slate-500 w-full font-light rounded text-black mt-2"
          placeholder="Name"
          onChange={handleAddressChange}
        />
        <label htmlFor="address1" className="block text-gray-700 mt-4">
          Address
        </label>
        <input
          name="address1"
          id="address1"
          value={addressCopy.address1}
          className="block px-4 py-4 border border-slate-500 w-full font-light rounded text-black mt-2"
          placeholder="Address"
          onChange={handleAddressChange}
        />
        <label htmlFor="address2" className="block mt-4 text-gray-700">
          Address 2
        </label>
        <input
          name="address2"
          id="address2"
          value={addressCopy.address2}
          className="block px-4 py-4 border border-slate-500 w-full font-light rounded text-black mt-2"
          placeholder="(Optional)"
          onChange={handleAddressChange}
        />
        <label htmlFor="city" className="block mt-4 text-gray-700">
          City
        </label>
        <input
          name="city"
          id="city"
          value={addressCopy.city}
          className="block px-4 py-4 border border-slate-500 w-full font-light rounded text-black mt-2"
          placeholder="City"
          onChange={handleAddressChange}
        />
        <label htmlFor="state" className="block mt-4 text-gray-700">
          State
        </label>
        <input
          name="state"
          id="state"
          value={addressCopy.state}
          className="block px-4 py-4 border border-slate-500 w-full font-light rounded text-black mt-2"
          placeholder="State"
          onChange={handleAddressChange}
        />
        <label htmlFor="zipcode" className="block mt-4 text-gray-700">
          Zipcode
        </label>
        <input
          name="zipcode"
          id="zipcode"
          value={addressCopy.zipcode}
          className="block px-4 py-4 border border-slate-500 w-full font-light rounded text-black mt-2"
          placeholder="Zipcode"
          onChange={handleAddressChange}
        />
        <label htmlFor="country" className="block mt-4 text-gray-700">
          Country
        </label>
        <CountryDropdown
          name="country"
          id="country"
          value={addressCopy.country}
          classes={
            "block px-4 py-4 border border-slate-500 w-full font-light rounded text-black mt-2"
          }
          valueType="short"
          onChange={(val) =>
            setAddressCopy((prev) => ({ ...prev, country: val }))
          }
        />
      </div>
    </div>
  );
};

const AddressDisplay = ({ orderAddress }) => {
  return (
    <div>
      <p>{orderAddress.name}</p>
      <p>{orderAddress.address1}</p>
      <p>{orderAddress.city}</p>
      <p>{orderAddress.state}</p>
      <p>{orderAddress.zipcode}</p>
      <p>{orderAddress.country}</p>
    </div>
  );
};

const Address = ({ address }) => {
  const elementRef = useRef(null);
  const buttonGroupElementRef = useRef(null);
  const [orderAddress, setOrderAddress] = useState(address);
  const { isModalOpen, toggleModal } = useIsModalOpen();

  const handleEditClick = () => {
    toggleModal();
  };

  const displayEditButton = useCallback(() => {
    buttonGroupElementRef.current.classList.remove("hidden");
  }, [buttonGroupElementRef.current]);
  const hideEditButton = useCallback(() => {
    buttonGroupElementRef.current.classList.add("hidden");
  }, [buttonGroupElementRef.current]);

  useEffect(() => {
    const referenceCopy = elementRef.current;
    referenceCopy.addEventListener("mouseover", displayEditButton);
    referenceCopy.addEventListener("mouseout", hideEditButton);

    return () => {
      referenceCopy.removeEventListener("mouseover", displayEditButton);
      referenceCopy.removeEventListener("mouseout", hideEditButton);
    };
  }, []);

  return (
    <div className="mt-7 divide-y divide-slate-300">
      <Modal isModalOpen={isModalOpen}>
        <AddressForm
          address={orderAddress}
          setOrderAddress={setOrderAddress}
          toggleModalCallback={toggleModal}
        />
      </Modal>
      <div
        className="shadow-md rounded-2xl border border-slate-300 p-4"
        ref={elementRef}
      >
        <div className="relative">
          <p className="text-stone-600">Shipping Address</p>
          <ButtonsGroup
            reference={buttonGroupElementRef}
            classStyle={
              "absolute top-[0%] my-auto text-center right-[0%] flex items-center gap-2 hidden"
            }
          >
            <Button onClickCallback={handleEditClick}>
              <img src={edit} className="w-6 h-6" />
            </Button>
          </ButtonsGroup>
        </div>
        <div className="mt-3">
          <AddressDisplay orderAddress={orderAddress} />
        </div>
      </div>
    </div>
  );
};

export const OrderInfo = ({
  orderId,
  cryptocurrencyTicker,
  createdDate,
  additionalReq,
  shippingAddr,
}) => {
  const dateInString = useMemo(
    () => formatDateStringMMDDYYYY(new Date(createdDate)),
    [createdDate]
  );

  return (
    <div className="text-[16px] lg:w-1/2 xl:w-full gap-2 items-start mt-7 xl:mt-4">
      <p className="text-stone-600">ORDER INFO</p>
      <div className="mt-7">
        <div className="shadow-md rounded-2xl border border-slate-300 p-4">
          <div>
            <p className="text-stone-600">Order ID</p>
            <p className="mt-2">{orderId}</p>
          </div>
          <div className="mt-7">
            <p className="text-stone-600">Cryptocurrency</p>
            <p className="mt-2">Bitcoin ({cryptocurrencyTicker})</p>
          </div>
          <div className="mt-7">
            <p className="text-stone-600">Created Date</p>
            <p className="mt-2">{dateInString}</p>
          </div>
        </div>
      </div>
      <AdditionalRequest additionalReq={additionalReq} />
      <Address address={shippingAddr} />
    </div>
  );
};

const OrderItem = ({
  image_url,
  productName,
  optionName,
  price,
  currency,
  quantity,
}) => {
  return (
    <div className="p-4 py-8 flex xl:block justify-between items-center w-full">
      <div className="flex xl:flex-col xl:items-start gap-4 items-center">
        <img src={image_url} className="w-10 h-10 xl:w-1/2 xl:h-auto" />
        <div className="xl:mt-6">
          <p className="">{shortenProductName(productName)}</p>
          <p className="mt-1 text-stone-500 text-[14px]">{optionName}</p>
        </div>
      </div>
      <div className="flex xl:flex-row xl:mt-4 flex-col items-end gap-1">
        <p className="font-medium">{price}</p>
        <p className="font-medium">{currency}</p>
        <p className="text-[14px] text-stone-500">x {quantity}</p>
      </div>
    </div>
  );
};

export const OrderItemsInfo = ({ items }) => {
  return (
    <div className="text-[16px] mt-12 lg:mt-7 xl:mt-12 lg:w-1/2 xl:w-full gap-2 items-start ">
      <p className="text-stone-600">ORDER ITEMS</p>
      <div className="divide-y divide-slate-300 border-t border-b border-slate-300 mt-7">
        {items.map((item) => {
          return (
            <OrderItem
              image_url={item.image_url}
              productName={item.name}
              optionName={stringifyOptions(item.options)}
              price={item.price}
              currency={item.currency}
              quantity={item.quantity}
            />
          );
        })}
        <div className="p-5 flex flex-col items-end gap-4  w-full">
          <div className="flex justify-end xl:justify-between w-full">
            <p className="w-1/2 text-right text-stone-500">Subtotal</p>
            <p className="w-1/3 text-right">$100.00</p>
          </div>
          <div className="flex justify-end xl:justify-between w-full">
            <p className="w-1/2 text-right text-stone-500">Shipping, Tax</p>
            <p className="w-1/3 text-right">$100.00</p>
          </div>
          <div className="flex justify-end xl:justify-between w-full">
            <p className="w-1/2 text-right text-stone-500">Total</p>
            <p className="w-1/3 text-right">$200.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};
