import { useState } from "react";

const useOrderCreateRequestURL = () => {
  const [url, setUrl] = useState("");
  const changeUrl = ({ target }) => {
    setUrl(target.value);
  };
  return { url, changeUrl };
};

export default useOrderCreateRequestURL;
