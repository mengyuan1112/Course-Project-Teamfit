import React, {Component} from 'react';
// import Newsfeed from './../newsfeed.js';
import Axios from "axios";
import './home.css';
import axiosConfig from "axios";


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

    // componentDidMount(){
    //     Axios.get('http://127.0.0.1:5000/home')
    //     .then(response => {
    //         const articles = response.data
    //         this.setState({articles: articles})
    //         });
    //     console.log(this.state.articles)
    // }

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
            <h1>Welcome to the homepage</h1>

            <div className="show">
                <button onClick={this.handleShows}>Show Article</button>
            </div>
            <div className="Unshow">
                <button onClick={this.handleUnshow}>Unshow Article</button>
            </div>

            <input className="searchBar"
                   type = "text"
                   placeholder="Search...."
                   onChange={this.handleChange}
            />

            <div className="foodSearch">
                <button onClick={this.handleSubmit}>Search Food!</button>
            </div>

            {/*<div onSubmit={this.handleSubmit} noValidate>*/}
            {/*    <div className="foodSearch">*/}
            {/*        <button type="submit">Search Food !</button>*/}
            {/*    </div>*/}

            {/*</div>*/}
            <body>
            <div className="context">
                <h2>{this.state.articles.map(response => {
                    return <li>{response.title}</li>;
                })}<br/>
                    { this.state.message}<br/>
                    { this.state.calories + this.state.caloriesVal}<br/>
                    { this.state.caloriesRange + this.state.caloriesRangeVal}<br/>
                    { this.state.protein + this.state.proteinVal}<br/>
                    { this.state.proteinRange + this.state.proteinRangeVal}<br/>
                    { this.state.fat +this.state.fatVal}<br/>
                    { this.state.fatRange+ this.state.fatRangeVal}<br/>
                    { this.state.carbs + this.state.carbsVal}<br/>
                    { this.state.carbsRange + this.state.carbsRangeVal}
                </h2>
                {/*<p>{this.state.caloriesRange + this.state.caloriesRangeVal}</p>*/}

                {/*{ this.state.calories && <h2 className="foodInfomation"> { this.state.calories + this.state.caloriesVal} </h2> }*/}
                {/*{ this.state.caloriesRange && <h2 className="foodInfomation"> { this.state.caloriesRange + this.state.caloriesRangeVal} </h2> }*/}
                {/*{ this.state.calories && <h2 className="foodInfomation">{ this.state.protein + this.state.proteinVal}</h2> }*/}
                {/*{ this.state.caloriesRange && <h2 className="foodInfomation"> { this.state.proteinRange + this.state.proteinRangeVal} </h2> }*/}
                {/*{ this.state.fat && <h2 className="foodInfomation"> { this.state.fat +this.state.fatVal } </h2> }*/}
                {/*{ this.state.fatRange && <h2 className="foodInfomation"> { this.state.fatRange+ this.state.fatRangeVal} </h2> }*/}
                {/*{ this.state.carbs && <h2 className="foodInfomation"> { this.state.carbs + this.state.carbsVal} </h2> }*/}
                {/*{ this.state.carbsRange && <h2 className="foodInfomation"> { this.state.carbsRange + this.state.carbsRangeVal} </h2> }*/}
            </div>
            </body>
        </div>


        )};
}

export default Home;