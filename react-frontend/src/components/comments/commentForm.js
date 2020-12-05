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
        <comment content={this.content}/>
    }
    render() {
        return (
            <div className="form">
                
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="What's up...." type="text" ref={(input) => this.content = input} />
                    <button className="button">Share!</button>
                </form>
            </div>
        )
    }
}

export default CommentForm;