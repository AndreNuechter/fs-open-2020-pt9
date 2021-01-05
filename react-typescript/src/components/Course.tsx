import React from 'react';
import { CourseDef } from '../types';

const Course: React.FC<CourseDef> = ({ name, exerciseCount }) => {
    return (
        <p>{name} {exerciseCount}</p>
    );
};

export default Course;