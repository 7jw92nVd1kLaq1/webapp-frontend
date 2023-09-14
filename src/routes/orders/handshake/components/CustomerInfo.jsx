import user from "@/assets/user_black.svg";
import star from "@/assets/star.svg";

import { useMemo } from "react";
import { formatDateStringMMDDYYYY } from "@/utils/etc";

const CustomerInfo = ({ customer }) => {
  const username = customer.username;
  const average_rating = customer.average_rating
    ? customer.average_rating.toFixed(2)
    : "0.0";
  const userRegistrationDate = new Date(customer.date_joined);
  const registrationDateString = useMemo(
    () => formatDateStringMMDDYYYY(userRegistrationDate),
    [userRegistrationDate]
  );
  return (
    <div className="mt-8">
      <h4 className="font-semibold text-lg">Customer Info</h4>
      <div className="mt-5 p-6 flex w-full rounded-lg bg-slate-100 gap-5 items-center text-sm font-light">
        <img src={user} className="w-20 h-20" />
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{username}</p>
          <div className="flex gap-2 items-center">
            <img src={star} className="w-5 h-5" />
            <p className="">{average_rating} (100)</p>
          </div>
          <p>
            User Since{" "}
            <span className="font-semibold">{registrationDateString}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
