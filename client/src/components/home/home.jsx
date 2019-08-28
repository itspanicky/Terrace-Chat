import React from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import { userInfo } from 'os';


class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
    // const socket = io('http://localhost:5000');   
    }



    render() {
        return (
            <div>
                <h1>Home Page</h1>
                { this.props.currentUser && this.props.currentUser.livingroom ? "LIVING ROOM" : "WAITING FOR MORE MEMBERS"}
                <button onClick={this.props.logout}>Logout</button>
            </div>
        )
    }

}

export default withRouter(Home);