import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import ControlsBar from './components/ControlsBar';
import PokedexGrid from './components/PokedexGrid';
import { generatePokemon, generateMany } from './utils/pokemonGenerator';

export default function App() {
  const [pokedex, setPokedex] = useState(() => generateMany(6));
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const nextId = useMemo(() => (pokedex.length ? Math.max(...pokedex.map(p=>p.id)) + 1 : 1), [pokedex]);

  const addOne = () => setPokedex(prev => [generatePokemon(nextId), ...prev]);
  const addMany = (n) => setPokedex(prev => [...generateMany(n, nextId), ...prev]);
  const clearAll = () => setPokedex([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pokedex.filter(p => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.abilities.some(a => a.toLowerCase().includes(q));
      const matchesType = filterType === 'All' || p.types.includes(filterType);
      return matchesQuery && matchesType;
    });
  }, [pokedex, query, filterType]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <Header />
      <ControlsBar
        onGenerateOne={addOne}
        onGenerateMany={addMany}
        onClear={clearAll}
        query={query}
        onQueryChange={setQuery}
        filterType={filterType}
        onFilterType={setFilterType}
      />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <PokedexGrid list={filtered} />
      </main>
      <footer className="py-8 text-center text-sm text-gray-500">
        <p>All creatures here are procedurally generated for fun.</p>
      </footer>
    </div>
  );
}
