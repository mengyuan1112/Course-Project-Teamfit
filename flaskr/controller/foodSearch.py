from flask import Flask, request, jsonify, Blueprint
import urllib.request, json
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

    if 'message' in food_dict:
        return jsonify({"state": "Not enough data for an informed guess."})
    food_info = Food(food_dict)
    list = [food_info.food_calories, food_info.food_calories_range,food_info.food_protein, food_info.food_protein_range,food_info.food_fat,food_info.food_fat_range,food_info.food_carbs, food_info.food_carbs_range]

    return jsonify({"state": list,
                    "cal":food_dict['calories']['value']})  # need test on it


@foodSearch_page.route("/home/foodID", methods=['POST'])
def get_id():
    data = request.get_json()
    food_name = data['body']
    response = api.autocomplete_recipe_search(food_name, 7)
    food_list = response.json()  # return a list of food with dictionary: [{},{}]
    list = []
    if(len(food_list) == 0):
        return jsonify({"state": ["No Such Food"]})
    for i in food_list:
        food_id = i['id']
        food_title = i['title']
        food_info = food_title + ": " + str(food_id)
        list.append(food_info)
    return jsonify({"state": list})


@foodSearch_page.route("/home/foodRecipe", methods=['POST'])
def get_recipe():
    data = request.get_json()
    food_name = data['body']
    url = "https://api.edamam.com/search?q="+food_name+"&app_id=5815ec9f&app_key=%20fc403cb99b986d6809e251c1de1e6ec1"
    response = urllib.request.urlopen(url)
    content = response.read().decode()
    data = json.loads(content)
    if(len(data['hits']) == 0): return jsonify({"state": "Invaild Food Name"})
    hits = data['hits'][0]
    recipe = hits['recipe']

    ingredientLines = recipe['ingredientLines']
    ingredientLines.insert(0, recipe['label'])


    # response = api.get_recipe_information(food_id, False)
    # recipe_dict = response.json()
    # extended_ingredients = recipe_dict["extendedIngredients"]
    # list = []
    # for i in extended_ingredients:
    #     name = i['name']
    #     original = i['original']
    #     ingredient_info = name + " - " + original
    #     list.append(ingredient_info)
    return jsonify({"state": ingredientLines})

