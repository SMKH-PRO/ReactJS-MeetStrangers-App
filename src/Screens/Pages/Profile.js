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
  return ['Add Personal Information', 'Upload Your Pictures', 'Select Your Beverages'];
}



class VerticalLinearStepper extends React.Component {

  constructor(){

super()
  this.state = {
    activeStep: 1,
    toastdisplay:false,
    vertical: 'bottom',
    horizontal: 'right',
    toastmsg:'',
    BlockNext:true,
    Phone:'',
    Name:'',
  };
  
  this.validation = this.validation.bind(this)
}

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));


    console.log(getSteps().length)
    if(this.state.activeStep !== getSteps().length -1){

      this.setState({BlockNext: true})

    }

  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
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

  validation(){

    setTimeout(()=>{

   const {Phone,Name,activeStep}= this.state
   

   console.log("step: ",activeStep," Phone: ",Phone,"  Name: ",Name)

if(activeStep === 0){

  if(Phone !== undefined && Name !== undefined){
    if(Phone.length >5 && Name.length >= 3  ){
this.setState({BlockNext: false})

    }
  }
}





},5)
 }
  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep,toastdisplay, toastmsg,vertical,horizontal,BlockNext } = this.state;

    return (
      <div className={classes.root}>
<div className="CenterParent">
  <div className="CenterChild">
                 <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={toastdisplay}
          onClose={this.handleCloseToast}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{toastmsg}</span>}
        />
        <Stepper  activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel style={{textAlign:'left',fontWeight:800}} >{label}</StepLabel>
                <StepContent>
                  
                  
                  
                  
                  
                    {index === 0 && <span>









  <TextField id="Name"  onKeyDown={(e)=>{  this.validation()
    
 
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

  onKeyDown={this.validation}
  onChange={ Phone => this.setState({ Phone }) }/>


<br/><br/>
<br/>



                    </span>}














                    {index === 1 && <span><UploadImages/></span>}
                    {index === 2 && <span>Item Three</span>}
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
             
                  <div className={classes.actionsContainer}>
                    <div style={{textAlign:'-webkit-right'}} >
                      <Button
                        disabled={activeStep===0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                      
                          disabled={BlockNext}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish!' : 'Next'}
                      </Button>
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
