import React from 'react';
import { OccupationalHealthCareEntry } from '../../types';
import DiagnosesList from './DiagnosesList';

const OccupationalHealthCareEntryView: React.FC<{ entry: OccupationalHealthCareEntry; }> = ({ entry }) => <li>
    <h3>Occupational check-up</h3>
    <p>Employer: {entry.employerName}</p>
    <p>{entry.date}</p>
    <p>{entry.description}</p>
    <p>Checked by: {entry.specialist}</p>
    {entry.sickLeave && <p>
        Sick from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
    </p>}
    {entry.diagnosisCodes && <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />}
</li>;

export default OccupationalHealthCareEntryView;