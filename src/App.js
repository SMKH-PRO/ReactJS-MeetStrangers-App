
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
import Testing from './Screens/Pages/ss'
import Avatar from '@material-ui/core/Avatar';

import {
Router,
  Route,
  Redirect,
    Link,
    Switch
} from 'react-router-dom';
import ProfileRedirect from './Screens/Helpers/RedirectToProfile'


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
    toastmsg:'',
    ProfileIncomplete: false,
    user:{}
 
    }
    this.logout = this.logout.bind(this)

  }
  
    handleDrawerOpen = () => {
      this.setState({ open: true });
    };
  
    handleDrawerClose = () => {
      this.setState({ open: false });
    };


  





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
      
this.setState({user:user})
firebase.database().ref(`MeetIn/USERS/${user.uid}`).on('value',(RecievedData)=>{
const data = RecievedData



  if(( data.hasChild("Duration1") &&  data.hasChild("Duration2") &&  data.hasChild("Duration3") ) && ( data.hasChild("Time1") &&  data.hasChild("Time2") &&  data.hasChild("Time3")  && data.hasChild("Time4") ) && ( data.hasChild("Juice") &&  data.hasChild("Coffee") &&  data.hasChild("Cocktail") ) && data.hasChild("Phone")  && data.hasChild("Name")  && data.hasChild("img1") && data.hasChild("img2")  && data.hasChild("img3")   && data.hasChild("lat") && data.hasChild("lng")){

    
    console.log("Profile Is Complete")
    this.setState({ProfileIncomplete:false})
  }
else{
  console.log("Profile Is In-Complete")


  if(location.pathname !== "/Profile"){ //Make sure that user is not already on profile page!
  this.setState({ProfileIncomplete:true})} //Agar koi aik bhe cheez data se missing ha  to profile par redirect kardo
}


})

   // console.log(user)
    this.setState({loggedIn: true});
//console.log(user)
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
    const { open,loggedIn,currentPath, toastdisplay, toastmsg,vertical,horizontal,ProfileIncomplete,user} = this.state;





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

                <div style={{ width: "100%", height: "200px" /*backgroundImage: `url(${img})`*/, backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>
          {user && <span>
            <Avatar src={user.photoURL} className={classes.avatar} alt="Profile Picture" />
            <br />
            <br />
            <br />
            <Typography className={classes.drawerText} variant='overline'>{user.displayName}</Typography>
            <Typography className={classes.drawerText} variant='body2'>{user.email}</Typography>
          </span>}
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


             
                <ListItem onClick={()=>{this.setState({open:false})}} button >
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
        <Route  exact path="/" component={loggedIn ?  ProfileIncomplete? ProfileRedirect:Home :Login}/>   

             {/* <Route component={Testing} /> */}

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