import React from "react";
import moment from "moment";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Avatar, Card, CardHeader, Tooltip } from "@mui/material";

import "./VoiceSettingsCard.css";

const VoiceSettingsCard = (props) => {
  const { voiceSettings, setVoiceSettings, highlightText } = props;

  const onDeleteSettings = (id) => {
    setVoiceSettings([
      ...voiceSettings?.filter((settings) => settings?.id !== id),
    ]);
  };

  return (
    <div className="voice-settings-wrapper">
      {voiceSettings?.length <= 0 ? (
        <div />
      ) : (
        voiceSettings?.map((settings) => {
          return (
            <Card
              key={voiceSettings?.id}
              onClick={() =>
                highlightText({
                  index: settings?.index,
                  length: settings?.length,
                })
              }
            >
              <CardHeader
                avatar={
                  <Avatar variant="circular">
                    <SettingsRoundedIcon />
                  </Avatar>
                }
                title="Voice Settings"
                subheader={moment(settings?.id).format("YYYY/MM/DD kk:mm")}
                action={
                  <Tooltip title="delete comment">
                    <DeleteForeverRoundedIcon
                      className="card-delete-button"
                      onClick={() => onDeleteSettings(settings?.id)}
                    />
                  </Tooltip>
                }
              />
              <div className="voice-settings-card-body">
                <span className="voice-settings">
                  Voice Pitch : {settings?.settings?.voicePitch}
                </span>
                <span className="voice-settings">
                  Voice Pitch : {settings?.settings?.pause}
                </span>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default VoiceSettingsCard;
