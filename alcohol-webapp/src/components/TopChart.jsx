import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function TopChart({ countries, metric }) {
  const key = metric === 'total' ? 'total_litres_of_pure_alcohol'
    : metric === 'beer' ? 'beer_servings'
    : metric === 'wine' ? 'wine_servings'
    : 'spirit_servings'

  const top15 = [...countries]
    .sort((a, b) => b[key] - a[key])
    .slice(0, 15)
    .map(c => ({
      name: c.country.length > 14 ? c.country.slice(0, 14) + '…' : c.country,
      value: c[key],
    }))

  const color = metric === 'beer' ? '#f59e0b'
    : metric === 'wine' ? '#a855f7'
    : metric === 'spirit' ? '#3b82f6'
    : '#10b981'

  const unit = metric === 'total' ? 'L pure alcohol' : 'servings/year'

  return (
    <div className="bg-gray-900 rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">Top 15 countries</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={top15} layout="vertical" margin={{ left: 10, right: 40 }}>
          <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
          <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11, fill: '#d1d5db' }} />
          <Tooltip
            contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
            formatter={(v) => [`${v} ${unit}`, '']}
          />
          <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
