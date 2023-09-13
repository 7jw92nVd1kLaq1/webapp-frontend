import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPageNumber } from "@/redux/ListCustomerOrdersSlice";

const useCustomersOrdersPageNumber = () => {
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.customerRequests.number);
  const pageRange = useSelector((state) => state.customerRequests.pageRange);
  const [error, setError] = useState("");

  const goToFirstPageNumber = () => {
    if (pageRange.length > 0) dispatch(setPageNumber(pageRange[0]));
  };

  const goToLastPageNumber = () => {
    if (pageRange.length > 0)
      dispatch(setPageNumber(pageRange[pageRange.length - 1]));
  };

  const incrementPageNumber = () => {
    const newPageNumber = pageNumber + 1;
    if (pageRange.includes(newPageNumber))
      dispatch(setPageNumber(newPageNumber));
  };

  const decrementPageNumber = () => {
    const newPageNumber = pageNumber - 1;
    if (pageRange.includes(newPageNumber))
      dispatch(setPageNumber(newPageNumber));
  };

  const goToPageNumber = (newPageNumber) => {
    if (pageRange.includes(newPageNumber))
      dispatch(setPageNumber(newPageNumber));
  };

  return {
    pageNumber,
    incrementPageNumber,
    decrementPageNumber,
    goToPageNumber,
    goToFirstPageNumber,
    goToLastPageNumber,
  };
};

export default useCustomersOrdersPageNumber;
