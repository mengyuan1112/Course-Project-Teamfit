import React, { Component } from 'react';
import Post from '../post/post.js';
import Axios from 'axios';

class Comment extends Component{
    constructor(props) {
        super();
        this.state = {
            comments: [],
            comment: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) { 
        event.preventDefault();
        this.setState({
            comment: event.target.value,
            comments: this.state.comments.concat(this.state.comments)
        }); 
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state.comments)
        

    }

    render() {
        const com = this.state.comments.slice(0).reverse().map((post, index) =>
        <Post key={index} value={post} />
        );

        return (
                <>
                    <form onSubmit={this.handleSubmit}>
                    <label style={{ fontWeight: 'bold' }}>
                    Add a Comment: 
                    <input type="text" value={this.state.comment} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                    </form>  
                </>
        )
    }

}

export default Comment; 

        //   axiosConfig.post('http://127.0.0.1:5000/friends/addfriend',{
        //    body : this.state.friendNum,
        //    headers:{"Content-Type":"application/json",},
        //    cache: "no-cache",
        //    })
        //    .then(response => {
        //        let res = response.data
        //        console.log(res)
        //        this.setState({message: res['state']})
        //        alert(this.state.message)
        //        console.log(this.state.message)
        //        console.log(this.state.friends)
        //    });