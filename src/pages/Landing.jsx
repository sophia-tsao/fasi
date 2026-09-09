import { useNavigate } from 'react-router-dom'
import { PAGES } from '../pages.js'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <main className="landing">
      <h1>FULTON SCIENCE ACADEMY AERONAUTICS & SPACE INITIATIVE</h1>
      <nav className="button-grid">
        {PAGES.map((page) => (
          <button key={page.path} onClick={() => navigate(page.path)}>
            {page.label}
          </button>
        ))}
      </nav>
    </main>
  )
}
