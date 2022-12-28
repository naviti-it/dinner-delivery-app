import * as React from 'react'
import Delivery from '../public/img/delivery.png'
import HeroBg from '../public/img/heroBg.png'
import { heroData } from './../utils/data'

const HomeContainer: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full " id="home">
      <div className=" py-2  flex-1 flex flex-col items-start  justify-center">
        <div className="flex items-center justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold mr-2">Bike Delivery</p>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl">
            <img src={Delivery} className="w-full h-full object-contain " alt="delivery" />
          </div>
        </div>
        <p className="text-[2.5rem] font-bold tracking-wide text-headingColor te lg:text-[4.5rem]">
          The Fastest Delivery in{' '}
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">Your City</span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus ab ipsam deleniti
          ipsum voluptatem ducimus fugiat vel expedita iste similique provident officia incidunt
          maxime alias reprehenderit reiciendis consequuntur, eos perferendis.
        </p>
        <button className=" bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg duration-100 transition-al ease-in-out md:w-auto">
          Order Now
        </button>
      </div>

      <div className="py-2 flex-1 flex items-center relative">
        <img src={HeroBg} className="ml-auto h-420 w-full lg:w-auto lg:h-650" alt="hero" />

        <div className="w-full xl:px-[40px] h-full absolute top-0 left-0 flex items-center justify-center sml:  flex-wrap">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="w-full sml:w-auto xl:w-190 p-3 sml:p-4  bg-cardOverlay backdrop-blur-md rounded-3xl flex sml:items-center items-end justify-end sml:justify-center flex-col drop-shadow-lg m-1 xl:m-2 relative"
              >
                <img
                  src={n.imageSrc}
                  alt="heroFood"
                  className="w-[120px] -mt-10 lg:w-40 lg:-mt-20 absolute left-0 top-6 sml:static"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>
                <p className=" text-[12px] lg:text-sm font-semibold text-lighttextGray my-1 lg:my-3">
                  {n.desc}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className=" text-xs text-red-600">$</span> {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default HomeContainer
