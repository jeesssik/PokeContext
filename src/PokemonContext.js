// PokemonContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentQuery, setCurrentQuery] = useState('skitty');

  async function fetchPokemonData(queryNameOrId) {
    const normalizedQuery = (queryNameOrId || currentQuery || '').toString().trim().toLowerCase();
    if (!normalizedQuery) return;
    try {
      setIsLoading(true);
      setErrorMessage('');
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${normalizedQuery}`);
      setPokemonData(response.data);
    } catch (error) {
      setErrorMessage('No se encontró el Pokémon.');
      setPokemonData(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemonData(currentQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    pokemonData,
    isLoading,
    errorMessage,
    currentQuery,
    setCurrentQuery,
    fetchPokemonData,
  };

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
}

export function usePokemon() {
return useContext(PokemonContext);
}
