import React, { Component } from 'react';
import Post from '../post/post.js';
import LikeButton from '../likeButton/likeButton.js';
import CommentForm from './commentForm.js';

class Comment extends Component{
    constructor(props) {
        super();
        this.state = {
            comments: [
                {content:"Nice!"},
            ]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(comment) {
        comment.preventDefault();
        // this.props.onSubmit({content: this.content.value});
        // this.content.value = this.content.value + ;
        // let comments = [];
        // this.setState({
        //     comments: this.state.comments.concat([comment])
        // });
    }
    render() {
        const comments = this.state.comments.slice(0).reverse().map((post, index) =>
            <Post key={index} value={post} />
        );
        return (
            <div className="comment">
                <CommentForm onSubmit={this.handleSubmit}/>
                <LikeButton/>
                {comments}
            </div>
        )
    }

}

export default Comment; 