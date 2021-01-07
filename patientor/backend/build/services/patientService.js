"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const getNonSensitiveEntries = () => {
    return patients_1.default
        .map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
const getEntries = () => {
    return patients_1.default;
};
const getEntryById = (id) => {
    const patient = patients_1.default.find(p => p.id === id);
    return patient || false;
};
const addEntry = (newEntry) => {
    const id = uuid_1.v4();
    const newPatient = Object.assign(Object.assign({}, newEntry), { id });
    patients_1.default.push(newPatient);
    return {
        id: newPatient.id,
        name: newPatient.name,
        dateOfBirth: newPatient.dateOfBirth,
        gender: newPatient.gender,
        occupation: newPatient.occupation,
    };
};
exports.default = {
    getEntryById,
    getEntries,
    getNonSensitiveEntries,
    addEntry
};
