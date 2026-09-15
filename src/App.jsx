import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Aeroforge from './pages/Aeroforge.jsx'
import Astrophotography from './pages/Astrophotography.jsx'
import KorucuSAT from './pages/KorucuSAT.jsx'
import RacingDrone from './pages/RacingDrone.jsx'
import Rocketry from './pages/Rocketry.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/aeroforge" element={<Aeroforge />} />
      <Route path="/astrophotography" element={<Astrophotography />} />
      <Route path="/korucusat" element={<KorucuSAT />} />
      <Route path="/racingdrone" element={<RacingDrone />} />
      <Route path="/rocketry" element={<Rocketry />} />
    </Routes>
  )
}
