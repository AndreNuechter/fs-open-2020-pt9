import React from 'react';
import Course from './Course';
import { CourseParts, CourseDef } from '../types';

const Content: React.FC<CourseParts> = ({ courseParts }) => {
    return <>
        {courseParts
            .map(({ name, exerciseCount }: CourseDef) => (
                <Course
                    key={name}
                    name={name}
                    exerciseCount={exerciseCount}
                />
            ))
        }
    </>;
};

export default Content;