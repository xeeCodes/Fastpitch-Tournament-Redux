// PlayerForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playerRegisterationAction ,playerEditAction} from '../actions/registerationAction';
import Loading from './Loading';

function PlayerForm({ editingPlayer, onClose, open }) {  

  const dialogRef = useRef(null);
  const dispatch = useDispatch();

  const Years = [2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020];
  const Positions = ['P', 'C', '1B', '2B', 'SS', '3B', 'OF'];

  const [formState, setFormState] = useState({
    firstName: "",
    graduationYear: "",
    primaryPosition: "",
    guardianEmail: "",
    password: ""
  });
useEffect(() => {
  if (!editingPlayer) {
    // reset form only when not editing
    setFormState({
      firstName: "",
      graduationYear: "",
      primaryPosition: "",
      guardianEmail: "",
      password: ""
    });
    return;
  }

  setFormState({
    firstName: editingPlayer.firstName || "",
    graduationYear: editingPlayer.graduationYear || "",
    primaryPosition: editingPlayer.primaryPosition || "",
    guardianEmail: editingPlayer.guardianEmail || "",
    password: ""
  });
}, [editingPlayer]); 

  useEffect(() => {
    
    if (!dialogRef.current) return;

    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);

  const { playerStatus, playerErrors ,playerError,editStatus,editError} = useSelector(state => state.registrationSlice);

  const validate = (values) => {
    const err = {};
    if (!values.firstName) err.firstName = 'First name is required';
    if (!values.graduationYear) err.graduationYear = 'Graduation year is required';
    if (!values.primaryPosition) err.primaryPosition = 'Primary position is required';
    if (!values.guardianEmail) err.guardianEmail = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(values.guardianEmail)) err.guardianEmail = 'Invalid email';
    if (!editingPlayer && !values.password) err.password = 'Password is required';
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log("FORM SUBMITTED - EDITING PLAYER:", editingPlayer);

    const validationErrors = validate(formState);
    
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      if(editingPlayer){

console.log("ABOUT TO DISPATCH playerEditAction FOR ID:", editingPlayer.playerId); // ADD THIS

dispatch(playerEditAction(editingPlayer.playerId , formState));

      }else{
      dispatch(playerRegisterationAction(formState));


      }
    }
  };
// In PlayerForm.jsx
useEffect(() => {
  console.log("PlayerForm rendered/updated:", {
    editingPlayerId: editingPlayer?.playerId,
    open,
    formState
  });
}, [editingPlayer, open, formState]);
useEffect(() => {
  // Handle register
  if (!editingPlayer && playerStatus === 'success') {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose?.();
    }, 2000);
  } 
  // Handle edit
  else if (editingPlayer && editStatus === 'success') {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose?.();
    }, 2000);
  } 
  // Handle errors
  else if ((!editingPlayer && playerError) || (editingPlayer && editError)) {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  }
}, [playerStatus, playerError, editStatus, editError, editingPlayer, onClose]);


  return (
    <dialog ref={dialogRef} id="player-form" className="modal">
      <div className="modal-box w-full max-w-2xl">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          X
        </button>

        {playerStatus === 'loading' && (
          <div className="alert alert-info mb-4">
            <span>Submitting...</span> <Loading />
          </div>
        )}

        {showToast && (
          <div className="alert alert-success mb-4">
            <span>Player saved successfully!</span>
          </div>
        )}

        {showError && (
          <div className="alert alert-error mb-4">
            <span>{playerErrors || 'Failed to save player!'}</span>
          </div>
        )}

        <h3 className="font-bold text-2xl mb-4">
          {editingPlayer ? 'Edit Player' : 'Register New Player'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Player Name</label>
            <input
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Player Name"
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
              {Years.map(y => <option key={y} value={y}>{y}</option>)}
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
              {Positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
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

          {!editingPlayer && (
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

          <button type="submit" className="btn btn-primary w-full">
            {editingPlayer ? 'Update Player' : 'Register Player'}
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default PlayerForm;