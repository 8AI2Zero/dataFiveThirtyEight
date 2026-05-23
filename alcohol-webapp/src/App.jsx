import { useEffect, useState, useMemo } from 'react'
import Papa from 'papaparse'
import MetricToggle from './components/MetricToggle'
import TopChart from './components/TopChart'
import CountryTable from './components/CountryTable'
import csvUrl from './data/drinks.csv?url'

export default function App() {
  const [all, setAll] = useState([])
  const [metric, setMetric] = useState('total')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(csvUrl)
      .then(r => r.text())
      .then(text => {
        const { data } = Papa.parse(text, { header: true, dynamicTyping: true, skipEmptyLines: true })
        setAll(data)
      })
  }, [])

  const filtered = useMemo(() =>
    all.filter(c => c.country?.toLowerCase().includes(search.toLowerCase())),
    [all, search]
  )

  const topCountry = useMemo(() => {
    const key = metric === 'total' ? 'total_litres_of_pure_alcohol'
      : metric === 'beer' ? 'beer_servings'
      : metric === 'wine' ? 'wine_servings'
      : 'spirit_servings'
    return [...filtered].sort((a, b) => b[key] - a[key])[0]
  }, [filtered, metric])

  const avgTotal = useMemo(() => {
    if (!filtered.length) return 0
    return (filtered.reduce((s, c) => s + c.total_litres_of_pure_alcohol, 0) / filtered.length).toFixed(1)
  }, [filtered])

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gradient-to-r from-emerald-900 to-gray-900 py-10 px-4 mb-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">🍺 Global Alcohol Consumption</h1>
          <p className="text-gray-400 text-lg">
            Beer, wine & spirits intake across 193 countries — how does yours rank?
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">

        {all.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Countries', value: filtered.length },
              { label: 'Avg. litres / year', value: avgTotal },
              { label: '#1 this view', value: topCountry?.country ?? '—' },
              { label: 'Most beer (servings)', value: [...filtered].sort((a,b) => b.beer_servings - a.beer_servings)[0]?.country ?? '—' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-900 rounded-2xl p-5 text-center border border-gray-800">
                <p className="text-2xl font-bold text-emerald-400 truncate">{value}</p>
                <p className="text-xs text-gray-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <MetricToggle active={metric} onChange={setMetric} />

        {all.length === 0 ? (
          <p className="text-center text-gray-500 py-20">Loading...</p>
        ) : (
          <>
            {!search && <div className="mb-8"><TopChart countries={filtered} metric={metric} /></div>}
            <p className="text-xs text-gray-500 mb-3">{filtered.length} countries</p>
            <CountryTable countries={filtered} />
          </>
        )}

        <footer className="mt-12 text-center text-xs text-gray-600">
          Data: <a href="https://fivethirtyeight.com/features/dear-mona-followup-where-do-people-drink-the-most-beer-wine-and-spirits/" className="underline hover:text-emerald-400" target="_blank" rel="noopener noreferrer">FiveThirtyEight / WHO</a> — CC BY 4.0
        </footer>
      </main>
    </div>
  )
}
