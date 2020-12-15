import React from "react";
import { Grid } from "semantic-ui-react";
import HeaderPanel from "./components/HeaderPanel/HeaderPanel";
import SidePanel from "./components/SidePanel/SidePanel";
import ChatPanel from "./components/ChatPanel/ChatPanel";

const App = () => {
  return (
    <Grid columns="equal" style={{ background: "#eee", height: "100vh" }}>
      <SidePanel />

      <Grid.Column style={{}}>
        <HeaderPanel />
        <ChatPanel />
      </Grid.Column>
    </Grid>
  );
};

export default App;
