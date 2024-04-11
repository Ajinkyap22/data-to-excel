import { TableName } from "@/types/TableName";

export type TableData = {
  name: TableName;
  table: { [key: string]: any }[];
};
