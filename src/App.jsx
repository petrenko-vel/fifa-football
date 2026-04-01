
import { Routes, Route } from 'react-router-dom'
import { Header } from '@/widgets/header/'
import { Leagues } from '@/pages/leagues'
import { Teams } from '@/pages/teams'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Leagues />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </main>
    </>
  )
}

export default App

