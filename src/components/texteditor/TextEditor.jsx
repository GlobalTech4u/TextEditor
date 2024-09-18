import React, { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";

// import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.bubble.css";

import CommentsCard from "../commentsCard/CommentsCard";
import CommentModal from "../commentsModal/CommentsModal";

import Toolbar from "../toolbar/ToolBar";

import "./TextEditor.css";

const TextEditor = () => {
  const [editorState, setEditorState] = useState("");
  const [comments, setComments] = useState([]);
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const [selectedText, setSelectedText] = useState({ index: 0, length: 0 });
  const [commentText, setCommentText] = useState("");
  const quillRef = useRef(null);

  const editor = quillRef?.current?.getEditor();

  const handleTextChange = (value) => {
    setEditorState(value);
  };

  const openAddCommentModal = () => {
    const range = quillRef?.current?.getEditor()?.getSelection();
    console.log("=> openAddCommentModal ", range);
    setSelectedText({ index: range?.index, length: range?.length });
    setShowAddCommentModal(true);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          undo: () => {
            quillRef.current.getEditor().history.undo();
          },
          redo: () => {
            quillRef.current.getEditor().history.redo();
          },
          comment: openAddCommentModal,
        },
      },
      history: {
        delay: 2000,
        maxStack: 500,
        userOnly: true,
      },
    }),
    []
  );

  const handleModalClose = () => setShowAddCommentModal(false);

  const onAddComment = () => {
    setComments([
      ...comments,
      {
        id: `comment_${comments?.length + 1}_${Date.now()}`,
        comment: commentText,
        index: selectedText?.index,
        length: selectedText?.length,
        time: Date.now(),
      },
    ]);
    handleModalClose();
  };

  const highlightText = (comment) => {
    editor?.setSelection(comment?.index, comment?.length);
  };

  const updateCommentText = (event) => {
    setCommentText(event?.target?.value || "");
  };

  return (
    <>
      <div className="text-editor-wrapper">
        <div className="text-editor-container">
          <Toolbar />
          <ReactQuill
            ref={quillRef}
            defaultValue={editorState}
            onChange={handleTextChange}
            theme="snow"
            modules={modules}
          />
        </div>
        <div className="comments-container">
          <CommentsCard
            comments={comments}
            setComments={setComments}
            highlightText={highlightText}
          />
        </div>
      </div>
      <CommentModal
        handleModalClose={handleModalClose}
        updateCommentText={updateCommentText}
        onAddComment={onAddComment}
        showAddCommentModal={showAddCommentModal}
      />
    </>
  );
};

export default TextEditor;
