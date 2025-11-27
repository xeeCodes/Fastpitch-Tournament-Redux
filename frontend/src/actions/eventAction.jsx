import {

    EVENT_INFO_REQUEST,

} from '../constants/eventconstants';

export const fetchEventInfo = (id) => ({
type:EVENT_INFO_REQUEST,
payload:id
});