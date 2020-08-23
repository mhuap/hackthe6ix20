import React from 'react';
import logo from './logo.svg';
import TagList from './components/tag.js';
import CardList from './components/minicards.js';
import './App.scss';

// just for placeholder pics
const numbers1 = [1,2,3,4,5];
const numbers2 = [6,7,8,9,10];

function App() {
  return (
    <div className="App">

      <header>
        <div className='header-bg'></div>
        <h1>ProjectName</h1>
        <form>
          <input type='search' placeholder='Search'/>
        </form>

        <TagList />

      </header>

      <div>
        <h3>Recently Added</h3>
        <CardList numbers={numbers1}/>

        <h3>Highlights</h3>
        <CardList numbers={numbers2}/>
      </div>

    </div>
  );
}

export default App;
