import express from 'express';
import bodyParser from 'body-parser';
import { userInfo } from 'os';

/**
 * Fake Database
 */

const UserInfo = {
    'Name': '',
    'number': 0,
    'password': ''
}


/*Initialize the server*/
const app = express();

/**Parses JSON object included in post request, and include body property to the request parameter  */
app.use(bodyParser.json());

/**
 * Handling the user info 
 */

 app.post('/api/users/:number', (req,res) => {
    const userNumber = req.params.number;

    if (UserInfo.Number === 0 ){
        UserInfo.Name = userNumber;
    }

    res.status(200).send(`User with ID: ${userNumber} was successfully created`)
 })


app.listen(800, () => console.log('Listening on port 800'));