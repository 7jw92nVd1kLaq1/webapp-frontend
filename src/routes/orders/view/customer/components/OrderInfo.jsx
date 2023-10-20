import { useEffect, useRef, useMemo, useState, useCallback } from "react";

import {
  formatDateStringMMDDYYYY,
  shortenProductName,
  stringifyOptions,
} from "@/utils/etc";
import edit from "@/assets/edit_black.svg";
import { useSimpleAPICall } from "@/hooks/useSimpleAPICall";

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

const AddressForm = ({ address, setOrderAddress }) => {
  const [addressCopy, setAddressCopy] = useState(address);
  const {
    responseData,
    makeAPICall,
    isLoading,
    responseStatusCode,
    callCount,
  } = useSimpleAPICall();
  const access_token = useSelector((state) => state.userSession.access_token);
  const order = useSelector((state) => state.viewOrderAsCustomer.order);

  const submitAddress = async () => {
    const addressKeys = Object.keys(address).sort();
    const addressCopyKeys = Object.keys(addressCopy).sort();
    const url = "";
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
  };
};

const Address = ({ address }) => {
  const elementRef = useRef(null);
  const buttonGroupElementRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [orderAddress, setOrderAddress] = useState(address);

  const handleEditClick = () => {
    setEditing((prev) => !prev);
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
          <p>{orderAddress.name}</p>
          <p>{orderAddress.address1}</p>
          <p>{orderAddress.city}</p>
          <p>{orderAddress.state}</p>
          <p>{orderAddress.zipcode}</p>
          <p>{orderAddress.country}</p>
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
