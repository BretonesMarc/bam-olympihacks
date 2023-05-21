import { useParams, Link } from 'react-router-dom'
import { companies } from '../utils'
import { useState } from 'react'

const SingleCompany = () => {
  const [visibility, setVisibility] = useState('public')
  const [tempVisibility, setTempVisibility] = useState('public')
  const { id } = useParams()
  const { name, img, certifications, visibilityLevel } = companies[id - 1]

  const changeVisibility = () => {
    setVisibility(tempVisibility)
  }

  return (
    <section className="single-company">
      <div className="single-company-container">
        <img src={img} alt={name} />
        <h2>{name}</h2>
        <h4>Visibility : {visibility}</h4>
        <select
          name="selectVisibility"
          onChange={(e) => setTempVisibility(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="transparent">Transparent</option>
          <option value="private">Private</option>
        </select>
        <button
          type="button"
          className="add-partner-btn"
          onClick={changeVisibility}
        >
          Add Partner
        </button>

        <div className="certifications-grid-2">
          {certifications.map((certification) => {
            return (
              <div key={certification.id} className="single-certification">
                <h3>ISO</h3>
                <p>{certification}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default SingleCompany
