import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchFeild = ({ userData, setFilteredData, setCurrentPage }) => {
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  //Main filter logic
  const performSearch = async (text) => {
    //Condtion if user is searching for the user not from 1 page
    setCurrentPage(1);

    //checking if the provided input consit of only blank space
    if (!text.trim()) {
      setFilteredData(userData);
      return;
    }

    //Converting the search text to all lower case and removing the empty spaces
    const searchText = text.toLowerCase().trim();

    //COnverting the name,email and role to string with no spcae and all lowercase then searching for the searchtext
    const filtredData = userData.filter((user) => {
      const search = (user.name + user.email + user.role).trim().toLowerCase();
      return search.includes(searchText);
    });
    setFilteredData(filtredData);
  };

  // Sending the textfeild value  after a delay
  const debounceSearch = (event, debounceTimeout) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    let timerId = setTimeout(() => {
      performSearch(event.target.value);
    }, 800);
    setDebounceTimeout(timerId);
  };

  return (
    <div>
      <TextField
        className="custom-textfield"
        size="small"
        placeholder="Search for Users"
        name="search"
        onChange={(e) => {
          debounceSearch(e, debounceTimeout);
        }}
        sx={{
          width: 1,
          marginBottom: 1,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchFeild;
