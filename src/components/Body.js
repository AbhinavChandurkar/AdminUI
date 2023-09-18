import axios from "axios";
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import SearchFeild from "./SearchFeild";

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Checkbox,
  Pagination,
  Button,
} from "@mui/material";
import "./body.css";

const Body = () => {
  const [userData, setUserData] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [filteredData, setFiltredData] = useState([]);

  /**
   *  pagination hooks
   */
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * rowsPerPage;
  const end = currentPage * rowsPerPage;

  //Function to fetch tha user data from the given endpoint
  const getUserData = async () => {
    try {
      const response = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      setUserData(response.data);
      setFiltredData(response.data);
    } catch (error) {
      //Add enque bar to show error message
      console.log(error);
    }
  };

  //write logic to select all the user entry in the current page
  const handleAllSelect = () => {
    const data = filteredData.slice(start, end);

    // Check if all users in the current page are selected
    const allSelected = data.every((user) => selectedId.includes(user.id));

    if (allSelected) {
      // If all are selected, unselect them
      setSelectedId((prevSelected) =>
        prevSelected.filter((id) => !data.some((user) => user.id === id))
      );
    } else {
      // If not all are selected, select them
      setSelectedId((prevSelected) => [
        ...prevSelected,
        ...data.map((user) => user.id),
      ]);
    }
  };

  //logic of selecting multipe row data
  const handleRowSelect = (id) => {
    if (selectedId.includes(id)) {
      setSelectedId((array) => array.filter((row) => row !== id));
      return;
    }
    setSelectedId((prevArray) => [...prevArray, id]);
  };

  //Logic to remove multiple user entries by one button
  const handleDeleteSelected = () => {
    setFiltredData((item) =>
      item.filter((user) => !selectedId.includes(user.id))
    );
  };

  //Fetching the data from the api after all compoenets are loaded
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Box p={3} m={2}>
      <Box>
        <SearchFeild userData={userData} setFilteredData={setFiltredData} />
      </Box>
      <Box>
        <TableContainer className="tableContainer">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Checkbox
                    checked={
                      !!(
                        filteredData.length &&
                        filteredData
                          .slice(start, end)
                          .every((user) => selectedId.includes(user.id))
                      )
                    }
                    onClick={handleAllSelect}
                  />
                </TableCell>
                <TableCell align="center" className="tableHeaderCell">
                  Name
                </TableCell>
                <TableCell align="center" className="tableHeaderCell">
                  Email
                </TableCell>
                <TableCell align="center" className="tableHeaderCell">
                  Role
                </TableCell>
                <TableCell align="center" className="tableHeaderCell">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <UserTable
                userData={filteredData.slice(start, end)}
                selectedId={selectedId}
                filteredData={filteredData}
                setFiltredData={setFiltredData}
                handleRowSelect={handleRowSelect}
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
        <Button
          variant="outlined"
          onClick={() => {
            handleDeleteSelected();
          }}
        >
          Delete All
        </Button>

        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          showFirstButton
          showLastButton
          page={currentPage}
          onChange={(e, page) => {
            setCurrentPage(page);
          }}
          size="large"
        />
      </Box>
    </Box>
  );
};

export default Body;
