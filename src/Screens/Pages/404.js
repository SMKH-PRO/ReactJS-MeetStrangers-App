import React, { Component } from 'react';

import {
        Link
    } from 'react-router-dom';



class NotFound extends Component {

    constructor(props){
        super(props)
      this.state ={
    Time: 10
      }
      
      }
    
      
      componentDidMount(){
    
      
    
    
        setInterval(()=>{
           
    
            this.setState({Time: this.state.Time -1})
    
            if(this.state.Time == -1){
                this.setState({Time:  10})
    
                this.props.history.push('/')
    
    
            }
    
        },1000)
    
    
    
      }
    render() {


        return (
            <div style={{textAlign:'center'}}>

            <br/><br/><br/><br/>
                
                <h1 onClick={()=>{console.log(this.state.Time)}} ><b>404 Not Found</b></h1>
                <p style={{fontSize:10,color:"gray"}} >The File,Folder or Page you are trying to access, doesn't exist or temporarily unavailable!</p>
                <br/><br/>
                <p>  Redirecting Back To <Link to="/">Home</Link> In {this.state.Time} Seconds!.</p>
            </div>
        );
    }

}

export default NotFound;