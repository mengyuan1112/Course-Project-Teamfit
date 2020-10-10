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
                {content: "Welcome to your feed!"},
            ]
        }
        this.handleNewPost = this.handleNewPost.bind(this);
    }

    handleNewPost(post) {
        this.setState({
            posts: this.state.posts.concat([post]) //Might need to tweak to make sure new posts get pushed to the top as most social media
        });
    }
    render() {
        const posts = this.state.posts.slice(0).reverse().map((post, index) =>
            <Post key={index} value={post} />
        );
        return (
            <div className="feed">
                <Form onSubmit={this.handleNewPost} />
                {posts}
            </div>
        )
    }
}

export default Feed;