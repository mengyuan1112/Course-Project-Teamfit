import React, { Component } from 'react';
import Post from './post.js';
import Form from './form.js';
import LikeButton from '../likeButton/likeButton.js';
import './feed.css';
import './post.css';
import './form.css';
import '../likeButton/likeButton.css';
import Comment from '../comments/comment.js';
// import { v4 as uuidv4 } from 'uuid';

class Feed extends Component {
    constructor(props) {
        super();
        this.state = {
            posts: [
                {content: ""},
            ],
            oldPosts: [],
            loading: false

        }
        this.handleNewPost = this.handleNewPost.bind(this);
        // this.likeAPost = this.likeAPost.bind(this);
    }
    componentWillMount() {
        // this.fetchMyPosts();
        fetch('http://127.0.0.1:5000/profile/getPost', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res =>res.json())
            .then(data =>
                this.setState({oldPosts: data['state']},()=>console.log(this.state.oldPosts))

            )
    }
    componentDidMount() {
        // this.likeAPost();
    }

    fetchMyPosts() {
        fetch('http://127.0.0.1:5000/profile/getPost', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then((res) =>{
            let response = res.data;
            this.setState({posts: response});
            console.log(this.state.posts);
        })
    }
    handleNewPost(post) {
        fetch('http://127.0.0.1:5000/profile/makePost', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {'Content-Type': 'application/json'}
        }).then(function(res) {
            return res;
        }).then(function(data) {
            console.log('server respone:', data)
        });

        const posts = this.state.posts.concat([post]);

        this.setState({posts});
    }

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



    render() {
        const posts = this.state.posts.slice(0).reverse().map((post, index) =>
            <Post key={index} value={post} />
            // Can try to 
        );
        const pattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
        '(\\#[-a-z\\d_]*)?$','i'); 
        return (
            <div className="feed">
    
                <Form onSubmit={this.handleNewPost} />
                
                {this.state.oldPosts.reverse().map((response,index)=> {
                    console.log(response)
                    console.log('In feed')
                    if(!!pattern.test(response)){
                        console.log('Found an image')
                        return (
                            <div className="entries" itemId={index}>
                            <img src={response} width="190" height="190" alt="postImage" itemId={index}/>
                            <LikeButton itemId={index} /*onClick={this.likeAPost}*//>
                            <div className="comments">
                            <LikeButton/>
                            <Comment/>
                            </div>

                            </div>
                        )
                    }else{
                        return (
                            // Complete working with the button in the div below
                            <div className="entries" itemId={index}>
                            <span itemId={index}><p className="post">{response}</p></span> 
                            <LikeButton itemId={index} /*onClick={this.likeAPost}*//>
                            <div className="comments">
                            {/* <LikeButton/> */}
                            <Comment/>
                            </div>
                            </div>
                        )
                    }
                    // <button className="like">LIKE!</button>
                    //If all else fails, this works
                    // <ul><Post content={response}/></ul>
                    // return <Post><li>{response}</li></Post>
                    // <Post key={index} value={response} />
                })}
                {/* {posts} */}
                
            </div>
        )
    }
}

export default Feed;
