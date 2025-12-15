import logo from './logo.svg';
import './App.css';
import React from 'react';
import Counter from './Components/Counter';
import ClassCounter from './Components/ClassCounter';

function App() {

    // const [value, setValue] = React.useState('Текст в инпуте')

  return (

    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Counter />
      <ClassCounter />
    </div>
  );
}

export default App;
