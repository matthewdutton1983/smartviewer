import {
  Checkbox,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AddDocumentsButton } from "../Reusable/AddDocumentsButton";
import { DeleteButton } from "../Reusable/DeleteButton";
import { SearchBar } from "../Reusable/SearchBar";
import { useState } from "react";
import "./DocumentsList.styles.css";

export const DocumentsList = ({
  documents = [],
  handleCheckboxChange,
  handleDeleteDocument,
  handleDocumentDoubleClick,
  handleAllDocumentsChecked,
  areAllDocumentsChecked,
  handleOpenModal,
}) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 100;
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min((page + 1) * rowsPerPage, documents.length);

  const handleChangePage = (event, newPage) => {
    console.log("event:", event);
    setPage(newPage - 1);
  };

  const getSelectedDocumentsCount = () => {
    return documents.filter((document) => document.checked).length;
  };

  const displayDocumentsText = () => {
    const selectedCount = getSelectedDocumentsCount();
    if (selectedCount > 0) {
      return `${selectedCount} document${
        selectedCount > 1 ? "s" : ""
      } selected`;
    } else {
      return `Documents ${startIndex + 1}-${endIndex} of ${documents.length}`;
    }
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        height: "100%",
      }}
    >
      <div className="table-wrapper">
        <Table className="documents-table">
          <TableHead>
            <TableRow className="table-header-row">
              <TableCell className="table-header-cell" padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={areAllDocumentsChecked()}
                  onChange={handleAllDocumentsChecked}
                />
              </TableCell>
              <TableCell
                className="table-header-cell"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{displayDocumentsText()}</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SearchBar />
                  <AddDocumentsButton onClick={handleOpenModal} />
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((document, index) => {
                const isChecked = document.hasOwnProperty("checked")
                  ? document.checked
                  : false;
                return (
                  <TableRow
                    key={document.id}
                    className={
                      document.checked ? "table-row checked" : "table-row"
                    }
                    onDoubleClick={() => handleDocumentDoubleClick(document.id)}
                  >
                    <TableCell className="table-cell" padding="checkbox">
                      <div className="checkbox-container">
                        <Checkbox
                          color="primary"
                          checked={isChecked}
                          onChange={(event) =>
                            handleCheckboxChange(event, index)
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      className="table-cell"
                      component="th"
                      scope="row"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        {document.name}
                        <div className="button-container">
                          <DeleteButton
                            onClick={() => handleDeleteDocument(document.id)}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "16px",
          }}
        >
          <Pagination
            count={Math.ceil(documents.length / rowsPerPage)}
            page={page + 1}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </TableContainer>
  );
};