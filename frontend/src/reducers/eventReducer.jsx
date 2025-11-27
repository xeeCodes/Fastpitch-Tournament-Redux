import {
    EVENT_INFO_REQUEST,
    EVENT_INFO_SUCCESS,
    EVENT_INFO_FAIL
} from '../constants/eventconstants'

const initialState = {
  status: 'idle',
  eventDetails: [],
  error: null
};

export const eventInfoReducer = (state = initialState, action) => {
  switch(action.type){
    case EVENT_INFO_REQUEST:
      return { ...state, status: "loading" };
    
    case EVENT_INFO_SUCCESS:
      return { ...state, status: "idle", eventDetails: action.payload };
    
    case EVENT_INFO_FAIL:
      return { ...state, status: "failure", error: action.payload };
    
    default:
      return state;
  }
};
