import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import SmartInput from 'react-phone-number-input/smart-input'
import UploadImages from '../Helpers/uploadimages.js'
import '../select.css';
import { ScaleLoader as MoonLoader } from 'react-spinners';
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from 'sweetalert';

import * as firebase from 'firebase';
import StepButton from '@material-ui/core/StepButton';
import Map from '../Helpers/GoogleMap'
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});


const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});



function getSteps() {
  return ['Add Personal Information', 'Upload Your Pictures', 'Meeting Information','Your Current Location'];
}



class VerticalLinearStepper extends React.Component {

  constructor(){

super()
  this.state = {
    activeStep: 0,
    toastdisplay:false,
    vertical: 'bottom',
    horizontal: 'right',
    toastmsg:'',
    
    Phone:'',
    Name:'',
LoadNext:true,
    MainLoading: true,
    ActiveSmallSteps:0,
    Duration1:false,
    Duration2:false,
    Duration3:false,
    Coffee:false,
    Juice:false,
    Cocktail:false,
    Time:'',
    SmallStepsCompleted:false,
    LoadNextSmall:true,
    Time1:false,
    Time2:false,
    Time3:false,
    Time4:false,
    completed:{0:false,1:false,2:false,3:false},
    CompletedSmallSteps:{0:false,1:false,2:false}
  };
  
  
}





handleNextSmallSteps = () => {

  const { ActiveSmallSteps,Coffee,Juice , Cocktail,Time,Duration1,Duration2,Duration3,Time1,Time2,Time3,Time4,CompletedSmallSteps } = this.state

  if(ActiveSmallSteps == 0){ //Condition for small step 1
    
    if( Coffee === false && Juice === false && Cocktail === false){
swal("Please Choose Atleast One Beverages!")
    }
else{ 
this.setState({LoadNextSmall:true})
  firebase.database().ref(`MeetIn/USERS/${firebase.auth().currentUser.uid}`).update({

    Coffee:Coffee,
    Juice:Juice,
    Cocktail:Cocktail,
  }).then(()=>{
    CompletedSmallSteps[ActiveSmallSteps] = true;

    this.setState({CompletedSmallSteps,  ActiveSmallSteps: ActiveSmallSteps + 1,LoadNextSmall:false})
  })
}
  } //Condition for step 1 ends here 




if(ActiveSmallSteps === 1){//Condition for small step 2 starts here

  if( Duration1 === false && Duration2 === false && Duration3 === false){
    swal("Please Choose Duration Time!")
        }
        else{ 
          this.setState({LoadNextSmall:true})
            firebase.database().ref(`MeetIn/USERS/${firebase.auth().currentUser.uid}`).update({
          
              Duration1:Duration1,
              Duration2:Duration2,
              Duration3:Duration3,
            }).then(()=>{
              CompletedSmallSteps[ActiveSmallSteps] = true;

              this.setState({CompletedSmallSteps,ActiveSmallSteps: ActiveSmallSteps + 1,LoadNextSmall:false})
            })
          }
}//Conditions for small steps 2 ends here








if(ActiveSmallSteps === 2){//Condition for small step 3 starts here

  if( Time1 === false && Time2 === false && Time3 === false && Time4 === false){
    swal("Please Choose Hours In Which You Can Meet!")
        }
        else{ 
          this.setState({LoadNextSmall:true})
            firebase.database().ref(`MeetIn/USERS/${firebase.auth().currentUser.uid}`).update({
          
              Time1:Time1,
              Time2:Time2,
              Time3:Time3,
              Time4:Time4,
            }).then(()=>{
               CompletedSmallSteps[ActiveSmallSteps] = true;

              this.setState({CompletedSmallSteps,ActiveSmallSteps: ActiveSmallSteps + 1,LoadNextSmall:false,SmallStepsCompleted:true})
            })
          }
}//Conditions for small steps 3 ends here

  



}







handleNext = () => {
  
    
  const {completed,activeStep,Name,Phone,LoadNext,SmallStepsCompleted} = this.state
      //console.log(getSteps().length)
  
  
        if(activeStep === 0   ){ //STEP 1 
        
          if(Name === undefined ||Name.length  < 2){swal(`Please Write A Valid Name To Continue!`);}//USer ne Name  likhay bagair next press kardia alert karo
  
         else if(Phone === undefined ||Phone.length < 4  ) {swal(`Please Write A Valid Number To Continue`); }//USer ne phone numer likhay bagair next press kardia alert karo
         else{  
          this.setState({LoadNext:true})
    firebase.database().ref(`MeetIn/USERS/${firebase.auth().currentUser.uid}`).update({Name:Name,Phone:Phone }).then(()=>{
      this.DataFromFirebase()
     completed[activeStep] = true;
  
    this.setState({      completed,    activeStep:activeStep + 1,LoadNext:false}) /*Next Button wali loading band kar k next step par jao*/ })    }
  }//STEP 1 conditions end
  
  
  
  
  
  if(activeStep === 1   ){ //STEP 2
    this.setState({LoadNext:true})
    
    firebase.database().ref(`MeetIn/USERS/${firebase.auth().currentUser.uid}`).once('value',(data)=>{
  
  if(!data.hasChild("img1")){  swal(`Please Upload Image #1 To Continue`);   this.setState({LoadNext:false})} //ASKING USER TO UPLOAD MISSING IMAGES
  else if(!data.hasChild("img2")){  swal(`Please Upload Image #2 To Continue`);   this.setState({LoadNext:false})} //ASKING USER TO UPLOAD MISSING IMAGES
  else if(!data.hasChild("img3")){  swal(`Please Upload Image #3 To Continue`);   this.setState({LoadNext:false})} //ASKING USER TO UPLOAD MISSING IMAGES
  
  else {    completed[activeStep] = true;
    this.setState({  completed, activeStep:activeStep + 1,LoadNext:false}) }
  
  
  
   
    })
  }
  
  if(activeStep ===2){
    this.setState({LoadNext:true})
  
  
    if(SmallStepsCompleted){
      completed[activeStep] = true;
  
      this.setState({   completed, activeStep:activeStep + 1,LoadNext:false})
  
  
    }
    else{
      swal("Please Complete & Submit All The Steps Of ''Meething Information'' .")
      this.setState({LoadNext:false})
  
    }
  }



  if(activeStep === 3){
    this.setState({LoadNext:true})


    firebase.database().ref(`MeetIn/USERS/${firebase.auth().currentUser.uid}`).once('value',(data)=>{
      if(data.hasChild("lat") && data.hasChild("lng") ){

        completed[activeStep] = true;
        this.setState({  completed, activeStep:activeStep + 1,LoadNext:false}) 
        swal({
          title: `Congratulations!`,
          text: `Your Profile Has Been Completed 100%`,
          icon: `success`,
          buttons: [`Close`, `Go To Dashboard`],
          dangerMode: true,
        })
        .then((UserAgreed) => {
          if (UserAgreed) { //If user clicked yes then proceed to change
            this.props.history.push('/')
          }
        });
        
      }
      })
    }
  }
         
        

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };






   
  handleBackSmallSteps = () => {
    this.setState(state => ({
      ActiveSmallSteps: state.ActiveSmallSteps - 1,SmallStepsCompleted:false,
    }));
  }


  handleReset = () => {
    this.setState({
      ActiveSmallSteps: 0,SmallStepsCompleted:false,
    });


  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  handleCloseToast = () => {
    this.setState({ toastdisplay: false });
  };





componentDidMount(){

  this.DataFromFirebase()

  this.CheckCompletedSteps()
}



DataFromFirebase(){

  firebase.auth().onAuthStateChanged(user => {
    if (user) {



      firebase.database().ref(`MeetIn/USERS/${user.uid}`).once('value',(data)=>{
if(data.hasChild("Phone")   ){

  this.setState({Phone:data.val().Phone}) //Agar Phone Databse me hain to first step par next btton enable kardo
}
if( data.hasChild("Name")  ){

  this.setState({Name:data.val().Name}) //Agar  Name Databse me hain to first step par next btton enable kardo
}
if(!data.hasChild("Name")  ){

  this.setState({Name:user.displayName.slice(0,user.displayName.indexOf(' '))}) //Agar database me name na ho to facebook wala first name uthalo
}


if(data.hasChild("Juice")){
  this.setState({Juice: data.val().Juice}) 
}
if(data.hasChild("Coffee")){
  this.setState({Coffee: data.val().Coffee})
}
if(data.hasChild("Cocktail")){
  this.setState({Cocktail: data.val().Cocktail})
}
if(data.hasChild("Duration1")){
  this.setState({Duration1: data.val().Duration1})
}
if(data.hasChild("Duration2")){
  this.setState({Duration2: data.val().Duration2})
}
if(data.hasChild("Duration3")){
  this.setState({Duration3: data.val().Duration3})
}
if(data.hasChild("Time1")){
  this.setState({Time1: data.val().Time1})
}
if(data.hasChild("Time2")){
  this.setState({Time2: data.val().Time2})
}

if(data.hasChild("Time3")){
  this.setState({Time3: data.val().Time3})
}
if(data.hasChild("Time4")){
  this.setState({Time4: data.val().Time4})
}






let step1 = data.hasChild("Name") && data.hasChild("Phone")
let step2 = data.hasChild("img1") && data.hasChild("img2") && data.hasChild("img3")
let step3 = ( data.hasChild("Duration1") &&  data.hasChild("Duration2") &&  data.hasChild("Duration3") ) || ( data.hasChild("Time1") &&  data.hasChild("Time2") &&  data.hasChild("Time3")  && data.hasChild("Time4") ) || ( data.hasChild("Juice") &&  data.hasChild("Coffee") &&  data.hasChild("Cocktail") )

let step4 = data.hasChild("lat") && data.hasChild("lng");
//The go to the step which is incomlpete

if(step2 && step3 && step4 && step1 !== true ){
  this.setState({activeStep:0})
}
if( step1 && step3 && step4 && step2 !== true){
  this.setState({activeStep:1})

}
if(step1 && step2 && step4 && step3 !== true){
  this.setState({activeStep:2})
}
if(step1 && step2 && step3 && step4 !== true){
  this.setState({activeStep:3})
}


      }).then(()=>{this.setState({MainLoading:false,LoadNext:false,LoadNextSmall:false})})  //Firebase se data calling hogae :) now remove loading 





    } 
  });
}






CheckCompletedSteps(){
  const {completed,CompletedSmallSteps} =this.state

  firebase.auth().onAuthStateChanged(user => {
    if (user) {


      firebase.database().ref(`MeetIn/USERS/${user.uid}`).on('value',(data)=>{

        let step1 = data.hasChild("Name") && data.hasChild("Phone")
        let step2 = data.hasChild("img1") && data.hasChild("img2") && data.hasChild("img3")
        let step3 = ( data.hasChild("Duration1") &&  data.hasChild("Duration2") &&  data.hasChild("Duration3") ) && ( data.hasChild("Time1") &&  data.hasChild("Time2") &&  data.hasChild("Time3")  && data.hasChild("Time4") ) && ( data.hasChild("Juice") &&  data.hasChild("Coffee") &&  data.hasChild("Cocktail") )
        let step4 = data.hasChild("lat") && data.hasChild("lng");

//NOW CHECKKING WHICH STEPS ARE ALREADY COMPLETED

//POSITIVE STATEMENT! 
if(step1){
  completed[0] = true;
  this.setState({completed})
}
if(step2){
  completed[1] = true;
this.setState({completed})
}

if(step3){

  completed[2] = true;


this.setState({completed,CompletedSmallSteps:{0:true,1:true,2:true},SmallStepsCompleted:true,ActiveSmallSteps:3})  
  }
  
if(step4){

  completed[3] = true;


this.setState({completed})  
  }








//NEGATIVE STATEMENTS 


if(!step1 ){
  completed[0] = false;
  this.setState({completed})
}

if(!step2){
  completed[1] = false;
this.setState({completed})
}
if(!step3){

  console.log(step3,!step3)
  completed[2] = false;
this.setState({CompletedSmallSteps:{0:false,1:false,2:false},SmallStepsCompleted:false,ActiveSmallSteps:0,completed})  
  }
  if(!step4){

    completed[3] = false;
  
  
  this.setState({completed})  
    }
  







    ///IF ALL OF THE STEPS ARE COMPLETED, JUST CHANGE CURRENTLY ACTIVE STEP

    if(( data.hasChild("Duration1") &&  data.hasChild("Duration2") &&  data.hasChild("Duration3") ) && ( data.hasChild("Time1") &&  data.hasChild("Time2") &&  data.hasChild("Time3")  && data.hasChild("Time4") ) && ( data.hasChild("Juice") &&  data.hasChild("Coffee") &&  data.hasChild("Cocktail") ) && data.hasChild("Phone")  && data.hasChild("Name")  && data.hasChild("img1") && data.hasChild("img2")  && data.hasChild("img3")   && data.hasChild("lat") && data.hasChild("lng")){

      this.setState({activeStep:4})
    }




      })

    }

  })
}



handleChangeCheckbox = name => event => {
  this.setState({ [name]: event.target.checked });



  console.log(this.state.Juice,this.state.Coffee,this.state.Cocktail)
};


handleStep = (step,isCompleted) => {

if(isCompleted){
  this.setState({
    activeStep: step,
  });
}

};




HandleSmallSteps(step,isComplete){


  console.log(step,isComplete)


  if(isComplete){

    this.setState({
      ActiveSmallSteps:step
    })
  }
}
  render() {
    const { classes } = this.props;
    const steps = getSteps();

    const smallsteps = ['Select Beverages', 'Duration Of Meeting', 'Time To Meet']
    const {ActiveSmallSteps,activeStep,toastdisplay, toastmsg,vertical,horizontal,MainLoading,LoadNext,LoadNextSmall,CompletedSmallSteps } = this.state;

    return (
      <div className={classes.root}>
<div className="CenterParent ">
  <div className="CenterChild ">
                 <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={toastdisplay}
          onClose={this.handleCloseToast}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{toastmsg}</span>}
        />
        <Stepper nonLinear  activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>

                  <StepButton
                  onClick={this.handleStep.bind(this,index,this.state.completed[index])}
                  completed={this.state.completed[index]}

                  
                >
                  {label}
                </StepButton>
                <StepContent>
                  
                  
                  
                  
                  
                    {activeStep === 0 && <span>







{MainLoading ? /*Jub tak firebase se data call na ho wub tak loading show karna*/(<span>




   <MoonLoader
        className="Loading"
        sizeUnit={"px"}
        size={100}
        color={'#123abc'}
        loading={true}
      />
      


</span>):(
<span>
  <TextField id="Name"  onKeyDown={(e)=>{ 
    
 
if ((e.which < 65 || e.which > 90) && e.which !== 8 && e.which !== 13 && e.which !== 9) {
  this.setState({ toastdisplay: true,toastmsg:'Special Characters Not Allowed In Nickname' });

  e.preventDefault();
  
}
}} label="NickName ?" fullWidth    onChange={this.handleChange("Name")}        helperText="Alphabets Allowed Only!"
 placeholder="Name To Be Displayed!" value={this.state.Name} margin="normal" />

<br/><br/>
<PhoneInput
	inputComponent={ SmartInput }

  country="PK"
  placeholder="Phone Number"
  value={ this.state.Phone }

 
  onChange={ Phone => this.setState({ Phone }) }/>


<br/><br/>
<br/>

</span>

)}

                    </span> 
                    
                  
                  }














                    {activeStep === 1 && <span><UploadImages/></span>}

                  {activeStep === 3 && <span><Map/></span>}


                    {/*   step 3 start */ activeStep === 2 && <span>
                      
                      
                      
                      
                      
                      
                      
                     {this.state.ActiveSmallSteps === smallsteps.length ? (
            <div>
              <Typography className={classes.instructions}><span>     <hr style={{opacity:'0.3'}} />                
                <br/>
                
                You Completed All Steps In The "Meeting Information" Section, Thank You!</span></Typography>
              <Button style={{boxShadow:"0px 0px 2px black"}} onClick={this.handleReset}>Edit "Meeting Information" </Button>
            </div>
          ) : (<div>        
                      
                          <Stepper nonLinear activeStep={ActiveSmallSteps} alternativeLabel>
          {smallsteps.map((label,index1) => {
            return (
              <Step key={label}>

                  <StepButton
                  onClick={this.HandleSmallSteps.bind(this,index1,CompletedSmallSteps[index])}
                  completed={CompletedSmallSteps[index]}

                  
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
     
      
            <div>

                     {MainLoading ? (<MoonLoader
        className="Loading"
        sizeUnit={"px"}
        size={100}
        color={'#123abc'}
        loading={true}
      />
      ):(
              <Typography className={classes.instructions}>
              



         
                {ActiveSmallSteps === 0 && <span>

                       <hr style={{opacity:'0.3'}} />                
                <br/>

              <p>   What Beverages Would You Like On Meeting? </p>

                      <div   style ={{    textAlign: "left",display: "inline-block"}} >
                  
                        <FormControlLabel
          control={ /* Juice */
            <Checkbox
              checked={this.state.Juice}
              onChange={this.handleChangeCheckbox('Juice')}
              value="Juice"
              color="primary"
            />
          }
          label="Juice"
        />

<br/>

              <FormControlLabel
          control={ /* Coffee */
            <Checkbox
              checked={this.state.Coffee}
              onChange={this.handleChangeCheckbox('Coffee')}
              value="Coffee"
              color="primary"
            />
          }
          label="Coffee"
        />

<br/>


           <FormControlLabel
          control={ /* Cocktail */
            <Checkbox
              checked={this.state.Cocktail}
              onChange={this.handleChangeCheckbox('Cocktail')}
              value="Cocktail"
              color="primary"
            />
          }
          label="Cocktail"
        />

</div>
                </span>}







                {ActiveSmallSteps === 1 && <span>

     <hr style={{opacity:'0.3'}} />                
                <br/>
              <p>    How Long Would You Like To Be In The Meeting? </p>


                  <div   style ={{    textAlign: "left",display: "inline-block"}} >
                        <FormControlLabel
          control={ /* Duration1 */
            <Checkbox
              checked={this.state.Duration1}
              onChange={this.handleChangeCheckbox('Duration1')}
              value="30 Minutes"
              color="primary"
            />
          }
          label="30 Minutes"
        />

<br/>

              <FormControlLabel
          control={ /* Duration2 */
            <Checkbox
              checked={this.state.Duration2}
              onChange={this.handleChangeCheckbox('Duration2')}
              value="An Hour"
              color="primary"
            />
          }
          label="An Hour"
        />

<br/>


           <FormControlLabel
          control={ /* Duration3 */
            <Checkbox
              checked={this.state.Duration3}
              onChange={this.handleChangeCheckbox('Duration3')}
              value="Couple Hours"
              color="primary"
            />
          }
          label="Couple Of Hours"
        />

</div>
                </span>}




                {ActiveSmallSteps === 2 && <span>
                  <hr style={{opacity:'0.3'}} />                
                <br/>
                  
                  
                   
              <p>    Select Your Free Hours From Your Valuable Time, When You Can Meet! </p>
                  
                  <div   style ={{    textAlign: "left",display: "inline-block"}} >
                        <FormControlLabel
          control={ /* Time1 */
            <Checkbox
              checked={this.state.Time1}
              onChange={this.handleChangeCheckbox('Time1')}
              value="8 AM To 11:59 AM"
              color="primary"
            />
          }
          label="8 AM To 11:59 AM"
        />

<br/>

              <FormControlLabel
          control={ /* Time2 */
            <Checkbox
              checked={this.state.Time2}
              onChange={this.handleChangeCheckbox('Time2')}
              value="12PM To 3PM"
              color="primary"
            />
          }
          label="12PM To 3PM"
        />

<br/>


           <FormControlLabel
          control={ /* Time3 */
            <Checkbox
              checked={this.state.Time3}
              onChange={this.handleChangeCheckbox('Time3')}
              value="3PM To 5PM"
              color="primary"
            />
          }
          label="3PM To 5PM"
        />
<br/>
           <FormControlLabel
          control={ /* Time4 */
            <Checkbox
              checked={this.state.Time4}
              onChange={this.handleChangeCheckbox('Time4')}
              value="5PM To 8PM"
              color="primary"
            />
          }
          label="5PM To 8PM"
        />

</div>
          
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  </span>}


                
                <br/> <br/>
                
                
                
                </Typography>)}
              <div>


                
                <Button
                  disabled={ActiveSmallSteps === 0}
                  onClick={this.handleBackSmallSteps}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <div style={{display:'inline-block'}}  className={"wrapper"}>

                <Button disabled={LoadNextSmall} variant="contained" color="primary" onClick={this.handleNextSmallSteps}>
                  {ActiveSmallSteps === smallsteps.length - 1 ? 'Submit' : 'Next'}
                </Button>
                {LoadNextSmall && <CircularProgress size={24} color="secondary"  thickness={7} className={"buttonProgress"} />}
                </div>
                
              </div>
            </div>
          
        </div>)}<br/> 
                                  <hr style={{opacity:'0.5'}} />

                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
        <br/> <br/> <br/> <br/> <br/>
                       </span>
                       
                       
                       
                       
                       /*   step 3 ends */}
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
             
                  <div className={classes.actionsContainer}>
                    <div style={{textAlign:'-webkit-right'}} >
                      <Button
                        disabled={activeStep===0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>

                      <div style={{display:'inline-block'}}  className={"wrapper"}>
          
          
                      <Button
                      
                          disabled={LoadNext}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}

                        style={{background: activeStep === steps.length - 1 ? '#2196f3':'WhoCares?' }}
                      >
                        {activeStep === steps.length - 1 ? 'Finish!' : 'Next'}
                      </Button>

                      {LoadNext && <CircularProgress size={24} color="secondary"  thickness={7} className={"buttonProgress"} />}
        </div>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Congratulations.!! you have finished all tasks, Your profile is now complete, Now you can continue in MeetIn App</Typography>
           
          </Paper>
        )}
      </div>

      </div>
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
