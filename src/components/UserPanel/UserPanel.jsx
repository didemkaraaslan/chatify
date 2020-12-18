import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { Icon } from "semantic-ui-react";

const UserPanel = () => {
  const firebase = useFirebase();

  const signOut = () => {
    firebase.logout();
  };
  return (
    <div
      style={{ padding: 2, display: "flex", justifyContent: "space-between" }}
    >
      <p>Didem</p>
      <div>
        <Icon name="sign out" onClick={() => signOut()} />
      </div>
    </div>
  );
};

export default UserPanel;
