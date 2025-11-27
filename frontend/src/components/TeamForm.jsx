import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { teamRegisterationAction } from '../actions/registerationAction';
import Loading from './Loading';
export default function TeamForm() {


    const dispatch = useDispatch();
    
    const ageGroups = ['18U','16U','14U'];
    const States = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa','Balochistan'];
    const [errors,setErrors] = useState({});
const [showToast, setShowToast] = useState(false);
const [showErro,setShowError] = useState(false)


    // function for validation

    const validate = (value) => {
      const newErrors = {};

      if(!value.name){

        newErrors.name = 'name is required'
      }
      if(!value.coachName){
        newErrors.coachName ='coach name is required'
      }
      if(!value.coachEmail){
        newErrors.coachEmail ='email is required'
      }
      else if(!/\S+@\S+\.\S+/.test(value.coachEmail)){
        newErrors.coachEmail ='email address is invalid'
      }
      if(!value.state){
        newErrors.state ='state is required'
      }
      if(!value.ageGroup){
        newErrors.ageGroup ='age group is required'
      }
      if(!value.password){
        newErrors.password ='password is required'
      }

      return newErrors;
    }

    
    const [formState, setFormState] = useState({
    
      name: "",
      coachName: "",
      ageGroup: "",
      state:"",
      coachEmail: "",
      password: ""
    
    })
    
    // handle change
    
    const handleChange = (e) => {
    
        const {name,value} = e.target;
    
        setFormState((pre)=>({
    
            
                ...pre,
                [name]:value,
            
        })
        );
    }
    
    
    const {status,error,details} = useSelector((state) => state.registrationSlice); 
    
        // submit handler
    
        const handleSubmit = (e) => {
    
            e.preventDefault();
            console.log("Submited Form: ",formState);
            const validationErrors = validate(formState);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0){

                  dispatch(teamRegisterationAction(formState))

    }
    
        }

        // useeffect

         useEffect(() => {
          if (status === 'success' ) {
    setShowToast(true);

setFormState({ name: "",
coachName: "",
ageGroup: "",
state: "",
coachEmail: "",
password: ""}); 

    setTimeout(() => setShowToast(false), 3000);



            
          }
          else if(error){

            setShowError(true);
    setTimeout(() => setShowError(false), 3000);

          }
        }, [status, error]);
    
  return (
   <dialog id="team-form" className="modal">
  <div className="modal-box">
    <form method="dialog">
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
                  rounded-base shadow-xs border border-default  bg-green-500"
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


 {showErro  &&  <div id="toast-success"
       className="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft 
                  rounded-base shadow-xs border border-default bg-red-300"
       role="alert">

    <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M5 11.917 9.724 16.5 19 7.5" />
      </svg>
    </div>

    <div className="ms-3 text-sm font-normal">
      Registration failed!
    </div>

   
  </div>
}
    <h3 className="font-bold text-lg my-3 ">Registertion Form</h3>

    <hr />
   <div className='my-4'>

    <form>


<label className="label">Team Name</label>
  <input type="text"  onChange={handleChange} name='name' value={formState.name} className="input" placeholder="Team Name" />
  {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

<label className="label">Coach Name</label>
  <input type="text"  onChange={handleChange} name='coachName' value={formState.coachName} className="input" placeholder="Coach Name" />
  {errors.coachName && <p style={{ color: 'red' }}>{errors.coachName}</p>}

<label className="label">Age Group</label>

 <div className="form-control">
  <select
    name="ageGroup"
    value={formState.ageGroup}
    className="select select-bordered "
    onChange={handleChange}
  >
    <option value="" disabled>Select an Age Group</option>
    {ageGroups.map(group => (
      <option key={group} value={group}>{group}</option>
    ))}
  </select>

    {errors.ageGroup && <p style={{ color: 'red' }}>{errors.ageGroup}</p>}

</div>



  <label className="label">State</label>

<div className="form-control">
  <select
    name="state"
    value={formState.state}
    className="select select-bordered "
    onChange={handleChange}
  >
    <option value="" disabled>Select a State</option>
    {States.map(g => <option key={g} value={g}>{g}</option>)}
  </select>

    {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}

</div>




  <label className="label">Coach Email</label>
  <input type="email" onChange={handleChange}  name='coachEmail' value={formState.coachEmail} className="input" placeholder="Email" />
  {errors.coachEmail && <p style={{ color: 'red' }}>{errors.coachEmail}</p>}

  <label className="label">Password</label>
  <input type="password" onChange={handleChange}  name='password' value={formState.password} className="input" placeholder="Password" />
  {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

  <button className="btn btn-neutral mt-4" onClick={handleSubmit}>Register</button>
    </form>



   </div>
  </div>




</dialog>
  )
}
