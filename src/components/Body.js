import axios from "axios";
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import SearchFeild from "./SearchFeild";
import Pagination from "./Pagination";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Checkbox,
  Button,
} from "@mui/material";

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
    const data = filteredData.filter((user) => !selectedId.includes(user.id));

    setFiltredData(data);
    setUserData(data);
    //No of pages after some of the user data is deleted
    const updatedPages = Math.ceil(data.length / rowsPerPage);

    // if data is deleted from the last page set it to the new last page
    if (currentPage > updatedPages) setCurrentPage(updatedPages);

    setSelectedId([]);
  };

  //logic for deleting data on the same row
  const handleRowDelete = (id) => {
    const updatedFilteredData = filteredData.filter((user) => user.id !== id);

    setFiltredData(updatedFilteredData);
    setUserData(userData.filter((user) => user.id !== id));

    //No of pages after some of the user data is deleted
    const updatedPages = Math.ceil(updatedFilteredData.length / rowsPerPage);

    // if data is deleted from the last page set it to the new last page
    if (currentPage > updatedPages) {
      setCurrentPage(updatedPages);
    }
  };

  //Fetching the data from the api after all compoenets are loaded
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Box p={3} m={2}>
      <Box>
        <SearchFeild
          userData={userData}
          setFilteredData={setFiltredData}
          setCurrentPage={setCurrentPage}
        />
      </Box>
      <Box>
        <TableContainer
          style={{
            border: "none",
            backgroundColor: "aqua",
          }}
        >
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
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Role
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
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
                setUserData={setUserData}
                handleRowDelete={handleRowDelete}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {filteredData.length > 0 && (
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
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / rowsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Body;
