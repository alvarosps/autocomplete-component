import React from 'react';
import AutoComplete from './components/AutoComplete/AutoComplete';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="logo" />
      <h2>Dungeons and Dragons Spells</h2>
      <AutoComplete />
    </div>
  );
}

export default App;
