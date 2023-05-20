import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import pages
import Home from './pages/Home'
import About from './pages/About'
import SingleCompany from './pages/SingleCompany'
import Error from './pages/Error'
// import components
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="company/:id" element={<SingleCompany />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
