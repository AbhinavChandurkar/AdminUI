import axios from "axios";
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  Checkbox,
  Pagination,
  Button,
} from "@mui/material";
import "./body.css";

const Body = () => {
  const [userData, setUserData] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /**
   *
   */
  const [rowsPerPage, setRowsPerPage] = useState(10); // Step 1
  const startIndex = (currentPage - 1) * rowsPerPage; // Step 2
  const endIndex = currentPage * rowsPerPage;

  //Function to fetch tha user data from the given endpoint
  const getUserData = async () => {
    try {
      const response = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAllSelect = () => {};

  //logic of selecting multipe row data
  const handleRowSelect = (id) => {
    if (selectedId.includes(id)) {
      setSelectedId((array) => array.filter((row) => row !== id));
      return;
    }
    setSelectedId((prevArray) => [...prevArray, id]);
  };

  //logic for deleting data on the same row
  const handleRowDelete = (id) => {
    setUserData(userData.filter((user) => user.id !== id));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Box p={3} m={10}>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} className="table">
            <TableHead>
              <TableRow className="row-header-container">
                <TableCell align="center">
                  <Checkbox onClick={handleAllSelect()} />
                </TableCell>
                <TableCell align="center" className="row-header">
                  Name
                </TableCell>
                <TableCell align="center" variant="h1" row-header>
                  Email
                </TableCell>
                <TableCell align="center" variant="h1" row-header>
                  Role
                </TableCell>
                <TableCell align="center" variant="h1" row-header>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <UserTable
                userData={userData.slice(startIndex, endIndex)}
                selectedId={selectedId}
                handleRowSelect={handleRowSelect}
                handleRowDelete={handleRowDelete}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        alignItems="center"
        p={5}
        m={2}
        display="flex"
        justifyContent="space-between"
      >
        <Button variant="outlined">Delete All</Button>
        <Pagination
          count={Math.ceil(userData.length / rowsPerPage)}
          showFirstButton
          showLastButton
          page={currentPage}
          onChange={(e, page) => {
            setCurrentPage(page);
          }}
        />
      </Box>
    </Box>
  );
};

export default Body;
