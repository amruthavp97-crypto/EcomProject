import React from 'react'
import Product from '../Components/Product'
import productsData from '../Data/Products.json'

const Store = () => {
  return (
    <div className='grid grid-cols-4 px-20 gap-5'>

      {productsData.map((item) => (

        <Product
          key={item.id}
          item={item}
          image={item.image}
          heading={item.name}
          desc={item.description}
          actualprice={item.oldprice}
          offerprice={item.price}
        />

      ))}

    </div>
  )
}

export default Store