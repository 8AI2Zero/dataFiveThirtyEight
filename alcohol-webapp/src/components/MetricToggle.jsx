const OPTIONS = [
  { key: 'total', label: '🌍 Total', desc: 'Litres of pure alcohol' },
  { key: 'beer', label: '🍺 Beer', desc: 'Servings per year' },
  { key: 'wine', label: '🍷 Wine', desc: 'Servings per year' },
  { key: 'spirit', label: '🥃 Spirits', desc: 'Servings per year' },
]

export default function MetricToggle({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {OPTIONS.map(({ key, label, desc }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          title={desc}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            active === key
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
