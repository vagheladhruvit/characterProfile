// src/components/SearchFilter.js

import React from 'react';

function SearchFilter({ filters, onFilterChange }) {
    return (
        <div className='filterContainer'>
            <label className='filterText'> Filters :&nbsp; </label>
            <label className='filterNameLabel'>
                Name :&nbsp;
                <input className='filterNameInput' type="text" value={filters.name} onChange={(e) => onFilterChange('name', e.target.value)} />
            </label>
            <label className='filterLocationLabel'>
                Location :&nbsp;
                <input className='filterLocationInput' type="text" value={filters.location} onChange={(e) => onFilterChange('location', e.target.value)} />
            </label>
            <label className='filterEpisodesLabel'>
                Episodes :&nbsp;
                <input className='filterEpisodesInput' type="text" value={filters.episodes} onChange={(e) => onFilterChange('episodes', e.target.value)} />
            </label>
        </div>
    );
}

export default SearchFilter;
