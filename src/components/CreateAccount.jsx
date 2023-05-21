const CreateAccount = ({ company, createCompany, handleChange }) => {
  return (
    <main className="create-account">
      <form className="form-create" onSubmit={createCompany}>
        <div className="single-form">
          <label htmlFor="name">Name</label>
          <input
            type="string"
            id="name"
            name="name"
            required
            value={company.name}
            onChange={handleChange}
          />
        </div>
        <div className="single-form">
          <label htmlFor="location">Location</label>
          <input
            type="string"
            id="location"
            name="location"
            required
            value={company.location}
            onChange={handleChange}
          />
        </div>

        <div className="single-form">
          <label htmlFor="url">Image</label>
          <input
            type="string"
            id="url"
            name="url"
            required
            value={company.url}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create Company</button>
      </form>
    </main>
  )
}
export default CreateAccount
