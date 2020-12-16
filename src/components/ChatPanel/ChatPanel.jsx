import React from "react";
import { useSelector } from "react-redux";
import {
  Header,
  Segment,
  Comment,
  Icon,
  Input,
  Button,
} from "semantic-ui-react";

const ChatPanel = () => {
  const currentChannel = useSelector((state) => state.channels.currentChannel);
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
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
          <p>sadasdsadsa</p>
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
        <Input
          fluid
          name="message"
          label={<Button icon="add" />}
          labelPosition="left"
          placeholder={`#${currentChannel?.value?.name} kanalına mesaj gönder`}
        />
      </Segment>
    </>
  );
};

export default ChatPanel;
