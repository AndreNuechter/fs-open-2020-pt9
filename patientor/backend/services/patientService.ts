import { v4 as getId } from 'uuid';
import patients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

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
    getEntryById,
    getEntries,
    getNonSensitiveEntries,
    addEntry
};