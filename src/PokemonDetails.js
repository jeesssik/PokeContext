// PokemonDetails.js
import React from 'react';
import { usePokemon } from './PokemonContext';

function PokemonDetails() {
const { pokemonData } = usePokemon();

if (!pokemonData) {
return <div>Cargando...</div>;
}

return (
<div>
    <h2>{pokemonData.name}</h2>
    <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
    <p>Altura: {pokemonData.height} decímetros</p>
    <p>Peso: {pokemonData.weight} hectogramos</p>
</div>
);
}

export default PokemonDetails;
