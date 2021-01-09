import React, { FormEvent } from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    error?: string;
}) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new Entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddEntryForm onClose={onClose} onSubmit={onSubmit} />
        </Modal.Content>
    </Modal>
);

export default AddPatientModal;