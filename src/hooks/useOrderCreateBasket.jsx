import { useDispatch, useSelector } from "react-redux";

const useOrderCreateBasket = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shoppingBasket.value);
  const basketItemsCount = items.length;

  const addItemToBasket = () => {};

  return {
    items,
    basketItemsCount,
    addItemToBasket,
  };
};

export default useOrderCreateBasket;
