import React from 'react';
import { Entry } from '../../types';
import EntryListItem from './EntryListItem';

const EntriesList: React.FC<{ entries: Entry[]; }> = ({ entries }) => <ul>
    {entries.map(e => <EntryListItem key={e.id} {...e} />)}
</ul>;

export default EntriesList;