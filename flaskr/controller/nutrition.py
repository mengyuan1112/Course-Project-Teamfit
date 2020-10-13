from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from datetime import date

app = Flask(__name__, template_folder='template', )

CORS(app)


@app.route('/profile/nutrition/submit', methods=['POST'])
def nutritionSubmit():
    if request.method == 'POST':
        nutritionInfo = request.get_json()
        protein = nutritionInfo['protein']
        carbs = nutritionInfo['carbs']
        fat = nutritionInfo['fat']
        weight = nutritionInfo['weight']
        today = date.today()
        dateformat = today.strftime("%m/%d/%y")
        calories = ((9 * int(fat)) + (4 * int(protein)) + (4 * int(carbs)))
        # Save this info to user  in database
    return "Page for handling nutrition"


if __name__ == '__main__':
    app.run(debug=True)
