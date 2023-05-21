const Welcome = ({ handleSignUp }) => {
  return (
    <main className="home">
      <section className="home-center">
        <h1 className="home-title">Welcome to our OlympiHack APP</h1>
        <button className="home-button" type="button" onClick={handleSignUp}>
          Connect to Metamask
        </button>
      </section>
    </main>
  )
}
export default Welcome
