import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    // Once the user has been authenticated, redirect to the Tweets page
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/home');
        }

        // Set or clear errors
        this.setState({ errors: nextProps.errors })
    }

    // Handle field updates (called in the render method)
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(user);
    }

    // Render the session errors if there are any
    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <>
                <div className="header-container header-animate">
                    <div className="logo-name">TERRACE CHAT</div>
                    <Link to="/" className="logo-side">
                        <div className="logo-motto">ON THE</div>
                        <div className="logo-motto">INTERNET</div>
                        <div className="logo-line">
                            ウ ェ ブ 上 で
                        </div>
                    </Link>
                </div>
                <div className="session-form-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="session-form">
                            <br />
                            <input type="text"
                                value={this.state.email}
                                onChange={this.update('email')}
                                placeholder="Email"
                                autoComplete="email"
                            />
                            <br />
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="Password"
                                autoComplete="current-password"
                            />
                            <br />
                            <input type="submit" value="Submit" />
                            {this.renderErrors()}
                        </div>
                    </form>
                </div>
                <Link className="link_to" to='/signup'>Sign Up</Link>
            </>
        );
    }
}

export default withRouter(LoginForm);