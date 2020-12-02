import React, { Component } from 'react';

class CommentForm extends Component{
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        this.props.onSubmit({content: this.content.value});
        this.content.value = "";
        event.preventDefault();
    }
    render() {
        return (
            <div className="form">
                
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Your thoughts...." type="text" ref={(input) => this.content = input} />
                    <button className="button">Comment!</button>
                </form>
            </div>
        )
    }
}

export default CommentForm;