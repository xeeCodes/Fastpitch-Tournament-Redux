import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playerRegisterationAction, playerEditAction } from '../actions/registerationAction';
import Loading from './Loading';

function PlayerForm({ editingPlayer }) {

  const dispatch = useDispatch();

  const Years = [2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020];
  const Positions = ['P', 'C', '1B', '2B', 'SS', '3B', 'OF'];

  const[isEdit,setIsEdit] = useState(false);

   const [formState, setFormState] = useState({


  firstName: editingPlayer?.firstName || "",

  guardianEmail: editingPlayer?.guardianEmail || "",
  primaryPosition: editingPlayer?.primaryPosition || "",
  graduationYear: editingPlayer?.graduationYear || "",

  password: ""


});

console.log("editing player",editingPlayer);
console.log("form state",formState);

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false); 

  const { playerStatus, playerErrors, editStatus } = useSelector(state => state.registrationSlice);

  useEffect(() => {

    if (editingPlayer) 

setIsEdit(true);

         

    
  }, [editingPlayer]);


  const validate = (values) => {

    const newErrors = {};

    if (!values.firstName) newErrors.firstName = 'Name is required';
    if (!values.graduationYear) newErrors.graduationYear = 'Yearis required';
    if (!values.primaryPosition) newErrors.primaryPosition = 'POsition is required';
    if (!values.guardianEmail) newErrors.guardianEmail = 'eEmail is requires';

    else if (!/\S+@\S+\.\S+/.test(values.guardianEmail)) newErrors.guardianEmail = 'Invalid email';
    
    if (!editingPlayer && !values.password) newErrors.password = 'Password is required';
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => (
      { ...prev, 
        
        [name]: value }
      
      ));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const validationErrors = validate(formState);
      
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

       if (editingPlayer) {


             dispatch(playerEditAction(editingPlayer.playerId, formState));
      } else {

        dispatch(playerRegisterationAction(formState));
      }
    }
  };

  useEffect(() => {


    if (playerStatus === 'success' || editStatus === 'success') {

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        
      }, 2000);

    }


    if (playerErrors) {

      setShowError(true);

      setTimeout(() => setShowError(false), 3000);
    }
  }, [playerStatus, playerErrors, editStatus]);


  return (
    <dialog id="player-form" className="modal">
      <div className="modal-box w-11/12 max-w-2xl p-8">
                      <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

        {playerStatus === 'loading' && (
          <div id="toast-success"
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
                </div>
        )}

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

        {showError && (
          <div id="toast-success"
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
        )}

        <h3 className="font-bold text-2xl mb-4">
          {isEdit ? 'Edit Player' : 'Player Registration Form'}
        </h3>
        <hr className="mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Player Name</label>
            <input
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter player name"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          <div>
            <label className="label">Graduation Year</label>
            <select
              name="graduationYear"
              value={formState.graduationYear}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>Select Year</option>
              {Years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            {errors.graduationYear && <p className="text-red-500 text-sm">{errors.graduationYear}</p>}
          </div>

          <div>
            <label className="label">Primary Position</label>
            <select
              name="primaryPosition"
              value={formState.primaryPosition}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>Select Position</option>
              {Positions.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.primaryPosition && <p className="text-red-500 text-sm">{errors.primaryPosition}</p>}
          </div>

          <div>
            <label className="label">Guardian Email</label>
            <input
              type="email"
              name="guardianEmail"
              value={formState.guardianEmail}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="guardian@example.com"
            />
            {errors.guardianEmail && <p className="text-red-500 text-sm">{errors.guardianEmail}</p>}
          </div>

          {!isEdit && (
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
          )}

          <button type="submit" className="btn btn-neutral w-full mt-6">
            {isEdit ? 'UPDATE PLAYER' : 'REGISTER PLAYER'}
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default PlayerForm;
