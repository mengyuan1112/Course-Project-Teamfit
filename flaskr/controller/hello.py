from flask import Flask, request, render_template
from model import User

app = Flask(__name__, template_folder='template', )

userName_Password = {}  #temporary storage for user and password

@app.route("/register", methods=['POST','GET'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        user = User.User(data)
        userName_Password[data['eMail']] = data['password']
        print(data)
        return "haha, succeful"#render_template()  # success register
        # reload register page
    else:
        return "aishd"


@app.route("/login", methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        if data['uEmail'] in userName_Password and data['uEmail'] == userName_Password['eMail']:
            return render_template()  # success login
        else:
                return render_template()  # fail login
    if request.method == 'GET':
        return render_template()  # reload login page



if __name__ == '__main__':
    app.run(port=3001, debug=True)