import React,{useEffect,useState} from 'react'
import {motion} from 'framer-motion'

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length)
    }, 3000)

    return () => clearInterval(interval)

  }, [])

  const [currentSlide, setCurrentSlide] = useState(0)
  console.log(currentSlide)

  return (
    <div className='mx-16'>
      <div className='bg-[#E6E9F2] p-8 overflow-hidden rounded-xl'>
        <motion.div key={currentSlide}
          initial={{ opacity: 0, x: 800 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -800 }}
          transition={{ duration: 1 }}
          className='flex flex-col gap-6'
        >
          <p className='text-sm text-orange-600'>{sliderData[currentSlide].offer}</p>
          <h3 className='text-4xl font-extrabold w-2xl'>{sliderData[currentSlide].title}</h3>
          <div className="flex items-center mt-4 ">
            <button className=" px-7 py-2 bg-orange-600 rounded-full text-white font-medium">
              {sliderData[currentSlide].buttonText1}
            </button>
            <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
              {sliderData[currentSlide].buttonText2}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )


}

export default HeaderSlider