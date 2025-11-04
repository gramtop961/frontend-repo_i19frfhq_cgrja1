import React from 'react';

const typeColors = {
  Fire: 'from-red-400 to-red-600',
  Water: 'from-blue-400 to-blue-600',
  Grass: 'from-green-400 to-green-600',
  Electric: 'from-yellow-300 to-amber-500',
  Psychic: 'from-fuchsia-400 to-fuchsia-600',
  Ice: 'from-cyan-300 to-cyan-500',
  Dragon: 'from-indigo-400 to-indigo-600',
  Dark: 'from-stone-500 to-stone-700',
  Fairy: 'from-pink-300 to-pink-500',
  Fighting: 'from-orange-400 to-orange-600',
  Flying: 'from-sky-300 to-sky-500',
  Poison: 'from-violet-400 to-violet-600',
  Ground: 'from-amber-400 to-amber-600',
  Rock: 'from-zinc-400 to-zinc-600',
  Bug: 'from-lime-400 to-lime-600',
  Ghost: 'from-purple-400 to-purple-700',
  Steel: 'from-slate-400 to-slate-600',
  Normal: 'from-gray-300 to-gray-500',
};

function TypeBadge({ type }) {
  const grad = typeColors[type] || 'from-gray-300 to-gray-500';
  return (
    <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-br ${grad} text-white shadow-sm`}>{type}</span>
  );
}

function StatBar({ label, value }) {
  const pct = Math.min(100, Math.round((value / 160) * 100));
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-8 text-gray-600">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded">
        <div className="h-2 rounded bg-blue-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-right text-gray-700">{value}</span>
    </div>
  );
}

export default function PokemonCard({ data }) {
  const { id, name, image, types, abilities, evolutions, height, weight, habitat, flavor } = data;
  const grad = typeColors[types[0]] || 'from-gray-300 to-gray-500';
  const stage3 = evolutions[evolutions.length - 1];
  return (
    <div className="group rounded-xl border bg-white overflow-hidden hover:shadow-xl transition shadow-sm">
      <div className={`relative p-4 bg-gradient-to-br ${grad}`}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-white/80 text-xs">No. {String(id).padStart(3,'0')}</p>
            <h3 className="text-white text-xl font-bold drop-shadow-sm">{name}</h3>
          </div>
          <div className="flex gap-2">{types.map(t => <TypeBadge key={t} type={t} />)}</div>
        </div>
        <div className="mt-3 bg-white/80 rounded-lg p-2 flex items-center justify-center">
          <img src={image} alt={name} className="w-40 h-40 object-contain" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-600">{flavor}</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
          <div className="px-2 py-1 bg-gray-50 rounded">Height: <span className="font-medium">{height} m</span></div>
          <div className="px-2 py-1 bg-gray-50 rounded">Weight: <span className="font-medium">{weight} kg</span></div>
          <div className="col-span-2 px-2 py-1 bg-gray-50 rounded">Habitat: <span className="font-medium">{habitat}</span></div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Abilities</p>
          <div className="flex flex-wrap gap-2">
            {abilities.map(a => (
              <span key={a} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{a}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1">
          <StatBar label="HP" value={stage3.stats.hp} />
          <StatBar label="ATK" value={stage3.stats.atk} />
          <StatBar label="DEF" value={stage3.stats.def} />
          <StatBar label="SPA" value={stage3.stats.spa} />
          <StatBar label="SPD" value={stage3.stats.spd} />
          <StatBar label="SPE" value={stage3.stats.spe} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Evolution</p>
          <div className="flex flex-wrap gap-2 items-center">
            {evolutions.map((evo, idx) => (
              <React.Fragment key={idx}>
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">{evo.name} {evo.level > 1 && <span className="text-[10px] text-blue-600">Lv.{evo.level}</span>}</span>
                {idx < evolutions.length - 1 && <span className="text-gray-400">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
