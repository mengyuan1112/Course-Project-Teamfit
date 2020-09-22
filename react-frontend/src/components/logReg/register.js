import React from "react";
import loginImg from "../../logo.svg";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export default class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            eMail: null,
            password: null,
            name: null,
            age: null,
            height: null,
            weight: null,
            gender: null,
            phoneNumber: null,
            formErrors: {
                eMail: "",
                password: "",
                name: "",
                age: "",
                height: "",
                weight: "",
                gender: "",
                phoneNumber: "",
            }
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)){
            console.log(`
            --SUBMITTING-- 
            E-MAIL: ${this.state.eMail}
            PASSWORD: ${this.state.password}
            NAME: ${this.state.name}
            AGE: ${this.state.age}
            HEIGHT: ${this.state.height}
            WEIGHT: ${this.state.weight}
            GENDER: ${this.state.gender}
            PHONENUMBER: ${this.state.phoneNumber}
            `)
        }
        else{
            console.error("FORM INVALID")
        }
    }

    handleChange = e => {
        e.preventDefault();
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
                formErrors.password = value.length < 3 ? 'Please enter name':"";
                break;
            case 'age':
                formErrors.password = value.length < 1 ? 'Please enter age':"";
                break;
            case 'height':
                formErrors.password = value.length < 0 ? 'Please enter height':"";
                break;
            case 'weight':
                formErrors.password = value.length < 0 ? 'Please enter weight':"";
                break;
            case 'gender':
                formErrors.password = !value.includes("M"|| "F") ? 'Please enter M for male or F for female':"";
                break;
            case 'phoneNumber':
                formErrors.password = value.length < 10 ? 'Please enter valid phone number':"";
                break;
            default:
            break;
        }
        this.setState({formErrors, [name]:value}, ()=> console.log(this.state))
    };

    render() {
        const{formErrors} =this.state;

        return <div className="wrapper">
                <div className="header">*Temp* TeamFit Homepage Link/Logo</div>
                    <div className="form-wrapper">
                        <div className="image">
                            <img src={loginImg} alt="Login Image"/>
                        </div>
                        <h1>Register for An Account</h1>
                        <form onSubmit={this.handleSubmit} noValidate>
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
                                    <input className={formErrors.height.length > 0 ? "error" : null} type="text" name="height" placeholder="3' 4''" onChange={this.handleChange}/>
                                    {formErrors.height.length > 0 && ( <span className="errorMessage">{formErrors.height}</span> )}
                                </div>
                                <div className="weight">
                                    <label htmlFor="weight">Weight</label>
                                    <input className={formErrors.weight.length > 0 ? "error" : null} type="text" name="weight" placeholder="167"onChange={this.handleChange}/>
                                    {formErrors.weight.length > 0 && ( <span className="errorMessage">{formErrors.weight}</span> )}
                                </div>
                                <div className="gender">
                                    <label htmlFor="gender">Gender</label>
                                    <input className={formErrors.gender.length > 0 ? "error" : null} type="text" name="gender" placeholder="M or F"onChange={this.handleChange}/>
                                    {formErrors.gender.length > 0 && ( <span className="errorMessage">{formErrors.gender}</span> )}
                                </div>
                                <div className="phoneNumber">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input className={formErrors.phoneNumber.length > 0 ? "error" : null} type="text" name="phoneNumber" placeholder="(555)555-5555"onChange={this.handleChange}/>
                                    {formErrors.phoneNumber.length > 0 && ( <span className="errorMessage">{formErrors.phoneNumber}</span> )}
                                </div>
                                <div className="registerBtn">
                                    <button type="submit">Register</button>
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
