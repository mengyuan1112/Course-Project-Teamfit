import React from "react";
import './compare.css';
import Axios from 'axios';


/*Constants that store the table entries for the fitness history table*/
const dateFRows = [];
const dateNRows = [];
const cardioRows = [];
const weightsRows = [];
const weightRows = [];
const calFRows = [];
const calNRows = [];

export default class Compare extends React.Component {

    /*  Constructor for Compare class, has 2 states: nutritionHistory and fitnessHistory */
    constructor(props) {
        super(props);
        this.state = {
            fitnessHistory: {},
            nutritionHistory: {}
        }
    }
    /*GET request to fitness.py and nutrition.py. Makes both histories to be object with 3 arrays*/
    componentDidMount() {
        Axios.get('http://18.223.214.126:5000/profile/nutrition/submit').then(response=> { this.setState({nutritionHistory: response.data});})
        Axios.get('http://18.223.214.126:5000/profile/fitness/submit').then(response=> { this.setState({fitnessHistory: response.data});})
    }

    componentWillUnmount() {

    }

    /*Helper function to add the date rows to html render*/
    addDateFRows() {
        for (var i = 0; i < this.state.fitnessHistory.date.length; i++){
            dateFRows.push(<tr>{this.state.fitnessHistory.date[`${i}`]}</tr>)
            dateFRows.push(<tr>{'---------'}</tr>)
        }
    }

    /*Helper function to add the cardio rows to html render*/
    addCardioRows() {
        for (var i = 0; i < this.state.fitnessHistory.cardio.length; i++){
            if (this.state.fitnessHistory.cardio[`${i}`] <= 5) {
                cardioRows.push(<tr className='bad'>{this.state.fitnessHistory.cardio[`${i}`]}</tr>)
                cardioRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.fitnessHistory.cardio[`${i}`] > 5 && this.state.fitnessHistory.cardio[`${i}`] < 15) {
                cardioRows.push(<tr className='intermediate'>{this.state.fitnessHistory.cardio[`${i}`]}</tr>)
                cardioRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.fitnessHistory.cardio[`${i}`] >= 15) {
                cardioRows.push(<tr className='good'>{this.state.fitnessHistory.cardio[`${i}`]}</tr>)
                cardioRows.push(<tr>{'---------'}</tr>)
            }
        }
    }

    /*Helper function to add the weights rows to html render*/
    addWeightsRows() {
        for (var i = 0; i < this.state.fitnessHistory.weights.length; i++){
            if (this.state.fitnessHistory.weights[`${i}`] <= 5) {
                weightsRows.push(<tr className='bad'>{this.state.fitnessHistory.weights[`${i}`]}</tr>)
                weightsRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.fitnessHistory.weights[`${i}`] > 5 && this.state.fitnessHistory.weights[`${i}`] < 15) {
                weightsRows.push(<tr className='intermediate'>{this.state.fitnessHistory.weights[`${i}`]}</tr>)
                weightsRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.fitnessHistory.weights[`${i}`] >= 15) {
                weightsRows.push(<tr className='good'>{this.state.fitnessHistory.weights[`${i}`]}</tr>)
                weightsRows.push(<tr>{'---------'}</tr>)
            }
        }
    }

    /*Helper function to add the approx. calorie rows to html render*/
    addCalFRows() {
        for (var i = 0; i < this.state.fitnessHistory.cals.length; i++){
            if (this.state.fitnessHistory.cals[`${i}`] <= 75) {
                calFRows.push(<tr className='bad'>{this.state.fitnessHistory.cals[`${i}`]}</tr>)
                calFRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.fitnessHistory.cals[`${i}`] > 75 && this.state.fitnessHistory.cals[`${i}`] <= 200) {
                calFRows.push(<tr className='intermediate'>{this.state.fitnessHistory.cals[`${i}`]}</tr>)
                calFRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.fitnessHistory.cals[`${i}`] > 200) {
                calFRows.push(<tr className='good'>{this.state.fitnessHistory.cals[`${i}`]}</tr>)
                calFRows.push(<tr>{'---------'}</tr>)
            }
        }
    }

    /*Helper function to add the date rows to html render*/
    addDateNRows() {
        for (var i = 0; i < this.state.nutritionHistory.date.length; i++){
            dateNRows.push(<tr>{this.state.nutritionHistory.date[`${i}`]}</tr>)
            dateNRows.push(<tr>{'---------'}</tr>)
        }
    }

    /*Helper function to add the calorie rows to html render*/
    addCalNRows() {
        for (var i = 0; i < this.state.nutritionHistory.calories.length; i++){
            if (this.state.nutritionHistory.calories[`${i}`] > 2000) {
                calNRows.push(<tr className='bad'>{this.state.nutritionHistory.calories[`${i}`]}</tr>)
                calNRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.nutritionHistory.calories[`${i}`] <= 2000 && this.state.nutritionHistory.calories[`${i}`] >= 1750) {
                calNRows.push(<tr className='intermediate'>{this.state.nutritionHistory.calories[`${i}`]}</tr>)
                calNRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.nutritionHistory.calories[`${i}`] < 1750) {
                calNRows.push(<tr className='good'>{this.state.nutritionHistory.calories[`${i}`]}</tr>)
                calNRows.push(<tr>{'---------'}</tr>)
            }
        }
    }

    /*Helper function to add the weight rows to html render*/
    addWeightRows() {
        for (var i = 0; i < this.state.nutritionHistory.weight.length; i++){
            if (this.state.nutritionHistory.weight[`${i}`] > 225) {
                weightRows.push(<tr className='bad'>{this.state.nutritionHistory.weight[`${i}`]}</tr>)
                weightRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.nutritionHistory.weight[`${i}`] <= 225 && this.state.nutritionHistory.weight[`${i}`] >= 175) {
                weightRows.push(<tr className='intermediate'>{this.state.nutritionHistory.weight[`${i}`]}</tr>)
                weightRows.push(<tr>{'---------'}</tr>)
            }
            if (this.state.nutritionHistory.weight[`${i}`] < 175) {
                weightRows.push(<tr className='good'>{this.state.nutritionHistory.weight[`${i}`]}</tr>)
                weightRows.push(<tr>{'---------'}</tr>)
            }
        }
    }

    /* Handles any change to the form input and determines if valid input is provided*/
    handleChange = e => {
        e.preventDefault();
        if (this.refs.compHistorybtn.getAttribute("disabled") !== "disabled" && e.target.name === "compHistorybtn"){
            this.addDateFRows();
            this.addCardioRows();
            this.addWeightsRows();
            this.addCalFRows();
            this.addWeightRows();
            this.addCalNRows();
            this.addDateNRows();
            this.refs.compHistorybtn.setAttribute("disabled", "disabled");

            const {name,value} = e.target;
        let formErrors = this.state.formErrors;
        this.setState({formErrors, [name]:value}, ()=> console.log(this.state))
        }
    };

/* renders all html for the login page*/
render(){
    return <div className="compareWrapper">
        <a href="/profile">
            <button className="back-to-profile">Return to Profile</button>
        </a>
        <button className="comp-show-table" ref="compHistorybtn" name="compHistorybtn" onClick={this.handleChange}>Compare Histories</button>
        <div className="compareHeader">
            <h1>History Comparison</h1>
        </div>
                <div className="compNutritionGraph">
                    <div className="compareHeader">
                        <h1>Nutrition History</h1>
                    </div>
                    <div className="comp-nutrition-graph-wrapper">
                        <table className="nut-date-table" id="table">
                            <thead>
                            Date:
                            </thead>
                            <tbody>
                            {dateNRows}
                            </tbody>
                        </table>
                        <table className="nut-weight-table" id="table">
                            <thead>
                            Weight:
                            </thead>
                            <tbody>
                            {weightRows}
                            </tbody>
                        </table>
                        <table className="nut-calorie-table" id="table">
                            <thead>
                            Caloric Intake:
                            </thead>
                            <tbody>
                            {calNRows}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="compFitnessGraph">
                    <div className="compareHeader">
                        <h1>Fitness History</h1>
                    </div>
                    <div className="comp-fitness-graph-wrapper">
                        <table className="fit-date-table" id="table">
                            <thead>
                            Date:
                            </thead>
                            <tbody>
                            {dateFRows}
                            </tbody>
                        </table>
                        <table className="fit-cardio-table" id="table">
                            <thead>
                            Cardio:
                            </thead>
                            <tbody>
                            {cardioRows}
                            </tbody>
                        </table>
                        <table className="fit-weights-table" id="table">
                            <thead>
                            Weight Lifting:
                            </thead>
                            <tbody>
                            {weightsRows}
                            </tbody>
                        </table>
                        <table className="fit-cals-table" id="table">
                            <thead>
                            Calories Burned:
                            </thead>
                            <tbody>
                            {calFRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

 }
}

