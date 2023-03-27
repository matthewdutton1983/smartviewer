import { Button, Modal, Typography } from "@mui/material";
import { logger } from "../../logger";
import "./Modals.styles.css";

export const DeleteCollectionModal = ({
  open,
  handleConfirm,
  handleCancel,
}) => {
  const handleDeleteClick = () => {
    logger("Delete collection modal closed.", { isOpen: open });
    handleCancel();
  };

  const handleDeleteConfirm = () => {
    logger("Collection deletion confirmed.", { isOpen: open });
    handleConfirm();
    handleCancel();
  };

  const handleDeleteCancel = () => {
    logger("Collection deletion cancelled.", { isOpen: open });
    handleCancel();
  };

  logger("Rendering DeleteCollectionModal component.", { isOpen: open });

  return (
    <Modal open={open} onClose={handleDeleteCancel}>
      <div
        className="modal-content"
        style={{ width: "400px", maxHeight: "100%" }}
      >
        <Typography variant="h5" gutterBottom>
          Delete this collection
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this collection? This action is
          irreversible.
        </Typography>
        <div className="modal-buttons">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleDeleteClick}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
