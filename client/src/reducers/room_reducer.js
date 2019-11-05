import {
  RECEIVE_ROOM_INFO
} from "../../actions/chatroom_actions";

const initialState = {
  room: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ROOM_INFO:
      return {
        ...state,
        room: action.room
      };
    default:
      return state;
  }
}