import { useState } from 'react'
const Home = () => {
  const [myContract, setMyContract] = useState(null)
  if (!window.ethereum.selectedAddress) {
    return (
      <main className="home">
        <section className="section-center">
          <h1 className="home-title">Welcome to our OlympiHack APP</h1>
          <button className="home-button" type="button">
            Connect to Metamask
          </button>
        </section>
      </main>
    )
  }
}
export default Home
