import React from 'react'
import Dashboard from './components/Dashboard'

export default function App(){
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
        
        <Dashboard />
      </div>
    </div>
  )
}

// export default function App() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <h1 className="text-5xl font-bold text-red-500">
//         Tailwind is Working!
//       </h1>
//     </div>
//   );
// }
