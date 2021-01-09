/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { v4 as getId } from 'uuid';
import { NewPatient, Patient } from "../types";
import { isDate, isGender, isString } from './validators';

export default function toNewPatient(requestBody: any): Patient {
    const {
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries
    } = requestBody as NewPatient;

    if (!name || !isString(name)) {
        throw new Error(`missing or invalid name ${name}`);
    } else if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error(`missing or invalid dob ${dateOfBirth}`);
    } else if (!ssn || !isString(ssn)) {
        throw new Error(`missing or invalid ssn ${ssn}`);
    } else if (!gender || !isGender(gender)) {
        throw new Error(`missing or invalid gender ${gender}`);
    } else if (!occupation || !isString(occupation)) {
        throw new Error(`missing or invalid occupation ${occupation}`);
    } else if (!entries || !Array.isArray(entries)) {
        throw new Error('missing or invalid entries');
    }

    return {
        id: getId(),
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries
    };
}