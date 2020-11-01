import React, {Component, useEffect, useState} from 'react';
import '../post/feed'
import Upload from '../upload/upload'
import './profile.css'
import Feed from '../post/feed';
import avatar from "../../avatar.jpg";
import loginImg from "../../TeamFit_logo.png";
import Axios from 'axios';
import Button from '@material-ui/core/Button';



class Profile extends React.Component{
    constructor(props) {
        super();
        this.state = {
          name: "",
          age: null,
          height: "",
          weight: null,
          gender: "",
          number: null,
          email: "",
          image: avatar,
          userInfo: {},
          formError: {
              name: "",
              age: "",
              height: "",
              weight: "",
              gender: "",
              number: "",
              email: ""
          },
          loading: false,
          isInEditMode: false,
        };
      }

    /*GET request to nutrition.py. Updates history to be object with 3 arrays*/
    componentDidMount() {
        Axios.get('http://localhost:5000/profile/getinfo').then(response=> { this.setState({userInfo: response.data});})
        console.log(this.state.userInfo)
    }


    ChangeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }
    ChangePPEditMode = () => {
        this.setState({
            isPPInEditMode: !this.state.isPPInEditMode
        })
    }

    UpdateComponentValue = e => {

        const {name,value} = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case 'name':
                formErrors.name = value.length < 1 ? 'Please enter your name':"";
                break;
            case 'age':
                formErrors.age = value.length < 1 ? 'Please enter age':"";
                break;
            case 'heighetFT':
                formErrors.heighetFT = value.length < 1 ? 'Please enter height feet':"";
                break;
            case 'heighetIN':
                formErrors.heighetIN = value.length < 1 ? 'Please enter height inches':"";
                break;
            case 'weight':
                formErrors.weight = value.length < 1 ? "Please enter current weight": "";
                break;
            case 'gender':
                formErrors.gender = value.length < 1 ? "Please enter M for Male and F for Female": "";
                break;
            default:
            break;
        }
        this.setState({formErrors, [name]:value}, ()=> console.log(this.state))
        
        this.setState({
            isInEditMode: false,
            name: this.refs.inputName.value,
            age: this.refs.inputAge.value,
            height: this.refs.inputHeight.value,
            weight: this.refs.inputWeight.value,
            gender: this.refs.inputGender.value,
        })
    }

    renderEditView = () => {
        
            return  (
                <>
                <div> 
                    Name: <input type="text" name="name" defaultValue={this.state.userInfo[3]} ref="inputName" />
                </div>
                <div>
                    Age: <input type="text" name="age" defaultValue={this.state.userInfo[4]} ref="inputAge" />    
                </div>
                <div>
                    Height: <input type="text" name="height" defaultValue={this.state.userInfo[5] + "'" + this.state.userInfo[6]} ref="inputHeight" />    
                </div>
                <div>
                    Weight:<input type="text" name="weight" defaultValue={this.state.userInfo[7]} ref="inputWeight"/>    
                </div>
                <div> 
                    Gender: <input type="text" name="gender" defaultValue={this.state.userInfo[8]} ref="inputGender" />    
                </div>
                <Button variant="contained" component="label" onClick={this.ChangeEditMode}>Cancel</Button>
                <Button variant="contained" component="label" onClick={this.UpdateComponentValue}>Submit</Button>
                </>
                )
        
    }

    renderDefaultView = () => {
        return (
        <>
        <div className="name">
              <h2>{this.state.name}</h2> 
              <h4>Age: {this.state.age} Height: {this.state.height} Weight: {this.state.weight} Gender: {this.state.gender}</h4>
              <h4>Number: {this.state.number}</h4>
              <h4>Email: {this.state.email}</h4>
        </div>
            <Button variant="contained" component="label" onClick={this.ChangeEditMode}>Edit</Button>
            <Button variant="contained" component="label" onClick={this.updateValues}>Refresh</Button>
            <Button variant="contained" component="label">
                Update Picture
            <input
                style={{display:"none"}}
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={this.uploadIamge}
            />
            </Button>
            {this.state.loading ? (<p>Loading...</p>)
                : (
                    <b></b>
                )
            }
            </>
        )
    }

    updateValues = () => {
        this.setState({
            name: this.state.userInfo[3],
            age: this.state.userInfo[4],
            height: this.state.userInfo[5] + "'" + this.state.userInfo[6],
            weight: this.state.userInfo[7],
            gender: this.state.userInfo[8],
            number: this.state.userInfo[0],
            email: this.state.userInfo[2],
            image: this.state.userInfo[9]
        })
     }

    uploadIamge = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'teamfit')
        this.setState({loading: !this.state.loading})
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/zayedahm/image/upload',
            {
                method: 'POST',
                body: data
            }
        )

        console.log(res)

        const file = await res.json()

        this.setState({image: file.secure_url})
        this.setState({loading: !this.state.loading})

        /**Save the image URL in the backend */
        fetch('http://localhost:5000/profile/postimage', {
        method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(file.secure_url)
        }).then(response => response.json())
    }

    render() {
        return (
         <>
        <img src={loginImg} width="180" height="180" alt="LoginImage" className="logo"/>
          <div className="rows">
                <div className="details">
                <img src={this.state.image} width="190" height="190" alt="ProfileImage" className="pp"/>
                {this.state.isInEditMode ? 
                    this.renderEditView() : this.renderDefaultView()
                }
                </div>  
                <div className="row1">
                    <Upload />
                    <Feed />
                </div>
            </div>
        </>
        )
    };

}




export default Profile;
