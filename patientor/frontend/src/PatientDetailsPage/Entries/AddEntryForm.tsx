import React, { FormEvent, useState } from 'react';
import { Button } from 'semantic-ui-react';
import DiagnosisCodesSelection from './DiagnosesSelectionList';
import validators from './EntryValidators';

const AddEntryForm = ({ onSubmit, onClose }: {
    onClose: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    error?: string;
}) => {
    const [entryType, setEntryType] = useState('HealthCheck');
    const [dirty, setDirty] = useState(false);
    const typedEntryFormFragments: {
        [key: string]: JSX.Element;
    } = {
        Hospital: <>
            <fieldset>
                <legend>Discharge</legend>
                <label>
                    <div>Date</div>
                    <input name="discharge.date" placeholder="YYYY-MM-DD" />
                    <div className="validation-error"></div>
                </label>
                <label>
                    <div>Criteria</div>
                    <input name="discharge.criteria" placeholder="Criteria" />
                    <div className="validation-error"></div>
                </label>
            </fieldset>
            <DiagnosisCodesSelection />
        </>,
        HealthCheck: <label>
            <div>Rating</div>
            <input type="number" min="0" max="3" step="1" name="healthCheckRating" defaultValue="0" />
            <div className="validation-error"></div>
        </label>,
        OccupationalHealthcare: <>
            <label>
                <div>Employer</div>
                <input name="employerName" placeholder="Employer" />
                <div className="validation-error"></div>
            </label>
            <fieldset>
                <legend>Sick Leave</legend>
                <label>
                    <div>Start</div>
                    <input name="sickLeave.startDate" placeholder="YYYY-MM-DD" />
                    <div className="validation-error"></div>
                </label>
                <label>
                    <div>End</div>
                    <input name="sickLeave.endDate" placeholder="YYYY-MM-DD" />
                    <div className="validation-error"></div>
                </label>
            </fieldset>
            <DiagnosisCodesSelection />
        </>
    };

    return <form className="form ui add-entry-form"
        onSubmit={onSubmit}
        onBlur={({ target }) => {
            setDirty(true);
            const errorDisplay = target.nextElementSibling && target.nextElementSibling.classList.contains('validation-error') && target.nextElementSibling;
            if (errorDisplay) {
                const error = validators[target.name](target.value);
                errorDisplay.textContent = error || '';
            }
        }}>
        <label>
            <div>Type</div>
            <select className="ui dropdown" name="type" defaultValue="HealthCheck" onChange={({ target: { value } }) => setEntryType(value)}>
                <option value="HealthCheck">Health Check</option>
                <option value="OccupationalHealthcare">Occupational Healthcare</option>
                <option value="Hospital">Hospital</option>
            </select>
            <div className="validation-error"></div>
        </label>
        <label>
            <div>Date</div>
            <input name="date" placeholder="YYYY-MM-DD" />
            <div className="validation-error"></div>
        </label>
        <label>
            <div>Specialist</div>
            <input name="specialist" placeholder="Specialist" />
            <div className="validation-error"></div>
        </label>
        <label>
            <div>Description</div>
            <textarea name="description" placeholder="Description" />
            <div className="validation-error"></div>
        </label>

        {typedEntryFormFragments[entryType]}

        <div className="buttons">
            <Button className="ui red button" onClick={onClose}>Cancel</Button>
            <Button disabled={!dirty} className="ui green button">Add</Button>
        </div>
    </form>;
};

export default AddEntryForm;