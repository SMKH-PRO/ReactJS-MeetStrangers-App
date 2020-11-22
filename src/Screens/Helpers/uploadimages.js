import React, { Component } from 'react';

import './uploadimages.css'
import * as firebase from 'firebase';
import swal from 'sweetalert';
import {FadeLoader as MoonLoader } from 'react-spinners';
import axios from 'axios';

class uploadimages extends Component {

constructor(props){
super(props)
this.state={

    img1: 'https://raw.githubusercontent.com/SMKH-PRO/ReactJS-MeetStrangers-App/master/src/Screens/Helpers/placeholder-avatar.jpg',
    img2: 'https://raw.githubusercontent.com/SMKH-PRO/ReactJS-MeetStrangers-App/master/src/Screens/Helpers/placeholder-avatar.jpg',
    img3: 'https://raw.githubusercontent.com/SMKH-PRO/ReactJS-MeetStrangers-App/master/src/Screens/Helpers/placeholder-avatar.jpg',

    img1disable:true,
    img2disable:true,
    img3disable:true,
    
}


this.img1 = React.createRef();
this.img2 = React.createRef();
this.img3 = React.createRef();



this.checkdatabase =this.checkdatabase.bind(this)

}











checkdatabase(){
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          
      // console.log(user)


       
   
       firebase.database().ref(`MeetIn/USERS/${user.uid}`).once('value',(data)=>{


if(data.hasChild("img1") !== true ){
    //Jo jo images available nhi hain unki loading hatado kio k start me sari images par loading ha taky image load hony tak loadinng show ho
    console.log("saving fb profile to img1")
    this.setState({img1: `${user.photoURL}?type=large`,img1disable: false})  //agar use ne koi image1 set nhi ki to uski fb profile ko image1 me save karwado

    firebase.database().ref(`MeetIn/USERS/${user.uid}/`).update({img1: `${user.photoURL}?type=large`})
}

    if(data.hasChild("img2")  !== true){
        this.setState({img2disable: false})
        }
        if(data.hasChild("img3")  !== true){
            this.setState({img3disable: false})
            }

 
    if(data.hasChild("img1")){  //Jo jo images database me available hain unko state me set karado or unpar se loading hatado
    this.setState({img1: data.val().img1})

    setTimeout(()=>{   this.setState({img1disable: false})      },500) //Loading ko thora delay kar k off karo taky image display hojae loading off hony se pehle

    }
    if(data.hasChild("img2")){
        this.setState({img2: data.val().img2})

        setTimeout(()=>{   this.setState({img2disable: false})      },500)

        }
        if(data.hasChild("img3")){
            this.setState({img3: data.val().img3})
            setTimeout(()=>{   this.setState({img3disable: false})      },500)
            }         


       })



          // ...
        } else {
          // User is signed out.
          // ...
    //console.log("Logged Out")
          this.setState({loggedIn: false})
        }
      });



}



componentDidMount(){
 
    
    this.checkdatabase()


}

uploadimg(imgname,statename){
    const imgstate = this.state[statename]
    let fileLength =  this[statename].current.files.length //Getting file with the help of React Reference
    this.setState({[`${statename}disable`]:true}) //LOADING START

let file =  this[statename].current.files[0]
let filedata= new FormData();
filedata.append('file',file);


    console.log(  file.name )

   


    let reader = new FileReader();

    reader.onload =  (e)=> {
        // get loaded data and render thumbnail.
  // console.log('READER: ', e.target.result) 

   this.setState({[statename]: e.target.result}) //Creating and displaying  a cache offline image before uploading to server making good UX .
    };



    reader.readAsDataURL(file)




    axios({
        url: 'https://cors-anywhere.herokuapp.com/reactsocial.mutualfilesharing.com/UploadedFiles/upload.php',
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: filedata
    }).then((res)=>{
        console.log(res)
        //var uploadedfilename = res.data.files[0];
          var downloadURL = '//reactsocial.mutualfilesharing.com/UploadedFiles/' +encodeURIComponent(file.name.trim()) ;
    
    
    console.log(downloadURL)

    firebase.database().ref(`MeetIn/USERS/${firebase.auth().currentUser.uid}`).update({ [statename] :downloadURL})


    this.setState({[`${statename}disable`]:false}) ///LOADING FINISH
    swal(`${imgname} has been updated succesfully!`, {
        icon: "success",
      });

}).catch((err)=>{

    swal(err)
})


}








 confirmation(imgname,statename){
    const defaultimg = 'https://raw.githubusercontent.com/SMKH-PRO/ReactJS-MeetStrangers-App/master/src/Screens/Helpers/placeholder-avatar.jpg'

    const imgstate = this.state[statename]
    let file =  this[statename].current.files[0]

    let fileLength =  this[statename].current.files.length

    if(fileLength > 0){


        if(file.type == "image/png"  || file.type == "image/jpeg"  || file.type == "image/gif"  || file.type == "image/jpg"){

       

    if(imgstate !== defaultimg){//checking if image 2 is different from default pic
        this.setState({[`${imgstate}disable`]:true})//Disable to button to upload new image, if the current image is different from default image

        //alert("img1")
      //img1 check finished
     swal({
        title: `Remove Previous  ${imgname}`,
        text: `If you upload new Image, You will not be able access previous images, Still want to update ${imgname} ?`,
        icon: "warning",
        buttons: ["Dont Update", "Yes"],
        dangerMode: true,
      })
      .then((shouldchangeimage) => {
        if (shouldchangeimage) { //If user clicked yes then proceed to change
this.uploadimg(imgname,statename)
            this.setState({[`${statename}disable`]:true})
    
        } else {
            swal(`${imgname} will not be updated according to your instructions!.`)
            this.setState({[`${statename}disable`]:false})
        }
      });


    }

    else{

        this.uploadimg(imgname,statename)


    } 
}

else{

    swal("Please Choose Valid File Format e.g: .png, .jpg",{icon:'error'})
}
}
}
    render() {

        const {img1,img2,img3,img1disable,img2disable,img3disable} = this.state
        return (
            <div>
                
<p>You have to upload 3 different pictures of your self (All 3 Are Required!)</p>

    <div className="file-field widthsetting">
        <div className="mb-4">  


        <span style={{   position: "absolute" ,     left: "61px" ,     top: "59px"    , filter: "drop-shadow(0px 0px 1px black)"}} >
        <MoonLoader
        className="overide"
        sizeUnit={"px"}
        size={100}
        color={'#123abc'}
        loading={img1disable}
      />
      </span>
            <img src={img1} className="rounded-circle z-depth-1-half avatar-pic widthsetting threeimg" alt="example placeholder avatar"/>
        </div>
        <div  className="d-flex justify-content-center">
            <div  className="btn btn-mdb-color btn-rounded float-left">
                <span>Add photo</span>
                <input accept=".jpg,.jpeg,.png,.gif" onChange={this.confirmation.bind(this,"Image #1","img1")} ref={this.img1} disabled={img1disable} type="file"/>
            </div>        </div>
    </div>
    <div className="file-field widthsetting">
        <div className="mb-4">
        <span style={{   position: "absolute" ,     left: "61px" ,     top: "59px"    , filter: "drop-shadow(0px 0px 1px black)"}} >
        <MoonLoader
        className="overide"
        sizeUnit={"px"}
        size={100}
        color={'#123abc'}
        loading={img2disable}
      />
      </span>
            <img src={img2} className="rounded-circle z-depth-1-half avatar-pic widthsetting threeimg" alt="example placeholder avatar"/>
        </div>
        <div  className="d-flex justify-content-center">
            <div  className="btn btn-mdb-color btn-rounded float-left">
                <span>Add photo</span>
                <input accept=".jpg,.jpeg,.png,.gif" disabled={img2disable}  onChange={this.confirmation.bind(this,"Image #2","img2")} ref={this.img2} type="file"/>
            </div>
        </div>
    </div>
    <div className="file-field widthsetting">
        <div className="mb-4">
        <span style={{   position: "absolute" ,     left: "61px" ,     top: "59px"    , filter: "drop-shadow(0px 0px 1px black)"}} >
        <MoonLoader
        className="overide"
        sizeUnit={"px"}
        size={100}
        color={'#123abc'}
        loading={img3disable}
      />
      </span>
            <img src={img3} className="rounded-circle z-depth-1-half avatar-pic widthsetting threeimg" alt="example placeholder avatar"/>
        </div>
        <div  className="d-flex justify-content-center">
            <div  className="btn btn-mdb-color btn-rounded float-left">
                <span>Add photo</span>
                <input accept=".jpg,.jpeg,.png,.gif"  disabled={img3disable}  onChange={this.confirmation.bind(this,"Image #3","img3")} ref={this.img3} type="file"/>
            </div>
        </div>
    </div>

            </div>
        );
    }
}

export default uploadimages;