import React, { Component } from 'react';
import Post from './post.js';
import Form from './form.js';

class Feed extends Component {
    constructor(props) {
        super();
        this.state = {
            posts: [
                {content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
                {content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            ]
        }
        this.handleNewPost = this.handleNewPost.bind(this);
    }

    handleNewPost(post) {
        this.setState({
            posts: this.state.posts.push([post]) //Might need to tweak to make sure new posts get pushed to the top as most social media
        });
    }
    render() {
        const posts = this.state.posts.map((post, index) =>
            <Post key={index} value={post} />
        );
        return (
            <div className="feed">
                {posts}
                <Form onSubmit={this.handleNewPost} />
            </div>
        )
    }
}

export default Feed;