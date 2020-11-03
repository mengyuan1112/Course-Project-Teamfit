class Food:
    def __init__(self, food_dict):
        self.food_recipes_num = food_dict['recipesUsed']

        self.food_calories_dict = food_dict['calories']
        self.food_calories = self.food_calories_dict['value']
        self.food_calories_range = [self.food_calories_dict['confidenceRange95Percent']['min'], self.food_calories_dict['confidenceRange95Percent']['max']]

        self.food_fat_dict = food_dict['fat']
        self.food_fat = self.food_fat_dict['value']
        self.food_fat_range = [self.food_fat_dict['confidenceRange95Percent']['min'], self.food_fat_dict['confidenceRange95Percent']['max']] # dict max -min

        self.food_protein_dict = food_dict['protein']
        self.food_protein = self.food_protein_dict['value']
        self.food_protein_range = [self.food_protein_dict['confidenceRange95Percent']['min'], self.food_protein_dict['confidenceRange95Percent']['max']] # dict max -min

        self.food_carbs_dict = food_dict['carbs']
        self.food_carbs = self.food_carbs_dict['value']
        self.food_carbs_range = [self.food_carbs_dict['confidenceRange95Percent']['min'], self.food_carbs_dict['confidenceRange95Percent']['max']] # dict max -min