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

export interface OccupationalHealthCareEntry extends BasicEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    diagnosisCodes?: Array<string>;
    sickLeave?: SickLeave;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BasicEntry {
    type: 'Hospital';
    diagnosisCodes: Array<string>;
    discharge: Discharge;
}

export interface HealthCheckEntry extends BasicEntry {
    type: 'HealthCheck';
    healthCheckRating: number;
}

export enum EntryTypes {
    OccupationalHealthcare = "OccupationalHealthcare",
    Hospital = "Hospital",
    HealthCheck = "HealthCheck"
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Array<Entry>;
}
