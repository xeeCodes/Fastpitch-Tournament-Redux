import React from 'react'
import {useSelector} from "react-redux";


function Header() {

const {status,error,eventDetails} = useSelector((state)=>state.eventSlice);


  return (
<div className="navbar bg-gray-700 z-10 sticky top-0 shadow-sm">
    <div >
        <img className='w-10 sm:w-15' src="./logo.jpeg"/>
    </div>
  <a className="btn btn-ghost text-xl px-2 text-white sm:text-2xl">{eventDetails.name}</a>
</div>
  )
}

export default Header