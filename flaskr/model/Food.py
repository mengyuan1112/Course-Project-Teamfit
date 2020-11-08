class Food:
    def __init__(self, food_dict):
        # food_dict = {'recipesUsed': 25,
        # 'calories': {'value': 441.0, 'unit': 'calories', 'confidenceRange95Percent': {'min': 391.07, 'max': 580.84}, 'standardDeviation': 242.06},
        # 'fat': {'value': 21.0, 'unit': 'g', 'confidenceRange95Percent': {'min': 17.29, 'max': 29.94}, 'standardDeviation': 16.13},
        # 'protein': {'value': 13.0, 'unit': 'g', 'confidenceRange95Percent': {'min': 15.83, 'max': 26.71}, 'standardDeviation': 13.88},
        # 'carbs': {'value': 48.0, 'unit': 'g', 'confidenceRange95Percent': {'min': 38.51, 'max': 55.49}, 'standardDeviation': 21.65}}

        # dict = ["calories: ", food_info.food_calories,
        #         "calories range: ", food_info.food_calories_range,
        #         "protein: ", food_info.food_protein,
        #         "protein range: ", food_info.food_protein_range,
        #         "fat: ", food_info.food_fat,
        #         "fat range: ", food_info.food_fat_range,
        #         "carbs :", food_info.food_carbs,
        #         "carbs range: ", food_info.food_carbs_range
        #         ]
        self.food_recipes_num = food_dict['recipesUsed']

        self.food_calories_dict = food_dict['calories']
        self.food_calories = "calories: " + str(self.food_calories_dict['value'])
        self.food_calories_range ="calories range: " + str(self.food_calories_dict['confidenceRange95Percent']['min']) + " to " + str(self.food_calories_dict['confidenceRange95Percent']['max'])

        self.food_fat_dict = food_dict['fat']
        self.food_fat = "fat: " + str(self.food_fat_dict['value'])
        self.food_fat_range =  "fat range: " + str(self.food_fat_dict['confidenceRange95Percent']['min'])+ " to " +  str(self.food_fat_dict['confidenceRange95Percent']['max']) # dict max -min

        self.food_protein_dict = food_dict['protein']
        self.food_protein = "protein: " + str(self.food_protein_dict['value'])
        self.food_protein_range = "protein range: " +str(self.food_protein_dict['confidenceRange95Percent']['min'])+ " to " +  str(self.food_protein_dict['confidenceRange95Percent']['max']) # dict max -min

        self.food_carbs_dict = food_dict['carbs']
        self.food_carbs = "carbs :" + str(self.food_carbs_dict['value'])
        self.food_carbs_range = "carbs range: " + str(self.food_carbs_dict['confidenceRange95Percent']['min'])+ " to " +  str(self.food_carbs_dict['confidenceRange95Percent']['max']) # dict max -min