/* eslint-disable @typescript-eslint/no-explicit-any */

import { EntryTypes } from '../../types';

const validators: {
    [key: string]: (value: any | string) => string | false;
} = {
    type: (value: any) => !Object.values(EntryTypes).includes(value) && 'Invalid Type',
    date: (value: string) => !isDate(value) && 'Invalid date',
    specialist: (value: string) => !value && 'Name of specialist missing',
    description: (value: string) => !value && 'Missing description',
    healthCheckRating: (value: string) => ![0, 1, 2, 3].includes(+value) && 'Invalid health check rating',
    'discharge.date': (value: string) => !isDate(value) && 'Invalid discharge date',
    'discharge.criteria': (value: string) => !value && 'Discharge criteria missing',
    employerName: (value: string) => !value && 'Missing employer',
    'sickLeave.startDate': (value: string) => value && !isDate(value) && 'Invalid sick leave start',
    'sickLeave.endDate': (value: string) => value && !isDate(value) && 'Invalid sick leave end'
};

function isDate(value: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export default validators;