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
  filteredData,
  setFiltredData,
  setUserData,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [editingId, setEditingId] = useState(null);

  //logic for deleting data on the same row
  const handleRowDelete = (id) => {
    setFiltredData(filteredData.filter((user) => user.id !== id));
    setUserData(filteredData.filter((user) => user.id !== id));
  };

  const handleRowEdit = (id) => {
    //Add the logic to take the data from the feild and passit to the ha
    const editRow = userData.find((row) => row.id === id);
    setEditMode(true);
    setEditingId(id);
    setEditData(editRow);
  };

  const handleSaveData = () => {
    //logic to save the changes made to the filtred Data
    setFiltredData((prevData) =>
      prevData.map((row) => (row.id === editingId ? editData : row))
    );

    setEditMode(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setEditData((prevData) => ({
        ...prevData,
        [name]: value.trim(),
      }));
    }
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
