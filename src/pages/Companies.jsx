import Company from '../components/Company'
import { companies } from '../utils'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Companies = () => {
  const [companiesArr, setCompaniesArr] = useState(companies)

  const handleChange = (e) => {
    const { value } = e.target
    if (value) {
      const filteredCompanies = companies.filter((company) => {
        return company.name.toLowerCase().includes(value.toLowerCase())
      })
      setCompaniesArr(filteredCompanies)
    } else {
      setCompaniesArr(companies)
    }
  }

  return (
    <main className="companies">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Company"
          name="search"
          onChange={handleChange}
        />
      </div>
      <div className="companies-container">
        {companiesArr.map((company) => {
          return (
            <Link to={`/company/${company.id}`} key={company.id}>
              <Company company={company} />
            </Link>
          )
        })}
      </div>
    </main>
  )
}
export default Companies
