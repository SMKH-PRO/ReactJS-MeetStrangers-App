import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
class RedirectToProfile extends Component {
    render() {
        return (
            <div>
                <Redirect to='/Profile'/>
            </div>
        );
    }
}

export default RedirectToProfile;