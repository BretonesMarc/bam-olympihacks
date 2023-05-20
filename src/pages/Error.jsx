import React from 'react'
import { Link } from 'react-router-dom'
export default function Error() {
  return (
    <section>
      <div>
        <h1>oops! this page does not exists</h1>
        <Link to="/">back home</Link>
      </div>
    </section>
  )
}
