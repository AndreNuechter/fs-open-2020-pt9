import React from 'react';
import { CourseParts } from '../types';

const Total: React.FC<CourseParts> = ({ courseParts }) => {
    return (<p>
        Number of exercises{' '}
        {courseParts.reduce((total, part) => total + part.exerciseCount, 0)}
    </p>
    );
};

export default Total;