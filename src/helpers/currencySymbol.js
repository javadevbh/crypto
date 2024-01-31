const currencySymbol = (currency) => {
  if (currency == "usd") {
    return "$";
  } else if (currency == "eur") {
    return "€";
  } else {
    return "¥";
  }
};
export { currencySymbol };
