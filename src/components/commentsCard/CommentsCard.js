import moment from "moment";

import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Avatar, Card, CardHeader, Tooltip } from "@mui/material";

import "./CommentsCard.css";

const CommentsCard = (props) => {
  const { comments, setComments, highlightText } = props;

  const onDeleteComment = (id) => {
    setComments([...comments?.filter((comment) => comment?.id !== id)]);
  };

  return (
    <div className="comments-wrapper">
      {comments?.map((comment) => {
        return (
          <Card onClick={() => highlightText(comment)} key={comment?.id}>
            <CardHeader
              avatar={
                <Avatar variant="circular">
                  <InsertCommentRoundedIcon />
                </Avatar>
              }
              title="Comment"
              subheader={moment(comment?.time).format("YYYY/MM/DD kk:mm")}
              action={
                <Tooltip title="delete comment">
                  <DeleteForeverRoundedIcon
                    className="card-delete-button"
                    onClick={() => onDeleteComment(comment?.id)}
                  />
                </Tooltip>
              }
            />
            <div className="comment-card-body">
              <span className="comment">{comment?.comment}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CommentsCard;
