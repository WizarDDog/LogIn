import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './Scss/Header.scss';
import Logout from '../Icons/ico-logout.svg';
import Testio from '../Icons/logotype-testio.svg';


class Header extends Component  {

    logout = () => {
        localStorage.removeItem('myToken');
        this.props.history.push('/')
    }


    render() {
        return (
            <div className="header">
                <img className="headerLogo" src={Testio} alt="Testio" />
                <div className="logout-container" >
                    <button className="logoutButton" onClick={() => this.logout()}>
                    <img className="logoutLogo" src={Logout} alt="LogOut" /> Logout</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);