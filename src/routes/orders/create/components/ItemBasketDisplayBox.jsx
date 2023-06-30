import "./stages/animations.css";
import trash from "@/assets/delete.svg";
import add from "@/assets/add_amount.svg";
import remove from "@/assets/remove_amount.svg";

import { useSelector, useDispatch } from "react-redux";
import { removeItem, modifyItemAmount } from "@/redux/shoppingBasketSlice";
import { resetStep } from "@/redux/orderCreationStepsSlice";

export const ItemBasketDisplayBox = () => {
  const dispatch = useDispatch();
  const currentBasket = useSelector((state) => state.shoppingBasket.value);
  const additionalCost = useSelector(
    (state) => state.shoppingBasket.additionalCost
  );

  const calculateSubTotal = (arr) => {
    let total = parseFloat("0");
    let price;
    if (arr.length === 0) return total;

    for (const item of arr) {
      const regex = /(\d+\.\d+)/g;
      if ("price_in_dollar" in item) {
        price = parseFloat(regex.exec(item.price_in_dollar));
      } else {
        price = parseFloat(regex.exec(item.price));
      }
      total += price * item.amount;
    }
    return total;
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
                        $
                        {(
                          parseFloat(elem.price_in_dollar) *
                          parseInt(elem.amount)
                        ).toFixed(2)}{" "}
                        <span className="text-slate-400">
                          ({elem.currency}
                          {(parseFloat(elem.price) * elem.amount).toFixed(2)})
                        </span>
                      </p>
                    )}
                    {!("price_in_dollar" in elem) && (
                      <p className="text-sm ">
                        $
                        {(
                          parseFloat(elem.price) * parseInt(elem.amount)
                        ).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex mt-2">
                  <div className="w-1/6"></div>
                  <div className="flex grow ml-3 gap-4 items-center">
                    <button
                      className="p-1 rounded-md bg-slate-300"
                      onClick={() => {
                        dispatch(
                          modifyItemAmount({ url: elem.url, amount: 1 })
                        );
                      }}
                    >
                      <img src={add} className="w-5 h-5" />
                    </button>
                    {elem.amount}
                    <button
                      className="p-1 rounded-md bg-slate-300"
                      onClick={() => {
                        dispatch(
                          modifyItemAmount({ url: elem.url, amount: -1 })
                        );
                      }}
                    >
                      <img src={remove} className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="w-1/6"></div>
                  <div className="grow ml-3 flex gap-3">
                    <button
                      className="bg-rose-500 text-white block rounded-md p-2"
                      id={elem.url}
                      onClick={(e) => {
                        dispatch(removeItem(e.currentTarget.id));
                        dispatch(resetStep(currentBasket.length - 1));
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
          <p className="text-sm text-slate-500">Additional Cost</p>
          <p className="text-sm">
            ${isNaN(additionalCost) ? "0.00" : additionalCost.toFixed(2)}
          </p>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-sm text-slate-500">Subtotal</p>
          <p className="font-medium">
            $
            {isNaN(additionalCost)
              ? calculateSubTotal(currentBasket).toFixed(2)
              : (calculateSubTotal(currentBasket) + additionalCost).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
