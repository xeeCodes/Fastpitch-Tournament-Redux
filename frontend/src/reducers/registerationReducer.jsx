import {
    REGISTERATION_REQUEST,
    REGISTERATION_SUBMITTING,
    REGISTERATION_SUCCESS,
    REGISTERATION_FAIL,
    TEAM_REGISTER_REQUEST
} from '../constants/registerationConstants'

const playerInitialState = {
  status: 'idle',
  playerDetails: [],
  error: null
};

export const playerInfoReducer = (state = playerInitialState, action) => {
  switch(action.type){
    case REGISTERATION_REQUEST:
      return {  status: "loading" };
      case TEAM_REGISTER_REQUEST:
      return {  status: "loading" };


      case REGISTERATION_SUBMITTING:
      return {  status: "isSubmitting" };
    
    case REGISTERATION_SUCCESS:
      return {  status: "success", details: action.payload };
    
    case REGISTERATION_FAIL:
      return {  status: "failure", error: action.payload };

      // case POST_REGISTERATION:
      //   return {status:"idle"}
    
    default:
      return state;
  }
};
