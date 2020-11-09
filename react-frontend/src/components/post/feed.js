import React, { Component } from 'react';
import Post from './post.js';
import Form from './form.js';
import './feed.css';
import './post.css';
import './form.css';

class Feed extends Component {
    constructor(props) {
        super();
        this.state = {
            posts: [
                {content: ""},
            ],
            oldPosts: []
        }
        this.handleNewPost = this.handleNewPost.bind(this);
    }
    componentWillMount() {
        // this.fetchMyPosts();
        fetch('http://127.0.0.1:5000/profile/getPost', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res =>res.json())
            .then(data =>
                this.setState({oldPosts: data['state']},()=>console.log(this.state.oldPosts))

            )
    }


    fetchMyPosts() {
        fetch('http://127.0.0.1:5000/profile/getPost', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then((res) =>{
            let response = res.data;
            this.setState({posts: response});
            console.log(this.state.posts);
        })//.then((posts) => {
        //     this.setState({posts});
        // })
    }
    handleNewPost(post) {
        fetch('http://127.0.0.1:5000/profile/makePost', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {'Content-Type': 'application/json'}
        }).then(function(res) {
            return res;
        }).then(function(data) {
            console.log('server respone:', data)
        });

        const posts = this.state.posts.concat([post]);

        this.setState({posts});
    }


    render() {
        const posts = this.state.posts.slice(0).reverse().map((post, index) =>
            <Post key={index} value={post} />
        );
        return (
            <div className="feed">
    
                <Form onSubmit={this.handleNewPost} />
                
                {this.state.oldPosts.map((response, index) => {
                    return <ul>{response}</ul> //If all else fails, this works
                    // <ul><Post content={response}/></ul>
                    // return <Post><li>{response}</li></Post>
                    // <Post key={index} value={response} />
                })}
                {/* {posts} */}
                
            </div>
        )
    }
}

export default Feed;
