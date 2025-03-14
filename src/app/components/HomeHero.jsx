import React from 'react'

const HomeHero = () => {
  return (
    <section
    className=" font-poppins w-full  min-h-[89vh] bg-[#B88E2F] bg-[url('/backgrounds/Hero-bg.svg')]  bg-cover bg-center flex items-center justify-end p-10 "
  >

    <div className='md:w-[643px] md:h-[443px] bg-[#FFF3E3] py-6 px-8 flex flex-col items-start justify-center rounded-[10px] gap-4  ' >
      <h3 className='text-[#333333]  text-sm md:text-base  font-semibold ' >New Arrival</h3>
      <h1 className='font-bold text-[#B88E2F] text-3xl lg:text-[52px] lg:leading-[55px] ' >Discover Our New Collection</h1>
      <p className=' text-base md:text-lg font-medium text-[#333333] leading-6 ' >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>

      <button className='bg-[#B88E2F] w-full max-w-[222px] text-white p-6 cursor-pointer text-sm md:text-base font-bold mt-5 md:mt-10 ' >BUY NOW</button>
 
    </div>
 


  </section>
  
  )
}

export default HomeHero;
