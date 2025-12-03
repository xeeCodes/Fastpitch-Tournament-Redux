import {
  PLAYER_REGISTER_SUBMITTING,
  PLAYER_REGISTER_SUCCESS,
  PLAYER_REGISTER_FAIL,
  PLAYER_LIST_REQUEST,
  PLAYER_LIST_SUCCESS,
  PLAYER_LIST_FAIL,
  PLAYER_REQUEST,
  PLAYER_SUCCESS,
  PLAYER_FAIL,
  PLAYER_EDIT_REQUEST,
  PLAYER_EDIT_SUCCESS,
  PLAYER_EDIT_FAIL,
  PLAYER_DEL_REQUEST,
  PLAYER_DEL_SUCCESS,
  PLAYER_DEL_FAIL,
  TEAM_REGISTER_SUBMITTING,
  TEAM_REGISTER_SUCCESS,
  TEAM_REGISTER_FAIL,
  RESET_SINGLE_PLAYER,
} from '../constants/registerationConstants';

const initialState = {
  // Player registration
  playerStatus: 'idle',
 

  playerError: null,
  playerDetails: [],

  // Player list
  listStatus: 'idle',
  playerList: [],
  listError: null,

  // Single player
  singlePlayer: null,
  singlePlayerStatus: 'idle',
  singlePlayerError: null,

  // Edit player
  editStatus: 'idle',
  editError: null,

  // Delete player
  deleteStatus: 'idle',
  deleteError: null,

  // Team registration
  teamStatus: 'idle',
  teamError: null,
  teamDetails: [],
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {

    // ===== PLAYER REGISTER =====
    case PLAYER_REGISTER_SUBMITTING:
      return { ...state, playerStatus: 'loading', playerError: null };
    case PLAYER_REGISTER_SUCCESS:
      return { ...state, playerStatus: 'success', playerDetails: action.payload };
    case PLAYER_REGISTER_FAIL:
      return { ...state, playerStatus: 'failure', playerError: action.payload };

    // ===== PLAYER LIST =====
    case PLAYER_LIST_REQUEST:
      return { ...state, listStatus: 'loading', listError: null };
    case PLAYER_LIST_SUCCESS:
      return { ...state, listStatus: 'success', playerList: action.payload };
    case PLAYER_LIST_FAIL:
      return { ...state, listStatus: 'failure', listError: action.payload };

    // ===== SINGLE PLAYER =====
    case PLAYER_REQUEST:
      return { ...state, singlePlayer: null, singlePlayerStatus: 'loading', singlePlayerError: null };
    case PLAYER_SUCCESS:
      return { ...state, singlePlayerStatus: 'success', singlePlayer: action.payload };
    case PLAYER_FAIL:
      return { ...state, singlePlayerStatus: 'failure', singlePlayerError: action.payload, singlePlayer: null };
    case RESET_SINGLE_PLAYER:
      return { ...state, singlePlayer: null, singlePlayerStatus: 'idle', singlePlayerError: null };

    // ===== EDIT PLAYER =====
    case PLAYER_EDIT_REQUEST:
      return { ...state, editStatus: 'loading', editError: null };
    case PLAYER_EDIT_SUCCESS:
      return { ...state, editStatus: 'success', singlePlayer: action.payload };
    case PLAYER_EDIT_FAIL:
      return { ...state, editStatus: 'failure', editError: action.payload };

    // ===== DELETE PLAYER =====
    case PLAYER_DEL_REQUEST:
      return { ...state, deleteStatus: 'loading', deleteError: null };
    case PLAYER_DEL_SUCCESS:
      return { ...state, deleteStatus: 'success', singlePlayer: null };
    case PLAYER_DEL_FAIL:
      return { ...state, deleteStatus: 'failure', deleteError: action.payload };

    // ===== TEAM REGISTRATION =====
    case TEAM_REGISTER_SUBMITTING:
      return { ...state, teamStatus: 'loading', teamError: null };
    case TEAM_REGISTER_SUCCESS:
      return { ...state, teamStatus: 'success', teamDetails: action.payload };
    case TEAM_REGISTER_FAIL:
      return { ...state, teamStatus: 'failure', teamError: action.payload };

    default:
      return state;
  }
};
