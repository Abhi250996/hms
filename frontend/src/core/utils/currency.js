// src/core/utils/currency.js
export const formatCurrency = (
  amount = 0,
  locale = "en-IN",
  currency = "INR"
) => {
  if (isNaN(amount)) return "₹0.00";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const parseCurrency = (value) => {
  if (!value) return 0;
  return Number(value.toString().replace(/[^0-9.-]+/g, ""));
};
