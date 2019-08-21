import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../stylesheets/session_form.css'

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

    animateForm() {
        const arrows = document.querySelectorAll(".fa-arrow-down")
        arrows.forEach(arrow => {
            arrow.addEventListener("click", () => {
                const input = arrow.previousElementSibling
                const parent = arrow.parentElement
                console.log(input)
            })
        })
    }
    
    render() {
        return (
          <>
            <div className="header-container header-animate">
              <div className="logo-name">TERRACE CHAT</div>
              <Link to="/" className="logo-side">
                <div className="logo-motto">ON THE</div>
                <div className="logo-motto">INTERNET</div>
                <div className="logo-line">ウ ェ ブ 上 で</div>
              </Link>
            </div>

            <div className="session-form-container">
              <form onSubmit={this.handleSubmit}>
                <div className="session-form">
                  <br />

                  <div className="field-email">
                    <input
                      type="text"
                      value={this.state.email}
                      onChange={this.update("email")}
                      placeholder="Email"
                      autoComplete="email"
                    />
                    <i className="fas fa-arrow-down" />
                  </div>

                  <br />

                  <div className="field-name inactive">
                    <input
                      type="text"
                      value={this.state.name}
                      onChange={this.update("name")}
                      placeholder="name"
                      autoComplete="username"
                    />
                    <i className="fas fa-arrow-down" />
                  </div>

                  <br />
                  <div className="field-dob inactive">
                    <input
                      type="date"
                      value={this.state.dob}
                      onChange={this.update("dob")}
                      placeholder="Date of birth"
                    />
                    <i className="fas fa-arrow-down" />
                  </div>

                  <br />

                  <div className="field-gender inactive">
                    <select
                      value={this.state.gender}
                      onChange={this.update("gender")}
                    >
                      <option value="0">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <br />

                  <div className="field-password inactive">
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.update("password")}
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                    <i className="fas fa-arrow-down" />
                  </div>

                  <br />

                  <div className="field-password2 inactive">
                    <input
                      type="password"
                      value={this.state.password2}
                      onChange={this.update("password2")}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                    />
                    <i className="fas fa-arrow-down" />
                  </div>

                  <br />

                  <div className="field-submit inactive">
                    <input type="submit" value="Submit" />
                  </div>
                  {this.renderErrors()}
                </div>
              </form>
            </div>

            <Link className="link_to" to="/login">
              Log in
            </Link>
          </>
        );
    }
}

export default withRouter(SignupForm);