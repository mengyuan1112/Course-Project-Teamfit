import React from "react";
import './nutrition.css';
import '../logReg/login';



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

export default class Nutrition extends React.Component {

    /*  Constructor for Nutrition class, has 6 states: protein, carbs, fat, weight, username and formErrors */

    constructor(props) {
        super(props);
        this.state = {
            protein: null,
            carbs: null,
            fat: null,
            weight: null,
            userEmail: "grader@cse442.com",
            formErrors: {
                protein: "",
                carbs: "",
                fat: "",
                weight: ""
            }
        }
    }


/*   Handles the input from the form when the submit button is clicked*/
    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)){
            fetch('http://localhost:5000/profile/nutrition/submit', {
            method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(this.state)
        }).then(response => response.json())
            window.location.reload()
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
            case 'protein':
                formErrors.protein = value.length < 1 ? 'Please enter grams of protein':"";
                break;
            case 'carbs':
                formErrors.carbs = value.length < 1 ? 'Please enter grams of carbohydrates':"";
                break;
            case 'fat':
                formErrors.fat = value.length < 1 ? 'Please enter grams of fat':"";
                break;
            case 'weight':
                formErrors.weight = value.length < 1 ? "Please enter current weight": "";
                break;
            default:
            break;
        }
        this.setState({formErrors, [name]:value}, ()=> console.log(this.state))
    };
/* renders all html for the login page*/
render(){
    const{formErrors} =this.state;
    return <div className="nutritionWrapper">
        <a href="/profile">
                    <button>Return to Profile</button>
                    </a>
                    <div className="nutritionHeader">
                                <h1>Nutrition History</h1>
                    </div>
                <div className="nutrition-form-wrapper">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="allForms">
                            <div className="Cal"><text>
                                Please enter your caloric intake for the day.
                            </text>
                            </div>
                            <div className="protein">
                                <label htmlFor="protein">Protein</label>
                                <input className={formErrors.protein.length > 0 ? "error" : null} type="text" name="protein" placeholder="11"onChange={this.handleChange}/>
                                {formErrors.protein.length > 0 && ( <span className="errorMessage">{formErrors.protein}</span> )}
                                <text>grams</text>
                            </div>
                            <div className="carbs">
                                <label htmlFor="carbs">Carbohydrates</label>
                                <input className={formErrors.carbs.length > 0 ? "error" : null} type="text" name="carbs" placeholder="10"onChange={this.handleChange}/>
                                {formErrors.carbs.length > 0 && ( <span className="errorMessage">{formErrors.carbs}</span> )}
                                <text>grams</text>
                            </div>
                            <div className="fat">
                                <label htmlFor="fat">Fat</label>
                                <input className={formErrors.fat.length > 0 ? "error" : null} type="text" name="fat" placeholder="8"onChange={this.handleChange}/>
                                {formErrors.fat.length > 0 && ( <span className="errorMessage">{formErrors.fat}</span> )}
                                <text>grams</text>
                            </div>
                            <div className="Cal">
                                <text>Please enter your weight.</text>
                            </div>

                            <div className="weight">
                                <label htmlFor="weight">Current Weight</label>
                                <input className={formErrors.weight.length > 0 ? "error" : null} type="text" name="weight" placeholder="165"onChange={this.handleChange}/>
                                {formErrors.weight.length > 0 && ( <span className="errorMessage">{formErrors.weight}</span> )}
                                <text>lbs</text>
                            </div>
                            <div className="nutritionSubmitBtn">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="nutritionGraph">

                </div>
            </div>

 }
}