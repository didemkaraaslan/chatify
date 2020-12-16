import React from "react";
import { Grid } from "semantic-ui-react";
import SidePanel from "./components/SidePanel/SidePanel";
import ChatPanel from "./components/ChatPanel/ChatPanel";

const App = () => {
  return (
    <Grid columns="2" style={{ background: "#eee", height: "110vh" }}>
      <Grid.Row>
        <Grid.Column width={3} style={{ background: "red" }}>
          <SidePanel />
        </Grid.Column>

        <Grid.Column style={{ background: "#40444b" }} width={13}>
          <ChatPanel />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default App;
