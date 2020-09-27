import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM, { render } from "react-dom";
// import './components/post/post.js';
import Feed from './components/post/feed.js';
// import Post from './components/post/post.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Feed/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));



export default App;
