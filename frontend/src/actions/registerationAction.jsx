

// actions/registerationAction.js

import {
  PLAYER_REGISTERATION_REQUEST,
  PLAYER_LIST_REQUEST,
  PLAYER_REQUEST,
  PLAYER_EDIT_REQUEST,
  TEAM_REGISTERATION_REQUEST,
  PLAYER_DEL_REQUEST,
} from '../constants/registerationConstants';

// Register new player
export const playerRegisterationAction =(formState) => {
  return {
    type: PLAYER_REGISTERATION_REQUEST,
    payload: formState
  };
}

// Get all players action

export const playerListAction = () => ({
  type: PLAYER_LIST_REQUEST
});

// Get single player action
export const playerAction = (id) => ({
  type: PLAYER_REQUEST,
  payload: id   
});

// Edit player 
export const playerEditAction = (id, playerData) => ({
type: PLAYER_EDIT_REQUEST,
  payload: { id, playerData },
  
});

//delete player 

  export const playerDeleteAction = (id) => ({
    type:PLAYER_DEL_REQUEST,
    payload:id
  })

// Team registration action
export const teamRegisterationAction = (formState) => ({
  type: TEAM_REGISTERATION_REQUEST,  
  payload: formState
});
