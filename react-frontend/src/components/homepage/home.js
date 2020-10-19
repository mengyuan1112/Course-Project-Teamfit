import React, {Component} from 'react';
// import Newsfeed from './../newsfeed.js';
import Axios from "axios";

class Home extends Component{
    state = {
        articles: []
      }

    componentDidMount(){
        Axios.get('http://127.0.0.1:5000/home')
        .then(response => {
            const articles = response.data
            this.setState({articles})
            }); 
    }

    componentWillUnmount(){

    }

    render() {
        return (
        <div>
            <h1>Welcome to the homepage</h1>
            {this.state.articles.map(response => {
                return <li>{response.title}</li>;
            })}
        </div>
        )};
}

export default Home;