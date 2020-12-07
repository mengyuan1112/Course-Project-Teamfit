import React from "react";
import loginImg from "../../TeamFit_logo.png";
import axios from 'axios';
import axiosConfig from "axios"






/* function to check whether a form is valid or not*/
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  /*  Validates form errors being empty */
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  /*  Validates the form was filled out */
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
/*  Regex to test whether an email is valid */
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
// const instance = axios.create({
//     baseURL: 'http://localhost:3001/'
// });

export default class Register extends React.Component {

    /*  Constructor for login class, has 10 states: eMail, password, name, age, heightFt, heightIn, weight, gender, phoneNumber, and formErrors */
    constructor(props) {
        super(props);

        this.state ={
            eMail: null,
            password: null,
            name: null,
            age: null,
            heightFt: null,
            heightIn: "0",
            weight: null,
            gender: null,
            phoneNumber: null,
            message: "",
            formErrors: {
                eMail: "",
                password: "",
                name: "",
                age: "",
                heightFt: "",
                heightIn: "",
                weight: "",
                gender: "",
                phoneNumber: "",
            }
        }
    }


    componentDidMount() {

    }


    /*Handles the register button and all entered information from the form*/
    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            console.log(`
            --SUBMITTING-- 
            E-MAIL: ${this.state.eMail}
            PASSWORD: ${this.state.password}
            NAME: ${this.state.name}
            AGE: ${this.state.age}
            HEIGHTFT: ${this.state.heightFt}
            HEIGHTIN: ${this.state.heightIn}
            WEIGHT: ${this.state.weight}
            GENDER: ${this.state.gender}
            PHONENUMBER: ${this.state.phoneNumber}
            `)
            //this.componentDidMount()
            axiosConfig.post('http://127.0.0.1:5000/register',{
                body : this.state,
                headers:{"Content-Type":"application/json","Access-Control-Allow-Origin": "*",},
                cache: "no-cache",
            })
                .then(response => {
                    let res = response.data
                    this.setState({message: res['state']})
                    //this.setState(response);
                })



        }
        else{
            console.error("FORM INVALID")
        }
    }
    /*Handles all changes in any form entry and checks for possible errors*/
    handleChange = e => {
        //e.preventDefault();
        const {name,value} = e.target;
        let formErrors = this.state.formErrors;
        console.log(name)
        switch (name) {
            case 'eMail':
                formErrors.eMail = emailRegex.test(value) ? "":'Please enter valid E-mail address';
                break;
            case 'password':
                formErrors.password = value.length < 8 ? 'Password must be at least 8 characters':"";
                break;
            case 'name':
                formErrors.name = value.length < 3 ? 'Please enter name':"";
                break;
            case 'age':
                formErrors.age = value.length < 1 ? 'Please enter age':"";
                break;
            case 'heightFt':
                formErrors.heightFt = value.length <= 0 ? 'Please select height(ft)':"";
                break;
            case 'heightIn':
                formErrors.heightIn = value.length <= 0 ? 'Please select height(in)':"";
                break;
            case 'weight':
                formErrors.weight = value.length <= 0 ? 'Please enter weight':"";
                break;
            case 'gender':
                formErrors.gender = value.length <= 0 ? 'Please enter choose a gender':"";
                break;
            case 'phoneNumber':
                formErrors.phoneNumber = value.length < 10 ? 'Please enter valid phone number':"";
                break;
            default:
            break;
        }
        this.setState({formErrors, [name]:value}, ()=> console.log(this.state))
    };

    /*Renders the html for this page*/

    render() {
        const{formErrors} =this.state;

        return <div className="wrapper">
                <div className="header"></div>
                    <div className="form-wrapper">
                        <div className="image">
                            <img src={loginImg} width="180" height="180" alt="Login Image"/>
                        </div>
                        <h1>Register for An Account</h1>
                        <form id="regForm" onSubmit={this.handleSubmit} noValidate>
                            <div className="allForms">
                                <div className="eMail">
                                    <label htmlFor="eMail">E-mail</label>
                                    <input className={formErrors.eMail.length > 0 ? "error" : null} type="eMail" name="eMail" placeholder="example@gmail.com" onChange={this.handleChange}/>
                                    {formErrors.eMail.length > 0 && ( <span className="errorMessage">{formErrors.eMail}</span> )}
                                </div>
                                <div className="password">
                                    <label htmlFor="password">Password</label>
                                    <input className={formErrors.password.length > 0 ? "error" : null} type="text" name="password" placeholder="Password"onChange={this.handleChange}/>
                                    {formErrors.password.length > 0 && ( <span className="errorMessage">{formErrors.password}</span> )}
                                </div>
                                <div className="name">
                                    <label htmlFor="name">Name</label>
                                    <input className={formErrors.name.length > 0 ? "error" : null} type="text" name="name" placeholder="John Smith"onChange={this.handleChange}/>
                                    {formErrors.name.length > 0 && ( <span className="errorMessage">{formErrors.name}</span> )}
                                </div>
                                <div className="age">
                                    <label htmlFor="age">Age</label>
                                    <input className={formErrors.age.length > 0 ? "error" : null} type="text" name="age" placeholder="34"onChange={this.handleChange}/>
                                    {formErrors.age.length > 0 && ( <span className="errorMessage">{formErrors.age}</span> )}
                                </div>
                                <div className="height">
                                    <label htmlFor="height">Height</label>
                                    <div className="heightFt">
                                    <select form="regForm" name="heightFt" id="heightFt" required="true" onChange={this.handleChange}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    <span>ft</span>
                                    {formErrors.heightFt.length > 0 && ( <span className="errorMessage">{formErrors.heightFt}</span> )}
                                        </div>
                                    <div className="heightIn">
                                    <select form="regForm" name="heightIn" id="heightIn" required="true" onChange={this.handleChange}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                    </select>
                                    <span>in</span>
                                        {formErrors.heightIn.length > 0 && ( <span className="errorMessage">{formErrors.heightIn}</span> )}
                                    </div>
                                </div>
                                <div className="weight">
                                    <label htmlFor="weight">Weight(lbs)</label>
                                    <input className={formErrors.weight.length > 0 ? "error" : null} type="number" name="weight" placeholder="167"onChange={this.handleChange}/>
                                    {formErrors.weight.length > 0 && ( <span className="errorMessage">{formErrors.weight}</span> )}
                                </div>
                                <div className="gender">
                                    <label htmlFor="gender">Gender</label>
                                    <div className="genderM">
                                        <input className={formErrors.gender.length > 0 ? "error" : null} type="radio"
                                                name="gender" id="Male" value="M" onChange={this.handleChange}/>
                                        <label htmlFor="Male">Male</label><br/>
                                        {formErrors.gender.length > 0 && ( <span className="errorMessage">{formErrors.gender}</span> )}
                                    </div>
                                    <div className="genderF">
                                        <input className={formErrors.gender.length > 0 ? "error" : null} type="radio"
                                                name="gender" id="Female" value="F" onChange={this.handleChange}/>
                                        <label htmlFor="Female">Female</label><br/>
                                        {formErrors.gender.length > 0 && ( <span className="errorMessage">{formErrors.gender}</span> )}
                                    </div>
                                </div>
                                <div className="phoneNumber">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input className={formErrors.phoneNumber.length > 0 ? "error" : null} type="text" name="phoneNumber" placeholder="(555)555-5555"onChange={this.handleChange}/>
                                    {formErrors.phoneNumber.length > 0 && ( <span className="errorMessage">{formErrors.phoneNumber}</span> )}
                                </div>
                                <div className="registerBtn">
                                    <button type="submit">Register</button>
                                    { this.state.message && <h3 className="error"> { this.state.message } </h3> }
                                </div>
                            </div>
                        </form>
                    </div>
            <div className="footer">
                <small>Already have an account?</small>
                <small><p><a href="/login">Login here!</a></p></small>
            </div>
            </div>
    }
}
