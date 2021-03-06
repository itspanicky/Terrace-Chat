import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SignupForm from './signup_form';

const msp = state => {
    return {
        errors: state.errors.session
    };
};

const mdp = dispatch => {
    return {
        signup: user => dispatch(signup(user))
    }
}

export default connect(msp, mdp)(SignupForm);