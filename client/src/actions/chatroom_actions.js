import * as APIUtil from "../util/room__api_util";

export const RECEIVE_ROOM_INFO = "RECEIVE_ROOM_INFO";

export const receiveRoomInfo = (room) => ({
  type: RECEIVE_ROOM_INFO,
  room
});

export const requestRoomInfo = () => dispatch => {
    const token = localStorage.token
    APIUtil.setAuthToken(token);
    // Dispatch a logout action
    dispatch(loadRoom());
};
