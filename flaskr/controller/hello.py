from flask import Flask, request, redirect, jsonify
from model import User

app = Flask(__name__, template_folder='template',)
app.secret_key = 'super secret'

userName_Password = {}  #temporary storage for user and password


# @app.route("/register", methods=['GET'])
# def register():
#     return redirect("http://localhost:3000/login")


@app.route("/register", methods=['POST'])
def creat_register():
    data = request.get_json()
    #user = User.User(data)
    user_info = data['body']
    userName_Password[user_info['eMail']] = user_info['password']
    print(userName_Password)
    return jsonify(data)


@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    if data['uEmail'] in userName_Password and data['uEmail'] == userName_Password['eMail']:
        return "render_template()", 200  # success login
    else:
        return "render_template()", 400  # fail login
            # reload login page


# @app.route("/login", methods=['GET'])
# def to_login():
#     return


if __name__ == '__main__':
    app.run(port=3000,debug=True)