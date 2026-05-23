export default function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
      <p className="text-2xl font-bold text-blue-600">{value}</p>
      <p className="text-sm font-medium text-gray-700 mt-1">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}
