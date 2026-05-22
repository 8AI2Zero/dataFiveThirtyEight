import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import FilterBar from './components/FilterBar'
import CandyChart from './components/CandyChart'
import RankingTable from './components/RankingTable'
import candyCsv from './data/candy-data.csv?url'

export default function App() {
  const [allCandies, setAllCandies] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(candyCsv)
      .then(r => r.text())
      .then(text => {
        const { data } = Papa.parse(text, { header: true, dynamicTyping: true, skipEmptyLines: true })
        setAllCandies(data)
      })
  }, [])

  function handleFilter(key) {
    if (key === null) return setActiveFilters([])
    setActiveFilters(prev =>
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    )
  }

  const filtered = allCandies.filter(candy => {
    const matchesSearch = candy.competitorname?.toLowerCase().includes(search.toLowerCase())
    const matchesFilters = activeFilters.every(f => Number(candy[f]) === 1)
    return matchesSearch && matchesFilters
  })

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-pink-500 to-orange-400 text-white py-10 px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">🍬 Candy Power Ranking</h1>
          <p className="text-pink-100 text-lg">
            Based on 269,000 head-to-head matchups — which candy wins?
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-16">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search candy..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <FilterBar active={activeFilters} onChange={handleFilter} />

        {allCandies.length === 0 ? (
          <p className="text-center text-gray-400 py-20">Loading...</p>
        ) : (
          <>
            {activeFilters.length === 0 && search === '' && (
              <CandyChart candies={filtered} />
            )}
            <p className="text-sm text-gray-400 mb-3">{filtered.length} candies</p>
            <RankingTable candies={filtered} />
          </>
        )}

        <footer className="mt-12 text-center text-xs text-gray-400">
          Data: <a href="https://fivethirtyeight.com/features/the-ultimate-halloween-candy-power-ranking/" className="underline hover:text-pink-400" target="_blank" rel="noopener noreferrer">FiveThirtyEight</a> — CC BY 4.0
        </footer>
      </main>
    </div>
  )
}
