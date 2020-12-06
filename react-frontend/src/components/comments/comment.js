import React, { Component } from 'react';
import Post from '../post/post.js';
// import Axios from 'axios';
import './comment.css'

class Comment extends Component{
    constructor(props) {
        super();
        this.state = {
            comments: ["First comment"],
            comment: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) { 
        this.setState({
            comment: event.target.value,
        }); 
    }

    componentDidUpdate() {
        this.renderComments()
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            comments: this.state.comments.concat(this.state.comment)
        })
        this.renderComments()
 
        console.log(this.state.comments)
  
    }

    renderComments = () => {
        const test = {}
        test["content"] = "comment"
        return(
            <>
            <div>
                <h1 className="comment">This is a comment</h1>
            </div>
            </>
        )

        // const c = this.state.comments
        // {c.map((com,index)=> {
        //     console.log(com)
        //     return( 
        //         <>
        //     <h3>{com}</h3>
        //     <h1>Inside render comment</h1>
        //     </>
        //     )
        // })}
    }

    render() {
        const comments = this.state.comments.slice(0).reverse().map((post,index) =>
            <Post key={index} value={post} />
        );
        return (
                <>                   
                    <form onSubmit={this.handleSubmit}>
                        <label style={{ fontWeight: 'bold' }}>
                        Add a Comment: 
                        <input type="text" value={this.state.comment} onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Submit" defaultValue="Reset"/>
                    </form>  
                    {/* {this.renderComments()} */}
                    {comments}
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