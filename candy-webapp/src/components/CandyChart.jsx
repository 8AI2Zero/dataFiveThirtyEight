import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = [
  '#f472b6', '#fb923c', '#facc15', '#4ade80', '#60a5fa',
  '#a78bfa', '#f87171', '#34d399', '#38bdf8', '#e879f9',
]

export default function CandyChart({ candies }) {
  const top10 = [...candies]
    .sort((a, b) => b.winpercent - a.winpercent)
    .slice(0, 10)
    .map(c => ({ ...c, win: parseFloat(c.winpercent.toFixed(1)) }))

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Top 10 by Win Rate</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={top10} layout="vertical" margin={{ left: 20, right: 30 }}>
          <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="competitorname" width={120} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`${v}%`, 'Win rate']} />
          <Bar dataKey="win" radius={[0, 4, 4, 0]}>
            {top10.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
