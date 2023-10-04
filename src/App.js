// App.js
import React from 'react';
import './App.css';
import PokemonDetails from './PokemonDetails';
import { PokemonProvider } from './PokemonContext';

function App() {
  return (
    <div className="App">
      <h1>Detalles de Pokémon</h1>
      <PokemonProvider>
        <PokemonDetails />
      </PokemonProvider>
    </div>
  );
}

export default App;
