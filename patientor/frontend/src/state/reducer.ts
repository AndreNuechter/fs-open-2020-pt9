import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
    | {
        type: "SET_PATIENT_LIST";
        payload: Patient[];
    }
    | {
        type: "ADD_PATIENT";
        payload: Patient;
    }
    | {
        type: "STORE_PATIENT_DETAILS",
        payload: Patient;
    }
    | {
        type: "SET_DIAGNOSES_LIST";
        payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients
                }
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case "STORE_PATIENT_DETAILS":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case "SET_DIAGNOSES_LIST":
            return {
                ...state,
                diagnoses: action.payload
            };
        default:
            return state;
    }
};

export const getPatientDetails = (details: Patient): Action => ({ type: "STORE_PATIENT_DETAILS", payload: details });
export const addPatient = (newPatient: Patient): Action => ({ type: "ADD_PATIENT", payload: newPatient });
export const setPatientList = (patientListFromApi: Array<Patient>): Action => ({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
export const setDiagnosesList = (diagnosesList: Array<Diagnosis>): Action => ({ type: "SET_DIAGNOSES_LIST", payload: diagnosesList });
