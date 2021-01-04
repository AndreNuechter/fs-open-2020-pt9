import patientData from '../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

const patients = patientData as Array<Patient>;

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
    return patients
        .map(({ id, name, dateOfBirth, gender, occupation }) => ({
            id, name, dateOfBirth, gender, occupation
        }));
};

const getEntries = (): Array<Patient> => {
    return patients;
};

const addEntry = (): null => {
    return null;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry
};