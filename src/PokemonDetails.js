// PokemonDetails.js
import React, { useMemo, useState } from 'react';
import { usePokemon } from './PokemonContext';

function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function StatBar({ label, value }) {
  const percentage = Math.min(100, Math.round((value / 255) * 100));
  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <div className="stat-bar">
        <div className="stat-bar-fill" style={{ width: `${percentage}%` }} />
      </div>
      <span className="stat-value">{value}</span>
    </div>
  );
}

function PokemonDetails() {
  const { pokemonData, isLoading, errorMessage, currentQuery, setCurrentQuery, fetchPokemonData } = usePokemon();
  const [localInput, setLocalInput] = useState(currentQuery || '');

  const types = useMemo(() => {
    if (!pokemonData) return [];
    return pokemonData.types.map((t) => t.type.name);
  }, [pokemonData]);

  const stats = useMemo(() => {
    if (!pokemonData) return [];
    return pokemonData.stats.map((s) => ({ name: s.stat.name, value: s.base_stat }));
  }, [pokemonData]);

  function onSubmit(event) {
    event.preventDefault();
    const query = (localInput || '').trim().toLowerCase();
    if (!query) return;
    setCurrentQuery(query);
    fetchPokemonData(query);
  }

  return (
    <div className="pdx-root">
      <form className="pdx-search" onSubmit={onSubmit}>
        <input
          className="pdx-input"
          placeholder="Buscar por nombre o ID (p. ej. pikachu, 25)"
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
        />
        <button className="pdx-search-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {errorMessage && <div className="pdx-error">{errorMessage}</div>}

      {!pokemonData && !isLoading && !errorMessage && (
        <div className="pdx-empty">Ingresa un nombre para comenzar</div>
      )}

      {pokemonData && (
        <div className="pdx-details">
          <div className="pdx-hero">
            <img
              className="pdx-sprite"
              src={pokemonData.sprites?.other?.['official-artwork']?.front_default || pokemonData.sprites?.front_default}
              alt={pokemonData.name}
            />
            <div className="pdx-title-row">
              <h2 className="pdx-name">{capitalize(pokemonData.name)}</h2>
              <span className="pdx-id">#{pokemonData.id}</span>
            </div>
            <div className="pdx-types">
              {types.map((t) => (
                <span key={t} className={`type-chip type-${t}`}>
                  {capitalize(t)}
                </span>
              ))}
            </div>
          </div>

          <div className="pdx-meta">
            <div className="pdx-meta-item">
              <span className="pdx-meta-label">Altura</span>
              <span className="pdx-meta-value">{pokemonData.height / 10} m</span>
            </div>
            <div className="pdx-meta-item">
              <span className="pdx-meta-label">Peso</span>
              <span className="pdx-meta-value">{pokemonData.weight / 10} kg</span>
            </div>
            <div className="pdx-meta-item">
              <span className="pdx-meta-label">Base Exp</span>
              <span className="pdx-meta-value">{pokemonData.base_experience}</span>
            </div>
          </div>

          <div className="pdx-stats">
            {stats.map((s) => (
              <StatBar key={s.name} label={capitalize(s.name)} value={s.value} />)
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
