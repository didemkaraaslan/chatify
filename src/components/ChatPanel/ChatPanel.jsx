import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
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
  useFirebaseConnect([
    { path: `/messages/${currentChannel.key}`, storeAs: "channelMessages" },
  ]);
  const channelMessages = useSelector(
    (state) => state.firebase.ordered.channelMessages
  );

  const firebase = useFirebase();
  const currentUserUid = useSelector((state) => state.firebase.auth.uid);
  const profile = useSelector((state) => state.firebase.profile);

  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

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
          </span>
        </Header>
      </Segment>
      {/* Message Area */}
      <Segment basic>
        <Comment.Group
          style={{
            height: "80vh",
            overflowY: "auto",
            maxWidth: "100%",
          }}
        >
          {channelMessages &&
            channelMessages.map(({ key, value }) => (
              <Message key={key} message={value} />
            ))}
        </Comment.Group>
      </Segment>

      {/* Send Message */}
      <Segment
        style={{
          position: "fixed",
          bottom: 0,
          width: "80%",
          display: "flex",
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
        <Form onSubmit={handleSubmit} style={{ flex: "1" }}>
          <Input
            fluid
            name="message"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            labelPosition="left"
            placeholder={`#${currentChannel?.name} kanalına mesaj gönder`}
          />
        </Form>
      </Segment>
    </>
  );
};

export default ChatPanel;
