import React, { Component } from 'react';
import Post from './post.js';
import Form from './form.js';
import LikeButton from '../likeButton/likeButton.js';
import './feed.css';
import '../likeButton/likeButton.css';
import Comment from '../comments/comment.js';
import axiosConfig from 'axios';

// import { v4 as uuidv4 } from 'uuid';

const pattern = new RegExp('^(https?:\\/\\/)?'+
'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
'((\\d{1,3}\\.){3}\\d{1,3}))'+ 
'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
'(\\?[;&a-z\\d%_.~+=-]*)?'+ 
'(\\#[-a-z\\d_]*)?$','i'); 

class Feed extends Component {
    constructor(props) {
        super();
        this.state = {
            posts: [
                {content: ""}
            ],
            // comments:
            oldPosts: {},
            message: '',
            loading: false,
            post: ''

        }
        this.handleNewPost = this.handleNewPost.bind(this);
        // this.likeAPost = this.likeAPost.bind(this);
    }

    componentWillMount() {
        fetch('http://127.0.0.1:5000/profile/getPost', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res =>res.json())
            .then(data =>
                this.setState({oldPosts: data['state']},()=>console.log(this.state.oldPosts))

            )
    }


    handleNewPost(post) {
        axiosConfig.post('http://127.0.0.1:5000/profile/makePost', {
            method: 'POST',
            body: post,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            let res = response.data
            this.setState({message: res['state']})
            alert(this.state.message)
        });

        const posts = this.state.posts.concat([post]);

        this.setState({posts});
    }



    renderIt(p,key,index) {
        const posts = p[key]
        for(var i=0; i < posts.length;i++){

            }
    }




    render() {
        // const posts = this.state.posts.slice(0).reverse().map((post, index) =>
        //     <Post key={index} value={post} />
        //     // Can try to 
        // );

      
        const p = this.state.oldPosts
        return (
            <>
            <Form onSubmit={this.handleNewPost} />

            {Object.keys(p).map((key, i) => ( 
                p[key].slice(0).reverse().map((post, index)=> {
                    if(!!pattern.test(post)){
                        return(
                            <div className="feed">
                                <div className="entries" >
                                        <h4>{key}</h4>
                                    <img src={post} width="190" height="190" alt="postImage" />
                                    <LikeButton post={post}/>
                                    <div className="comments">
                                    <Comment/>
                                    </div>
                                    <div>

                                        
                                    </div>
                                </div>
                            </div>
                        )}else{
                            return (
                                // Complete working with the button in the div below
                                <div className="feed">
                                    <div className="entries" >
                                        <h4>{key}</h4>
                                        <span ><p className="post">{post}</p></span> 
                                        <LikeButton post={post}/>
                                        <div className="comments">
                                        <Comment/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                })            
            ))}
            </>
        )
    }
}


export default Feed;

    // likeAPost(post){
    //     // this.state.oldPosts.reverse().map((index =>
            
    //         )
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