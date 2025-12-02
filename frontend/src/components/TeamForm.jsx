import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { teamRegisterationAction } from '../actions/registerationAction';
import Loading from './Loading';
export default function TeamForm() {


    const dispatch = useDispatch();
    
    const ageGroups = ['18U','16U','14U'];
    const States = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa','Balochistan'];
    const [errors,setErrors] = useState({});//for validations
const [showToast, setShowToast] = useState(false);
const [showErro,setShowError] = useState(false)//for toast showing errors while submission


   const [formState, setFormState] = useState({
    
      name: "",
      coachName: "",
      ageGroup: "",
      state:"",
      coachEmail: "",
      password: ""
    
    })

    // function for validation

    const validate = (formstate) => {
      const newErrors = {};

      if(!formstate.name){

        newErrors.name = 'name is required'
      }
      if(!formstate.coachName){
        newErrors.coachName ='coach name is required'
      }
      if(!formstate.coachEmail){
        newErrors.coachEmail ='email is required'
      }
      else if(!/\S+@\S+\.\S+/.test(formstate.coachEmail)){
        newErrors.coachEmail ='email address is invalid'
      }
      if(!formstate.state){
        newErrors.state ='state is required'
      }
      if(!formstate.ageGroup){
        newErrors.ageGroup ='age group is required'
      }
      if(!formstate.password){
        newErrors.password ='password is required'
      }

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
    
    
    const {teamStatus,teamError,teamDetails} = useSelector((state) => state.registrationSlice); 
    
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

        // use effect

         useEffect(() => {
          if (teamStatus === 'success' ) {
    setShowToast(true);

setFormState({ 
    name: "",
coachName: "",
ageGroup: "",
state: "",
coachEmail: "",
password: ""}); 

    setTimeout(() => setShowToast(false), 3000);



            
          }
          else if(teamError){

            setShowError(true);
    setTimeout(() => setShowError(false), 3000);

          }
        }, [teamStatus, teamError]);
    
  return (
   <dialog id="team-form" className="modal">
            <div className="modal-box w-full-[10px] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6  sm:p-8">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                {teamStatus === 'loading' && <div id="toast-success"
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
                        <span>Submitting </span><Loading/>
                    </div>
                </div>}

                {showToast && (
                    <div id="toast-success"
                        className="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft 
                        rounded-base shadow-xs border border-green bg-green-500"
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
                </div>}

                <h3 className="font-bold text-lg my-3 ">Team Registertion Form</h3>
                <hr />
                <div className='my-4'>
                    <form>
                        <div className="flex flex-col">
                            <label className="label">Team Name</label>
                            <input type="text"  onChange={handleChange} name='name' value={formState.name} className="input w-full input-bordered" placeholder="Team Name" />
                            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="label">Coach Name</label>
                            <input type="text"  onChange={handleChange} name='coachName' value={formState.coachName} className="input w-full input-bordered" placeholder="Coach Name" />
                            {errors.coachName && <p style={{ color: 'red' }}>{errors.coachName}</p>}
                        </div>

                        
                        <div className="flex flex-col">
                            <label className="label">Age Group</label>
                            <select name="ageGroup" value={formState.ageGroup} className="select w-full select-bordered" onChange={handleChange}>
                                <option value="" disabled>Select an Age Group</option>
                                {ageGroups.map(group => (
                                    <option key={group} value={group}>{group}</option>
                                ))}
                            </select>
                            {errors.ageGroup && <p style={{ color: 'red' }}>{errors.ageGroup}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="label">State</label>
                            <select name="state" value={formState.state} className="select w-full select-bordered" onChange={handleChange}>
                                <option value="" disabled>Select a State</option>
                                {States.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                            {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="label">Coach Email</label>
                            <input type="email" onChange={handleChange}  name='coachEmail' value={formState.coachEmail} className="input w-full input-bordered" placeholder="Email" />
                            {errors.coachEmail && <p style={{ color: 'red' }}>{errors.coachEmail}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="label">Password</label>
                            <input type="password" onChange={handleChange}  name='password' value={formState.password} className="input input-bordered w-full" placeholder="Password" />
                            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                        </div>

                        <button className="btn btn-neutral mt-4 w-full" onClick={handleSubmit}>Register</button>
                    </form>
                </div>
            </div>
        </dialog>
  )
}
