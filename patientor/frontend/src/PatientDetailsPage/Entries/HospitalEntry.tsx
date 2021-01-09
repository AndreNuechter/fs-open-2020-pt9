import React from 'react';
import { HospitalEntry } from '../../types';
import DiagnosesList from './DiagnosesList';

const HospitalEntryView: React.FC<{ entry: HospitalEntry }> = ({ entry }) => <li>
    <h3>Hospital Entry</h3>
    <p>From {entry.date} to {entry.discharge.date}</p>
    <p>{entry.description}</p>
    <p>Treated by: {entry.specialist}</p>
    <p>Final remark: {entry.discharge.criteria}</p>
    <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
</li>;

export default HospitalEntryView;