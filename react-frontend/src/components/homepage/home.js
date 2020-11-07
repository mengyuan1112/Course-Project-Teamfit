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
            calories: "",
            caloriesVal: "",
            caloriesRangeVal:[],
            caloriesRange:"",
            fat:"",
            fatVal:"",
            fatRangeVal:[],
            fatRange:"",
            carbs: "",
            carbsVal:"",
            carbsRangeVal:[],
            carbsRange:"",
            protein: "",
            proteinVal: "",
            proteinRange: "",
            proteinRangeVal:[],
            foodName: "",
            message: "",
            articles: []
        }
    }

    handleShows = e =>{
        Axios.get('http://127.0.0.1:5000/home')
            .then(response => {
                const articles = response.data
                this.setState({
                    foodInfo: [],
                    calories: "",
                    caloriesVal: "",
                    caloriesRangeVal:[],
                    caloriesRange:"",
                    fat:"",
                    fatVal:"",
                    fatRangeVal:[],
                    fatRange:"",
                    carbs: "",
                    carbsVal:"",
                    carbsRangeVal:[],
                    carbsRange:"",
                    protein: "",
                    proteinVal: "",
                    proteinRange: "",
                    proteinRangeVal:[],
                    foodName: "",
                    message: "",
                    articles: articles})
            });
    }

    handleUnshow=e=>{
        this.setState({foodInfo: [],
            calories: "",
            caloriesVal: "",
            caloriesRangeVal:[],
            caloriesRange:"",
            fat:"",
            fatVal:"",
            fatRangeVal:[],
            fatRange:"",
            carbs: "",
            carbsVal:"",
            carbsRangeVal:[],
            carbsRange:"",
            protein: "",
            proteinVal: "",
            proteinRange: "",
            proteinRangeVal:[],
            foodName: "",
            message: "",
            articles: []})
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
                    this.setState({foodInfo: [],
                        calories: "",
                        caloriesVal: "",
                        caloriesRangeVal:[],
                        caloriesRange:"",
                        fat:"",
                        fatVal:"",
                        fatRangeVal:[],
                        fatRange:"",
                        carbs: "",
                        carbsVal:"",
                        carbsRangeVal:[],
                        carbsRange:"",
                        protein: "",
                        proteinVal: "",
                        proteinRange: "",
                        proteinRangeVal:[],
                        foodName: "",
                        message: res['state'],
                        articles: []})
                }
                else this.setState(
                    {
                        message: "",
                        calories: res['state'][0],
                        caloriesVal:res['state'][1],
                        caloriesRange: res['state'][2],
                        caloriesRangeVal:res['state'][3],
                        protein:res['state'][4],
                        proteinVal:res['state'][5],
                        proteinRange:res['state'][6],
                        proteinRangeVal:res['state'][7],
                        fat:res['state'][8],
                        fatVal:res['state'][9],
                        fatRange:res['state'][10],
                        fatRangeVal:res['state'][11],
                        carbs:res['state'][12],
                        carbsVal:res['state'][13],
                        carbsRange:res['state'][14],
                        carbsRangeVal:res['state'][15],
                        articles: []}
                        )
            })
    }


    componentWillUnmount(){

    }

    render() {
        return (
        <div>
            <img src={loginImg} width="180" height="180" alt="LoginImage" className="logo"/>
            

                <div style={{height: "180px", marginTop: "5%", marginLeft: "5%"}}>

                {/*searchBar for show*/}
                <h2>Nutrition Info:</h2>
                <input className="searchBar"
                    type = "text"
                    placeholder="Search...."
                    onChange={this.handleChange}
                />
                {/*search button*/}           
                <button onClick={this.handleSubmit} className="foodSearch">Search Food!</button>


                {/*display the context*/}
                    {this.state.articles.map(response => {
                          return <li>{response.title}</li>;
                        })}
                    <Card style={{width: '50rem'}}>
                        <Card.Body>
                        {this.state.articles.map(response => {
                        return <li>{response.title}</li>;
                        })}
                        { this.state.message}<br/>
                        { this.state.calories + this.state.caloriesVal}<br/>
                        { this.state.caloriesRange + this.state.caloriesRangeVal}<br/>
                        { this.state.protein + this.state.proteinVal}<br/>
                        { this.state.proteinRange + this.state.proteinRangeVal}<br/>
                        { this.state.fat +this.state.fatVal}<br/>
                        { this.state.fatRange+ this.state.fatRangeVal}<br/>
                        { this.state.carbs + this.state.carbsVal}<br/>
                        { this.state.carbsRange + this.state.carbsRangeVal}
                        </Card.Body>
                    </Card>
                    
                </div>
                <Articles />
        </div>


        )};
}

export default Home;