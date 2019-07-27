import React from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <button onClick={this.props.logout}>Logout</button>
            </div>
        )
    }

}

export default withRouter(Home);