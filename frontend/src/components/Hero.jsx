import React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux";
import {fetchEventInfo} from '../actions/eventAction';
import Loading from './Loading';
import PlayerForm from './PlayerForm';
import TeamForm from './TeamForm';
import backgroundImage from '../assets/background.jpg'


function Hero() {

const dispatch = useDispatch();
const {status,error,eventDetails} = useSelector((state)=>state.eventSlice);

  useEffect(() => {
    const eventId = 2;
    dispatch(fetchEventInfo(eventId));
  }, []);

  if (error) return <p>Error: {error}</p>;

 return (
    <div
      className="hero min-h-[70vh]"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          {(status === 'loading') ? (<Loading/>):(
            <>
            {eventDetails && 
            <>
            <h1 className="mb-5 text-4xl font-bold sm:text-5xl">{eventDetails.name}</h1>
              <p className="mb-5 sm:text-lg">
                <i className="fas fa-calendar-alt"></i> {eventDetails.date} |
                <i className="fas fa-map-marker-alt"></i> {eventDetails.location}
              </p>
              </>
              }
              
            </>
          )}

          <div className='flex flex-row gap-2 sm:justify-between md:justify-between text-center justify-center'>
            <button className="btn btn-primary p-1  text-xs btn-sm sm:btn-md sm:rounded-lg md:p-3  md:text-base" onClick={()=>document.getElementById("player-form").showModal()}>Player Camp Sign-Up!</button>
            <button className="btn btn-secondary btn-sm p-1 text-xs sm:btn-md sm:rounded-lg md:p-3 md:text-base"  onClick={()=>document.getElementById("team-form").showModal()}>Register Your Team</button>
          </div>
        </div>
      </div>
      <PlayerForm/>
      <TeamForm />
    </div>
  );
}

export default Hero