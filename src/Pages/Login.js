import React, { Component } from 'react';
import './Scss/Login.scss';
import Logo from "../Shared/Icons/testio.svg";
import UserIcon from "../Shared/Icons/ico-username.svg"
import UserPswrd from "../Shared/Icons/ico-lock.svg"
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { saveServers } from '../Redux/actions';

class Login extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            text: "",
            loginFailed: false,
            // canLogIn: false,
        };
    }

    saveInput = ev => {
        this.setState({[ev.target.type]: ev.target.value});
        // this.isValidToLogin();
    }

    isValidToLogin = () => {
        const { text, password, canLogIn } = this.state;
        if (text.length > 0 & password.length > 5 & !canLogIn) {
           this.setState({canLogIn: true})
        } else if ((text.length < 1 || password.length < 6) & canLogIn) {
            this.setState({canLogIn: false})
        }
        // Regex for password if want more security (do not forget UI):
        // /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
        // Minimum 8 characters {>>8,20}
        // Maximum 20 characters {8,>>20}
        // At least one uppercase character (?=.*[A-Z])
        // At least one lowercase character (?=.*[a-z])
        // At least one digit (?=.*\d)
        // At least one special character (?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]
    }

    login = () => {
        if (localStorage.getItem('myToken') !== null) {
            this.getServers()
        } else {
            fetch('http://playground.tesonet.lt/v1/tokens', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({
                username: this.state.text,
                password: this.state.password,
            }),
        })
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(res => {
            if (res.token !== undefined) {
                localStorage.setItem('myToken', res.token)
                this.getServers()
            } else {
                this.setState({loginFailed: true})
            }
        })
        }
    }

    getServers = () => {
        fetch('http://playground.tesonet.lt/v1/servers', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`,
        },
    })
    .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
    .then(res => this.props.saveServers(res))
    .then(() => this.props.history.push("/servers"))

    }

    render() {
        const { text, password, loginFailed} = this.state;
        return (
            <div className="login">
                <img className="logo" src={Logo} alt="Logo" />
                {loginFailed ? (<div className="loginFailed" >Login failed please try again</div>) : <div/>}
                <div className="logoAndInputs">
                    {/* <div className="whatIsRequired">
                        { text.length === 0 && <div>Username required more than one letter</div>}
                        { password.length < 6 && <div>Password required more than six letters</div>}
                    </div> */}
                    <div className="inputs">
                        <div className="username-container" >
                            <img src={UserIcon} alt="User" />
                            <input className="username" type="username" placeholder="Username..." onChange={ev => this.saveInput(ev)} />
                        </div>
                        <div className="username-container" >
                            <img src={UserPswrd} alt="Pswrd" />
                            <input className="password" type="password" placeholder="Password..." onChange={ev => this.saveInput(ev)} />
                        </div>
                    </div>
                    {(text.length > 0 & password.length > 5) ? 
                        <button className="loginButton" type="button" onClick={() => this.login()}>Log In</button> 
                            : ( text.length < 1 ? <button disabled className="loginButton">Add Username</button> 
                                : (password.length > 0 ? <button disabled className="loginButton redBorder">Password too short</button>
                                    : <button disabled className="loginButton redBorder">Add password</button>))
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      values: state,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveServers: payload => dispatch(saveServers(payload)),
  }
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
    withRouter,
    withConnect,
)(Login);