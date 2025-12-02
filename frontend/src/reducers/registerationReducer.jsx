import {
  PLAYER_REGISTER_SUBMITTING,
  PLAYER_REGISTER_SUCCESS,
  PLAYER_REGISTER_FAIL,
  TEAM_REGISTER_SUBMITTING,
  TEAM_REGISTER_SUCCESS,
  TEAM_REGISTER_FAIL,
  PLAYER_EDIT_SUCCESS,
  PLAYER_LIST_FAIL,
  PLAYER_LIST_SUCCESS,
  PLAYER_LIST_REQUEST,
  PLAYER_REQUEST,
  PLAYER_EDIT_REQUEST,

  PLAYER_FAIL,
  PLAYER_SUCCESS,
  PLAYER_EDIT_FAIL,
} from '../constants/registerationConstants';

const initialState = {
  playerStatus: 'idle',
  playerError: null,
  playerDetails: [],
  teamStatus: 'idle',
  teamError: null,
  teamDetails: [],
  status:'idle',
  playerList:[],
  error:null,
  singlePlayer:'null',
  

};

export const registrationReducer = (state = initialState, action) => {



  switch (action.type) {
      
case PLAYER_REGISTER_SUBMITTING:
      return { ...state, playerStatus: 'loading' };

    case PLAYER_REGISTER_SUCCESS:
      return { ...state, playerStatus: 'success', playerDetails: action.payload };

    case PLAYER_REGISTER_FAIL:
      return { ...state, playerStatus: 'failure', playerError: action.payload };

    // List of players action
    case PLAYER_LIST_REQUEST:
      return { ...state, listStatus: 'loading' };

    case PLAYER_LIST_SUCCESS:

         return { ...state, listStatus: 'success', playerList: action.payload };

    case PLAYER_LIST_FAIL:
      return { ...state, listStatus: 'failure', playerError: action.payload };

    // Single Player

    case PLAYER_REQUEST:

      return { ...state, singlePlayer: null };

    case PLAYER_SUCCESS:

      return { ...state, singlePlayer: action.payload };
  
    case PLAYER_FAIL:
      
      return { ...state, playerError: action.payload, singlePlayer: null };

    // Edit player
    case PLAYER_EDIT_REQUEST:
      return { ...state, editStatus: 'loading' };

    case PLAYER_EDIT_SUCCESS:
      return { ...state, editStatus: 'success', singlePlayer: action.payload };

    case PLAYER_EDIT_FAIL:
      return { ...state, editStatus: 'failure', playerError: action.payload };


      // team regsieration

   case TEAM_REGISTER_SUBMITTING:

         return {...state, teamStatus: 'loading' };

    case TEAM_REGISTER_SUCCESS:
        
    return { ...state,teamStatus: 'success', teamDetails: action.payload };

    case TEAM_REGISTER_FAIL:
     
        return {...state,teamStatus: 'failure', teamError: action.payload };
        
    default:
      return state;
  }
};
