/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FormEvent } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Table, Button } from "semantic-ui-react";
import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { addEntry, getPatientDetails, useStateValue } from "../state";
import HealthRatingBar from "../components/HealthRatingBar";
import { EntriesList, AddEntryModal } from "./Entries";
import validators from './Entries/EntryValidators';

type EntryFormValues = Omit<Entry, "id">;

const PatientDetailsPage: React.FC = () => {
    const id = useParams<{ id: string }>().id;
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [{ patients }, dispatch] = useStateValue();
    const patient: Patient = patients[id];
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    const submitNewEntry = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!event.target) return;

        const form = event.target as HTMLFormElement;
        const formEntries = [...new FormData(form)];
        const errors = formEntries.map(([key, val]: [string, FormDataEntryValue]) => {
            return validators[key] && validators[key](val);
        }).filter(Boolean);

        if (errors.length) {
            setError(errors.join(' | '));
            return;
        }

        const values = formEntries.reduce(
            (obj: { [key: string]: any }, [key, val]: [string, FormDataEntryValue]) => {
                if (key === 'diagnosis') {
                    if (Array.isArray(obj.diagnosisCodes)) obj.diagnosisCodes.push(val);
                    else obj.diagnosisCodes = [val];
                } else if (key.includes('.')) {
                    const [parent, child] = key.split('.');
                    if (obj[parent]) {
                        obj[parent][child] = val;
                    } else {
                        obj[parent] = { [child]: val };
                    }
                } else {
                    obj[key] = val;
                }
                return obj;
            }, {}) as EntryFormValues;

        axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values)
            .then(({ data }) => {
                closeModal();
                dispatch(addEntry(id, data));
            }).catch((e) => {
                console.error(e.response.data);
                setError(e.response.data);
            });
    };

    React.useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const { data: patientDetails } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(getPatientDetails(patientDetails));
            } catch (e) {
                console.error(e);
            }
        };
        if (!patient || !patient.ssn) {
            fetchPatientDetails();
        }
    }, [dispatch, id, patient]);

    if (!patient) return <div>...loading</div>;

    return (
        <div className="App">
            <Container textAlign="center">
                <h3>Details of {patient.name}</h3>
            </Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Date of birth</Table.HeaderCell>
                        <Table.HeaderCell>Gender</Table.HeaderCell>
                        <Table.HeaderCell>SSN</Table.HeaderCell>
                        <Table.HeaderCell>Occupation</Table.HeaderCell>
                        <Table.HeaderCell>Entries</Table.HeaderCell>
                        <Table.HeaderCell>Health Rating</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{patient.name}</Table.Cell>
                        <Table.Cell>{patient.dateOfBirth || '-'}</Table.Cell>
                        <Table.Cell>{patient.gender}</Table.Cell>
                        <Table.Cell>{patient.ssn}</Table.Cell>
                        <Table.Cell>{patient.occupation}</Table.Cell>
                        <Table.Cell>
                            {patient.entries && patient.entries.length
                                ? <EntriesList entries={patient.entries} />
                                : '-'
                            }
                            <AddEntryModal
                                modalOpen={modalOpen}
                                error={error}
                                onSubmit={submitNewEntry}
                                onClose={closeModal}
                            />
                            <Button onClick={() => setModalOpen(true)}>Add New Entry</Button>
                        </Table.Cell>
                        <Table.Cell>
                            <HealthRatingBar showText={false} rating={1} />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
};

export default PatientDetailsPage;
