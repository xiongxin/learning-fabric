"use client";

import CanvasState from './components/CavasState'

const App = () => {

  return (
    <main className='w-full h-screen bg-gray-300'>

      <h1 className="mx-auto text-2xl font-bold w-fit py-4">
        Fabric Js + React
      </h1>

      <section className='mx-auto py-2 w-fit'>
        <CanvasState />
      </section>

      {/* <CanvasLine /> */}

      {/* <Cav /> */}

      {/* <CanvasState /> */}
    </main>
  )
}

export default App
