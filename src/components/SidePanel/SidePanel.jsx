import React, { useState } from "react";
import { Icon, Popup, Menu } from "semantic-ui-react";
import UserPanel from "../UserPanel/UserPanel";

import ChannelList from "../Channels/ChannelList";
import CreateChannelForm from "../Channels/CreateChannelForm";

const SidePanel = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Menu
        vertical
        inverted
        secondary
        style={{
          width: "346px",
          fontSize: "1.2rem",
          background: "#202225",
          height: "100vh",
        }}
      >
        <Menu.Item>
          <UserPanel />
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>
            Kanallar
            <span style={{ float: "right" }}>
              <Popup
                content="Yeni kanal oluştur"
                trigger={<Icon name="add" onClick={(event) => handleOpen()} />}
              />
            </span>
          </Menu.Header>
          {/* Channels */}
          <ChannelList />
        </Menu.Item>

        {/* <Menu.Item>
          <Menu.Header>Mesajlar</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="Ayse"
              as="a"
              active={activeItem === "Ayse"}
              onClick={(e, { name }) => setActiveChannel(name)}
            />
            <Menu.Item
              name="Mehmet"
              as="a"
              active={activeItem === "Mehmet"}
              onClick={(e, { name }) => setActiveChannel(name)}
            />
          </Menu.Menu>
        </Menu.Item> */}
      </Menu>

      <CreateChannelForm
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
      />
    </>
  );
};

export default SidePanel;
