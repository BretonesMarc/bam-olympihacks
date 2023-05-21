import { organizations, requestOrganizations } from '../utils'
import { MdNotificationsActive } from 'react-icons/md'
import { useState } from 'react'

const SidePanel = ({ myContract, account }) => {
  const [certificate, setCertificate] = useState('')
  const handleChange = (e) => {
    setCertificate(e.target.value)
  }
  const addCertifications = (e) => {
    e.preventDefault()
    try {
      myContract.methods.addCertifications(certificate).send({ from: account })
    } catch (error) {
      console.error('Error adding certifications:', error)
    }
  }
  return (
    <section className="side-panel">
      <form onSubmit={addCertifications}>
        <h2>Add Certifications</h2>
        <input
          type="text"
          name="certifications"
          className="certifications-input"
          onChange={handleChange}
        />
        <button
          className="side-panel-btn"
          type="submit"
          onClick={addCertifications}
        >
          Add Certifications
        </button>
      </form>
      <div className="underline-sidepanel"></div>

      <div>
        <h2>Organizations</h2>
        {organizations.map((organization) => {
          return (
            <div className="single-organization" key={organization.id}>
              <h3>{organization.name}</h3>
            </div>
          )
        })}
      </div>
      <div className="underline-sidepanel"></div>
      <div>
        <h2>Requests</h2>
        {requestOrganizations.map((organization) => {
          return (
            <div className="single-organization" key={organization.id}>
              <a href="#" className="request">
                <MdNotificationsActive style={{ color: 'var(--tertiary)' }} />
                <h3>{organization.name}</h3>
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}
export default SidePanel
