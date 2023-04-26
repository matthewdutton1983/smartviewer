import { Modal, Typography, Button, Box, Tab, Tabs } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { Logger } from "../../Logger";
import "./Modals.styles.css";

export const AddDocumentsModal = ({ open, onClose, collection }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleFileDrop = useCallback(
    async (acceptedFiles) => {
      console.log("acceptedFiles:", acceptedFiles);
      try {
        const documents = await collection.uploadDocuments(acceptedFiles);
        console.log("Documents uploaded successfully:", documents);
      } catch (error) {
        console.error(error);
        throw new Error(
          `Error uploading documents to collection ${collection.id}`
        );
      }
    },
    [collection]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    multiple: true,
  });

  const handleTabChange = (event, newValue) => {
    console.log("event:", event);
    setActiveTab(newValue);
  };
  Logger("Rendering AddDocumentsModal component.");

  return (
    <Modal open={open} onClose={onClose} className="modal">
      <Box sx={{ width: 1600, height: 800, bgcolor: "white" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            centered
            value={activeTab}
            onChange={handleTabChange}
            sx={{ flexGrow: 1, paddingTop: 1 }}
          >
            <Tab label="Upload from Computer" />
            <Tab label="Other Methods" />
          </Tabs>
        </Box>
        <Box
          sx={{
            p: 3,
            height: "calc(100% - 100px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {activeTab === 0 && (
            <div className="tab-content" style={{ flexGrow: 1 }}>
              <div
                {...getRootProps()}
                className="dropzone"
                style={{
                  border: "4px dashed #ddd",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#aaaaaa",
                  width: "100%",
                  height: "calc(100% - 16px)",
                  transition: "0.3s",
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <>
                    <Typography variant="h6" color="textPrimary">
                      Drag and drop files here
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ marginTop: "16px" }}
                    >
                      or click to select files
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="tab-content" style={{ flexGrow: 1 }}>
              <Typography variant="h6" color="textPrimary">
                Other methods
              </Typography>
              {/* code for uploading from other sources */}
            </div>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
