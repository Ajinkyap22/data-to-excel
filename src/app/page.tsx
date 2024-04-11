import React from "react";

import {
  productsTable,
  customersTable,
  ordersTable,
  orderDetailsTable,
} from "@/data/tableData";

import "@/app/globals.css";

import Table from "@/app/components/Table";
import ExportData from "@/app/components/ExportData";
import { TableName } from "@/types/TableName";

export default function Home() {
  return (
    <main>
      {/* heading with export button */}
      <h1>Data to Excel</h1>
      <ExportData
        orderSummary={[
          {
            name: TableName.ORDERS,
            table: ordersTable,
          },
          {
            name: TableName.ORDER_DETAILS,
            table: orderDetailsTable,
          },
        ]}
        products={{
          name: TableName.PRODUCTS,
          table: productsTable,
        }}
        customers={{
          name: TableName.CUSTOMERS,
          table: customersTable,
        }}
      />

      {/* Render the tables */}
      <Table tableData={productsTable} caption="Products" />
      <Table tableData={customersTable} caption="Customers" />
      <Table tableData={ordersTable} caption="Orders" />
      <Table tableData={orderDetailsTable} caption="Order Details" />
    </main>
  );
}
