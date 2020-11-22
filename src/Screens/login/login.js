import React, { Component } from 'react';

import * as firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { ClipLoader as MoonLoader } from 'react-spinners';

class login extends Component {
    constructor(){

        super()
      
        this.state={
      
          open:false,
          loggedIn: false,
          LogInNotChecked:true,
          userid:'',
          loading:false,
          success:false,
          ErrorMessage:'',
          Name:'',
          Email:'',
        }
      
        this.checkifloggedin = this.checkifloggedin.bind(this)
      
      
        this.login = this.login.bind(this)
      }
      
        handleDrawerOpen = () => {
          this.setState({ open: true });
        };
      
        handleDrawerClose = () => {
          this.setState({ open: false });
        };




        componentDidMount(){

            this.checkifloggedin()
          }
          
          
          checkifloggedin(){
          
            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                // User is signed in.
                
             // console.log(user)
              this.setState({loggedIn: true,LogInNotChecked:false,userid: user.uid,Name:user.displayName,Email:user.email})
          console.log(user)
                // ...
              } else {
                // User is signed out.
                // ...
          console.log("Logged Out")
                this.setState({loggedIn: false,LogInNotChecked:false})
              }
            });
          
          }
          



    


  
  
  
  
  login(){
  
  
    this.setState({loading:true,ErrorMessage:''})
    let facebooklogin = new firebase.auth.FacebookAuthProvider();
  
  
    firebase.auth().signInWithPopup(facebooklogin).then(result=> {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
  
    this.setState({loggedIn:true,loading:false,success:true,ErrorMessage:`Logged In As ${user.displayName}`})
      // ...
    }).catch((error)=> {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
  
      this.setState({loggedIn:false,loading:false,success:false,ErrorMessage: `Error: ${errorMessage}`})
  
      // ...
    });
  }
    render() {

      const { loggedIn,LogInNotChecked,loading,ErrorMessage } = this.state;

        return (
            <div className="center-div">


                
{
    /* jub tak yeh check nhi hojata k user logged in hai ya nhi wubtak loading display karo*/
      LogInNotChecked ? (<span className="CenteredDiv">  
        <MoonLoader
        className="Loading"
        sizeUnit={"px"}
        size={100}
        color={'#123abc'}
        loading={true}
      />
      
       </span>) : /*Jub check hojae k user logged in hai ya nhi to loading remove kar k further actions perform karo*/ (<span>
       
       {
    
    //Now Checking agar user logged in hai to usko Profile par lejao nhi to login button show karado
    loggedIn  ? (<span>Logged In As <b>{this.state.Name}</b> <br/><br/> Email Address:  <b>{this.state.Email} </b></span>):(<span>
             <div className="wrapper">
              <Button
                variant="contained"
                color="primary"
                className={loggedIn ? "buttonSuccess" : "NotLoggedin"}
                disabled={loading}
                onClick={this.login}
              >
                Login With Facebook
              </Button>
              {loading && <CircularProgress size={24} className={"buttonProgress"} />}
            </div>
      <b style={{fontSize:11,color:'red'}} >{ErrorMessage}</b>
      </span>)
    
    
    
    
    
      } </span>) 
    
    
    
    
    
    
    }
                
            </div>
        );
    }
}

export default login;




