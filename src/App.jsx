import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import pages
import Home from './pages/Home'
import About from './pages/About'
import SingleOrganization from './pages/SingleOrganization'
import Error from './pages/Error'
// import components
import Navbar from './components/Navbar'
//import Dashboard from './pages/FindOrganizations'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="organization/:id" element={<SingleOrganization />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
