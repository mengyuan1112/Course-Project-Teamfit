from flask import Flask, request, jsonify
# from model import User
from flask_cors import CORS

app = Flask(__name__, template_folder='public', )
CORS(app)

userName_Password = {}  # temporary storage for user and password
_userEmail = "grader@cse442.com"


@app.route("/register", methods=['POST'])
def creat_register():
    data = request.get_json()
    # user = User.User(data)
    user_info = data['body']
    user_email = user_info['eMail']
    use_password = user_info['password']
    if user_email in userName_Password:
        return jsonify({'state': "Account already exist"}), 400
    else:
        userName_Password[user_email] = use_password
        return jsonify(
            {'state': "Register successful"}), 200  # or use render to shows the login page  # shows register page


@app.route("/login", methods=['POST'])
def login():
    global _userEmail
    data = request.get_json()
    user_info = data['body']
    user_email = user_info['uEmail']
    use_password = user_info['uPassword']
    if user_email in userName_Password:
        if use_password == userName_Password[user_email]:
            _userEmail = user_email
            return jsonify({'state': "Successful login"}), 200  # success login and go to home page
        else:
            return jsonify({'state': "Password wrong"}), 400
    else:
        return jsonify({'state': "Account not exist"}), 400  # fail login and will stay this page


if __name__ == '__main__':
    app.run(debug=True)
