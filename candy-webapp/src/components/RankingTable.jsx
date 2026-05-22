const BADGE = {
  chocolate: { label: 'Chocolate', color: 'bg-amber-100 text-amber-800' },
  fruity: { label: 'Fruity', color: 'bg-pink-100 text-pink-800' },
  caramel: { label: 'Caramel', color: 'bg-yellow-100 text-yellow-800' },
  peanutyalmondy: { label: 'Peanut', color: 'bg-orange-100 text-orange-800' },
  nougat: { label: 'Nougat', color: 'bg-purple-100 text-purple-800' },
  hard: { label: 'Hard', color: 'bg-blue-100 text-blue-800' },
  bar: { label: 'Bar', color: 'bg-green-100 text-green-800' },
  pluribus: { label: 'Bag/Box', color: 'bg-gray-100 text-gray-800' },
}

function WinBar({ value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div
          className="bg-pink-400 h-2 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-sm font-medium w-12 text-right">{value.toFixed(1)}%</span>
    </div>
  )
}

export default function RankingTable({ candies }) {
  const sorted = [...candies].sort((a, b) => b.winpercent - a.winpercent)

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left p-4 text-gray-500 font-medium w-10">#</th>
            <th className="text-left p-4 text-gray-500 font-medium">Candy</th>
            <th className="text-left p-4 text-gray-500 font-medium hidden md:table-cell">Tags</th>
            <th className="text-left p-4 text-gray-500 font-medium w-48">Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((candy, i) => {
            const tags = Object.keys(BADGE).filter(k => Number(candy[k]) === 1)
            return (
              <tr key={candy.competitorname} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-400 font-medium">{i + 1}</td>
                <td className="p-4 font-medium">{candy.competitorname}</td>
                <td className="p-4 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {tags.map(t => (
                      <span key={t} className={`px-2 py-0.5 rounded-full text-xs font-medium ${BADGE[t].color}`}>
                        {BADGE[t].label}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <WinBar value={parseFloat(candy.winpercent)} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {candies.length === 0 && (
        <p className="text-center text-gray-400 py-12">No candies match your filters.</p>
      )}
    </div>
  )
}
