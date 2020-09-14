class User:
    # user_info -- Dictionary{
    #                      "Name": String,
    #                      "Age": Int,
    #                      "Gender": Char,
    #                      "Weight": Int,
    #                      "Height": Int,
    #                      "BMI": Int,
    #                      "Email": String,
    #                      "Phone Number", Int
    #                      "Spotters": Dictionary{Key: Email, value: User Object}
    #                      }

    def __init__(self, user_info):
        self.Name = user_info["Name"]
        self.Age = user_info["Age"]
        self.Gender = user_info["Gender"]
        self.Weight = user_info["Weight"]
        self.Height = user_info["Height"]
        self.BMI = user_info["BMI"]
        self.Email = user_info["Email"]
        self.Phone_Number = user_info["Phone Number"]
        self.Spotters = user_info["Spotters"]

    def update_name(self, name):
        self.Name = name

    def update_age(self, age):
        self.Age = age

    def update_gender(self, gender):
        self.Gender = gender

    def update_weight(self, weight):
        self.Weight = weight

    def update_height(self, height):
        self.Height = height

    def update_email(self, email):
        self.Email = email

    def update_phone_number(self, phone_number):
        self.Phone_Number = phone_number

    def get_age(self):
        return self.Age

    def get_name(self):
        return self.Name

    def get_gender(self):
        return self.Gender

    def get_weight(self):
        return self.Weight

    def get_height(self):
        return self.Height

    def get_email(self):
        return self.Email

    def get_phone_number(self):
        return self.Phone_Number


