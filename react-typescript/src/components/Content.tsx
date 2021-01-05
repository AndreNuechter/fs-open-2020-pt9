import React from 'react';
import Part from './Part';
import { CourseParts } from '../types';

const Content: React.FC<CourseParts> = ({ courseParts }) => {
    return <>
        {courseParts
            .map((part) => (
                <Part
                    key={part.name}
                    {...part}
                />
            ))
        }
    </>;
};

export default Content;