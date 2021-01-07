import React from 'react';
import { useStateValue } from '../../state';

const DiagnosisCodes: React.FC<{ diagnosisCodes: string[]; }> = ({ diagnosisCodes }) => {
    const [{ diagnoses }] = useStateValue();

    return <>
        <h4>Diagnoses</h4>
        <ul>
            {diagnosisCodes.map(c => {
                const diagnosis = diagnoses.find(d => d.code === c);
                return <li key={c}>
                    {c}{diagnosis && ` ${diagnosis.name}`}
                </li>;
            })}
        </ul></>;
};

export default DiagnosisCodes;