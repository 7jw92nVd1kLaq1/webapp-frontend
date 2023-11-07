import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSimpleAPICall } from "@/hooks/useSimpleAPICall";

import ListOrderItemEntry from "./ListOrderItemEntry";

const ListAllUserOrdersPaginationBox = ({
  currentPage,
  currentItems,
  callbacks,
}) => {
  return (
    <div className="mt-16 text-white flex items-center justify-center gap-3">
      {currentPage > 1 && (
        <button
          className="p-2 px-4 bg-sky-600 rounded-md"
          onClick={() => {
            callbacks.setCurrentPage((elem) => elem - 1);
          }}
        >
          Prev
        </button>
      )}
      <button className="p-2 px-4 bg-sky-600 rounded-md">{currentPage}</button>
      {currentItems.hasOwnProperty("next") && currentItems.next != null && (
        <button
          className="p-2 px-4 bg-sky-600 rounded-md"
          onClick={() => {
            callbacks.setCurrentPage((elem) => elem + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default function ListAllUserOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  let access_token = useSelector((state) => state.userSession.access_token);

  const { responseData, makeAPICall, isLoading } = useSimpleAPICall();
  const useEffectAsync = async () => {
    if (!access_token) access_token = localStorage.getItem("access_token");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    const url = `http://127.0.0.1:8000/api/list-order/?for=all&page=${currentPage}`;
    await makeAPICall(url, fetchOptions);
  };

  useEffect(() => {
    useEffectAsync();
  }, [currentPage]);

  return (
    <div className="p-16">
      <p className="font-semibold text-xl">All Orders List</p>
      <div className="text-xs font-medium flex items-center bg-slate-300 rounded-md mt-12 p-4 px-6">
        <p className="w-4/12">Item</p>
        <p className="w-3/12">Partner</p>
        <p className="w-2/12">Creation Date</p>
        <p className="w-2/12">Status</p>
        <p className="w-1/12">Options</p>
      </div>
      {!isLoading && responseData && (
        <div>
          <div className="divide-y divide-slate-300 overflow-hidden rounded-b-md">
            {responseData.hasOwnProperty("results") &&
              responseData.results.length > 0 &&
              responseData.results.map((elem) => {
                return <ListOrderItemEntry order={elem} />;
              })}
          </div>
          <ListAllUserOrdersPaginationBox
            currentPage={currentPage}
            currentItems={responseData}
            callbacks={{ setCurrentPage: setCurrentPage }}
          />
        </div>
      )}
    </div>
  );
}
