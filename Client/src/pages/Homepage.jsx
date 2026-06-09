import React from 'react'
import HeaderSlider from '../Components/HeaderSlider'
import Product from '../Components/Product'
import productsData from '../Data/Products.json'
const Homepage = () => {
  return (
    <div>

        <HeaderSlider/>
        <div className='grid grid-cols-4 px-20'>
            
          	{productsData.filter((item)=> item.class==="Trending")
            .map((item)=>(

            
        <Product
					key={item.id}
          item={item}
					image={item.image}
					heading={item.name}
					desc = {item.description}
					actualprice={item.oldprice}
					offerprice={item.price}
              	/>
            ))}
       
        </div>
        {/* <Product
                image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                heading="Laptop"
                desc = "Lightweight 15 inch 16gb RAM,512gb ROM"
                actualprice="49,499"
                offerprice="45,999"
            /> */}

    </div>
  )
}

export default Homepage