import { useEffect } from 'react'
import logo from '../assets/ibm_logo.png'
import { isoCertifications } from '../utils'
import { useState } from 'react'

const Dashboard = ({ fullCompany, myContract, account }) => {
  const { name, location, certificatesNumber } = fullCompany
  const [certification, setCertification] = useState([])

  const getCertifications = async () => {
    try {
      const certifications = await myContract.methods.getCertifications().call()
      setCertification(certifications)
    } catch (error) {
      console.error('Error getting certifications:', error)
    }
  }

  useEffect(() => {
    getCertifications()
  }, [myContract])

  return (
    <section className="board">
      <img src={logo} alt="logo" className="board-logo" />
      <h3>Company : {name}</h3>
      <h3>Location: {location}</h3>
      <div className="certifications-container">
        <h2>My Certifications</h2>
        <div className="certifications-grid">
          {certification.map((singleCertification, index) => {
            return (
              <div key={index} className="single-certification">
                <h3>ISO</h3>
                <p>{singleCertification}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default Dashboard
