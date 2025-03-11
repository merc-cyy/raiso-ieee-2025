import React from 'react';
import './App.css';//styling

import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import Posts from './components/Posts';


function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchBar />
      <Posts />
    </div>
  );
}

export default App;
