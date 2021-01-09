import React from 'react';
import { useStateValue } from '../../state';

const DiagnosisCodesSelection: React.FC = () => {
    const [{ diagnoses }] = useStateValue();

    return <fieldset>
        <legend>Diagnoses</legend>
        {diagnoses.map(d => (<div key={d.code}>
            <label>{d.name} ({d.code}) <input name="diagnosis" type="checkbox" value={d.code} />
            </label>
        </div>))}
    </fieldset>;
};

export default DiagnosisCodesSelection;