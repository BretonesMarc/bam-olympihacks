import { useState } from 'react'
import { ethers } from 'ethers'

const CONTRACT_ADDRESS = "Your_Contract_Address_Here"
const CONTRACT_ABI = [] // Your Contract ABI here

const Home = () => {
  const [myContract, setMyContract] = useState(null)

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider.getSigner())
        setMyContract(contract)
        createCompany(contract);
      } catch (error) {
        // User denied account access
        console.error("User denied account access")
      }
    } else {
      // If the user's Metamask extension is not installed, handle it.
      console.log('Please install MetaMask!')
    }
  }

  const createCompany = async (contract) => {
    const _name = "IBM";
    const _location = "Paris";
    const _statistics = 100;
    const _isCertifiedISO = true;
    const _sponsorship = true;
    try {
      const tx = await contract.createCompany(_name, _location, _statistics, _isCertifiedISO, _sponsorship);
      await tx.wait();
      console.log('Company created');
    } catch (error) {
      console.log('Failed to create company', error);
    }
  }

  if (!window.ethereum || !window.ethereum.selectedAddress) {
    return (
      <main className="home">
        <section className="section-center">
          <h1 className="home-title">Welcome to our OlympiHack APP</h1>
          <button className="home-button" type="button" onClick={connectToMetaMask}>
            Create Account
          </button>
        </section>
      </main>
    )
  }

  return <div>You are connected! </div>
}

export default Home