import React, { Component } from 'react';
import './feed.css';
import './post.css';
import './form.css';

class Post extends Component {
    render() {
        return (
            <div className="post">
                <span className="content">{this.props.value.content}</span>
            </div>
        )
    }
}



export default Post;


