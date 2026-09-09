import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Todo1 from './pages/Todo1.jsx'
import Todo2 from './pages/Todo2.jsx'
import Todo3 from './pages/Todo3.jsx'
import Todo4 from './pages/Todo4.jsx'
import Todo5 from './pages/Todo5.jsx'
import Todo6 from './pages/Todo6.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/todo1" element={<Todo1 />} />
      <Route path="/todo2" element={<Todo2 />} />
      <Route path="/todo3" element={<Todo3 />} />
      <Route path="/todo4" element={<Todo4 />} />
      <Route path="/todo5" element={<Todo5 />} />
      <Route path="/todo6" element={<Todo6 />} />
    </Routes>
  )
}
