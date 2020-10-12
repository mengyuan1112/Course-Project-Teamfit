class User:
    # user_info -- Dictionary{
    #                      "Name": String,
    #                      "Age": Int,
    #                      "Gender": Char,
    #                      "Weight": Int,   ## unit "lb"   Format "xxx"
    #                      "Height": List[Int,Int]   ## unit "inch" Format "feet, inch"
    #                      "Email": String,
    #                      "Phone Number", Int
    #                      "Spotters": Dictionary{Key: Email, value: User Object}
    #                      }

    def __init__(self, user_info):
        self.Name = user_info["name"]
        self.Age = user_info["age"]
        self.Gender = user_info["gender"]
        self.Weight = user_info["weight"]
        self.Height = [int(user_info["heightIn"]), int(user_info["heightFt"])]
        self.Email = user_info["eMail"]
        self.Phone_Number = user_info["phoneNumber"]
        #self.Spotters = user_info["Spotters"]
        self.BMI = round(703 * (int(self.get_weight()) / ((self.get_height()[0]*12)+self.get_height()[1])**2), 1)

    def update_name(self, name):
        self.Name = name

    def update_age(self, age):
        self.Age = age

    def update_gender(self, gender):
        self.Gender = gender

    def update_weight(self, weight):
        self.Weight = weight

    def update_height(self, height):
        self.Height[0] = height[0]
        self.Height[1] = height[1]

    def update_email(self, email):
        self.Email = email

    def update_phone_number(self, phone_number):
        self.Phone_Number = phone_number

    def update_spotter(self, user):
        self.Spotters[user.get_email] = user

    def update_bmi(self):
        weight = self.get_weight()
        feet = self.get_height()[0]
        inch = self.get_height()[1]
        self.BMI = round(703 * (int(weight) / ((feet*12)+inch)**2), 1)

    def get_age(self):
        return self.Age

    def get_name(self):
        return self.Name

    def get_gender(self):
        return self.Gender

    def get_weight(self):
        return int(self.Weight)

    def get_height(self):
        return self.Height

    def get_email(self):
        return self.Email

    def get_phone_number(self):
        return self.Phone_Number

    def get_spotter(self):
        return self.Spotters

    def get_bmi(self):
        return self.BMI
