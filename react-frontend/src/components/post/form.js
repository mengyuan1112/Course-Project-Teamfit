import React, { Component } from 'react';
import './feed.css';
import './post.css';
import './form.css';

class Form extends Component {
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
                    <input type="text" ref={(input) => this.content = input} />
                    <button className="button">Share!</button>
                </form>
            </div>
        )
    }
}

export default Form;