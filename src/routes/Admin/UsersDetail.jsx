import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import edit from "../../assets/edit.svg";

export default function UsersDetail() {
  let params = useParams();
  const [userDetail, setUserDetail] = useState({});

  const load_user = async () => {
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      credentials: "include",
    };
    const response = await fetch(
      `http://127.0.0.1:8000/api/admin-user-management/${params.userId}/`,
      fetchOptions
    );

    const data = await response.json();
    console.log(data);
    setUserDetail(data);
  };

  useEffect(() => {
    load_user();
  }, []);

  console.log(typeof userDetail.orders_as_customer);
  return (
    <div className="px-10 p-8 text-white w-full">
      <div className="flex gap-4 items-center">
        <h2 className="font-light text-xl">User Detail of</h2>
        <h2 className="bg-gray-800 p-2 rounded font-medium">{params.userId}</h2>
      </div>
      <div className="mt-24 flex flex-col lg:flex-row items-start gap-3">
        <div className="gap-3 flex flex-col items-start w-full lg:w-1/2">
          <div className="flex flex-col justify-between items-start w-full bg-gray-800 rounded p-5 gap-3">
            <div className="p-2 mb-1 flex justify-between items-start w-full ">
              <p className="font-medium">Account Information</p>
              <img src={edit} className="w-6 h-auto block" />
            </div>
            <div id="user-detail-username" className="flex w-full">
              <p className="font-light p-2 text-sm w-1/3">Username</p>
              <p className="p-2 rounded text-sm">{userDetail.username}</p>
            </div>
            <div id="user-detail-nickname" className="flex w-full">
              <p className="font-light p-2 text-sm w-1/3">Nickname</p>
              <p className="p-2 rounded text-sm">{userDetail.nickname}</p>
            </div>
            <div id="user-detail-email" className="flex w-full">
              <p className="font-light p-2 text-sm w-1/3">Email</p>
              <p className="p-2 rounded text-sm">{userDetail.email}</p>
            </div>
            <div id="user-detail-password" className="flex w-full">
              <p className="font-light p-2 text-sm w-1/3">Password</p>
              <p className="p-2 rounded text-sm bg-gray-700">**********</p>
            </div>
            <div
              id="user-detail-second_password"
              className="flex w-full items-center"
            >
              <p className="font-light p-2 text-sm w-1/3">Second Password</p>
              <p className="p-2 rounded text-sm bg-gray-700">**********</p>
            </div>
            <div id="user-detail-registered" className="flex w-full">
              <p className="font-light p-2 text-sm w-1/3">Registered Date</p>
              <p className="p-2 rounded text-sm">
                {new Date(Date.parse(userDetail.date_joined)).toDateString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between items-start w-full bg-gray-800 rounded p-5 gap-3">
            <div className="p-2 mb-1 flex justify-between items-start w-full ">
              <p className="font-medium">User Permission</p>
              <img src={edit} className="w-6 h-auto block" />
            </div>
            <div id="user-detail-roles" className="flex w-full">
              <p className="font-light p-2 text-sm w-1/3">Roles</p>
              <p className="p-2 rounded text-sm bg-gray-700">User</p>
            </div>
          </div>
        </div>
        <div className="gap-3 flex flex-col items-start w-full lg:w-1/2">
          <div className="flex flex-col justify-between items-start w-full bg-gray-800 rounded p-5 gap-3">
            <p className="p-2 font-medium mb-1">Order List</p>
            {typeof userDetail.orders_as_customer === "object" &&
              userDetail.orders_as_customer.length == 0 && (
                <div
                  id="user-detail-username"
                  className="p-2 text-sm flex w-full"
                >
                  <p>There is no order placed by this user</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
