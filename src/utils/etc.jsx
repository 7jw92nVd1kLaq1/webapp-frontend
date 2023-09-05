export const calculateTotalPriceUSD = (items, additional_cost) => {
  const subTotal = items.reduce(
    (partialSum, a) => partialSum + a.quantity * parseFloat(a.price),
    0
  );

  return (subTotal + parseFloat(additional_cost)).toFixed(2);
};

export const calculateTotalPriceCrypto = (priceUSD, rate) => {
  return (priceUSD / rate).toFixed(8);
};
