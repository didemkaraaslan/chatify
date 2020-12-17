import React, { useState } from "react";
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
  };

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
            height: "100vh",
            overflowY: "auto",
            maxWidth: "100%",
          }}
        >
          {channelMessages &&
            currentChannel &&
            channelMessages[`${currentChannel.key}`]?.map(({ key, value }) => (
              <Message
                key={key}
                message={value}
                currentUserUid={currentUserUid}
              />
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
        <Form onSubmit={handleSubmit}>
          <Input
            fluid
            name="message"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            label={<Button icon="add" />}
            labelPosition="left"
            placeholder={`#${currentChannel?.value?.name} kanalına mesaj gönder`}
          />
        </Form>
      </Segment>
    </>
  );
};

export default ChatPanel;
