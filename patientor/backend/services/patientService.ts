import { v4 as getId } from 'uuid';
import patientData from '../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

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

const addEntry = (newEntry: NewPatient): NonSensitivePatient => {
    const id = getId();
    const newPatient: Patient = { ...newEntry, id };
    patients.push(newPatient);
    return {
        id: newPatient.id,
        name: newPatient.name,
        dateOfBirth: newPatient.dateOfBirth,
        gender: newPatient.gender,
        occupation: newPatient.occupation,
    };
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry
};