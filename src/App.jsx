
import { Routes, Route } from 'react-router-dom'
import { Header } from '@/widgets/header/'
import { Leagues } from '@/pages/leagues'
import { Teams } from '@/pages/teams'
import { MatchesList } from '@/pages/matches/MatchesList'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Leagues />} />
          <Route path="/teams" element={<Teams />} />

          {/* Универсальные страницы матчей */}
          {/* Параметр :id позволит MatchesList получить ID из URL */}
          <Route path="/leagues/:id" element={<MatchesList />} />
          <Route path="/teams/:id" element={<MatchesList />} />
        </Routes>
      </main>
    </>
  )
}

export default App

