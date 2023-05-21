import React from 'react'
import { useGlobalContext } from '../context'

export default function FindCocktails() {
  const { setSearchTerm, cocktails, loading } = useGlobalContext()
  const searchValue = React.useRef('')

  React.useEffect(() => {
    searchValue.current.focus()
  }, [])

  function searchCocktail() {
    setSearchTerm(searchValue.current.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
  }

  const renderCocktails = () => {
    if (loading) {
      return <Loading/>
    }
    if (cocktails.length < 1) {
      return (
        <h2 className='section-title'>
          no cocktails matched your search criteria
        </h2>
      )
    }
    return (
      <section className='section'>
        <h2 className='section-title'>cocktails</h2>
        <div className='cocktails-center'>
          {cocktails.map((item) => {
            return <Cocktail key={item.id} {...item} />
          })}
        </div>
      </section>
    )
  }

  return (
    <main>
      <section className='section search'>
        <form className='search-form' onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='name'>search your favorite cocktail</label>
            <input
              type='text'
              name='name'
              id='name'
              ref={searchValue}
              onChange={searchCocktail}
            />
          </div>
        </form>
      </section>
      {renderCocktails()}
    </main>
  )
}