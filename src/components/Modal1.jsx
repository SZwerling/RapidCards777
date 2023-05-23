import Modal from 'react-bootstrap/Modal';

function Modal1({ body, title, show, handleClose }) {
  return (
    <Modal centered show={show} onHide={handleClose}>
    <Modal.Header closeButton>
       <Modal.Title>
         {title}
       </Modal.Title>
    </Modal.Header>
    <Modal.Body>
       {body}
    </Modal.Body>
    <Modal.Footer></Modal.Footer>
 </Modal>
  )
}

export default Modal1;