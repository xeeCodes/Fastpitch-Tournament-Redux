import React from 'react'

function Information() {
  return (
<>

 {/* // divisions */}
   <div className=''>

<h3 className='text-center my-2 lg:text-lg lg:mx-13'>Divisions</h3>

<div className='flex flex-col gap-2 sm:flex-row sm:gap-0  md:flex-row md:justify-between lg:justify-between sm:justify-between  md:gap-2  lg:mx-3 m-2 '>
  
  <div className="card w-full m-1 sm:w-64 md:w-80 lg:w-96 xl:w-full bg-base-100 shadow-md">
    <div className="card-body">
      <h3 className="card-title text-xs sm:text-sm md:text-base">
        <i className="fas fa-layer-group text-blue-500"></i> 18U Division
      </h3>
      <p className='text-xs sm:text-sm md:text-base'>High School Seniors & Juniors</p>
      <div className="flex flex-col text-xs sm:text-sm md:text-base card-actions">
        <p><i className="fas fa-trophy text-yellow-400"></i> 32 Teams</p>
        <p><i className="fas fa-dollar-sign text-green-600"></i> $5,000 Prize Pool</p>
      </div>
    </div>
  </div>

  <div className="card w-full m-1 sm:w-64 md:w-80 lg:w-96 xl:w-full bg-base-100 shadow-md">
    <div className="card-body">
      <h3 className="card-title">
        <i className="fas fa-layer-group text-blue-500"></i> 16U Division
      </h3>
      <p className='text-xs sm:text-sm md:text-base'>High School Sophomores & Freshmen</p>
      <div className="flex flex-col text-xs sm:text-sm md:text-base card-actions">
        <p><i className="fas fa-trophy text-yellow-400"></i> 32 Teams</p>
        <p><i className="fas fa-dollar-sign text-green-600"></i> $3,000 Prize Pool</p>
      </div>
    </div>
  </div>

  <div className="card w-full sm:w-64 md:w-80 lg:w-96 xl:w-full m-1 bg-base-100 shadow-md">
    <div className="card-body">
      <h3 className="card-title">
        <i className="fas fa-layer-group text-blue-500"></i> 14U Division
      </h3>
      <p className='text-xs sm:text-sm md:text-base'>High School Seniors & Juniors</p>
      <div className="flex flex-col text-xs sm:text-sm md:text-base card-actions">
        <p><i className="fas fa-trophy text-yellow-400"></i> 24 Teams</p>
        <p><i className="fas fa-dollar-sign text-green-600"></i> $2,000 Prize Pool</p>
      </div>
    </div>
  </div>

</div>

 
   </div>
   
   {/* entry fees and registeration deadline */}

<div className='flex flex-col sm:flex-row  md:flex-row lg-flex-row  gap-2 m-2 '>


    <div className="card  bg-base-100 w-xsm shadow-lg  ">
  <div className="card-body ">
    <h2 className="card-title text-xs sm:text-sm md:text-base "><i className="fas fa-dollar-sign text-green-700 text-2xl"></i>Entry Fees</h2>
   
   <div className='flex flex-row text-xs sm:text-sm md:text-base  justify-between'>
    <p>
18U Division
    </p>
    <p>$50 per team</p>
   </div>
   <hr/>
     <div className='flex flex-row text-xs sm:text-sm md:text-base  justify-between'>
    <p>
16U Division
    </p>
    <p>$40 per team</p>
   </div>
   <hr/>
     <div className='flex flex-row text-xs sm:text-sm md:text-base  justify-between'>
    <p>
14U Division
    </p>
    <p>3$0 per team</p>
   </div>
   <hr/>
   <div className='bg-opacity-50  text-xs sm:text-sm md:text-base bg-blue-400 rounded-sm p-2'>
    <p className='text-blue-800'><span className='font-bold'>Early Bird Discount:</span> Register before April 15th and save $50 per team!</p>
   </div>
  </div>
</div>
<div className="card  bg-base-100  shadow-lg  w-xsm">
  <div className="card-body">
    <h2 className="card-title text-xs sm:text-sm md:text-base "><i className="fa fa-clock  text-2xl text-red-600"></i>
Registration Deadlines</h2>
   
   <div className='flex flex-row text-xs sm:text-sm md:text-base justify-between md'>
    <p>
Early Bird Deadline    </p>
    <p>April 15, 2025</p>
   </div>
   <hr/>
     <div className='flex flex-row text-xs sm:text-sm md:text-base  justify-between'>
    <p>
Standard Registration    </p>
    <p>May 30, 2025</p>
   </div>
   <hr/>
     <div className='flex flex-row text-xs sm:text-sm md:text-base  justify-between'>
    <p>
Late Registration

    </p>
    <p>June 10, 2025</p>
   </div>
   <hr/>
   <div className='bg-opacity-50 bg-orange-100 text-xs sm:text-sm md:text-base  rounded-sm p-2'>
    <p className='text-red-800'><span className='font-bold'>Note:</span>  Late registration incurs an additional $100 fee and is subject to availability.</p>
   </div>
  </div>
</div>
</div>


{/* information */}

<div className="card m-2   shadow-sm bg-blue-50">
  <div className="card-body ">
   

    <div className='text-sm sm:text-sm md:text-base'>
<p className='text-xs sm:text-sm md:text-base '>Elite Player Development Camp
</p>
        <p className='text-xs sm:text-sm md:text-base '>
            Our exclusive player development camp runs concurrent with the tournament and offers individual skill development for athletes looking to take their game to the next level. Work with college coaches and professional trainers in small group settings.
        </p>
    </div>
<div className="flex flex-col gap-2 sm:flex-row md:flex-row lg:flex-row flex-wrap">

  <div className="card flex-1 min-w-[250px] sm:min-w-[300px] bg-blue-200 text-black p-2">
    <h3 className="px-2">What's Included</h3>
    <div className="card-body py-0">
      <ul className="mt-2 flex flex-col gap-2 text-xs sm:text-sm md:text-base bullet-list">
        <li>High-resolution image generation</li>
        <li>Customizable style templates</li>
        <li>Batch processing capabilities</li>
        <li>AI-driven image enhancements</li>
      </ul>
    </div>
  </div>

  <div className="card flex-1 min-w-[250px] sm:min-w-[300px] bg-blue-200 text-black p-2">
    <h3 className="px-2">Camp Details</h3>
    <div className="card-body py-0">
      <ul className="mt-2 flex flex-col gap-2 text-xs sm:text-sm md:text-base bullet-list">
        <li>High-resolution image generation</li>
        <li>Customizable style templates</li>
        <li>Batch processing capabilities</li>
        <li>AI-driven image enhancements</li>
      </ul>
    </div>
  </div>

</div>

    
    
    
  </div>
</div>

   
   </>
   
  )
}

export default Information