import "../styles/styles.css";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function Users() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "firstName", headerName: "First name", width: 150 },
    { field: "lastName", headerName: "Last name", width: 150 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,

      renderCell: (cellValues) => {
        return (
          <div className="actions">
            <span>
              <EditOutlined
                style={{ margin: "0px 20px 0px 20px" }}
                onClick={(event) => {
                  handleClick(event, cellValues);
                  
                }}
              />
            </span>{" "}
            <span>
              <DeleteOutlined
                onClick={(event) => {
                  handleClick(event, cellValues);
                }}
              />
            </span>
          </div>
        );
      },
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const handleClick = (event, cellValues) => {
    console.log(event);
  }

  return (
    <div className="container">
      <h2>Users</h2>
      <hr />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
        />
      </div>
    </div>
  );
}

export default Users;
