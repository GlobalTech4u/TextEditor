import React, { useState } from "react";
import { DraggableCore } from "react-draggable";

import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";

import { convertPixelsToRange } from "../../helpers/voiceSettings";
import { PIXELS_PER_RANGE, RANGE } from "../../constants/voiceSettings";

import "./VoiceModal.css";

const VoiceModal = (props) => {
  const { showVoiceModal, handleVoiceModalClose, saveVoiceSettings } = props;

  const [voicePitchPosition, setVoicePitchPosition] = useState({ x: 0, y: 0 });
  const [pausePosition, setPausePosition] = useState({ x: 0, y: 0 });
  const [voiceSettings, setVoiceSettings] = useState({
    pause: 0,
    voicePitch: 0,
  });

  const updateVoicePitch = (e, data) => {
    let newX = data.x;
    if (newX < 0) {
      newX = 0;
    }
    // Assuming each unit is 85px for visualization
    if (newX > RANGE * PIXELS_PER_RANGE) {
      newX = RANGE * PIXELS_PER_RANGE;
    }

    setVoicePitchPosition({ x: newX, y: 0 });

    // Convert back to the range 0-5
    const value = convertPixelsToRange(newX);
    setVoiceSettings({
      ...voiceSettings,
      voicePitch: value,
    });
  };

  const updatePause = (e, data) => {
    let newX = data.x;
    if (newX < 0) {
      newX = 0;
    }
    // Assuming each unit is 85px for visualization
    if (newX > RANGE * PIXELS_PER_RANGE) {
      newX = RANGE * PIXELS_PER_RANGE;
    }

    setPausePosition({ x: newX, y: 0 });

    // Convert back to the range 0-5
    const value = convertPixelsToRange(newX);
    setVoiceSettings({
      ...voiceSettings,
      pause: value,
    });
  };

  const updateVoiceSettings = () => {
    saveVoiceSettings(voiceSettings);
  };

  return (
    <Modal open={showVoiceModal} onClose={handleVoiceModalClose}>
      <div className="voice-modal-container">
        <div className="voice-modal-header">
          <h2 className="modal-title">Adjust Voice Settings</h2>
          <HighlightOffRoundedIcon
            className="modal-close-icon"
            onClick={handleVoiceModalClose}
          />
        </div>
        <div className="voice-modal-points-container">
          <div
            style={{ width: "450px", height: "100px", position: "relative" }}
          >
            <div className="voice-setting-header">
              <span>Voice Pitch (Hz) </span>
              <span>{voiceSettings?.voicePitch || 0}</span>
            </div>
            <DraggableCore axis="x" onDrag={updateVoicePitch}>
              <div
                style={{
                  width: "auto",
                  height: "auto",
                  position: "absolute",
                  top: "40px",
                  left: `${voicePitchPosition.x}px`,
                }}
              >
                <GpsFixedRoundedIcon />
              </div>
            </DraggableCore>
            <div
              style={{
                position: "absolute",
                top: "70px",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {[...Array(6).keys()].map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
          </div>
          <div
            style={{ width: "450px", height: "100px", position: "relative" }}
          >
            <div className="voice-setting-header">
              <span>Pause (in seconds) </span>
              <span>{voiceSettings?.pause || 0}</span>
            </div>
            <DraggableCore axis="x" onDrag={updatePause}>
              <div
                style={{
                  width: "auto",
                  height: "auto",
                  position: "absolute",
                  top: "40px",
                  left: `${pausePosition.x}px`,
                }}
              >
                <GpsFixedRoundedIcon />
              </div>
            </DraggableCore>
            <div
              style={{
                position: "absolute",
                top: "70px",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {[...Array(6).keys()].map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="voice-modal-footer">
          <Button variant="contained" onClick={updateVoiceSettings}>
            Update
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default VoiceModal;
