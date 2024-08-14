import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER } from '../../api/constant'
import { Link, useParams } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'
import { MdPerson } from 'react-icons/md'

const Success = () => {
  const params = useParams()
  const [data,setData] = useState([])

  console.log(data.updatePayment?.fullName)
  useEffect(()=>{
    const fun = async () => {
      try {
        const res = await axios.get(`${SERVER}/get-payment-status/${params.id}/${params.studentId}`)
        console.log(res.data)
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fun()
  },[])

  return (
    <div className="w-full md:w-[80%] h-screen p-2 ">
    
    <div className="h-full w-full bg-white rounded-2xl p-5  overflow-scroll scroll-smooth no-scrollbar z-20">
      <Link to={"/dashboard/landing"} className="flex gap-3 items-center">
        <IoMdArrowBack className="text-[30px]" /> back
      </Link>
      <div className="border border-black border-opacity-30 bg-gradient-to-r from-blue-100 to-white  shadow-xl rounded-md md:w-[400px] relative p-5 my-5 ">
        <div className=" items-center justify-center flex flex-col">
          <MdPerson className="text-[50px]" />
          <div className='font-bold uppercase text-[20px] my-2'>{data?.updatePayment?.fullName}</div>
          <div>Start : {data?.event?.startTime}</div>
          <div > End : {data?.event?.endTime}</div>
        </div>
       
        <div
          className="cursor-not-allowed my-2 p-2 bg-black bg-opacity-80 duration-500 rounded-md text-white w-full text-center "
          // onClick={() => popup()}
        >
          Join
        </div>
      </div>
    </div>
  </div>
  )
}

export default Success