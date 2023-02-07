import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { UserContext } from "../utils/UserContext";
import axios from "axios";

const columns = [
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    width: "100",
    editable: true,
  },
  {
    field: "model",
    headerName: "Model",
    width: "100",
    editable: true,
  },
  {
    field: "type",
    headerName: "Type",
    width: "170",
    editable: true,
  },
  {
    field: "fuel",
    headerName: "Fuel",
    width: "100",
    editable: true,
    valueGetter: (params) =>
      `${params.row.fuel
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")}`,
  },
  {
    field: "vin",
    headerName: "VIN",
    width: "190",
    editable: true,
  },
  {
    field: "color",
    headerName: "Color",
    width: "100",
    editable: true,
    valueGetter: (params) =>
      `${params.row.color
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")}`,
  },
  {
    field: "purchase_price",
    headerName: "Purchase Price",
    width: "130",
    editable: true,
    valueGetter: (params) => `$${params.row.purchase_price}`,
  },
  {
    field: "sale_price",
    headerName: "Sale Price",
    width: "100",
    editable: true,
    valueGetter: (params) => `$${params.row.sale_price}`,
  },
  {
    field: "msrp",
    headerName: "MSRP",
    width: "100",
    editable: true,
    valueGetter: (params) => `$${params.row.msrp}`,
  },
  {
    field: "condition",
    headerName: "Condition",
    width: "100",
    editable: true,
    type: "singleSelect",
    valueOptions: [
      "Totalled",
      "Rough",
      "Heavily",
      "Mostly Works",
      "Lightly Used",
      "Like New",
      "New",
    ],
    valueGetter: (params) =>
      `${params.row.condition
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")}`,
  },
  {
    field: "dealershipName",
    headerName: "Dealership",
    width: "170",
    editable: true,
    valueGetter: (params) =>
      `${params.row.dealershipName
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")}`,
  },
];

export default function DataGridAutomobiles({ automobiles }) {
  const { userProfile } = React.useContext(UserContext);
  const [snackbar, setSnackbar] = React.useState(null);
  const [pageSize, setPageSize] = React.useState(10);
  const handleCloseSnackbar = () => setSnackbar(null);
  const rows = automobiles ? automobiles : [];

  const updateMutation = () => {
    return React.useCallback(
      (automobile) =>
        new Promise((resolve, reject) =>
          setTimeout(async () => {
            const { username, password, dealershipId } = userProfile;
            const dataAndUser = {
              username,
              password,
              dealershipId,
              data: { details: automobile },
            };
            try {
              resolve(
                axios({
                  url: "http://localhost:6060/api/automobiles/automobile",
                  method: "PUT",
                  headers: {
                    // authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                  },
                  data: dataAndUser,
                })
              );
            } catch (e) {
              reject(new Error(`Error while saving: ${e} `));
            }
          }, 200)
        ),
      []
    );
  };

  const updateRow = updateMutation();

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      await updateRow(newRow);
      setSnackbar({
        children: "Status update: Success",
        severity: "success",
      });

      return newRow;
    },
    [updateRow]
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          pagination
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          editMode="row"
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Box>
    </>
  );
}
