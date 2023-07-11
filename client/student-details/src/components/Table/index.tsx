import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type TableComponentProps = {
  rows: [{ id: number; departmentName: string }];
  columns: GridColDef[];
};
const TableComponent: React.FC<TableComponentProps> = (
  props: TableComponentProps
) => {
  const { rows, columns } = props;
  return (
    <>
      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </>
  );
};
export default TableComponent;
