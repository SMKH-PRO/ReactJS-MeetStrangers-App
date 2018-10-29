
import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home as HomeIcon , Person as ProfileIcon, PowerSettingsNew as LogoutIcon, ExitToApp as LoginIcon } from '@material-ui/icons';
import * as firebase from 'firebase';
import Snackbar from '@material-ui/core/Snackbar';
import Login from './Screens/login/login.js';
import Home from './Screens/Pages/Home.js';
import Profile from './Screens/Pages/Profile.js';
import createBrowserHistory from 'history/createBrowserHistory'
import Notfound from './Screens/Pages/404'

import {
Router,
  Route,
   Redirect,
    Link,
    Switch
} from 'react-router-dom';

const History = createBrowserHistory();
const location = createBrowserHistory().location



const config = {
  apiKey: "AIzaSyDap2PlQsFky5YnQRhyMqsWENasn_hJUiU",
  authDomain: "saylani-7b489.firebaseapp.com",
  databaseURL: "https://saylani-7b489.firebaseio.com",
  projectId: "saylani-7b489",
  storageBucket: "saylani-7b489.appspot.com",
  messagingSenderId: "349400059211"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}




const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});


class PersistentDrawerLeft extends React.Component {
  constructor(){

    super()
  
    this.state={
  
      open:false,
      loggedIn: false,
      currentPath:'',
    toastdisplay:false,
    vertical: 'bottom',
    horizontal: 'right',
    toastmsg:''
 
    }
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)


  }
  
    handleDrawerOpen = () => {
      this.setState({ open: true });
    };
  
    handleDrawerClose = () => {
      this.setState({ open: false });
    };


  
  
  
    login(){
  
  
      this.setState({loading:true,ErrorMessage:''})
      let facebooklogin = new firebase.auth.FacebookAuthProvider();
    
    
      firebase.auth().signInWithPopup(facebooklogin).then(result=> {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;


    
      this.setState({loggedIn:true,loading:false,success:true,ErrorMessage:`Logged In As ${user.displayName}`,toastdisplay:true,toastmsg:`Logged In As '' ${user.displayName} ''`})
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





componentDidMount(){

  this.checkifloggedin()

       History.listen((location, action) => {
        this.setState({currentPath: location.pathname !== "/" ? location.pathname.replace(/\//g, " > ") : location.pathname.replace(/\//g, "") })
        
        

      });




}


checkifloggedin(){

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      
   // console.log(user)
    this.setState({loggedIn: true})
console.log(user)
      // ...
    } else {
      // User is signed out.
      // ...
//console.log("Logged Out")
      this.setState({loggedIn: false})
    }
  });

}


logout(){

  firebase.auth().signOut().then(()=> {

    this.setState({ErrorMessage:'',toastdisplay:true,toastmsg:'Succefully logged out!...'})
console.log("You are succesfully Logged out!")

}).catch(error=> {
    // An error happened.


    this.setState({toastdisplay:true,toastmsg:error})

console.log("Error In Logging Out")
    console.log(error)
  });
}


handleCloseToast = () => {
  this.setState({ toastdisplay: false });
};

  render() {
    const { classes, theme, } = this.props;
    const { open,loggedIn,currentPath, toastdisplay, toastmsg,vertical,horizontal} = this.state;





//console.log("LoggedIN: ", loggedIn)

console.log("CurrentPath:: ",currentPath,",, PathName: ",location.pathname)

    return (
      <Router history={History}>

      <div className={classes.root}>

              <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={toastdisplay}
          onClose={this.handleCloseToast}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{toastmsg}</span>}
        />
 
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>

 
 {loggedIn ? "HOME":"Meeting App!"} { currentPath}
 
  </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
          <Link  to={`/`}>   
              <ListItem button >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
              </Link>
              <Link to={`/Profile`}>   
              <ListItem button >
                <ListItemIcon><ProfileIcon /></ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItem>
         </Link>
          </List>

          {loggedIn ? (<span>
          <Divider />
          <List>
           
              <ListItem button >
                <ListItemIcon> <LogoutIcon /></ListItemIcon>
                <ListItemText onClick={this.logout} primary={"Logout"} />
              </ListItem>
          
          </List>
          </span>
          ):(<span>
            <Divider />


            <List>


             
                <ListItem onClick={this.login} button >
                  <ListItemIcon> <LoginIcon /></ListItemIcon>
                  <ListItemText   primary={"Login"} />
                </ListItem>

            
            </List>
            </span>)  }
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
       


<div  >


<Switch>
        <Route exact path="/Profile" component={loggedIn ?  Profile:Login}/>  
        <Route  exact path="/" component={loggedIn ?  Home:Login}/>   


             <Route component={Notfound} />
 

</Switch>

</div>





        </main>
      </div>
      </Router>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);