import React from 'react'
import Left from '../components/dashboard/Left'
import Right from '../components/dashboard/Right'
import { Outlet } from 'react-router-dom'
import ResponsiveBar from '../components/dashboard/ResponsiveBar'

const Home = () => {
  return (
    <div className={`flex  bg-blue-400 relative`}>
        <Left/>
        {/* <div className='md:hidden block absolute bottom-0 left-0 h-[100px] w-full bg-white z-40'><ResponsiveBar/></div> */}
        <Outlet/>
        
    </div>
  )
}

export default Home