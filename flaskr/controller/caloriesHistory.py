from flask import request, jsonify, Blueprint

caloriesHistory_page = Blueprint('caloriesHistory.py', __name__, template_folder='templates')

calories_dict = {}


@caloriesHistory_page.route("/home/storeCalories", methods=['POST'])
def store_calories():
    data = request.get_json()
    print(data)
    body = data['body']
    date = body['key']
    if date in calories_dict.keys():
        return jsonify({'state': 'the date already exist please do update'})
    calories = body['value']
    calories_dict[date] = calories
    print(calories_dict)
    return jsonify({'state': 'successful stored'})


@caloriesHistory_page.route("/home/getAllCalories", methods=['GET'])
def get_all_calories():
    calories_list = []
    for key in calories_dict:
        date_calories = str(key) + ": " + str(calories_dict[key])
        calories_list.append(date_calories)
    return jsonify({'state': calories_list})


@caloriesHistory_page.route("/home/getCalories", methods=['POST'])
def get_date_calories():
    data = request.get_json()
    date = data['body']
    if date in calories_dict:
        print(calories_dict)
        return jsonify({'state': calories_dict[date]})
    else:
        return jsonify({'state': 'please store data first'})

@caloriesHistory_page.route("/home/updateCalories", methods=['POST'])
def update_calories():
    data = request.get_json()
    body = data['body']
    print(body)
    date = body['key']
    calories = body['value']
    if date in calories_dict:
        calories_dict[date] = int(calories_dict[date]) + int(calories)
        print(calories_dict)
        return jsonify({'state': 'successful updated'})
    else:
        return jsonify({'state': 'please store data first'})