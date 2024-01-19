import React from "react";
import ExcelJS from "exceljs";
import { Button } from "antd";
import { FileExcelTwoTone } from "@ant-design/icons";
interface Person {
  name: string;
  gender: string;
  eyeColor: string;
  [key: string]: string;
}

interface ExportToExcelProps {
  data: Person[];
}

const ExportToExcel: React.FC<ExportToExcelProps> = ({ data }) => {
  console.log("data", data);
  const exportToExcel = (data: Person[]) => {
    let sheetName = "personlist.xlsx";
    let headerName = "RequestsList";

    let workbook = new ExcelJS.Workbook();
    let sheet = workbook.addWorksheet(sheetName, {
      views: [{ showGridLines: false }],
    });

    let columnArr = Object.keys(data[0]).filter((key) => key !== "__typename");
    sheet.addTable({
      name: headerName,
      ref: "A5",
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
      },
      columns: columnArr.map((name) => ({ name })),
      rows: data.map((e) =>
        columnArr.map((key) => {
          if (key in e) {
            return String(e[key]);
          }
          return "";
        })
      ),
    });

    sheet.getCell("A1").font = { size: 20, bold: true };

    sheet.columns = sheet.columns.map((column: any) => {
      const columnName = column.values[0];
      switch (columnName) {
        case "name":
          return { ...column, width: 50 };
        case "gender":
          return { ...column, width: 40 };
        case "eyecolor":
          return { ...column, width: 30 };
        default:
          return { ...column, width: 20 };
      }
    });

    const writeFile = (fileName: string, content: Uint8Array) => {
      const link = document.createElement("a");
      const blob = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });

      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    };

    workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const uint8Array = new Uint8Array(buffer);
      writeFile(sheetName, uint8Array);
    });
  };
  return (
    <>
      {data?.length > 0 ? (
        <Button
          onClick={() => {
            exportToExcel(data);
          }}
          type="primary"
          style={{
            width: "12rem",
            height: "3rem",
            display: "flex",
            fontSize: "1.1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
          icon={
            <FileExcelTwoTone
              twoToneColor="green"
              style={{ fontSize: "2rem" }}
            />
          }
        >
          Export to Excel
        </Button>
      ) : null}
    </>
  );
};

export default ExportToExcel;
