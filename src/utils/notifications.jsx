const generateNotificationOrderURL = (action, affected) => {
  if (action === "created") {
    return `/viewOrders/customer/${affected[0]}`;
  }
};

export const generateNotificationURL = (action, affected) => {
  if (!affected) return;

  const splitAction = action.split(":");
  if (splitAction[0] === "order") {
    return generateNotificationOrderURL(splitAction[1], affected);
  }
  return "";
};
