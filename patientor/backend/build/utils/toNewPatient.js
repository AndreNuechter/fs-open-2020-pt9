"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
function toNewPatient(requestBody) {
    const { name, dateOfBirth, ssn, gender, occupation, entries } = requestBody;
    if (!name || !isString(name)) {
        throw new Error(`missing or invalid name ${name}`);
    }
    else if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error(`missing or invalid dob ${dateOfBirth}`);
    }
    else if (!ssn || !isString(ssn)) {
        throw new Error(`missing or invalid ssn ${ssn}`);
    }
    else if (!gender || !isGender(gender)) {
        throw new Error(`missing or invalid gender ${gender}`);
    }
    else if (!occupation || !isString(occupation)) {
        throw new Error(`missing or invalid occupation ${occupation}`);
    }
    else if (!entries || !Array.isArray(entries)) {
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
exports.default = toNewPatient;
function isString(val) {
    return typeof val === 'string';
}
function isDate(val) {
    return /\d{4}-\d{2}-\d{2}/.test(val);
}
function isGender(val) {
    return Object.values(types_1.Gender).includes(val);
}
