import React, {Component} from 'react';
import Axios from "axios";
import './home.css';
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Feed from '../post/feed';

var today = new Date(),
date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const APIHealth = "http://newsapi.org/v2/everything?q=diet&from={date}&sortBy=popularity&apiKey=ad4f58957a6041f4b408ef2d94330a31"
const APIFitness = "http://newsapi.org/v2/everything?q=fitness&from={date}&sortBy=popularity&apiKey=ad4f58957a6041f4b408ef2d94330a31"




class Articles extends Component{
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }

    componentDidMount() {
        fetch(APIFitness)
         .then(response => response.json())
         .then(data => this.setState({ articles: data.articles }));
    }

    
    render() {
        const {articles} = this.state;
        return (
            <>
            <aside style={{marginLeft: "5%",display: "inline-block",marginTop: "5%"}}>
                <h2>News Feed</h2>
                {articles.map(article =>
                    <Card style={{width: '30rem'}}>
                        <Card.Header></Card.Header>
                        <Card.Body>
                             <aside style={{display: 'inline-block'}}><img src={article.urlToImage} width="180" height="180" alt="ArticleImage"/></aside>
                             <div style={{display: 'inline-block'}}>
                            <Card.Title ><a href={article.url}>{article.title}</a></Card.Title>
                            <Card.Subtitle clasnName="mb-2 text-muted">{article.source.name}</Card.Subtitle>
                            <Card.Text>{article.description}</Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                    )}
                
            </aside>
            <div style={{display: "inline-block",float: "right",marginRight: "40%", marginTop: "5%"}}>
             <Feed />
            </div>
            </>
        )
    };
}

export default Articles