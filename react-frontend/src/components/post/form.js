import React, { Component } from 'react';
import Post from './post.js';
import './form.css';
import Button from '@material-ui/core/Button';

class Form extends Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            loading: false
        }
    }

    handleSubmit(event) {
        this.props.onSubmit({content: this.content.value});
        this.content.value = "";
        event.preventDefault();
        <form />
    }

    uploadIamge = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'teamfit')
        this.setState({loading: !this.state.loading})
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/zayedahm/image/upload',
            {
                method: 'POST',
                body: data
            }
        )

        console.log(res)

        const file = await res.json()

        this.setState({image: file.secure_url})
        this.setState({loading: !this.state.loading})

        /**Save the image URL in the backend */
        fetch('http://localhost:5000/profile/makePost', {
        method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(file.secure_url)
        }).then(response => response.json())
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="What's up...." type="text" ref={(input) => this.content = input} />
                    <button className="button">Share!</button>
                </form>
                    <Button >
                        Share a Photo
                        <input
                        // style={{display:"none"}}
                        type="file"
                        placeholder="Upload an image"
                        onChange={this.uploadIamge}
                        />
                    </Button>
                {this.state.loading ? (<p>Loading...</p>)
                : (
                    <b></b>
                )
            }
            </div>
        )
    }
}

export default Form;