import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={reactLogo} className="h-24 w-24 animate-spin" style={{ animationDuration: '20s' }} alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Vite + React + Tailwind
      </h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-400">
          Edit <code className="bg-gray-700 px-2 py-1 rounded text-sm">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-8 text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
