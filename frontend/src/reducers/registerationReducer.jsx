import {
  PLAYER_REGISTER_SUBMITTING,
  PLAYER_REGISTER_SUCCESS,
  PLAYER_REGISTER_FAIL,
  TEAM_REGISTER_SUBMITTING,
  TEAM_REGISTER_SUCCESS,
  TEAM_REGISTER_FAIL,
} from '../constants/registerationConstants';

const initialState = {
  playerStatus: 'idle',
  playerError: null,
  playerDetails: [],
  teamStatus: 'idle',
  teamError: null,
  teamDetails: [],
};

export const registrationReducer = (state = initialState, action) => {



  switch (action.type) {
      

    //player status
    case PLAYER_REGISTER_SUBMITTING:
      return {...state, playerStatus: 'loading' };
       case PLAYER_REGISTER_SUCCESS:
      return {...state,playerStatus: 'success', playerDetails: action.payload };
        case PLAYER_REGISTER_FAIL:
      return {...state, playerStatus: 'failure', playerError: action.payload };

      //team status
    case TEAM_REGISTER_SUBMITTING:
         return { teamStatus: 'loading' };
    case TEAM_REGISTER_SUCCESS:
      return { teamStatus: 'success', teamDetails: action.payload };
    case TEAM_REGISTER_FAIL:
      return {teamStatus: 'failure', teamError: action.payload };
    default:
      return state;
  }
};
