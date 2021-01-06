import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Table } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { getPatientDetails, useStateValue } from "../state";
import HealthRatingBar from "../components/HealthRatingBar";

const PatientDetailsPage: React.FC = () => {
    const id = useParams<{ id: string; }>().id;

    const [{ patients }, dispatch] = useStateValue();
    const patient: Patient = patients[id];

    React.useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const { data: patientDetails } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(getPatientDetails(patientDetails));
            } catch (e) {
                console.error(e);
            }
        };
        if (!patient) {
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
                        <Table.Cell>{patient.entries
                            ? <ul>{patient.entries.map(e => <li key={e}>{e}</li>)}</ul>
                            : '-'}</Table.Cell>
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
