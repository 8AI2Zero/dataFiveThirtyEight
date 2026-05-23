import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const fmt = (v) => `$${(v / 1000).toFixed(0)}k`

export default function SalaryChart({ majors }) {
  const top12 = [...majors]
    .sort((a, b) => b.Median - a.Median)
    .slice(0, 12)
    .map(m => ({
      name: m.Major.length > 22 ? m.Major.slice(0, 22) + '…' : m.Major,
      salary: m.Median,
    }))

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
      <h2 className="text-base font-semibold text-gray-600 mb-4">Top 12 by Median Salary</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={top12} layout="vertical" margin={{ left: 10, right: 40 }}>
          <XAxis type="number" tickFormatter={fmt} tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="name" width={155} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v) => [fmt(v), 'Median salary']} />
          <Bar dataKey="salary" radius={[0, 4, 4, 0]}>
            {top12.map((_, i) => (
              <Cell key={i} fill={`hsl(${220 + i * 6}, 70%, ${60 - i * 2}%)`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
