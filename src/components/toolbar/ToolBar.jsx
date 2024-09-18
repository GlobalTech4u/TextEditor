import Tooltip from "@mui/material/Tooltip";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";

import "./ToolBar.css";

const QuillToolbar = () => {
  return (
    <div className="custom-toolbar" id="toolbar">
      <span className="ql-formats">
        <Tooltip title="Bold">
          <button className="ql-bold">
            <FormatBoldRoundedIcon />
          </button>
        </Tooltip>
      </span>
      <span className="ql-formats">
        <Tooltip title="Font color">
          <select className="ql-color" />
        </Tooltip>

        <Tooltip title="Background color">
          <select className="ql-background" />
        </Tooltip>
      </span>
      <span className="ql-formats">
        <Tooltip title="Undo">
          <button className="ql-undo">
            <UndoRoundedIcon />
          </button>
        </Tooltip>
        <Tooltip title="Redo">
          <button className="ql-redo">
            <RedoRoundedIcon />
          </button>
        </Tooltip>
      </span>
      <span className="ql-formats">
        <Tooltip title="Comment">
          <button className="ql-comment">
            <InsertCommentRoundedIcon />
          </button>
        </Tooltip>
      </span>
      <span className="ql-formats">
        <Tooltip title="Clear Formating">
          <button className="ql-clean"></button>
        </Tooltip>
      </span>
    </div>
  );
};

export default QuillToolbar;
