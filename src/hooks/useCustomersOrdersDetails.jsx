import { useDispatch, useSelector } from "react-redux";

import {
  setDetail as reduxSetDetail,
  modifyAdditionalEntriesDetails,
} from "@/redux/ListCustomerOrdersSlice";

import { calculateTotalPriceUSD } from "@/utils/etc";
import { useMemo, useState } from "react";

const useCustomersOrdersDetails = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.customerRequests.entries);
  const entriesAdditionalDetails = useSelector(
    (state) => state.customerRequests.additionalEntriesDetails
  );
  const entryId = useSelector((state) => state.customerRequests.selectedEntry);

  const [isLoading, setIsLoading] = useState(false);

  const getDetail = () => {
    if (!entryId) return null;
    const selectedOrder = entries.find((entry) => entry.url_id === entryId);
    const selectedOrderDetails = {
      ...selectedOrder,
      ...entriesAdditionalDetails[entryId],
    };

    return selectedOrderDetails;
  };
  const setDetail = (orderId) => {
    setIsLoading(true);
    dispatch(reduxSetDetail(orderId));
    setIsLoading(false);
  };
  const setCostDetail = (
    orderId,
    items,
    additionalCost,
    cryptocurrency,
    cryptoRate
  ) => {
    let totalCostInFiat = calculateTotalPriceUSD(items, additionalCost);
    const totalCostInCrypto = (totalCostInFiat / cryptoRate).toFixed(8);
    cryptoRate = cryptoRate.toFixed(2);

    dispatch(
      modifyAdditionalEntriesDetails({
        orderId: orderId,
        payload: {
          total_price_in_crypto: totalCostInCrypto,
          total_price_in_fiat: totalCostInFiat.toFixed(2),
          cryptocurrency_rate: cryptoRate,
        },
      })
    );
  };

  const orderDetail = useMemo(() => getDetail(), [entryId]);
  return { orderDetail, setDetail, setCostDetail, isLoading };
};

export default useCustomersOrdersDetails;
