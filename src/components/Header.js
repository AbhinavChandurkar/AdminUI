import { Box, Typography } from "@mui/material";
import React from "react";
import "./header.css";

const Header = () => {
  return (
    <Box>
      <Typography variant="h3" color="initial" className="header">
        Admin UI
      </Typography>
    </Box>
  );
};

export default Header;
