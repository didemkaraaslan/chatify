import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { Icon } from "semantic-ui-react";

const UserPanel = () => {
  const firebase = useFirebase();

  const profile = useSelector((state) => state.firebase.profile);

  const signOut = () => {
    firebase.logout();
  };
  return (
    <div
      style={{ padding: 2, display: "flex", justifyContent: "space-between" }}
    >
      <p>{profile?.name}</p>
      <div>
        <Icon name="sign out" onClick={() => signOut()} />
      </div>
    </div>
  );
};

export default UserPanel;
