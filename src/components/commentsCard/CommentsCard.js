import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";

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
          <Card onClick={() => highlightText(comment)}>
            <div className="comment-card-body">
              <div className="avtar-container">
                <Avatar variant="circular">
                  <InsertCommentRoundedIcon />
                </Avatar>
                <span className="date-time">
                  {moment(comment?.time).format("YYYY/MM/DD kk:mm:ss")}
                </span>
              </div>
              <span className="comment">{comment?.comment}</span>
              <Button
                className="card-delete-button"
                variant="text"
                onClick={() => onDeleteComment(comment?.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CommentsCard;
