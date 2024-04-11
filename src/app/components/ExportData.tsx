"use client";

import React from "react";

import { saveAs } from "file-saver";

import { Sheets } from "@/types/Sheets";
import { TableData } from "@/types/TableData";
import { convertToExcel } from "@/utils/convertToExcel";

type Props = {
  orderSummary: TableData[];
  products: TableData;
  customers: TableData;
};

const ExportData = ({ orderSummary, products, customers }: Props) => {
  const handleExport = () => {
    const sheets: Sheets = [];

    sheets.push({
      name: "Orders Summary",
      data: orderSummary,
    });

    sheets.push({
      name: "Products",
      data: [products],
    });

    sheets.push({
      name: "Customers",
      data: [customers],
    });

    try {
      convertToExcel(sheets).then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, "data.xlsx");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleExport}>Export</button>;
};

export default ExportData;
