import { useEffect, useState, useMemo } from 'react'
import Papa from 'papaparse'
import CategoryFilter from './components/CategoryFilter'
import SalaryChart from './components/SalaryChart'
import MajorTable from './components/MajorTable'
import StatCard from './components/StatCard'
import csvUrl from './data/recent-grads.csv?url'

const fmt = (v) => `$${Number(v).toLocaleString()}`

export default function App() {
  const [all, setAll] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(null)

  useEffect(() => {
    fetch(csvUrl)
      .then(r => r.text())
      .then(text => {
        const { data } = Papa.parse(text, { header: true, dynamicTyping: true, skipEmptyLines: true })
        setAll(data)
      })
  }, [])

  const categories = useMemo(
    () => [...new Set(all.map(m => m.Major_category))].sort(),
    [all]
  )

  const filtered = useMemo(() =>
    all.filter(m => {
      const matchSearch = m.Major?.toLowerCase().includes(search.toLowerCase())
      const matchCat = !category || m.Major_category === category
      return matchSearch && matchCat
    }),
    [all, search, category]
  )

  const medianOfMedians = useMemo(() => {
    if (!filtered.length) return 0
    const sorted = [...filtered].sort((a, b) => a.Median - b.Median)
    return sorted[Math.floor(sorted.length / 2)]?.Median ?? 0
  }, [filtered])

  const avgUnemployment = useMemo(() => {
    if (!filtered.length) return 0
    return filtered.reduce((s, m) => s + (m.Unemployment_rate ?? 0), 0) / filtered.length
  }, [filtered])

  const topMajor = useMemo(() =>
    [...filtered].sort((a, b) => b.Median - a.Median)[0],
    [filtered]
  )

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-10 px-4 mb-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">🎓 College Major Salary Guide</h1>
          <p className="text-blue-200 text-lg">
            Compare salaries, employment rates, and job outcomes across 173 majors — data from U.S. Census ACS.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        {all.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Majors shown" value={filtered.length} />
            <StatCard label="Median salary" value={fmt(medianOfMedians)} sub="of filtered majors" />
            <StatCard label="Avg. unemployment" value={`${(avgUnemployment * 100).toFixed(1)}%`} sub="of filtered majors" />
            <StatCard
              label="Top earner"
              value={topMajor?.Major?.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).slice(0, 20) ?? '—'}
              sub={topMajor ? fmt(topMajor.Median) : ''}
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search major..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <CategoryFilter categories={categories} active={category} onChange={setCategory} />

        {all.length === 0 ? (
          <p className="text-center text-gray-400 py-20">Loading...</p>
        ) : (
          <>
            {!search && !category && <SalaryChart majors={filtered} />}
            <p className="text-xs text-gray-400 mb-3">{filtered.length} majors</p>
            <MajorTable majors={filtered} />
          </>
        )}

        <footer className="mt-12 text-center text-xs text-gray-400">
          Data: <a href="https://fivethirtyeight.com/features/the-economic-guide-to-picking-a-college-major/" className="underline hover:text-blue-400" target="_blank" rel="noopener noreferrer">FiveThirtyEight / U.S. Census ACS 2010–2012</a> — CC BY 4.0
        </footer>
      </main>
    </div>
  )
}
