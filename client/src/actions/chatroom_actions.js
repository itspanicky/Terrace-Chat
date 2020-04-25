import * as APIUtil from "../util/room__api_util";

export const RECEIVE_ROOM_INFO = "RECEIVE_ROOM_INFO";

export const receiveRoomInfo = (room) => ({
  type: RECEIVE_ROOM_INFO,
  room
});

export const requestRoomInfo = (params) => dispatch => {
    // Going to assume Authtoken is set from other functions
    // const token = localStorage.token
    // APIUtil.setAuthToken(token);
    APIUtil.loadRoom(params).then((res) => {

        // Dispatch a logout action
        dispatch(receiveRoomInfo());
    })
};
