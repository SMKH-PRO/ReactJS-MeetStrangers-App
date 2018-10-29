import React, { Component } from 'react';

import './uploadimages.css'

class uploadimages extends Component {

constructor(props){
super(props)

}




    render() {
        return (
            <div>
                
<p>You have to upload 3 different pictures of your self (All 3 Are Required!)</p>

    <div className="file-field widthsetting">
        <div className="mb-4">
            <img src={require('./placeholder-avatar.jpg')} className="rounded-circle z-depth-1-half avatar-pic widthsetting" alt="example placeholder avatar"/>
        </div>
        <div  className="d-flex justify-content-center">
            <div  className="btn btn-mdb-color btn-rounded float-left">
                <span>Add photo</span>
                <input type="file"/>
            </div>
        </div>
    </div>
    <div className="file-field widthsetting">
        <div className="mb-4">
            <img src={require('./placeholder-avatar.jpg')} className="rounded-circle z-depth-1-half avatar-pic widthsetting" alt="example placeholder avatar"/>
        </div>
        <div  className="d-flex justify-content-center">
            <div  className="btn btn-mdb-color btn-rounded float-left">
                <span>Add photo</span>
                <input type="file"/>
            </div>
        </div>
    </div>
    <div className="file-field widthsetting">
        <div className="mb-4">
            <img src={require('./placeholder-avatar.jpg')} className="rounded-circle z-depth-1-half avatar-pic widthsetting" alt="example placeholder avatar"/>
        </div>
        <div  className="d-flex justify-content-center">
            <div  className="btn btn-mdb-color btn-rounded float-left">
                <span>Add photo</span>
                <input type="file"/>
            </div>
        </div>
    </div>

            </div>
        );
    }
}

export default uploadimages;