import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import pages
import Home from './pages/Home'
import About from './pages/About'
import SingleOrganization from './components/Company'
import Error from './pages/Error'
// import components
import Navbar from './components/Navbar'
import { companies } from './utils'
import Companies from './pages/Companies'
import SingleCompany from './pages/SingleCompany'
import Cloud from './pages/Cloud'
//import Dashboard from './pages/FindOrganizations'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="companies" element={<Companies />} />
        <Route path="company/:id" element={<SingleCompany />} />
        <Route path="cloud" element={<Cloud />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
