import React from "react";
import './fitness.css';
import Axios from 'axios';


/*Constants that store the table entries for the fitness history table*/
const dateRows = [];
const cardioRows = [];
const weightsRows = [];
const calRows = [];

/* Function to check whether a form is valid or not*/
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

export default class Fitness extends React.Component {

    /*  Constructor for Fitness class, has 4 states: cardio, weights, history and formErrors */
    constructor(props) {
        super(props);
        this.state = {
            cardio: null,
            weights: null,
            history: {},
            formErrors: {
                cardio: "",
                weights: ""
            }
        }
    }
    /*GET request to fitness.py. Updates history to be object with 3 arrays*/
    componentDidMount() {
    Axios.get('http://localhost:5000/profile/fitness/submit').then(response=> { this.setState({history: response.data});})
    }

    componentWillUnmount() {

    }

    /*Helper function to add the date rows to html render*/
    addDateRows() {
        for (var i = 0; i < this.state.history.date.length; i++){
            dateRows.push(<tr>{this.state.history.date[`${i}`]}</tr>)
            dateRows.push(<tr>{'---------'}</tr>)
        }
    }
    /*Helper function to add the cardio rows to html render*/
    addCardioRows() {
        for (var i = 0; i < this.state.history.cardio.length; i++){
            if (this.state.history.cardio[`${i}`] <= 5) {
                cardioRows.push(<tr className='bad'>{this.state.history.cardio[`${i}`]}</tr>)
                cardioRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.history.cardio[`${i}`] > 5 && this.state.history.cardio[`${i}`] < 15) {
                cardioRows.push(<tr className='intermediate'>{this.state.history.cardio[`${i}`]}</tr>)
                cardioRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.history.cardio[`${i}`] >= 15) {
                cardioRows.push(<tr className='good'>{this.state.history.cardio[`${i}`]}</tr>)
                cardioRows.push(<tr>{'---------'}</tr>)
            }
        }
    }
    /*Helper function to add the weights rows to html render*/
    addWeightsRows() {
        for (var i = 0; i < this.state.history.weights.length; i++){
            if (this.state.history.weights[`${i}`] <= 5) {
                weightsRows.push(<tr className='bad'>{this.state.history.weights[`${i}`]}</tr>)
                weightsRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.history.weights[`${i}`] > 5 && this.state.history.weights[`${i}`] < 15) {
                weightsRows.push(<tr className='intermediate'>{this.state.history.weights[`${i}`]}</tr>)
                weightsRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.history.weights[`${i}`] >= 15) {
                weightsRows.push(<tr className='good'>{this.state.history.weights[`${i}`]}</tr>)
                weightsRows.push(<tr>{'---------'}</tr>)
            }
        }
    }
    /*Helper function to add the approx. calorie rows to html render*/
    addCalsRows() {
        for (var i = 0; i < this.state.history.cals.length; i++){
            if (this.state.history.cals[`${i}`] <= 75) {
                calRows.push(<tr className='bad'>{this.state.history.cals[`${i}`]}</tr>)
                calRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.history.cals[`${i}`] > 75 && this.state.history.cals[`${i}`] <= 200) {
                calRows.push(<tr className='intermediate'>{this.state.history.cals[`${i}`]}</tr>)
                calRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.history.cals[`${i}`] > 200) {
                calRows.push(<tr className='good'>{this.state.history.cals[`${i}`]}</tr>)
                calRows.push(<tr>{'---------'}</tr>)
            }
        }
    }

/*   Handles the input from the form when the submit button is clicked*/
    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)){
            fetch('http://localhost:5000/profile/fitness/submit', {
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
        if (this.refs.fitHistorybtn.getAttribute("disabled") !== "disabled" && e.target.name === "fitHistorybtn"){
            this.addDateRows();
            this.addCardioRows();
            this.addWeightsRows();
            this.addCalsRows();
            this.refs.fitHistorybtn.setAttribute("disabled", "disabled");
        }
        const {name,value} = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case 'cardio':
                formErrors.fat = value.length < 1 ? 'Please enter time spent doing cardio':"";
                break;
            case 'weights':
                formErrors.weight = value.length < 1 ? "Please enter time spent lifting weights": "";
                break;
            default:
            break;
        }
        this.setState({formErrors, [name]:value}, ()=> console.log(this.state))
    };

/* renders all html for the login page*/
render(){
    const{formErrors} =this.state;
    return <div className="fitnessWrapper">
        <a href="/profile">
            <button className="back-to-profile">Return to Profile</button>
        </a>
        <a href="/profile/compare">
            <button className="comp-profile">Compare to Nutrition History</button>
        </a>
        <button className="show-table" ref="fitHistorybtn" name="fitHistorybtn" onClick={this.handleChange}>Show History</button>
        <div className="fitnessHeader">
            <h1>Exercise History</h1>
        </div>
                <div className="fitness-form-wrapper">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="allForms">
                            <div className="Exercise"><text>
                                Please enter time spent exercising today.
                            </text>
                            </div>
                            <div className="cardio">
                                <label htmlFor="cardio">Cardio</label>
                                <input className={formErrors.cardio.length > 0 ? "error" : null} type="text" name="cardio" placeholder="45"onChange={this.handleChange}/>
                                {formErrors.cardio.length > 0 && ( <span className="errorMessage">{formErrors.cardio}</span> )}
                                <text>minutes</text>
                            </div>
                            <div className="weights">
                                <label htmlFor="weights">Weight Lifting</label>
                                <input className={formErrors.weights.length > 0 ? "error" : null} type="text" name="weights" placeholder="55"onChange={this.handleChange}/>
                                {formErrors.weights.length > 0 && ( <span className="errorMessage">{formErrors.weights}</span> )}
                                <text>minutes</text>
                            </div>
                            <div className="fitnessSubmitBtn">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="fitnessGraph">
                    <div className="fitness-graph-wrapper">
                        <table className="date-table" id="table">
                            <thead>
                            Date:
                            </thead>
                            <tbody>
                            {dateRows}
                            </tbody>
                        </table>
                        <table className="cardio-table" id="table">
                            <thead>
                            Cardio:
                            </thead>
                            <tbody>
                            {cardioRows}
                            </tbody>
                        </table>
                        <table className="weights-table" id="table">
                            <thead>
                            Weight Lifting:
                            </thead>
                            <tbody>
                            {weightsRows}
                            </tbody>
                        </table>
                        <table className="cals-table" id="table">
                            <thead>
                            Calories Burned:
                            </thead>
                            <tbody>
                            {calRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

 }
}

