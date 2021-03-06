import { connect } from 'react-redux';
import Home from './home';
import { logout } from '../../actions/session_actions';

const msp = state => {
    debugger;
    return {
        currentUser: state.session.user
    };
};

const mdp = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(msp, mdp)(Home);