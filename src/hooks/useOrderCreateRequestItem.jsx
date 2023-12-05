import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { backendURL } from "@/constants";

const useOrderCreateRequestItem = () => {
  const access_token = useSelector((state) => state.userSession.access_token);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);

  const changeIsLoading = (value) => {
    setIsLoading(value);
  };
  const unsetItem = () => {
    setItem(null);
  };
  const displayItem = (itemJSON) => {
    setItem(itemJSON);
    changeIsLoading(false);
  };
  const requestItem = async (url) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "X-CSRFToken": localStorage.getItem("CSRFToken"),
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        url: url,
      }),
      credentials: "include",
    };

    const resp = await fetch(`${backendURL}/api/parseItemURL/`, fetchOptions);
    if (resp.ok) changeIsLoading(true);
  };

  return {
    item,
    displayItem,
    unsetItem,
    requestItem,
    isLoading,
  };
};

export default useOrderCreateRequestItem;
