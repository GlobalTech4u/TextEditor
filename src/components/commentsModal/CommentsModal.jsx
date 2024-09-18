import Modal from "@mui/material/Modal";
import { TextareaAutosize } from "@mui/base";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Button from "@mui/material/Button";

const CommentModal = (props) => {
  const {
    handleModalClose,
    updateCommentText,
    onAddComment,
    showAddCommentModal,
  } = props;
  return (
    <Modal open={showAddCommentModal} onClose={handleModalClose}>
      <div className="modal-container">
        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">Add Comment</h2>
            <HighlightOffRoundedIcon
              className="modal-close-icon"
              onClick={handleModalClose}
            />
          </div>
          <TextareaAutosize
            className="modal-input"
            minRows={3}
            maxRows={10}
            onChange={updateCommentText}
          />
          <Button
            className="modal-add-button"
            variant="contained"
            onClick={onAddComment}
          >
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
