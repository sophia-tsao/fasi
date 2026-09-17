import { useNavigate } from 'react-router-dom'
import { PAGES } from '../pages.js'
import Earth from '../components/Earth.jsx'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <main className="landing">
      <div className="landing-stage">
        <div className="landing-content">
          <p className="landing-eyebrow">Fulton Science Academy</p>
          <h1 className="landing-title">
            FULTON SCIENCE ACADEMY AERONAUTICS &amp; SPACE INITIATIVE (FASI)
          </h1>
        </div>

        <div className="landing-earth" aria-hidden="true">
          <Earth />
        </div>
      </div>

      <section className="tile-grid">
        {PAGES.map((page) => (
          <button
            key={page.path}
            className="tile"
            onClick={() => navigate(page.path)}
          >
            <span className="tile-title">{page.label}</span>
          </button>
        ))}
        {/* Sixth tile: placeholder for future content. */}
        <div className="tile tile--todo">
          <span className="tile-title">TODO</span>
        </div>
      </section>
    </main>
  )
}
