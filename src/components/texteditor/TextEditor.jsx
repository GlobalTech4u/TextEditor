import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactQuill from "react-quill";

import CustomToolbar from "../customToolbar/CustomToolBar";
import CommentsCard from "../commentsCard/CommentsCard";
import CommentModal from "../commentsModal/CommentsModal";
import VoiceSettingsCard from "../voiceSettingsCard/VoiceSettingsCard";
import VoiceModal from "../voiceModal/VoiceModal";

import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";

const TextEditor = () => {
  const [editorState, setEditorState] = useState("");
  const [comments, setComments] = useState([]);
  const [voiceSettings, setVoiceSettings] = useState([]);
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [selectedText, setSelectedText] = useState({ index: 0, length: 0 });
  const [commentText, setCommentText] = useState("");
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  const savedRangeRef = useRef({ index: 0, length: 0 });
  const quillRef = useRef(null);
  const editor = quillRef?.current?.getEditor();

  const setPosition = (range) => {
    if (quillRef.current) {
      const editorNode = quillRef.current.getEditor().root;
      const editorBounds = editorNode.getBoundingClientRect();
      const selectionBounds = quillRef.current
        .getEditor()
        .getBounds(range.index, range.length);
      setToolbarPosition({
        // Adjust the offset as needed
        top: editorBounds.top + selectionBounds.top - 40,
        left: editorBounds.left + selectionBounds.left,
      });
    }
  };

  const handleSelectionChange = (range, oldRange, source) => {
    if (range && range.length > 0) {
      setPosition(range);
      setShowToolbar(true);
    } else if (savedRangeRef?.current && savedRangeRef?.current?.length > 0) {
      setPosition(savedRangeRef?.current);
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }
  };

  useEffect(() => {
    if (quillRef && quillRef?.current) {
      const quill = quillRef.current.getEditor();
      quill.on("selection-change", handleSelectionChange);

      return () => {
        quill.off("selection-change", handleSelectionChange);
      };
    }
  }, []);

  const saveVoiceSettings = (settings) => {
    const startIndex = selectedText?.index;
    const endIndex = selectedText?.index + selectedText?.length;
    const text = editor?.getText();

    const newSettings = {
      id: Date.now(),
      text: text.slice(startIndex, endIndex),
      index: startIndex,
      length: selectedText?.length,
      settings: settings,
    };
    setVoiceSettings([...voiceSettings, newSettings]);
    setShowVoiceModal(false);
  };

  const openAddCommentModal = () => {
    const range = quillRef?.current?.getEditor()?.getSelection();
    setSelectedText({ index: range?.index, length: range?.length });
    setShowAddCommentModal(true);
  };

  const onAddComment = () => {
    setComments([
      {
        id: `comment_${comments?.length + 1}_${Date.now()}`,
        comment: commentText,
        index: selectedText?.index,
        length: selectedText?.length,
        time: Date.now(),
      },
      ...comments,
    ]);
    handleCommentModalClose();
  };

  const handleVoiceArjustment = () => {
    const range = quillRef?.current?.getEditor()?.getSelection();
    setSelectedText({ index: range?.index, length: range?.length });
    setShowVoiceModal(true);
  };

  const onTextChange = (delta, oldDelta, source) => {
    const range = quillRef?.current?.getEditor()?.getSelection();
    if (voiceSettings?.length <= 0 && comments?.length <= 0) {
      return;
    }

    if (delta?.ops[1]?.hasOwnProperty("insert")) {
      const newSettings = voiceSettings?.map((settings) => {
        if (settings?.index >= range?.index - 1) {
          return {
            ...settings,
            index: settings?.index + 1,
          };
        } else if (settings?.index + settings?.length >= range?.index) {
          return {
            ...settings,
            length: settings?.length + 1,
          };
        } else {
          return settings;
        }
      });
      setVoiceSettings(newSettings);
      const newComments = comments?.map((comment) => {
        if (comment?.index >= range?.index - 1) {
          return {
            ...comment,
            index: comment?.index + 1,
          };
        } else if (comment?.index + comment?.length >= range?.index) {
          return {
            ...comment,
            length: comment?.length + 1,
          };
        } else {
          return comment;
        }
      });
      setComments(newComments);
    } else if (delta?.ops[1]?.hasOwnProperty("delete")) {
      const newSettings = voiceSettings?.map((settings) => {
        if (settings?.index > range?.index) {
          return {
            ...settings,
            index: settings?.index - 1,
          };
        } else if (settings?.index + settings?.length > range?.index) {
          return {
            ...settings,
            length: settings?.length - 1,
          };
        } else {
          return settings;
        }
      });
      setVoiceSettings(newSettings);
      const newComments = comments?.map((comment) => {
        if (comment?.index > range?.index) {
          return {
            ...comment,
            index: comment?.index - 1,
          };
        } else if (comment?.index + comment?.length > range?.index) {
          return {
            ...comment,
            length: comment?.length - 1,
          };
        } else {
          return comment;
        }
      });
      setComments(newComments);
    }
  };

  useEffect(() => {
    editor && editor.on("text-change", onTextChange);
  }, [editor, voiceSettings, comments]);

  const handleTextChange = (value) => {
    setEditorState(value);
  };

  const highlightText = (comment) => {
    editor?.setSelection(comment?.index, comment?.length);
  };

  const updateCommentText = (event) => {
    setCommentText(event?.target?.value || "");
  };

  const handleBlur = (range) => {
    savedRangeRef.current = range;
  };

  const handleFocus = () => {
    if (savedRangeRef.current) {
      savedRangeRef.current = { index: 0, length: 0 };
    }
  };

  const handleCommentModalClose = () => setShowAddCommentModal(false);

  const handleVoiceModalClose = () => setShowVoiceModal(false);

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
          voice: handleVoiceArjustment,
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

  return (
    <>
      <div className="text-editor-wrapper">
        <div className="text-editor-container">
          <span className="editor-title">Text Editor</span>
          <ReactQuill
            ref={quillRef}
            defaultValue={editorState}
            onChange={handleTextChange}
            theme="snow"
            modules={modules}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <CustomToolbar
            showToolbar={showToolbar}
            toolbarPosition={toolbarPosition}
          />
        </div>
        <div className="comments-container">
          <CommentsCard
            comments={comments}
            setComments={setComments}
            highlightText={highlightText}
          />
          <VoiceSettingsCard
            voiceSettings={voiceSettings}
            setVoiceSettings={setVoiceSettings}
            highlightText={highlightText}
          />
        </div>
      </div>
      {showAddCommentModal && (
        <CommentModal
          handleCommentModalClose={handleCommentModalClose}
          updateCommentText={updateCommentText}
          onAddComment={onAddComment}
          showAddCommentModal={showAddCommentModal}
        />
      )}
      {showVoiceModal && (
        <VoiceModal
          showVoiceModal={showVoiceModal}
          handleVoiceModalClose={handleVoiceModalClose}
          saveVoiceSettings={saveVoiceSettings}
        />
      )}
    </>
  );
};

export default TextEditor;
