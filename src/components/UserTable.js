import React from "react";
import { useState } from "react";
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
            <TableCell component="th" scope="row" align="center">
              <Checkbox
                checked={selectedId.includes(row.id)}
                onChange={() => handleRowSelect(row.id)}
              />
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {row.name}
            </TableCell>
            <TableCell align="center">{row.email}</TableCell>
            <TableCell align="center">{row.role}</TableCell>
            <TableCell align="center">
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
          <TableCell colSpan={5} align="center">
            No Data was found
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default UserTable;
