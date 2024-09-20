import React from 'react';

import Tooltip from "@mui/material/Tooltip";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import MicExternalOnRoundedIcon from '@mui/icons-material/MicExternalOnRounded';

import 'react-quill/dist/quill.snow.css';

const CustomToolbar = ({ toolbarPosition, showToolbar }) => {

    return (

        <div
            style={{
                position: 'absolute',
                top: toolbarPosition.top,
                left: toolbarPosition.left,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '5px',
                zIndex: 1000,
                display: showToolbar ? "block" : "none"
            }}
            id={"toolbar"}
        >
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
                <Tooltip title="voice">
                    <button className="ql-voice">
                        <MicExternalOnRoundedIcon />
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

export { CustomToolbar }