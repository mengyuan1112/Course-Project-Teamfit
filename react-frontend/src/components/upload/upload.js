import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

class Upload extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){

    }

    componentWillUnmount(){
        
    }

    render() {
        return (
        <div>{this.state.currentComponent == "compUpload"}
            <Button variant="contained" color="primary">
                Upload Button says Hello!
            </Button>
            <Button variant="contained" color="primary">
                Home Page
            </Button>
        
        </div>
        )};
}
export default Upload;
