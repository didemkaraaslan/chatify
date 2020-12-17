import React from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";
import styles from "./message.module.css";

const isMedia = (message) => message.hasOwnProperty("image");

const timeFromNow = (timestamp) => moment(timestamp).fromNow();
const Message = ({ message }) => (
  <Comment>
    <Comment.Avatar src={message.user.avatar} />
    <Comment.Content>
      <Comment.Author as="a">{message.user.name}</Comment.Author>
      <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>

      {isMedia(message) ? (
        <Image src={message.image} className={styles.image} />
      ) : (
        <Comment.Text>{message.content}</Comment.Text>
      )}
    </Comment.Content>
  </Comment>
);

export default Message;
