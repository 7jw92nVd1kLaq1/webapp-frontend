import { configureStore } from "@reduxjs/toolkit";
import shoppingBasketReducer from "./shoppingBasketSlice";
import orderCreationStepsReducer from "./orderCreationStepsSlice";
import userSessionReducer from "./userSessionSlice";
import customerRequestsReducer from "./ListCustomerOrdersSlice";

export default configureStore({
  reducer: {
    shoppingBasket: shoppingBasketReducer,
    orderCreationSteps: orderCreationStepsReducer,
    userSession: userSessionReducer,
    customerRequests: customerRequestsReducer,
  },
});
