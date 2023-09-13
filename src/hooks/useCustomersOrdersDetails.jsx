import { useDispatch, useSelector } from "react-redux";

import {
  setDetail as reduxSetDetail,
  modifyAdditionalEntriesDetails,
} from "@/redux/ListCustomerOrdersSlice";

import { calculateTotalPriceUSD } from "@/utils/etc";

const useCustomersOrdersDetails = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.customerRequests.entries);
  const entriesAdditionalDetails = useSelector(
    (state) => state.customerRequests.additionalEntriesDetails
  );
  const entryId = useSelector((state) => state.customerRequests.selectedEntry);

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
    dispatch(reduxSetDetail(orderId));
  };
  const setCostDetail = (
    orderId,
    items,
    additionalCost,
    cryptocurrency,
    cryptoRate
  ) => {
    let totalCostInFiat = calculateTotalPriceUSD(items, additionalCost).toFixed(
      2
    );
    const totalCostInCrypto = (totalCostInFiat / cryptoRate).toFixed(8);
    cryptoRate = cryptoRate.toFixed(2);

    dispatch(
      modifyAdditionalEntriesDetails({
        orderId: orderId,
        payload: {
          total_price_in_crypto: totalCostInCrypto,
          total_price_in_fiat: totalCostInFiat,
          cryptocurrency_rate: cryptoRate,
        },
      })
    );
  };

  const orderDetail = getDetail();
  return { orderDetail, setDetail, setCostDetail };
};

export default useCustomersOrdersDetails;
