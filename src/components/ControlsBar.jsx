import React from 'react';

export default function ControlsBar({ onGenerateOne, onGenerateMany, onClear, query, onQueryChange, filterType, onFilterType }) {
  const TYPES = [
    'All','Fire','Water','Grass','Electric','Psychic','Ice','Dragon','Dark','Fairy','Fighting','Flying','Poison','Ground','Rock','Bug','Ghost','Steel','Normal'
  ];
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onGenerateOne} className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">Generate</button>
          <button onClick={() => onGenerateMany(6)} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">Generate 6</button>
          <button onClick={onClear} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition">Clear</button>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e)=>onQueryChange(e.target.value)}
            placeholder="Search by name or ability"
            className="w-full md:w-72 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select value={filterType} onChange={(e)=>onFilterType(e.target.value)} className="px-3 py-2 border rounded-md">
            {TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
