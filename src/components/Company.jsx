const Company = ({ company }) => {
  const { name, img, id, certifications, visibilityLevel } = company
  return (
    <section className="company-container">
      <img src={img} alt={name} className="company-img"></img>
      <h2 className="">{name}</h2>
    </section>
  )
}
export default Company
