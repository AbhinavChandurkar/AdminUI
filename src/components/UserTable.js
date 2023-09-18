import React from "react";
import { TableCell, TableRow, Checkbox, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const UserTable = ({
  userData,
  selectedId,
  handleRowSelect,
  handleRowDelete,
}) => {
  return (
    <>
      {userData.length > 0 ? (
        userData.map((row) => (
          <TableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            style={{
              backgroundColor: selectedId.includes(row.id)
                ? "lightgrey"
                : "white",
            }}
          >
            <TableCell
              component="th"
              scope="row"
              align="center"
              sx={{ border: "none" }}
            >
              <Checkbox
                checked={selectedId.includes(row.id)}
                onChange={() => handleRowSelect(row.id)}
              />
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="center"
              sx={{ border: "none" }}
            >
              {row.name}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="center"
              sx={{ border: "none" }}
            >
              {row.email}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="center"
              sx={{ border: "none" }}
            >
              {row.role}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="center"
              sx={{ border: "none" }}
            >
              <Button startIcon={<EditIcon />} style={{ color: "black" }} />
              <Button
                startIcon={<DeleteOutlineIcon />}
                style={{ color: "red" }}
                onClick={() => {
                  handleRowDelete(row.id);
                }}
              />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5} align="center" sx={{ border: "none" }}>
            No Data was found
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default UserTable;
