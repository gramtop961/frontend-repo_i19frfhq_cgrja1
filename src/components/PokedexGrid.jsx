import React from 'react';
import PokemonCard from './PokemonCard';

export default function PokedexGrid({ list }) {
  if (!list.length) {
    return (
      <div className="text-center text-gray-500 py-16">
        <p className="text-lg">No Pokémon yet. Generate some new discoveries!</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map(p => (
        <PokemonCard key={p.id} data={p} />
      ))}
    </div>
  );
}
