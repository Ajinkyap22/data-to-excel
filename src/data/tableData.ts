export const productsTable = [
  { ID: 1, name: "Shirt", price: 20, discount: 0.1 },
  { ID: 2, name: "Hat", price: 15, discount: 0.05 },
  { ID: 3, name: "Shoes", price: 40, discount: 0.2 },
];

export const customersTable = [
  { ID: 100, name: "Jude", location: "Birmingham" },
  { ID: 101, name: "Toni", location: "Germany" },
  { ID: 102, name: "Luka", location: "Croatia" },
];

export const ordersTable = [
  {
    ID: 500,
    customerID: 100,
    productID: 1,
    quantity: 2,
  },
  { ID: 501, customerID: 101, productID: 2, quantity: 1 },
  { ID: 502, customerID: 102, productID: 3, quantity: 3 },
];

export const orderDetailsTable = [
  {
    orderID: 500,
    productID: 1,
    totalAmount:
      productsTable[0].price *
      (1 - productsTable[0].discount) *
      ordersTable[0].quantity,
  },
  {
    orderID: 501,
    productID: 2,
    totalAmount:
      productsTable[1].price *
      (1 - productsTable[1].discount) *
      ordersTable[1].quantity,
  },
  {
    orderID: 502,
    productID: 3,
    totalAmount:
      productsTable[2].price *
      (1 - productsTable[2].discount) *
      ordersTable[2].quantity,
  },
];
