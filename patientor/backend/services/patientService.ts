import patients from '../data/patients';
import { Patient, NonSensitivePatient, Entry } from '../types';
import toNewEntry from '../utils/toNewEntry';

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
    return patients
        .map(({ id, name, dateOfBirth, gender, occupation }) => ({
            id, name, dateOfBirth, gender, occupation
        }));
};

const getEntries = (): Array<Patient> => {
    return patients;
};

const getEntryById = (id: string): Patient | boolean => {
    const patient: Patient | undefined = patients.find(p => p.id === id);
    return patient || false;
};

const addPatient = (patient: Patient): NonSensitivePatient => {
    patients.push(patient);
    return {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntryToPatient = (id: string, requestBody: any): Entry => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        throw new Error('Patient does not exist');
    }

    const newEntry = toNewEntry(requestBody);

    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getEntryById,
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    addEntryToPatient
};