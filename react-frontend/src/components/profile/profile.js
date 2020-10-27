import React, {Component, useEffect, useState} from 'react';
import '../post/feed'
import Upload from '../upload/upload'
import './profile.css'
import Feed from '../post/feed';
import avatar from "../../avatar.jpg";
import loginImg from "../../TeamFit_logo.png";


class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          name: "Marcos Quan",
          age: 78,
          height: 5,
          weight: 160,
          gender: "male",
          number: 7167167167,
          email: "fit@teamfit.com",
          image: avatar,
          loading: false,
          isInEditMode: false,
        };
      }

    componentDidMount(){

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

    UpdateComponentValue = () => {
        this.setState({
            isInEditMode: false,
            name: this.refs.inputName.value,
            age: this.refs.inputAge.value,
            height: this.refs.inputHeight.value,
            weight: this.refs.inputWeight.value,
            gender: this.refs.inputGender.value,
            number: this.refs.inputNumber.value,
            email: this.refs.inputEmail.value,
        })

    }

    renderEditView = () => {
        return  (
        <>
        <div> 
            Name: <input type="text" defaultValue={this.state.name} ref="inputName" />
        </div>
        <div>
            Age: <input type="text" defaultValue={this.state.age} ref="inputAge" />    
        </div>
        <div>
            Height: <input type="text" defaultValue={this.state.height} ref="inputHeight" />    
        </div>
        <div>
            Weight:<input type="text" defaultValue={this.state.weight} ref="inputWeight"/>    
        </div>
        <div> 
            Gender: <input type="text" defaultValue={this.state.gender} ref="inputGender" />    
        </div>
        <div>
            Number: <input type="text" defaultValue={this.state.number} ref="inputNumber" />    
        </div>
        <div>
            Email: <input type="text" defaultValue={this.state.email} ref="inputEmail" />    
        </div>
        <button onClick={this.ChangeEditMode}>Cancel</button>
        <button onClick={this.UpdateComponentValue}>Submit</button>
        </>
        )
    }

    renderDefaultView = () => {
        return (
        <>
            <img src={this.state.image} width="190" height="190" alt="ProfileImage" />
            <div >
              <h2>{this.state.name}</h2> 
            </div>
            <div >
              <h4>Age: {this.state.age} Height: {this.state.height} Weight: {this.state.weight} Gender: {this.state.gender}</h4>
            </div>
            <div >
              <h4>Number: {this.state.number}</h4>
            </div>
            <div >
              <h4>Email: {this.state.email}</h4>
            </div>
            <button onClick={this.ChangeEditMode}>Edit</button>
            <p>Update Picture:</p>
            <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={this.uploadIamge}
            />
            {this.state.loading ? (<p>Loading...</p>)
                : (
                    <b></b>
                )
            }
            </>
        )
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
    }

    render() {
        return (
         <>
        <img src={loginImg} width="180" height="180" alt="Login Image" className="logo"/>
          <div className="rows">
               
                <div className="details">
                
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
