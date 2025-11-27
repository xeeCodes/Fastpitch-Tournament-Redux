import {

    REGISTERATION_REQUEST,
    TEAM_REGISTER_REQUEST

} from '../constants/registerationConstants';

export const registerationAction = (formState) => ({
type:REGISTERATION_REQUEST,
payload:formState
});
export const teamRegisterationAction = (formState) => ({
type:TEAM_REGISTER_REQUEST,
payload:formState
});