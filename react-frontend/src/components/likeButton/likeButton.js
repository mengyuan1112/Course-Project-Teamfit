import React, { Component } from 'react';
import axiosConfig from 'axios';


class LikeButton extends Component {
    constructor(props){
        super();
        this.state = {
            count: 0,
            liked: false,
            post: props.post,
            message: ''
        }
        // this.onClick = this.onClick.bind(this);
    }

    likeSomething = (e) => {
        e.preventDefault();
        let incrementCount = this.state.count + 1;
            this.setState({
                liked: !this.state.liked
            });
        if(this.state.count===1){
            this.state.count=0
        }else{
            this.state.count=1
        }
    }
    //     console.log(this.state.post)

    //     axiosConfig.post('http://127.0.0.1:5000/profile/likePost', {
    //         method: 'POST',
    //         body: this.state.post,
    //         headers: {'Content-Type': 'application/json'}
    //     }).then(response => {
    //         let res = response.data
    //         this.setState({message: res['state']})
    //         alert(this.state.message)
    //     });

    // };
    
    // Implement backend interaction on this file
    // Make a POST request to backend to increment the count and update the liked column of the DB table to have.
    // a tuple (userPhoneNumber, post id)  
    
    
    // likeAPost(post){
    //     fetch('http://127.0.0.1:5000/profile/likePost', {
    //         method: 'POST',
    //         body: JSON.stringify(post),
    //         headers: {'Content-Type': 'application/json'}
    //     }).then(function(res) {
    //         return res;
    //     }).then(function(data) {
    //         console.log('server respone:', data)
    //     });
    // }
    
    // onClick(e) {
    //     this.likeSomething();
    //     this.likeAPost();
    // }

    render() {
    return (
        
        <button onClick={this.likeSomething} id={this.props.itemId}>Likes {this.state.count}</button>
        
        )
    }
}
export default LikeButton;