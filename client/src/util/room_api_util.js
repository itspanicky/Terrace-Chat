import axios from "axios";

// Gets Room with populated Messages.
export const loadRoom = ({roomId, start, end}) => {
  return axios.get("/api/rooms/messages", { params: {
    roomId,
    start,
    end
  }} );
};

// Duplicate Code.
export const setAuthToken = token => {
  if (token) {
    // any request we make after will automatically have the token
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
