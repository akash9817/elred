import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function ModalComponent(props) {
    const { show, handleClose, title, children, closeButton = true, size = "lg" } = props;
    return (
      <Modal show={show} onHide={handleClose} size={size}>
        <Modal.Header closeButton={closeButton}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    );
}

export default ModalComponent