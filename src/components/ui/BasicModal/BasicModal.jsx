import "./BasicModal.css";
import { Modal } from "react-bootstrap";

export default function BasicModal({ show, onHide, title, children }) {
  if (!show) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="true"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
}