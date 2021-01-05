import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<CoursePart> = (part) => {
    switch (part.name) {
        case 'Fundamentals':
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>{part.description}</p>
                    <p>{part.exerciseCount} exercises</p>
                </div>
            );
        case 'Using props to pass data':
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>{part.exerciseCount} exercises</p>
                    <p>{part.groupProjectCount} group projects</p>
                </div>
            );
        case 'Deeper type usage':
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>{part.description}</p>
                    <p>{part.exerciseCount} exercises</p>
                    <p>Submit exercises <a href={part.exerciseSubmissionLink}>here</a></p>
                </div>
            );
        case 'Foo':
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>{part.description}</p>
                    <p>{part.exerciseCount} exercises</p>
                    <ul>
                        {part.material.map(m => <li key={m}>{m}</li>)}
                    </ul>
                </div>
            );
        default:
            assertNever(part);
    }
};

export default Part;

function assertNever(value: never): never {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}
