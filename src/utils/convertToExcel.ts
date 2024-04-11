import ExcelJS, { Worksheet } from "exceljs";

import { Sheets } from "@/types/Sheets";
import { TableData } from "@/types/TableData";
import { TableRow } from "@/types/TableRow";
import { TableName } from "@/types/TableName";

import { convertToTitleCase } from "@/utils/convertToTitleCase";

export const convertToExcel = (sheets: Sheets) => {
  // create a new workbook
  const workbook = new ExcelJS.Workbook();

  // loop over sheets
  sheets.forEach((sheet) => {
    // if worksheet name already exists in the workbook, skip it since apps can't have duplicate names
    if (workbook.getWorksheet(sheet.name)) return;

    // add sheet to workbook
    const worksheet = workbook.addWorksheet(sheet.name);

    // default column width & row height
    worksheet.properties.defaultColWidth = 20;
    worksheet.properties.defaultRowHeight = 25;

    // loop over tables
    sheet.data.forEach((table, i) => {
      // add title row
      const columnNumber = Object.keys(table.table[0]).length;
      addTitleRows(worksheet, table.name, i, columnNumber);

      // add header row
      addHeaderRow(worksheet, table);

      // add columns
      addColumns(worksheet, table);

      // loop over rows
      table.table.forEach((row, position) => {
        // add formulas and data row
        addDataRows(worksheet, row, table.name, position);
      });

      // add empty rows between tables for better readability
      worksheet.addRows([[], [], [], []]);
    });
  });

  // Generate the Excel file
  return workbook.xlsx.writeBuffer();
};

const addTitleRows = (
  worksheet: Worksheet,
  tableName: string,
  index: number,
  columnNumber: number
) => {
  let titleRow;

  // Add the table title to the worksheet
  if (index === 0) {
    titleRow = worksheet.insertRow(1, [convertToTitleCase(tableName)]);
    titleRow.hidden = true;
  }

  titleRow = worksheet.addRow([convertToTitleCase(tableName)]);

  // title row styling
  addStyling("FFFFFF", titleRow);

  // merge cells according to number of columns
  worksheet.mergeCells(titleRow.number, 1, titleRow.number, columnNumber);

  // set the title row's background color
  worksheet.getCell(titleRow.number, 1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "222222" },
    bgColor: { argb: "222222" },
  };
};

const addHeaderRow = (worksheet: Worksheet, table: TableData) => {
  const headers = Object.keys(table.table[0]).map((key: string) =>
    convertToTitleCase(key)
  );

  const headerRow = worksheet.addRow(headers);

  // header row styling
  addStyling("000", headerRow);
};

const addColumns = (worksheet: Worksheet, table: TableData) => {
  worksheet.columns = Object.keys(table.table[0]).map((key: string) => ({
    key,
    header: convertToTitleCase(key),
    width: 20,
  }));
};

const addDataRows = (
  worksheet: Worksheet,
  row: TableRow,
  tableName: TableName,
  position: number
) => {
  const dataRow = worksheet.addRow(Object.values(row));

  dataRow.font = {
    name: "Calibri",
  };

  dataRow.alignment = { horizontal: "center", vertical: "middle" };

  dataRow.eachCell((cell) => {
    if (cell.col) {
      cell.border = {
        top: { style: "double" },
        left: { style: "double" },
        bottom: { style: "double" },
        right: { style: "double" },
      };
    }
  });

  // formulae
  if (tableName === TableName.ORDER_DETAILS) {
    const accessPosition = position + 4;

    const cellPosition = `C${dataRow.number}`;
    const formula = `INDIRECT("'${TableName.PRODUCTS}'!C${accessPosition}") * (1 - INDIRECT("'${TableName.PRODUCTS}'!D${accessPosition}")) * D${accessPosition}`;

    addFormulae(worksheet, cellPosition, formula);
  }
};

const addFormulae = (
  worksheet: Worksheet,
  cellPosition: string,
  formula: string
) => {
  worksheet.getCell(`${cellPosition}`).value = {
    formula,
    date1904: false,
  };
};

const addStyling = (color: string, row: ExcelJS.Row) => {
  // set the title row's font, alignment & border
  row.font = {
    name: "Calibri",
    bold: true,
    color: {
      argb: color,
    },
  };

  row.alignment = { horizontal: "center", vertical: "middle" };

  // add border to cells instead of the entire row
  row.eachCell((cell) => {
    if (cell.value) {
      cell.border = {
        top: { style: "double" },
        left: { style: "double" },
        bottom: { style: "double" },
        right: { style: "double" },
      };
    }
  });
};
