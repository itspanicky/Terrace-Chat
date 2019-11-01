import { 
    RECEIVE_CURRENT_USER,
    RECEIVE_USER_LOGOUT
} from '../../actions/session_actions';

const initialState = {
    isAuthenticated: false,
    decoded: {},
    currentUser: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            debugger
            return {
                ...state,
                isAuthenticated: !!action.decoded,
                decoded: action.decoded,
                currentUser: action.user
            };
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            };
        default:
            return state;
    }
}