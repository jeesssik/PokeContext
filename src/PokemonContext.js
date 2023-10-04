// PokemonContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
const [pokemonData, setPokemonData] = useState(null);



useEffect(() => {
async function fetchPokemonData() {
    try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/skitty');
    setPokemonData(response.data);
    } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    }
}

fetchPokemonData();
}, []);

return (
<PokemonContext.Provider value={{ pokemonData }}>
    {children}
</PokemonContext.Provider>
);
}

export function usePokemon() {
return useContext(PokemonContext);
}
