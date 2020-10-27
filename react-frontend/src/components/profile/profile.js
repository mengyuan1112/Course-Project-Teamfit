import React, {Component, useEffect, useState} from 'react';
import '../post/feed'
import Upload from '../upload/upload'
import './profile.css'
import Feed from '../post/feed';
import avatar from "../../avatar.jpg";


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
          isInEditMode: false,
          isPPInEditMode: false
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
            <div >
              <p>Name: {this.state.name}</p> 
            </div>
            <div >
              <p>Age: {this.state.age}</p>
            </div>
            <div >
              <p>Height: {this.state.height}</p>
            </div>
            <div >
              <p>Weight: {this.state.weight}</p>
            </div>
            <div >
              <p>Gender: {this.state.gender}</p>
            </div>
            <div >
              <p>Number: {this.state.number}</p>
            </div>
            <div >
              <p>Email: {this.state.email}</p>
            </div>
            <button onClick={this.ChangeEditMode}>Edit</button>
            <button onClick={this.ChangePPEditMode}>Change Picture</button>
            </>
        )
    }

    render() {
        return (
            
         <>
          <div className="rows">
                <div className="row">
                <img src={avatar} width="180" height="180" alt="Login Image" />
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
