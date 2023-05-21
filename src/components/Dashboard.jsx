import { useEffect } from 'react'
import logo from '../assets/ibm_logo.png'
import { isoCertifications } from '../utils'
import { useState } from 'react'

const Dashboard = ({ myContract, account }) => {
  const [certification, setCertification] = useState([])
  const [fullCompany, setFullCompany] = useState({
    name: '',
    location: '',
    owner: 0,
    certificatesNumber: 0,
    partnersNumber: 0,
    uRL: '',
  })

  const getCompany = async () => {
    try {
      const company = await myContract?.methods.getCompany().call()
      setFullCompany({
        name: company.name,
        location: company.location,
        owner: company.owner,
        certificatesNumber: company.certificatesNumber,
        partnersNumber: company.partnersNumber,
        uRL: company.uRL,
      })
    } catch (error) {
      console.error('Error getting company:', error)
    }
  }

  const getCertifications = async () => {
    try {
      const certifications = await myContract.methods.getCertifications().call()
      setCertification(certifications)
      console.log(certifications)
    } catch (error) {
      console.error('Error getting certifications:', error)
    }
  }

  useEffect(() => {
    getCompany()
    getCertifications()
  }, [myContract])

  return (
    <section className="board">
      <img src={fullCompany.uRL} alt="logo" className="board-logo" />

      <h3>Company : {fullCompany.name}</h3>
      <h3>Location: {fullCompany.location}</h3>
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
