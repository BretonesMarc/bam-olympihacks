import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import CreateAccount from '../components/CreateAccount'
import Welcome from '../components/Welcome'
import SidePanel from '../components/SidePanel'
import Dashboard from '../components/Dashboard'
import { my_Contract_Address, my_Contract_ABI } from '../contract'

const Home = () => {
  const [account, setAccount] = useState(null)
  const [myContract, setMyContract] = useState(null)
  const [addressesCompany, setAddressesCompany] = useState([])
  const [company, setCompany] = useState({
    name: '',
    location: '',
    uRL: '',
  })
  const [fullCompany, setFullCompany] = useState({
    name: '',
    location: '',
    certificatesNumber: 0,
    uRL: '',
  })

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value })
  }
  const handleSignUp = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        const selectedAccount = accounts[0]
        setAccount(selectedAccount)
        const contract = new web3.eth.Contract(
          my_Contract_ABI,
          my_Contract_Address
        )
        setMyContract(contract)
      } catch (error) {
        console.error('Error connecting to MetaMask:', error)
      }
    } else {
      console.error('MetaMask not detected.')
    }
  }
  const getAddressesWithCompanies = async () => {
    try {
      const addresses = await myContract?.methods
        .getAddressesWithCompanies()
        .call()
      console.log(addresses)
      if (addresses) {
        setAddressesCompany(addresses)
      }
    } catch (error) {
      console.error('Error getting addresses with companies:', error)
    }
  }
  // useEffects
  useEffect(() => {
    getAddressesWithCompanies()

    if (myContract && account) {
      getAddressesWithCompanies()
    }
  }, [myContract, account])

  useEffect(() => {
    //console.log(account)
    const getCompany = async () => {
      try {
        const company = await myContract.methods.getCompany().call()
        setFullCompany({
          name: company.name,
          location: company.location,
          certificatesNumber: company.certificatesNumber,
          uRL: company.uRL,
        })
      } catch (error) {
        console.error('Error getting company:', error)
      }
    }

    if (myContract && account) {
      getCompany()
    }
  }, [myContract, account])

  const createCompany = async (e) => {
    e.preventDefault()
    try {
      await myContract.methods
        .createCompany(company.name, company.location, company.url)
        .send({ from: account })
      getAddressesWithCompanies()
      console.log('Company created successfully.')
    } catch (error) {
      console.error('Error creating company:', error)
    }
  }

  const addPartner = async () => {
    try {
      await myContract.methods.addPartner().send({ from: account })
      console.log('Partner added successfully.')
    } catch (error) {
      console.error('Error adding partner:', error)
    }
  }

  if (!account) {
    return <Welcome handleSignUp={handleSignUp} />
  } else if (!addressesCompany.includes(account)) {
    return (
      <CreateAccount
        company={company}
        createCompany={createCompany}
        handleChange={handleChange}
      />
    )
  } else {
    return (
      <main className="dashboard">
        <section className="dashboard-center">
          <Dashboard
            fullCompany={fullCompany}
            myContract={myContract}
            account={account}
          />
          <SidePanel myContract={myContract} account={account} />
        </section>
      </main>
    )
  }
}

export default Home
