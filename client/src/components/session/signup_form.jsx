import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            dob: '',
            gender: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/home');
        }
        this.setState({errors: nextProps.errors})
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            name: this.state.name,
            dob: this.state.dob,
            gender: this.state.gender,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.signup(user, this.props.history);
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="login-form">
                        <br />
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <br />
                        <input type="text"
                            value={this.state.name}
                            onChange={this.update('name')}
                            placeholder="name"
                        />
                        <br />
                        <input type="text"
                            value={this.state.dob}
                            onChange={this.update('dob')}
                            placeholder="Date of birth"
                        />
                        <br />
                        <input type="text"
                            value={this.state.gender}
                            onChange={this.update('gender')}
                            placeholder="Gender"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            placeholder="Confirm Password"
                        />
                        <br />
                        <input type="submit" value="Submit" />
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SignupForm);