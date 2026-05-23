import { useState } from 'react'
import { categoryColor } from './CategoryFilter'

const fmt = (v) => v ? `$${v.toLocaleString()}` : '—'
const pct = (v) => v ? `${(v * 100).toFixed(1)}%` : '—'

const SORT_OPTIONS = [
  { key: 'Median', label: 'Salary' },
  { key: 'Unemployment_rate', label: 'Unemployment', asc: true },
  { key: 'ShareWomen', label: '% Women' },
  { key: 'Total', label: 'Graduates' },
]

export default function MajorTable({ majors }) {
  const [sortKey, setSortKey] = useState('Median')
  const [asc, setAsc] = useState(false)

  function handleSort(key, defaultAsc = false) {
    if (sortKey === key) setAsc(a => !a)
    else { setSortKey(key); setAsc(defaultAsc) }
  }

  const sorted = [...majors].sort((a, b) =>
    asc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
      <div className="flex gap-2 p-4 border-b border-gray-100 flex-wrap">
        <span className="text-xs text-gray-400 self-center mr-1">Sort by:</span>
        {SORT_OPTIONS.map(({ key, label, asc: defaultAsc }) => (
          <button
            key={key}
            onClick={() => handleSort(key, defaultAsc ?? false)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              sortKey === key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
            }`}
          >
            {label} {sortKey === key ? (asc ? '↑' : '↓') : ''}
          </button>
        ))}
      </div>

      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Major</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium text-right">Median</th>
            <th className="px-4 py-3 font-medium text-right">P25–P75</th>
            <th className="px-4 py-3 font-medium text-right">Unemployed</th>
            <th className="px-4 py-3 font-medium text-right">% Women</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((m, i) => (
            <tr key={m.Major_code} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 text-gray-400">{i + 1}</td>
              <td className="px-4 py-3 font-medium capitalize">{m.Major.toLowerCase()}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs border ${categoryColor(m.Major_category)}`}>
                  {m.Major_category}
                </span>
              </td>
              <td className="px-4 py-3 text-right font-semibold text-blue-700">{fmt(m.Median)}</td>
              <td className="px-4 py-3 text-right text-gray-500 text-xs">{fmt(m.P25th)}–{fmt(m.P75th)}</td>
              <td className="px-4 py-3 text-right">
                <span className={m.Unemployment_rate > 0.08 ? 'text-red-500' : 'text-green-600'}>
                  {pct(m.Unemployment_rate)}
                </span>
              </td>
              <td className="px-4 py-3 text-right text-gray-500">{pct(m.ShareWomen)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {majors.length === 0 && (
        <p className="text-center text-gray-400 py-12">No majors match your search.</p>
      )}
    </div>
  )
}
