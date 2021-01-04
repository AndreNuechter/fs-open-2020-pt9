export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

type Gender = "female" | "male" | "diverse";

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;