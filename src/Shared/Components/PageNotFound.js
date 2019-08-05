import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'


class NotFound extends Component  {
    render() {
        return (
            // have time redesign
            <div className="notFound">
                <div>Page not found</div>
                <button onClick={() => this.props.history.push('/')}>Redirect back to Login</button>
            </div>
        );
    }
}

export default withRouter(NotFound);