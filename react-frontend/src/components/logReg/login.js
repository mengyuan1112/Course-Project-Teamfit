import React from "react";
import './logReg.css';
import loginImg from "../../TeamFit_logo.png";
import axiosConfig from "axios";

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
const numberRegex = RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
);

export default class Login extends React.Component {

    /*  Constructor for login class, has 3 states: uEmail and uPassword and formErrors */

    constructor(props) {
        super(props);
        this.state = {
            uNumber: null,
            uPassword: null,
            message: "",
            formErrors: {
                uNumber: "",
                uPassword: "",
            }
        }
    }
/*   Handles the input from the form when the sign in button is clicked*/
    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            console.log(`
            --SUBMITTING-- 
            E-MAIL: ${this.state.uNumber}
            PASSWORD: ${this.state.uPassword}
            `)
            axiosConfig.post('http://127.0.0.1:5000/login',{
                body : this.state,
                headers:{"Content-Type":"application/json",},
                cache: "no-cache",
            })
                .then(response => {
                    let res = response.data
                    this.setState({message: res['state']})
                    console.log(this.state)
                });
        // fetch('http://localhost:3000/login', {
        //     method: "POST",
        //     cache: "no-cache",
        //     headers: {"Content-Type": "application/json",},
        //     body: JSON.stringify(this.state)
        // }).then(response => response.json())
    }
        else{
            console.error("FORM INVALID")
        }
    }
    /* Handles any change to the form input and determines if valid input is provided*/
    handleChange = e => {
        e.preventDefault();
        const {name,value} = e.target;
        let formErrors = this.state.formErrors;
        console.log(name)
        switch (name) {
            case 'uNumber':
                formErrors.uNumber = numberRegex.test(value) ? "":'Please enter Phone number';
                break;
            case 'uPassword':
                formErrors.uPassword = value.length < 1 ? 'Please enter password':"";
                break;
            default:
            break;
        }
        this.setState({formErrors, [name]:value}, ()=> console.log(this.state))
    };
/* renders all html for the login page*/
render(){
    const{formErrors} =this.state;
    return <div className="wrapper">
            <div className="header">
                    <body className="body">
                        <img src={loginImg} width="180" height="180" alt="LoginImage" />
                    </body>
                </div>
                <div className="form-wrapper">
                    <div className="image">
                        <img src={loginImg} width="180" height="180" alt="LoginImage" />
                        <h3>Welcome to TEAMFIT</h3>
                        <h4>Please Sign In</h4>

                    </div>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="allForms">
                            <div className="uNumber">
                                <label htmlFor="uNumber">Phone Number:</label>
                                <input className={formErrors.uNumber.length > 0 ? "error" : null} type="number" name="uNumber" placeholder="7167167166" onChange={this.handleChange}/>
                                {formErrors.uNumber.length > 0 && ( <span className="errorMessage">{formErrors.uNumber}</span> )}
                            </div>
                            <div className="uPassword">
                                <label htmlFor="uPassword">Password</label>
                                <input className={formErrors.uPassword.length > 0 ? "error" : null} type="password" name="uPassword" placeholder="password"onChange={this.handleChange}/>
                                {formErrors.uPassword.length > 0 && ( <span className="errorMessage">{formErrors.uPassword}</span> )}
                            </div>
                            <div className="loginBtn">
                                <button type="submit">Sign In</button>
                                { this.state.message && <h3 className="error"> { this.state.message } </h3> }
                            </div>
                        </div>
                    </form>
                </div>
            <div className="footer">
                <small>Don't have an account?</small>
                <small><p><a href="/register">Click to sign up!</a></p></small>
            </div>
    </div>
 }
}
