import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from "@mui/icons-material/Search";
import styles from "./Dashboard.module.scss";
import { Pagination } from "@mui/material";
import { Edit } from "@mui/icons-material";
import axios from "axios";

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentEditRow, setCurrentEditRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [results, setResults] = useState(rows.slice(0, 10));
  const [queried, setQueried] = useState([]);
  //general

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  //search
  const handleSearch = () => {
    console.log(searchQuery);
    const filteredData = rows.filter((row) => {
      const { name, email, role } = row;
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        name.toLowerCase().includes(lowerCaseQuery) ||
        email.toLowerCase().includes(lowerCaseQuery) ||
        role.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setQueried(filteredData);
  };

  const handleQueryChange = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };


  //sort
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = results.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    console.log(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, page * rowsPerPage - rows.length) : 0;

  //head

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "role",
      numeric: false,
      disablePadding: false,
      label: "Role",
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
    },
  ];

  //useeffects
  useEffect(() => {
    if (searchQuery === "") {
      setResults(rows.slice(0, 10));
    } else {
      setResults(queried.slice(0, 10));
    }
  }, [rows, queried]);

  useEffect(() => {
    setResults(
      searchQuery === ""
        ? rows.slice(
            (page - 1) * rowsPerPage,
            (page - 1) * rowsPerPage + rowsPerPage
          )
        : queried.slice(
            (page - 1) * rowsPerPage,
            (page - 1) * rowsPerPage + rowsPerPage
          )
    );
  }, [page]);

  useEffect(() => {
    async function fetchData() {
      // write a get reqest using axious on api https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json
      const result = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result.data);
      setRows(result.data);
    }
    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%", height: "90%" }}>
      <Paper
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
          className={styles.toolbar}
        >
          <div label="Search" value={searchQuery} className={styles.searchBar}>
            <input
              type="text"
              placeholder="Enter Value.."
              onChange={handleQueryChange}
            />
            <button
              onClick={() => {
                handleSearch();
              }}
            >
              <Search />
            </button>
          </div>
          <Tooltip title="Delete">
            <div
              className={`${styles.deleteButtonWrap} ${
                !selected.length > 0 ? styles.disabled : ""
              }`}
              onClick={() => {
                console.log("sdsd", selected);

                let newResults = results.filter(
                  (item) => !selected.includes(item.id)
                );
                setResults(newResults);
                let newRows = rows.filter(
                  (item) => !selected.includes(item.id)
                );
                setRows(newRows);
                let newQueried = queried.filter(
                  (item) => !selected.includes(item.id)
                );
                setQueried(newQueried);

                setSelected([]);
              }}
            >
              <DeleteIcon />
            </div>
          </Tooltip>
        </Toolbar>
        <TableContainer
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
            maxHeight: "80vh",
            width: "100%",
            paddingTop: "240px !important",
            scrollbarWidth: "0",
            overflowY: "scroll",
          }}
          className={styles.tableContainer}
        >
          <Table
            sx={{
              minWidth: 750,
              margin: "0px 20px",
              border: "1px solid #e0e0e0",
              width: "97%",
            }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            {/* <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            /> */}
            <TableHead>
              <TableRow>
                <TableCell
                  padding="checkbox"
                  sx={{ paddingRight: "40px !important" }}
                >
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={
                      rows.length > 0 && selected.length === results.length
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{
                      "aria-label": "select all users in page",
                    }}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    padding={headCell.disablePadding ? "none" : "normal"}
                    sortDirection={orderBy === headCell.id ? order : false}
                    className={styles.tableHead}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={
                      isItemSelected || (currentEditRow === row.id && editMode)
                    }
                    sx={{
                      padding: "0px 20px !important",
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={(event) => handleClick(event, row.id)}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      contentEditable={editMode && currentEditRow === row.id}
                      suppressContentEditableWarning={true}
                      onInput={(e) => {
                        console.log(e.currentTarget.textContent);
                        row.name = e.currentTarget.textContent;
                      }}
                      onKeyDown={(e) => {
                        console.log(e.key);
                      }}
                      sx={{ width: "20%" }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      contentEditable={editMode && currentEditRow === row.id}
                      suppressContentEditableWarning={true}
                      sx={{ width: "35%" }}
                      onInput={(e) => {
                        console.log(e.currentTarget.textContent);
                        row.email = e.currentTarget.textContent;
                      }}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell
                      align="left"
                      contentEditable={editMode && currentEditRow === row.id}
                      suppressContentEditableWarning={true}
                      onInput={(e) => {
                        console.log(e.currentTarget.textContent);
                        row.role = e.currentTarget.textContent;
                      }}
                      sx={{ width: "25%" }}
                    >
                      {row.role}
                    </TableCell>
                    <TableCell align="left" sx={{ width: "20%" }}>
                      <div className={styles.actions}>
                        <button
                          className={`${styles.editButton} ${
                            editMode && currentEditRow === row.id
                              ? styles.blueBg
                              : null
                          }`}
                          onClick={() => {
                            if (currentEditRow === row.id) {
                              setEditMode(false);
                              setCurrentEditRow(null);
                            } else {
                              setEditMode(true);
                              setCurrentEditRow(row.id);
                            }
                          }}
                        >
                          <Edit />
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => {
                            let newResults = results.filter(
                              (item) => item.id !== row.id
                            );
                            setResults(newResults);
                            let newRows = rows.filter(
                              (item) => item.id !== row.id
                            );
                            setRows(newRows);
                            let newQueried = queried.filter(
                              (item) => item.id !== row.id
                            );
                            setQueried(newQueried);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height:  53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.footer}>
          <div className={styles.selectedstatus}>
            {" "}
            {selected.length} of{" "}
            {searchQuery === "" ? rows.length : queried.length} of row(s)
            selected{" "}
          </div>
          <div className={styles.pagination}>
            <Typography>
              Page {page} of{" "}
              {searchQuery === ""
                ? (rows.length - (rows.length % 10)) / 10 + 1
                : (queried.length - (queried.length % 10)) / 10 + 1}{" "}
            </Typography>
            <Pagination
              count={
                searchQuery === ""
                  ? (rows.length - (rows.length % 10)) / 10 + 1
                  : (queried.length - (queried.length % 10)) / 10 + 1
              }
              page={page}
              onChange={handleChangePage}
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </Paper>
    </Box>
  );
}
