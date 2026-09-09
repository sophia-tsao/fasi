import { Link } from 'react-router-dom'

export default function Todo1() {
  return (
    <main className="page">
      <h1>todo1</h1>
      <p>todo</p>
      <Link to="/">← Back home</Link>
    </main>
  )
}
