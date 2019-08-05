import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Header from '../Shared/Components/Header'
import './Scss/Servers.scss';
import { connect } from 'react-redux'
import { compose } from 'redux';


class ServerList extends Component  {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderBackToLogin = () => {
        if (this.props.values.Values[0] === undefined) {
            this.props.history.push('/')
            return false
        } else {
            return true
        }
    }

    render() {
        return (
            <div className="serverListAll">
                <Header />
                <div className="listNames">
                    <div className="serverList">SERVER</div>
                    <div className="distanceList">DISTANCE</div>
                </div>
                {this.renderBackToLogin() ? (this.props.values.Values.map((server, i)=> 
                    <div className="serverRow" key={i} >
                        <div className="serverName">{server.name}</div>
                        <div className="serverDistance">{server.distance} km</div>
                    </div>
                )) : <div/>}
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
  }
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
    withRouter,
    withConnect,
)(ServerList);