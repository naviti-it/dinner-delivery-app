import React, {useState} from 'react'
import {IoFastFood} from 'react-icons/io5'
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from './../Context/StateProvider';
 
const MenuContainer = () => {

  const[filter, setFilter] = useState('chicken');

  const [{foodItems}] = useStateValue();

  return (
    <section className='w-full my-3 xl:my-6 ' id='menu'>
      <div className='w-full flex flex-col items-center justify-center'>
        <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto'>
          Our Hot Dishes
        </p>
        <div className='w-full flex items-center flex-wrap justify-center mt-2 xl:mt-6 overflow-x-scroll scrollbar-none py-3 xl:py-6'>
          {categories && categories.map(category => (
            <motion.div whileTap={{ scale: 0.75 }} key={category.id} className={`group ${filter === category.urlParamName ? 'bg-cartNumBg' : 'bg-card'} sm:w-24 w-20 sm:min-w-[94px] sm:h-28 h-24 cursor-pointer rounded-lg drop-shadow-xl flex flex-col ml-3 mt-2 items-center justify-center hover:bg-cartNumBg`}
              onClick={() => setFilter(category.urlParamName)}>
              <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ? 'bg-card' : 'bg-cartNumBg'} group-hover:bg-card flex items-center justify-center shadow-lg `}>
                <IoFastFood className={`${filter === category.urlParamName ? 'text-textColor' : 'text-card'} group-hover:text-textColor text-lg`} />
              </div>
              <p className={`text-sm mt-2 ${filter === category.urlParamName ? 'text-white' : 'text-textColor'} group-hover:text-white`}>{category.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
        <div className='w-full'>
          <RowContainer flag={false} data={foodItems?.filter(n=>n.category === filter) }/>
        </div>
    </section> 

  )
}

export default MenuContainer