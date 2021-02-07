import {Form,Modal,Button} from 'react-bootstrap'
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function modal(props) {
    return (
        <div>
            <Modal show={toggledModal} onHide={modalControl(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={modalControl(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={modalControl(false)}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
        </div>
    );
}

export default modal;