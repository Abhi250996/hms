// src/billing/model/bill.model.js

export const createBillModel = () => ({
  patientId: "",
  items: [
    {
      description: "",
      quantity: 1,
      price: 0,
      amount: 0,
    },
  ],
  totalAmount: 0,
  paidAmount: 0,
  paymentStatus: "PENDING", // PENDING | PARTIAL | PAID
  paymentMode: "", // CASH | CARD | UPI | INSURANCE
  remarks: "",
});

export const calculateBillTotal = (items = []) => {
  return items.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.price),
    0
  );
};
