import React, {Component} from 'react';
// import Newsfeed from './../newsfeed.js';
import Axios from "axios";
import "./home.css";
import Articles from "./articles.js";
import axiosConfig from "axios";
import loginImg from "../../TeamFit_logo.png";
import Card from 'react-bootstrap/Card'
import Feed from '../post/feed';






class Home extends Component{
    constructor(prop) {

        super(prop);
        this.state = {
            foodInfo: [],
            foodNutrition:[],
            foodName: "",
            message: "",
            recipeInfo: [],
            articles: [],
            date: "",
            calories: "",
            ListOfCal: []
        }
    }

    handleChange = e => {
        e.preventDefault()
        const name = e.target.value
        this.setState({
            foodName: name
        })
    }
    handleCalChange=e=>{
        e.preventDefault()
        const value = e.target.value
        this.setState({
            calories: value
        })
    }
    handleDateChange=e=>{
        e.preventDefault()
        const value = e.target.value
        this.setState({
            date: value
        })
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
                        foodName: this.state.foodName,
                        foodInfo: [],
                        message: res['state'],
                        foodId: [],
                        foodNutrition: [],
                        recipeInfo: [],
                        ListOfCal: [],

                        articles: []})
                }
                else this.setState(
                    {
                        foodName: this.state.foodName,
                        message: "",
                        foodNutrition: res['state'],
                        foodId: [],
                        recipeInfo: [],
                        articles: [],
                        ListOfCal:[],
                        calories: res['cal'],
                    }
                        )
            })
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
                if(res['state'] == "Invaild Food Name"){
                    this.setState({
                        foodInfo: [],
                        foodNutrition: [],
                        message: res['state'],
                        foodName: this.state.foodName,
                        recipeInfo: [],
                        ListOfCal: [],
                        articles: []
                    })
                }
                else {
                    this.setState({
                        foodInfo: [],
                        foodNutrition: [],
                        foodName: this.state.foodName,
                        message: "",
                        ListOfCal:[],
                        recipeInfo: res['state'],
                        articles: []
                    })
                }
            }
        )
    }


    handlesStoreCal =e=>{
        e.preventDefault()
        const key = this.state.date
        const value = this.state.calories
        const dict = {
            key: key,
            value: value,
        }
        console.log(this.state)
        axiosConfig.post('http://127.0.0.1:5000/home/storeCalories',{
            body: dict,
            headers: {"Content-Type":"application/json",},
            cache: "no-cache",
        }).then(
            response =>{
                let res = response.data
                this.setState({
                    foodInfo: [],
                    message: res['state'],
                    foodNutrition: [],
                    recipeInfo: [],
                    articles: [],
                    ListOfCal:[],
                    calories: value,
                    dateAndcalories:""
                })
            }
        )
    }
    handlesGetAllCal=e=>{
        e.preventDefault()
        axiosConfig.get('http://127.0.0.1:5000/home/getAllCalories')
            .then(
            response=>{
                let res = response.data
                this.setState({
                    foodInfo: [],
                    message: "",
                    foodId: [],
                    foodNutrition: [],
                    recipeInfo: [],
                    articles: [],
                    ListOfCal: res['state']
                })
            }
        )
    }

    handlesGetDateCall=e=>{
        e.preventDefault()
        axiosConfig.post('http://127.0.0.1:5000/home/getCalories',{
            body: this.state.date,
            headers: {"Content-Type":"application/json",},
            cache: "no-cache",
        }).then(
            response=>{
                let res = response.data
                const date = this.state.date
                var list = date +": "+ res['state']
                if(res['state'] == 'please store data first') list = res['state']
                this.setState({
                    foodInfo: [],
                    message: list,
                    foodId: [],
                    foodNutrition: [],
                    recipeInfo: [],
                    articles: [],
                    ListOfCal: [],
                    dateAndCalories: list
                })
            }
        )
    }


    render() {
        return (
        <div className="container">
            <img src={loginImg} width="180" height="180" alt="LoginImage" className="logo"/>
            

                <div style={{height: "350px", marginTop: "5%", marginLeft: "5%"}}>

                {/*searchBar for show*/}
                <h2>Nutrition Info:</h2>
                    <div className = "foodSection">
                        <input className="searchBar"
                               type = "text"
                               placeholder="Search...."
                               onChange={this.handleChange}
                        />
                        <button onClick={this.handleSubmit} className="foodSearch">Search Food!</button>
                        <button onClick={this.handleSubmitRecipe} className = "foodSearchRecipe"> Food Recipe!</button>
                    </div>
                    <div classNme = "calorieSection">
                        <input className = "dateBar"
                               type = "text"
                               placeholder="date:MM/DD"
                               onChange = {this.handleDateChange}
                        />
                        <input className = "calBar"
                               type = "text"
                               placeholder="consume Calories..."
                               onChange = {this.handleCalChange}
                        />
                        <button onClick={this.handlesStoreCal} className = "storeCal">Store Calories!</button>
                        <button onClick={this.handlesGetAllCal} className="getAllCal">Get all History!</button>
                        <button onClick={this.handlesGetDateCall} className="getDateCal">Get Date History!</button>
                    </div>

                {/*display the context*/}
                    {this.state.articles.map(response => {
                          return <li>{response.title}</li>;
                        })}
                    <Card style={{width: '50rem'}}>
                        <Card.Body>
                        {this.state.recipeInfo.map(response=>{
                            return <body>{response}</body>;
                        })}
                        {this.state.foodNutrition.map(response=>{
                            return <body>{response}</body>
                        })}
                        {this.state.ListOfCal.map(response=>{
                            return <body>{response}</body>
                        })}
                        { this.state.message}
                        </Card.Body>
                    </Card> 
            </div>
            <div className="ffeed"> 
            {/* this component is causing the feed and form to show up on the homepage */}
                <Feed />         
            </div>
            <div className="aarticles">
                <Articles />
            </div>
    </div>


        )};
}

export default Home;