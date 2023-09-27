import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Checkbox,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";

const UserTable = ({
  userData,
  selectedId,
  handleRowSelect,
  setFiltredData,
  handleRowDelete,
  setUserData,
}) => {
  const [editData, setEditData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const handleRowEdit = (id) => {
    //Selecting the row data and setting the default value to editData
    const editRow = userData.find((row) => row.id === id);

    setEditingId(id);
    setEditData(editRow);
  };

  const handleSaveData = () => {
    //logic to save the changes made to the filtred Data only if its not empty
    if (editData.name.trim() !== "" && editData.email.trim() !== "") {
      setFiltredData((prevData) =>
        prevData.map((row) => (row.id === editingId ? editData : row))
      );
      //Making the change in the userData so we can use updated value to search user
      setUserData((prevData) =>
        prevData.map((row) => (row.id === editingId ? editData : row))
      );
    }
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
              {editingId === row.id ? (
                <TextField
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  variant="standard"
                />
              ) : (
                row.name
              )}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="center"
              sx={{ border: "none" }}
            >
              {editingId === row.id ? (
                <TextField
                  name="email"
                  value={editData.email || ""}
                  onChange={handleInputChange}
                  variant="standard"
                />
              ) : (
                row.email
              )}
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
              {editingId === row.id ? (
                <Button
                  startIcon={<CheckIcon />}
                  style={{ color: "green" }}
                  onClick={() => {
                    handleSaveData();
                  }}
                />
              ) : (
                <>
                  <Button
                    startIcon={<EditIcon />}
                    style={{ color: "black" }}
                    onClick={() => {
                      handleRowEdit(row.id);
                    }}
                  />
                  <Button
                    startIcon={<DeleteOutlineIcon />}
                    style={{ color: "red" }}
                    onClick={() => {
                      handleRowDelete(row.id);
                    }}
                  />
                </>
              )}
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
