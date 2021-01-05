import React from 'react';
import { CourseParts } from '../types';

const Total: React.FC<CourseParts> = ({ courseParts }) => {
    return (<p>
        Total number of exercises in the course{' '}
        {courseParts.reduce((total, part) => total + part.exerciseCount, 0)}
    </p>
    );
};

export default Total;