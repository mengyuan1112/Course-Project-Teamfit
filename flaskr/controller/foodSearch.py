from flask import Flask, request, jsonify, Blueprint
import urllib.request
import ssl
import spoonacular as sp
from flaskr.model.Food import Food
#import model.Food as Food
api = sp.API("1d3e932738da4cbf928deb8be3c96629")


ssl._create_default_https_context = ssl._create_unverified_context


foodSearch_page = Blueprint('foodSearch_page', __name__, template_folder='templates')




@foodSearch_page.route("/home/food", methods=['POST'])
def foodInfo():
    data = request.get_json()
    food_name = data['body']
    response = api.guess_nutrition_by_dish_name(food_name)
    food_dict = response.json()
    #food_dict = {'status': 'error', 'message': 'Not enough data for an informed guess.'}
    if 'message' in food_dict:
        return jsonify({"state": "Not enough data for an informed guess."})
    # food_dict = {'recipesUsed': 25, 'calories': {'value': 441.0, 'unit': 'calories', 'confidenceRange95Percent': {'min': 391.07, 'max': 580.84}, 'standardDeviation': 242.06}, 'fat': {'value': 21.0, 'unit': 'g', 'confidenceRange95Percent': {'min': 17.29, 'max': 29.94}, 'standardDeviation': 16.13}, 'protein': {'value': 13.0, 'unit': 'g', 'confidenceRange95Percent': {'min': 15.83, 'max': 26.71}, 'standardDeviation': 13.88}, 'carbs': {'value': 48.0, 'unit': 'g', 'confidenceRange95Percent': {'min': 38.51, 'max': 55.49}, 'standardDeviation': 21.65}}
    # food_info = Food(food_dict)
    food_info = Food(food_dict)
    dict = ["calories: ", food_info.food_calories,
            "calories range: ", food_info.food_calories_range,
            "protein: ", food_info.food_protein,
            "protein range: ", food_info.food_protein_range,
            "fat: ", food_info.food_fat,
            "fat range: ", food_info.food_fat_range,
            "carbs :", food_info.food_carbs,
            "carbs range: ", food_info.food_carbs_range
            ]
    #print(dict)
    return jsonify({"state": dict})  # need test on it
