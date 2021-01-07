import React from 'react';
import { HealthCheckEntry } from '../../types';

const HealthCheckEntryView: React.FC<{ entry: HealthCheckEntry; }> = ({ entry }) => <li>
    <h3>Health check</h3>
    <p>{entry.date}</p>
    <p>{entry.description}</p>
    <p>Treated by: {entry.specialist}</p>
    <p>Rating: {entry.healthCheckRating}</p>
</li>;

export default HealthCheckEntryView;