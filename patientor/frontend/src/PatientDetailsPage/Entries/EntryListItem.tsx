import React from 'react';
import { Entry } from '../../types';
import HospitalEntryView from './HospitalEntry';
import HealthCheckEntryView from './HealthCheckEntry';
import OccupationalHealthCareEntryView from './OccupationalHealthcareEntry';

const EntryListItem: React.FC<Entry> = (entry) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryView entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntryView entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthCareEntryView entry={entry} />;
        default:
            assertNever(entry);
    }
};

export default EntryListItem;

function assertNever(value: never): never {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}
