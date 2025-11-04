import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
          <h1 className="text-2xl font-bold tracking-tight">Neo Pokedex</h1>
        </div>
        <p className="text-sm text-gray-500">Generate and explore brand‑new pocket monsters</p>
      </div>
    </header>
  );
}
