import React, {Component} from 'react';
// import Newsfeed from './../newsfeed.js';
import Axios from "axios";
import "./home.css";
import Articles from "./articles.js";
import axiosConfig from "axios";
import loginImg from "../../TeamFit_logo.png";
import Card from 'react-bootstrap/Card'





class Home extends Component{
    constructor(prop) {

        super(prop);
        this.state = {
            foodInfo: [],
            foodNutrition:[],
            foodName: "",
            message: "",
            foodId: [],
            recipeInfo: [],
            articles: []

        }
    }

    handleChange = e => {
        e.preventDefault()
        const name = e.target.value
        this.setState({foodName: name})
        console.log(this.state.foodName)
        console.log(this.state.foodName.length)

    }

    handleSubmit = e => {
        e.preventDefault()
        axiosConfig.post('http://127.0.0.1:5000/home/food',{
            body : this.state.foodName,
            headers:{"Content-Type":"application/json",},
            cache: "no-cache",
        })
            .then(response => {
                let res = response.data;
                console.log(res)
                if(res['state'] == 'Not enough data for an informed guess.'){
                    this.setState({
                        foodInfo: [],
                        message: res['state'],
                        foodId: [],
                        foodNutrition: [],
                        articles: []})
                }
                else this.setState(
                    {
                        message: "",
                        foodNutrition: res['state'],
                        foodId: [],
                        articles: []}
                        )
            })
    }

    handleSubmitId = e =>{
        e.preventDefault()
        axiosConfig.post('http://127.0.0.1:5000/home/foodID',{
            body : this.state.foodName,
            headers:{"Content-Type":"application/json",},
            cache: "no-cache",
        }).then(
            response => {
                let res = response.data
                this.setState({
                    foodInfo: [],
                    foodNutrition:[],
                    message: "",
                    foodId: res['state'],
                })
                console.log(this.state.foodId);
            }
        )
    }

    handleSubmitRecipe =e=>{
        e.preventDefault()
        axiosConfig.post('http://127.0.0.1:5000/home/foodRecipe',{
            body : this.state.foodName,
            headers:{"Content-Type":"application/json",},
            cache: "no-cache",
        }).then(
            response => {
                let res = response.data
                this.setState({
                    foodInfo: [],
                    // calories: "",
                    // caloriesVal: "",
                    // caloriesRangeVal:[],
                    // caloriesRange:"",
                    // fat:"",
                    // fatVal:"",
                    // fatRangeVal:[],
                    // fatRange:"",
                    // carbs: "",
                    // carbsVal:"",
                    // carbsRangeVal:[],
                    // carbsRange:"",
                    // protein: "",
                    // proteinVal: "",
                    // proteinRange: "",
                    // proteinRangeVal:[],
                    foodNutrition:[],
                    foodName: "",
                    message: "",
                    foodId: [],
                    recipeInfo: res['state'],
                    articles: []
                })
            }
        )
    }

    componentWillUnmount(){

    }


    render() {
        return (
        <div>
            <img src={loginImg} width="180" height="180" alt="LoginImage" className="logo"/>
            

                <div style={{height: "250px", marginTop: "5%", marginLeft: "5%"}}>

                {/*searchBar for show*/}
                <h2>Nutrition Info:</h2>
                <input className="searchBar"
                    type = "text"
                    placeholder="Search...."
                    onChange={this.handleChange}
                />
                {/*search button*/}           
                    <button onClick={this.handleSubmit} className="foodSearch">Search Food!</button>
                    <button onClick={this.handleSubmitId} className = "foodSearchID"> Search Food ID!</button>
                    <button onClick={this.handleSubmitRecipe} className = "foodSearchRecipe"> Food Recipe By ID!</button>

                {/*display the context*/}
                    {this.state.articles.map(response => {
                          return <li>{response.title}</li>;
                        })}
                    <Card style={{width: '50rem'}}>
                        <Card.Body>
                        {this.state.foodId.map(response=>{
                            return <body>{response}</body>;
                        })}
                        {this.state.recipeInfo.map(response=>{
                            return <body>{response}</body>;
                        })}
                        {this.state.foodNutrition.map(response=>{
                            return <body>{response}</body>
                        })}
                        { this.state.message}
                        </Card.Body>
                    </Card>
                    
                </div>
                <Articles />
        </div>


        )};
}

export default Home;