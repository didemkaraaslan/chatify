import React from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

const UploadMedia = ({ open, onClose }) => {
  return (
    <Modal basic open={open} onClose={onClose}>
      <Modal.Header>Bir dosya seç</Modal.Header>
      <Input name="file" label="File types: jpg, png" type="file" />
    </Modal>
  );
};

export default UploadMedia;
