import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as firebase from 'firebase';
class googleMap extends Component {
  constructor() {
    super()
    this.state = {
      coords: null,
      x: '',
      ok: null,
      loading:false,
      success:false
    };

    this.updateCoords = this.updateCoords.bind(this);
    // this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.setPosition();
  }

  updateCoords({ latitude, longitude }) {
    this.setState({
      coords: { latitude, longitude },
    })
  }

  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ coords: position.coords })
    //   console.log(position.coords)
    //   console.log(this.state.coords)
    });
  }
  x() {
    // console.log('ok')

    this.setState({loading:true,      success:false    })

    if(this.state.coords !== null && this.state.coords !== null){


      
    firebase.database().ref(`MeetIn/USERS/${firebase.auth().currentUser.uid}`).update( {
        lat: this.state.coords.latitude,
        lng: this.state.coords.longitude
      }).then(()=>{

        this.setState({loading:false,success:true})

        //Success

        swal(`Successfully submitted your current GPS location.`, {
            icon: "success",
          });
    }).catch((err)=>{

        swal(err,{icon:'error'})
    })}

    else{
        swal("Couldnt Find Your GPS Location, Please Allow Location Permision From Browser Setting!",{icon:'error'})
        this.setState({loading:false,      success:false    })

    }
    // console.log('ok')
  }
  render() {
    const { coords,loading,success} = this.state;
    // console.log('x', coords)

    console.log(this.state.success)
    return (
      <div className="App map">
        {coords && <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQKL6_hUOD2a7JeifubJDFEfqUum3jYpA&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `80%` }} />}
          containerElement={<div style={{ height: `50vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          coords={coords}
          updateCoords={this.updateCoords}
        />}
    <br/>

    <p style={{fontSize:13}}>First Of All Allow Locations From Your Browser <br/> And Then Once The Map Appears <b style={{cursor:'pointer'}}  onClick={()=>{this.x()}}>Submit Your GPS Location</b>, It will Help Us To Locate Peoples Near You!</p>
    <div style={{display:'inline-block'}}  className={"wrapper"}>

<Button disabled={loading} variant="contained" className={success ? "buttonSuccess":"whocares?"} color="primary" onClick={()=>{this.x()}}>
{success ? "Succesfully Submitted !":"Submit GPS Location "}
</Button>
{loading && <CircularProgress size={24} color="secondary"  thickness={7} className={"buttonProgress"} />}
</div>

<br/><br/>
      </div>
    )
  }

}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={19}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
    {props.isMarkerShown &&
      <Marker
        position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
        draggable={true}
        onDragEnd={position => {
        props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
        }}
      />}
  </GoogleMap>
))

export default googleMap;