export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface BasicEntry {
    id: string;
    type: string;
    date: string;
    specialist: string;
    description: string;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthCareEntry extends BasicEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    diagnosisCodes?: Array<string>;
    sickLeave?: SickLeave;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BasicEntry {
    type: 'Hospital';
    diagnosisCodes: Array<string>;
    discharge: Discharge;
}

interface HealthCheckEntry extends BasicEntry {
    type: 'HealthCheck';
    healthCheckRating: number;
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;

export enum Gender {
    Female = "female",
    Male = "male",
    Other = "other"
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;