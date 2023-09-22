import React from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box } from "@mui/material";
import "./style.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  return (
    <Box className="pagination">
      <button
        className="button"
        onClick={() => {
          handleFirstPage();
        }}
        disabled={currentPage === 1}
      >
        <KeyboardDoubleArrowLeftIcon />
      </button>
      <button
        className="button"
        onClick={() => {
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        <NavigateBeforeIcon />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "activeButton" : "button"}
        >
          {page}
        </button>
      ))}
      <button
        className="button"
        onClick={() => {
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      >
        <NavigateNextIcon />
      </button>
      <button
        className="button"
        onClick={() => {
          handleLastPage();
        }}
        disabled={currentPage === totalPages}
      >
        <KeyboardDoubleArrowRightIcon />
      </button>
    </Box>
  );
};

export default Pagination;
