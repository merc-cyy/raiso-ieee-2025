import React from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import Posts from './Posts';


const Home = () => {
    return (
        <div>
            <NavBar />
            <SearchBar />
            <Posts />
        </div>
    );
};

export default Home;