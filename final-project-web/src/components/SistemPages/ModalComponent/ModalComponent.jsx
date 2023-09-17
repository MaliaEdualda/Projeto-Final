import { Modal } from 'react-bootstrap';

export function ModalComponent(props) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <button className='submit-modal-button' type='submit' disabled={!props.isValid} onSubmit={props.onSubmit}>{props.buttonText}</button>
                <button className='close-modal-button' onClick={props.handleClose}>Fechar</button>
            </Modal.Footer>
        </Modal>
    );
}