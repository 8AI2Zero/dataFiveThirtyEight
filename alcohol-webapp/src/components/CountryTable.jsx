import { useState } from 'react'

const COLS = [
  { key: 'country', label: 'Country', right: false },
  { key: 'beer_servings', label: '🍺 Beer', right: true },
  { key: 'wine_servings', label: '🍷 Wine', right: true },
  { key: 'spirit_servings', label: '🥃 Spirits', right: true },
  { key: 'total_litres_of_pure_alcohol', label: '🌍 Total (L)', right: true },
]

function Bar({ value, max, color }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-800 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <span className="text-xs w-8 text-right text-gray-300">{value}</span>
    </div>
  )
}

export default function CountryTable({ countries }) {
  const [sortKey, setSortKey] = useState('total_litres_of_pure_alcohol')
  const [asc, setAsc] = useState(false)

  const maxBeer = Math.max(...countries.map(c => c.beer_servings))
  const maxWine = Math.max(...countries.map(c => c.wine_servings))
  const maxSpirit = Math.max(...countries.map(c => c.spirit_servings))
  const maxTotal = Math.max(...countries.map(c => c.total_litres_of_pure_alcohol))

  function handleSort(key) {
    if (sortKey === key) setAsc(a => !a)
    else { setSortKey(key); setAsc(false) }
  }

  const sorted = [...countries].sort((a, b) => {
    if (sortKey === 'country') return asc
      ? a.country.localeCompare(b.country)
      : b.country.localeCompare(a.country)
    return asc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]
  })

  return (
    <div className="bg-gray-900 rounded-2xl overflow-x-auto">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="border-b border-gray-800">
            {COLS.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide cursor-pointer hover:text-white select-none ${col.right ? 'text-right' : 'text-left'}`}
              >
                {col.label} {sortKey === col.key ? (asc ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, i) => (
            <tr key={c.country} className={`border-b border-gray-800/50 hover:bg-gray-800/40 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-900/50'}`}>
              <td className="px-4 py-3 font-medium">{c.country}</td>
              <td className="px-4 py-3 w-36"><Bar value={c.beer_servings} max={maxBeer} color="bg-amber-500" /></td>
              <td className="px-4 py-3 w-36"><Bar value={c.wine_servings} max={maxWine} color="bg-purple-500" /></td>
              <td className="px-4 py-3 w-36"><Bar value={c.spirit_servings} max={maxSpirit} color="bg-blue-500" /></td>
              <td className="px-4 py-3 w-36"><Bar value={c.total_litres_of_pure_alcohol} max={maxTotal} color="bg-emerald-500" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {countries.length === 0 && (
        <p className="text-center text-gray-500 py-12">No countries match your search.</p>
      )}
    </div>
  )
}
