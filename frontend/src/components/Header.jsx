import React from 'react'
import logo from '../assets/logo.jpeg'
import {useSelector,useDispatch} from "react-redux";
import {fetchEventInfo} from '../actions/eventAction';


function Header() {

const dispatch = useDispatch();
const {status,error,eventDetails} = useSelector((state)=>state.eventSlice);


  return (
<div className="navbar bg-gray-700 z-10 sticky top-0 shadow-sm">
    <div >
        <img className='w-10 sm:w-15' src={logo}/>
    </div>
  <a className="btn btn-ghost text-xl px-2 sm:text-2xl">{eventDetails.name}</a>
</div>
  )
}

export default Header