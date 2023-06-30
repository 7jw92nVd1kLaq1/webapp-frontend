import "./stages/animations.css";

import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "@/redux/shoppingBasketSlice";

export const ItemBasketDisplayBox = () => {
  const dispatch = useDispatch();
  const currentBasket = useSelector((state) => state).shoppingBasket.value;

  const calculateSubTotal = (arr) => {
    let total = parseFloat("0");
    let price;
    if (arr.length === 0) return total.toFixed(2);

    for (const item of arr) {
      const regex = /(\d+\.\d+)/g;
      if ("price_in_dollar" in item) {
        price = parseFloat(regex.exec(item.price_in_dollar));
      } else {
        price = parseFloat(regex.exec(item.price));
      }
      total += price;
    }
    return total.toFixed(2);
  };

  const displayOptions = (arr, url) => {
    let options = "";
    for (let i = 0; i < arr.length; i++) {
      options += `${arr[i][0]}: `;
      for (let k = 1; k < arr[i].length; k++) {
        if (arr[i][k].url === "" && arr[i][k].available) {
          options += `${arr[i][k].name.replace("Click to select ", "")}, `;
          break;
        }
        if (arr[i][k].url.includes(url) && arr[i][k].available) {
          console.log(arr[i][k].url);
          options += `${arr[i][k].name}, `;
          break;
        }
      }
    }
    return options.trim();
  };

  return (
    <div className="border border-slate-300 rounded-md bg-white divide-y divide-slate-300 overflow-hidden">
      <div className="p-7 text-left">
        <p className="font-medium">Order Items</p>
        <div className="mt-7 gap-6 flex flex-col">
          {currentBasket.length === 0 && (
            <div className="flex justify-center">
              <p className="text-slate-500">You have no item in cart</p>
            </div>
          )}
          {currentBasket.map((elem) => {
            return (
              <div>
                <div className="flex items-center">
                  <img src={elem.imageurl} className="w-1/6 h-auto" />
                  <div className="grow ml-3 flex flex-col gap-1">
                    <p className="text-sm font-medium">{elem.productName}</p>
                    <p className="text-sm text-slate-500">
                      {displayOptions(elem.options, elem.url)}
                    </p>
                    {"price_in_dollar" in elem && (
                      <p className="text-sm">
                        ${parseFloat(elem.price_in_dollar).toFixed(2)}{" "}
                        <span className="text-slate-400">({elem.price})</span>
                      </p>
                    )}
                    {!("price_in_dollar" in elem) && (
                      <p className="text-sm ">{elem.price}</p>
                    )}
                  </div>
                </div>
                <div className="flex mt-2">
                  <div className="w-1/6"></div>
                  <div className="grow ml-3 flex gap-3">
                    <button
                      className="bg-rose-500 text-white block rounded-md p-2"
                      id={elem.url}
                      onClick={(e) => {
                        dispatch(removeItem(e.currentTarget.id));
                      }}
                    >
                      <img src={trash} className="w-7 h-auto" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-7 flex flex-col gap-3 rounded-md bg-sky-100">
        <div className="flex items-end justify-between">
          <p className="text-sm text-slate-500">Subtotal</p>
          <p className="font-medium">${calculateSubTotal(currentBasket)}</p>
        </div>
      </div>
    </div>
  );
};
