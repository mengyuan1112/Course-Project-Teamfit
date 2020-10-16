import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

class Upload extends Component{
    constructor(props) {
        super(props);
        this.state = {
            page: "upload"
        };
    }
    componentDidMount(){

    }

    componentWillUnmount(){
        
    }

    render() {
        return (
        <div>{this.state.currentComponent == "compUpload"}
            <Button variant="contained" component="label" color="primary">
                Upload
                <input type="file" style={{display:"none"}}/>
            </Button>
            <Button variant="contained" component="label" color="primary">
                Message History
            </Button>
            <Button variant="contained" color="primary" href="/profile/nutrition">
                Nutrition History
            </Button>
        </div>
        )};}
export default Upload;
