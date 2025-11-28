import {
  
  PLAYER_REGISTERATION_REQUEST,
  TEAM_REGISTERATION_REQUEST
} from '../constants/registerationConstants';

// Player registration action
export const playerRegisterationAction = (formState) => ({
  type: PLAYER_REGISTERATION_REQUEST, 
  payload: formState
});

// Team registration action
export const teamRegisterationAction = (formState) => ({
  type: TEAM_REGISTERATION_REQUEST,  
  payload: formState
});
