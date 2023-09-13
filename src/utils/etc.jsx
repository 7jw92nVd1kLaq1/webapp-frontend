export const calculateTotalPriceUSD = (items, additional_cost) => {
  const subTotal = items.reduce(
    (partialSum, a) => partialSum + a.quantity * parseFloat(a.price),
    0
  );

  return subTotal + parseFloat(additional_cost);
};

export const calculateTotalPriceCrypto = (priceUSD, rate) => {
  return (priceUSD / rate).toFixed(8);
};

export const formatDateStringMMDDYYYY = (date) => {
  return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
};

export const getCountryNameFromCode = (countryCode) => {
  if (typeof countryCode != "string") {
    throw new Error("The first argument must be of string type.");
  }
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(countryCode);
};

export const shortenProductName = (name, size = 10) => {
  let whiteSpaceIndexes = [];
  if (typeof name != "string") {
    throw new Error('The first parameter "name" must be of string type.');
  }
  if (name.length < 1) {
    throw new Error(
      'The first parameter "name" must have at least one alphanumeric character.'
    );
  }
  if (typeof size != "number") {
    throw new Error('The second parameter "size" must be of number type.');
  }
  if (typeof size <= 0) {
    throw new Error('The second parameter "size" must be bigger than 0.');
  }
  for (let i = 0; i < name.length; i++) {
    if (name[i] === " ") {
      whiteSpaceIndexes.push(i);
      if (whiteSpaceIndexes.length >= size) {
        break;
      }
    }
  }

  if (whiteSpaceIndexes.length <= 0) return name + "...";
  else if (size > whiteSpaceIndexes.length) return name;

  return name.slice(0, whiteSpaceIndexes[whiteSpaceIndexes.length - 1]) + "...";
};
