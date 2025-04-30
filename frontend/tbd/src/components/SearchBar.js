import React from 'react';

function SearchBar(){
    return(

        <div className='mt-5 ms-5 me-5'>
            <div className='container'>
                <form className='d-flex'>
                    <input class="form-control me-2 custom-input-bg-color" type="search" placeholder="What opportunity are you looking for..." aria-label="Search" />
                    <button class="btn btn-outline-success custom-btn" type="submit">Search</button>
                </form>


            </div>
        </div>
    )
};

export default SearchBar;
