import { configureStore } from "@reduxjs/toolkit";
import shoppingBasketReducer from "./shoppingBasketSlice";
import orderCreationStepsReducer from "./orderCreationStepsSlice";
import userSessionReducer from "./userSessionSlice";

export default configureStore({
  reducer: {
    shoppingBasket: shoppingBasketReducer,
    orderCreationSteps: orderCreationStepsReducer,
    userSession: userSessionReducer,
  },
});
