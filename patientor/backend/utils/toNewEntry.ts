/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { v4 as getId } from 'uuid';
import { Entry, HospitalEntry, OccupationalHealthCareEntry } from "../types";
import { assertNever, isDate, isDiagnosisCodes, isString } from './validators';

export default function toNewEntry(requestBody: any): Entry {
    const newEntry = requestBody as Entry;
    let invalid;

    if (!isDate(newEntry.date)) {
        throw new Error('Invalid date');
    }

    if (!isString(newEntry.specialist)) {
        throw new Error('Specialist name is not a string');
    }

    if (!isString(newEntry.description)) {
        throw new Error('Description is not a string');
    }

    switch (newEntry.type) {
        case 'OccupationalHealthcare':
            invalid = validateOccupationalHealthcareEntry(newEntry);

            if (invalid) {
                throw new Error(invalid);
            }

            return {
                id: getId(),
                type: newEntry.type,
                date: newEntry.date,
                specialist: newEntry.specialist,
                description: newEntry.description,
                employerName: newEntry.employerName,
                diagnosisCodes: newEntry.diagnosisCodes,
                sickLeave: newEntry.sickLeave
            };
        case 'Hospital':
            invalid = validateHospitalEntry(newEntry);

            if (invalid) {
                throw new Error(invalid);
            }

            return {
                id: getId(),
                type: newEntry.type,
                date: newEntry.date,
                specialist: newEntry.specialist,
                description: newEntry.description,
                diagnosisCodes: newEntry.diagnosisCodes,
                discharge: newEntry.discharge
            };
        case 'HealthCheck':
            if (Number.isNaN(+newEntry.healthCheckRating)) {
                throw new Error('Invalid health check rating');
            }

            return {
                id: getId(),
                type: newEntry.type,
                date: newEntry.date,
                specialist: newEntry.specialist,
                description: newEntry.description,
                healthCheckRating: +newEntry.healthCheckRating
            };
        default:
            assertNever(newEntry);
    }
}

function validateHospitalEntry(newEntry: HospitalEntry): string | false {
    if (newEntry.diagnosisCodes && !isDiagnosisCodes(newEntry.diagnosisCodes)) {
        return 'Invalid diagnosis';
    }

    if (!newEntry.diagnosisCodes.length) {
        return 'Diagnosis codes are missing';
    }

    if (!newEntry.discharge) {
        return 'Discharge is missing';
    }

    if (!(newEntry.discharge.date && newEntry.discharge.criteria && isDate(newEntry.discharge.date) && isString(newEntry.discharge.criteria))) {
        return 'Invalid discharge';
    }

    return false;
}

function validateOccupationalHealthcareEntry(newEntry: OccupationalHealthCareEntry): string | false {
    if (!isString(newEntry.employerName)) {
        return 'Employer name is not a string';
    }

    if (newEntry.diagnosisCodes
        && !isDiagnosisCodes(newEntry.diagnosisCodes)) {
        return 'Invalid diagnosis';
    }

    if (newEntry.sickLeave && (newEntry.sickLeave.startDate || newEntry.sickLeave.endDate) && !(isDate(newEntry.sickLeave.startDate) && isDate(newEntry.sickLeave.endDate))) {
        return 'Invalid sick-leave';
    }

    return false;
}