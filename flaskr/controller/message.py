from flask import Flask, jsonify, request, render_template
from model import User, Message

app = Flask(__name__, template_folder='template', )

#every email is the key to a list of messages that will contain the user its going too 
messages = {}  

@app.route("/", methods=['POST'])
def hellowWorld():
    return jsonify({'ok': True, 'message': 'Message created successfully!'}), 200
        
@app.route("/createMessage", methods=['POST'])
def createMessage():
    data = request.get_json()
    email = data.get('email', None)
    message = data.get('message', None)
    if email is None or message is None:
        return jsonify({'ok': False, 'message': 'Bad request parameters! Make sure to include email and message keys in your body'}), 400
    else:
        createMessage(data)         
        return jsonify({'ok': True, 'message': 'Message created successfully!'}), 200
    
@app.route("/listMessages", methods=['GET'])
def listMessages():
    if request.view_args('messageId', None) is None:
        return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400
    resp = jsonify(messages[request.view_args('messageId', None)])
    resp.status_code = 200
    print(resp)
    return resp

@app.route("/deleteMessage", methods=['DELETE'])
def deleteMessage():
    data = request.get_json()
    id = data.get('messageId', None)
    if id is None:
        return jsonify({'ok': False, 'message': 'No Message ID passed to the server!'}), 400
    else:
        arrmessages = messages[id]
        
def createMessage(data):
    message = Message(data)
    if message.sourceId in messages:
        messages[message.sourceId].append(message)
    else:
        messages[message.sourceId] = [message]
    if message.destId in messages:
        messages[message.destId].append(message)
    else:
        messages[message.destId] = [message]    
    

if __name__ == '__main__':
    app.run(port=3000, debug=True)