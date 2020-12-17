import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useFirebaseConnect } from "react-redux-firebase";
import {
  Header,
  Segment,
  Comment,
  Icon,
  Input,
  Form,
  Button,
} from "semantic-ui-react";
import Message from "./Message";

const { uuid } = require("uuidv4");

const ChatPanel = ({ currentChannel }) => {
  useFirebaseConnect([{ path: `/messages/${currentChannel.key}` }]);
  const channelMessages = useSelector(
    (state) => state.firebase.ordered.messages
  );

  const firebase = useFirebase();
  const currentUserUid = useSelector((state) => state.firebase.auth.uid);
  const profile = useSelector((state) => state.firebase.profile);

  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("hello");

    if (content !== "") {
      const message = {
        content,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          id: currentUserUid,
          name: profile.name,
          avatar: profile.avatar,
        },
      };

      // Send a message
      firebase.push(`messages/${currentChannel.key}`, message).then(() => {
        setContent("");
      });
    }
  };

  const sendMediaMessage = (url) => {
    const message = {
      image: url,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUserUid,
        name: profile.name,
        avatar: profile.avatar,
      },
    };
    // Send a message
    firebase.push(`messages/${currentChannel.key}`, message).then(() => {
      console.log("finish");
    });
  };

  const uploadMedia = (event) => {
    const file = event.target.files[0];

    if (file) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`chat/public/${uuid()}.jpg`);
      return fileRef
        .put(file)
        .then((snap) => {
          fileRef.getDownloadURL().then((downloadURL) => {
            sendMediaMessage(downloadURL);
          });
        })
        .catch((err) => console.error("error uploading file", err));
      console.log(file);
    }
  };

  const fileInputRef = useRef(null);

  return (
    <>
      <Segment clearing>
        <Header as="h3" floated="left">
          <span>
            <Icon name="hashtag" />
            {currentChannel?.value?.name}
            <Header.Subheader>2 Users</Header.Subheader>
          </span>
        </Header>

        <Header floated="right">aa</Header>
      </Segment>
      {/* Message Area */}
      <Segment>
        <Comment.Group
          style={{
            height: "719px",
            overflowY: "auto",
            maxWidth: "100%",
          }}
        >
          {channelMessages &&
            currentChannel &&
            channelMessages[`${currentChannel.key}`]?.map(({ key, value }) => (
              <Message key={key} message={value} />
            ))}
        </Comment.Group>
      </Segment>

      {/* Send Message */}
      <Segment
        style={{
          position: "fixed",
          bottom: 0,
          width: "calc(100% - 352px)",
        }}
      >
        <Button icon onClick={() => fileInputRef.current.click()}>
          <Icon name="add" />
          <input
            name="file"
            type="file"
            ref={fileInputRef}
            onChange={uploadMedia}
          />
        </Button>
        <Form onSubmit={handleSubmit}>
          <Input
            fluid
            name="message"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            labelPosition="left"
            placeholder={`#${currentChannel?.value?.name} kanalına mesaj gönder`}
          />
        </Form>
      </Segment>
    </>
  );
};

export default ChatPanel;
