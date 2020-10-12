import unittest
from model.User import User


class MyTestCase(unittest.TestCase):
    user1_info = {"Name": "Yuan Meng",
                     "Age": 23,
                     "Gender": 'M',
                     "Weight": 180,
                     "Height": [6, 2],
                     "Email": "email@gmail.com",
                     "Phone Number": 1234567890,
                     "Spotters": {}
                  }

    user2_info = {"Name": "Joe",
                  "Age": 20,
                  "Gender": 'F',
                  "Weight": 120,
                  "Height": [5, 8],
                  "Email": "email123@gmail.com",
                  "Phone Number": 12345678901,
                  "Spotters":{}
                  }

    user3_info = {"Name": "Jane",
                  "Age": 11,
                  "Gender": 'M',
                  "Weight": 500,
                  "Height": [3, 1],
                  "Email": "emailtest@gmail.com",
                  "Phone Number": 1234567890122,
                  "Spotters": {}
                  }

    user1 = User(user1_info)
    user2 = User(user2_info)
    user3 = User(user3_info)

    def test_originInfo(self):

        # 1st user test basic info when they create account
        self.assertEqual(self.user1.get_age(), 23)
        self.assertEqual(self.user1.get_name(), "Yuan Meng")
        self.assertEqual(self.user1.get_gender(), 'M')
        self.assertEqual(self.user1.get_weight(), 180)
        self.assertEqual(self.user1.get_height(), [6, 2])
        self.assertEqual(self.user1.get_email(), "email@gmail.com")
        self.assertEqual(self.user1.get_phone_number(), 1234567890)
        self.assertEqual(self.user1.get_spotter(), {})
        self.assertEqual(self.user1.get_bmi(), 23.1)

        # 2nd user test basic info when they create account
        self.assertEqual(self.user2.get_age(), 20)
        self.assertEqual(self.user2.Name, "Joe")
        self.assertEqual(self.user2.Gender, 'F')
        self.assertEqual(self.user2.Weight, 120)
        self.assertEqual(self.user2.Height, [5, 8])
        self.assertEqual(self.user2.Email, "email123@gmail.com")
        self.assertEqual(self.user2.Phone_Number, 12345678901)

        # test when user spotter someone.
        self.user1.update_spotter(self.user2)
        self.assertEqual(self.user1.get_spotter(), {self.user2.get_email: self.user2})
        self.user1.update_spotter(self.user3)
        self.assertEqual(self.user1.get_spotter(), {self.user2.get_email: self.user2,
                                                    self.user3.get_email: self.user3
                                                    })

        # test when user update their info
        self.user1.update_age(24)
        self.assertEqual(self.user1.get_age(), 24)
        self.user1.update_email("hello@gmail.com")
        self.assertEqual(self.user1.get_email(), "hello@gmail.com")
        self.user1.update_height([7, 1])
        self.user1.update_bmi()
        self.assertEqual(self.user1.get_bmi(), 17.5)









if __name__ == '__main__':
    unittest.main()
