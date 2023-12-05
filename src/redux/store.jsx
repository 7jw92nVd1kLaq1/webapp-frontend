import { configureStore } from "@reduxjs/toolkit";
import shoppingBasketReducer from "./shoppingBasketSlice";
import notificationReducer from "./notificationSlice";
import orderCreationStepsReducer from "./orderCreationStepsSlice";
import userSessionReducer from "./userSessionSlice";
import customerRequestsReducer from "./ListCustomerOrdersSlice";
import viewOrderAsCustomerReducer from "./viewOrderAsCustomerSlice.jsx";

export default configureStore({
  reducer: {
    shoppingBasket: shoppingBasketReducer,
    notification: notificationReducer,
    orderCreationSteps: orderCreationStepsReducer,
    userSession: userSessionReducer,
    customerRequests: customerRequestsReducer,
    viewOrderAsCustomer: viewOrderAsCustomerReducer,
  },
});
