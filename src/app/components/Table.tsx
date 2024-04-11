import React from "react";

import { startCase } from "lodash";

type Props = {
  caption: string;
  tableData: {
    [key: string]: string | number;
  }[];
};

const Table = ({ caption, tableData }: Props) => {
  return (
    <div>
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {Object.keys(tableData[0]).map((header, index) => (
              <th key={index}>{startCase(header)}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
