import unittest
from User import User


class MyTestCase(unittest.TestCase):
    user1_info = {"Name": "Yuan Meng",
                     "Age": 23,
                     "Gender": 'M',
                     "Weight": 180,
                     "Height": 180,
                     "BMI": 21,
                     "Email": "email@gmail.com",
                     "Phone Number": 1234567890,
                     "Spotters": "hi"}

    user2_info = {"Name": "Joe",
                  "Age": 20,
                  "Gender": 'F',
                  "Weight": 120,
                  "Height": 110,
                  "BMI": 27,
                  "Email": "email123@gmail.com",
                  "Phone Number": 12345678901,
                  "Spotters": "hello"}

    user1 = User(user1_info)
    user2 = User(user2_info)

    def test_originInfo(self):
        self.assertEqual(self.user1.get_age(), 23)

        self.assertEqual(self.user1.Name, "Yuan Meng")
        self.assertEqual(self.user1.Gender, 'M')
        self.assertEqual(self.user1.Weight, 180)
        self.assertEqual(self.user1.Height, 180)
        self.assertEqual(self.user1.BMI, 21)
        self.assertEqual(self.user1.Email, "email@gmail.com")
        self.assertEqual(self.user1.Phone_Number, 1234567890)

        self.assertEqual(self.user2.get_age(), 20)
        self.assertEqual(self.user2.Name, "Joe")
        self.assertEqual(self.user2.Gender, 'F')
        self.assertEqual(self.user2.Weight, 120)
        self.assertEqual(self.user2.Height, 110)
        self.assertEqual(self.user2.BMI, 27)
        self.assertEqual(self.user2.Email, "email123@gmail.com")
        self.assertEqual(self.user2.Phone_Number, 12345678901)


        
    # def test_info_Update(self):
    #     self.user1.update_age(24)


if __name__ == '__main__':
    unittest.main()
