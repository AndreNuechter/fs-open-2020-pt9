/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatient, Gender } from "../types";

export default function toNewPatient(requestBody: any): NewPatient {
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
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries
    };
}

function isString(val: any): boolean {
    return typeof val === 'string';
}

function isDate(val: string): boolean {
    return /\d{4}-\d{2}-\d{2}/.test(val);
}

function isGender(val: any): boolean {
    return Object.values(Gender).includes(val);
}