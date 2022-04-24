import React from 'react'
import { useParams } from 'react-router-dom'

import ProductView from '../pages/ProductView'

function GetSlug() {
  const { slug } = useParams()
  return (
    <div>
      <ProductView slugPath={slug} />
    </div>
  )
}

export default GetSlug