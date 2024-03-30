// src/components/Pagination.js

import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className='paginationContainer'>
            <button className='buttonPrevious' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>&nbsp;
            <span className='paginationOfText'>{currentPage} of {totalPages}</span>&nbsp;
            <button className='buttonNext' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
}

export default Pagination;
