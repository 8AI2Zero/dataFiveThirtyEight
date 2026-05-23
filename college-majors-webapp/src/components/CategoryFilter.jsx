const COLORS = {
  'Engineering': 'bg-blue-100 text-blue-800 border-blue-200',
  'Business': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Computers & Mathematics': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Health': 'bg-green-100 text-green-800 border-green-200',
  'Physical Sciences': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'Law & Public Policy': 'bg-red-100 text-red-800 border-red-200',
  'Arts': 'bg-pink-100 text-pink-800 border-pink-200',
  'Social Science': 'bg-purple-100 text-purple-800 border-purple-200',
  'Education': 'bg-orange-100 text-orange-800 border-orange-200',
  'Humanities & Liberal Arts': 'bg-rose-100 text-rose-800 border-rose-200',
}

export const categoryColor = (cat) =>
  COLORS[cat] ?? 'bg-gray-100 text-gray-700 border-gray-200'

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat === active ? null : cat)}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
            active === cat
              ? 'ring-2 ring-offset-1 ring-blue-400 ' + categoryColor(cat)
              : categoryColor(cat) + ' opacity-70 hover:opacity-100'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
