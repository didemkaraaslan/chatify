import React from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";
import styles from "./message.module.css";

const isOwnMessage = (message, currentUserUid) => {
  return message.user.id === currentUserUid ? styles.message__self : "";
};

const timeFromNow = (timestamp) => moment(timestamp).fromNow();
const Message = ({ message, currentUserUid }) => (
  <Comment>
    <Comment.Avatar src={message.user.avatar} />
    <Comment.Content className={isOwnMessage(message, currentUserUid)}>
      <Comment.Author as="a">{message.user.name}</Comment.Author>
      <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
      <Comment.Text>{message.content}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default Message;
