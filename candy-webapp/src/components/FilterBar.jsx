const FILTERS = [
  { key: 'chocolate', label: '🍫 Chocolate' },
  { key: 'fruity', label: '🍓 Fruity' },
  { key: 'caramel', label: '🍮 Caramel' },
  { key: 'peanutyalmondy', label: '🥜 Peanut/Almond' },
  { key: 'nougat', label: '🍬 Nougat' },
  { key: 'hard', label: '💎 Hard' },
  { key: 'bar', label: '🍫 Bar' },
  { key: 'pluribus', label: '🎁 Bag/Box' },
]

export default function FilterBar({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active.includes(key)
              ? 'bg-pink-500 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-pink-400'
          }`}
        >
          {label}
        </button>
      ))}
      {active.length > 0 && (
        <button
          onClick={() => onChange(null)}
          className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          Clear
        </button>
      )}
    </div>
  )
}
