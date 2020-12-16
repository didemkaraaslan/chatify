import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";

const CreateChannelForm = ({ open, onClose, onOpen }) => {
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const { register, errors, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register({ name: "name" }, { required: true });
    register({ name: "description" }, { required: true, minLength: 20 });
  }, []);

  const onSubmit = ({ name, description }) => {
    firebase.push("channels", {
      name,
      description,
      createdBy: {
        name: profile.name,
        avatar: profile.avatar,
      },
    });

    onClose();
  };
  return (
    <Modal onClose={onClose} onOpen={onOpen} open={open}>
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
        <Button color="black" onClick={() => onClose()}>
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
  );
};

export default CreateChannelForm;
