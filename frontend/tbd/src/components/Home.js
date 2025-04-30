import React from 'react';
import PostsNavBar from './PostsNavBar';
import SearchBar from './SearchBar';
import Posts from './Posts';


const Home = () => {
    return (
        <div>
            <PostsNavBar />
            {/* <SearchBar /> */}
            <Posts />
        </div>
    );
};

export default Home;