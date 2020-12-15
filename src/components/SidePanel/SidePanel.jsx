import React, { useState, useEffect } from "react";
import {
  useFirebase,
  useFirebaseConnect,
  isLoaded,
  isEmpty,
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Icon, Popup, Menu, Modal, Form, Button } from "semantic-ui-react";
import UserPanel from "../UserPanel/UserPanel";

const channelsQuery = {
  path: "channels",
  queryParams: ["limitToLast=10"],
};
const SidePanel = () => {
  const firebase = useFirebase();
  useFirebaseConnect(() => [channelsQuery]);

  const channels = useSelector((state) => state.firebase.ordered.channels);

  const [activeItem, setActiveItem] = useState("");
  const [open, setOpen] = useState(false);

  const { register, errors, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    register({ name: "name" }, { required: true });
    register({ name: "description" }, { required: true, minLength: 20 });
  }, []);

  const onSubmit = ({ name, description }) => {
    firebase.push("channels", {
      name,
      description,
    });
  };

  const resetForm = () => {};

  if (!isLoaded(channels)) {
    return "Loading";
  }

  if (isEmpty(channels)) {
    return "Todo list is empty";
  }

  return (
    <>
      <Menu
        vertical
        size="large"
        fixed="left"
        inverted
        secondary
        style={{
          fontSize: "1.2rem",
          background: "#202225",
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
                trigger={<Icon name="add" onClick={(event) => setOpen(true)} />}
              />
            </span>
          </Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="Genel"
              as="a"
              icon="hashtag"
              active={activeItem === "Genel"}
              onClick={(e, { name }) => setActiveItem(name)}
            />
            <Menu.Item
              name="Eğlence"
              as="a"
              icon="hashtag"
              active={activeItem === "Eğlence"}
              onClick={(e, { name }) => setActiveItem(name)}
            />
            <Menu.Item
              name="Dedikodu"
              as="a"
              icon="hashtag"
              active={activeItem === "Dedikodu"}
              onClick={(e, { name }) => setActiveItem(name)}
            />
            <Menu.Item
              name="Müzik"
              as="a"
              icon="hashtag"
              active={activeItem === "Müzik"}
              onClick={(e, { name }) => setActiveItem(name)}
            />
            <Menu.Item
              name="Yardım"
              as="a"
              icon="hashtag"
              active={activeItem === "Yardım"}
              onClick={(e, { name }) => setActiveItem(name)}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Mesajlar</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="Ayse"
              as="a"
              active={activeItem === "Ayse"}
              onClick={(e, { name }) => setActiveItem(name)}
            />
            <Menu.Item
              name="Mehmet"
              as="a"
              active={activeItem === "Mehmet"}
              onClick={(e, { name }) => setActiveItem(name)}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>

      <Modal
        onClose={() => {
          resetForm();
          setOpen(false);
        }}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Yeni Kanal Oluştur</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              name="name"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.name ? true : false}
              placeholder="#General"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              name="description"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.description ? true : false}
              placeholder="#Genel her türlü konunun konuşulabileceği bir kanaldır"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Vazgeç
          </Button>
          <Button
            content="Oluştur"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={() => handleSubmit(onSubmit)()}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default SidePanel;
