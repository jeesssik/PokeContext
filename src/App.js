// App.js
import React from 'react';
import './App.css';
import PokemonDetails from './PokemonDetails';
import { PokemonProvider } from './PokemonContext';

function App() {
  return (
    <div className="pokedex-bg">
      <div className="pokedex-container">
        <div className="pokedex-header">
          <div className="pokedex-lights">
            <span className="light red"></span>
            <span className="light yellow"></span>
            <span className="light green"></span>
          </div>
          <h1 className="pokedex-title">Pokédex</h1>
        </div>

        <div className="pokedex-hinge" />

        <div className="pokedex-content">
          

          <div className="pokedex-screen-frame">
            <div className="pokedex-screen">
              <PokemonProvider>
                <PokemonDetails />
              </PokemonProvider>
            </div>
          </div>

          <div className="pokedex-divider" />

          <div className="pokedex-btn-row">
            <button className="pokedex-btn" aria-label="Action 1"></button>
            <button className="pokedex-btn" aria-label="Action 2"></button>
            <button className="pokedex-btn" aria-label="Action 3"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
