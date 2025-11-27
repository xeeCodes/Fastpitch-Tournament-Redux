import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {  registerationAction } from '../actions/registerationAction';
import Loading from './Loading';

function PlayerForm() {

    const dispatch = useDispatch();

const Years = [2027,2026,2025,2024,2023,2022,2021,2020];
const Positions = ['P', 'C', '1B', '2B', 'SS', '3B', 'OF'];


const [formState, setFormState] = useState({

  firstName: "",
  graduationYear: "",
  primaryPosition: "",
  guardianEmail: "",
  password: ""

})

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showErro,setShowError] = useState(false)
  // validation function
  const validate = (value) => {
    const newErrors = {};

    if (!value.firstName) newErrors.firstName = 'First name is required';
    if (!value.graduationYear) newErrors.graduationYear = 'Graduation year is required';
    if (!value.primaryPosition) newErrors.primaryPosition = 'Primary position is required';
    if (!value.guardianEmail) newErrors.guardianEmail = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(value.guardianEmail)) newErrors.guardianEmail = 'Email address is invalid';
    if (!value.password) newErrors.password = 'Password is required';

    return newErrors;
  }

// handle change

const handleChange = (e) => {

    const {name,value} = e.target;

    setFormState((pre)=>({

        
            ...pre,
            [name]:value,
        
    })
    );
}


const {status,error,playerDetails} = useSelector((state) => state.registrationSlice); 

    // submit handler

   const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formState);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(registerationAction(formState));
    }
  }

    // useEffect

  useEffect(() => {
  if (status === 'success') {
    setShowToast(true);
    setFormState({ firstName: "",
  graduationYear: "",
  primaryPosition: "",
  guardianEmail: "",
  password: "" }); 


      setTimeout(() => setShowToast(false), 3000);

  }
  else if(error){

    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  }
}, [status,error]);

  return (
    <>

<dialog id="player-form" className="modal">
  <div className="modal-box w-64 sm:w-80 md:w-96 max-w-lg p-6 sm:p-8">
    <form method="dialog flex flex-col gap-4">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>


{status === 'isSubmitting' &&<div id="toast-success"
       className="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft 
                  rounded-base shadow-xs border border-green bg-green-300"
       role="alert">

    <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M5 11.917 9.724 16.5 19 7.5" />
      </svg>
    </div>

    <div className="flex flex-row">
<span>Submitting</span><Loading/>    </div>

   
  </div>}


 {showToast && (
  <div id="toast-success"
       className="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft 
                  rounded-base shadow-xs  border border-green bg-green-500"
       role="alert">

    <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M5 11.917 9.724 16.5 19 7.5" />
      </svg>
    </div>

    <div className="ms-3 text-sm font-normal">
      Registration successful!
    </div>

   
  </div>
)}


 {showErro  &&  <div id="toast-danger"
       className="flex  items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft 
                  rounded-base shadow-xs border border-default bg-red-200"
       role="alert">

    <div class="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-danger bg-danger-soft rounded">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
        <span class="sr-only">Error icon</span>
    </div>

    <div className="ms-3 text-sm font-normal">
      Registration failed!
    </div>

   
  </div>
}

    <h3 className="font-bold text-lg sm:text-xl mb-2 ">Registertion Form</h3>

    <hr />
   <div className='my-4'>

    <form>

<div className='flex flex-col'>
<label className="label">Player Name</label>
  <input type="text"  onChange={handleChange} name='firstName' value={formState.firstName} className="input w-full" placeholder="Player Name" />
        {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}</div>
<div className='flex flex-col'>
  <label className="label">Graduation Year</label>

 <select value={formState.graduationYear}className="select w-full" name='graduationYear' onChange={handleChange}>
  <option value='' disabled={true}>Select a Year</option>

  {Years.map((y) => (
    <option key={y} value={y}>{y}</option>
  ))}
</select>
        {errors.graduationYear && <p style={{ color: 'red' }}>{errors.graduationYear}</p>}


</div>

<div className='flex flex-col '>

  <label className="label">Primary Position</label>

  <select value={formState.primaryPosition} className="select w-full" name='primaryPosition'  onChange={handleChange}>
  <option value='' disabled={true}>Select a Position</option>
 {Positions.map((pos,key) => {

    return (
        <option key={pos} value={pos}>{pos}</option>
    )
  })}
</select>
        {errors.primaryPosition && <p style={{ color: 'red' }}>{errors.primaryPosition}</p>}

</div>

<div className='flex flex-col'>

    <label className="label">Guardian Email</label>
  <input type="email" onChange={handleChange}  name='guardianEmail' value={formState.guardianEmail} className="input w-full" placeholder="Email" />
        {errors.guardianEmail && <p style={{ color: 'red' }}>{errors.guardianEmail}</p>}

</div>

<div className='flex flex-col'> <label className="label">Guardian Email</label>
  <input type="email" onChange={handleChange}  name='guardianEmail' value={formState.guardianEmail} className="input w-full" placeholder="Email" />
        {errors.guardianEmail && <p style={{ color: 'red' }}>{errors.guardianEmail}</p>}
</div>

<div className='flex flex-col'>  <label className="label">Password</label>
  <input type="password" onChange={handleChange}  name='password' value={formState.password} className="input w-full" placeholder="Password" />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
</div>
  
  <button className="btn btn-neutral w-full mt-4" onClick={handleSubmit}>Register</button>
    </form>



   </div>
  </div>





</dialog>
    
    </>
  )
}

export default PlayerForm
