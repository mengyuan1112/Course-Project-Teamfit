from flask import Flask
import json
import unittest

from flaskr.controller.hello import app



class FlaskTest(unittest.TestCase):

    def test_register_login(self):
        client = app.test_client(self)
        url_login = "/login"
        url_register = "/register"
        app.config['DEBUG'] = True
        app.config['TESTING'] = True

        mock_register_header = {"Content-Type": "application/json"}

        mock_register_data = {"body": {"eMail": "yuanmeng@buffalo.com",
                                       "password": "123456789",
                                       "name": "yuanmeng",
                                       "age": "21",
                                       "heightFt": "2",
                                       "heightIn": "5",
                                       "weight": "111",
                                       "gender": "M",
                                       "phoneNumber": "123456789",
                                       "message": ""}}

        mock_login_header = {"Content-Type": "application/json"}

        mock_login_data = {"body": {"uEmail": "yuanmeng@buffalo.com",
                                    "uPassword": "123456789",
                                    "message": ""}}

        response_register = client.post(url_register, data=json.dumps(mock_register_data),headers=mock_register_header)
        response_login = client.post(url_login, data=json.dumps(mock_login_data), headers=mock_login_header)
        self.assertEqual(response_register.status_code, 200)
        self.assertEqual(response_register.data, b'{\n  "state": "Register successful"\n}')
        self.assertEqual(response_login.status_code, 200)
        self.assertEqual(response_login.data, b'{\n  "state": "Successful login"\n}')


    def test_register_route(self):
        client = app.test_client(self)
        url = "/register"
        app.config['DEBUG'] = True
        app.config['TESTING'] = True

        mock_request_header = {"Content-Type": "application/json"}

        mock_request_data = {"body": {"eMail": "yuanmeng@buffalo.com",
                         "password": "123456789",
                         "name": "yuanmeng",
                         "age": "21",
                         "heightFt": "2",
                         "heightIn": "5",
                         "weight": "111",
                         "gender": "M",
                         "phoneNumber": "123456789",
                         "message": ""}}

        response = client.post(url, data=json.dumps(mock_request_data), headers=mock_request_header)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'{\n  "state": "Account already exist"\n}')

    def test_login_route(self):
        client = app.test_client(self)
        url = "/login"
        app.config['DEBUG'] = True
        app.config['TESTING'] = True

        mock_request_header = {"Content-Type": "application/json"}

        mock_request_data = {"body": {"uEmail": "yuanmeng@buffalo.com",
                                      "uPassword": "123456789",
                                      "message": ""}}

        response = client.post(url, data=json.dumps(mock_request_data), headers=mock_request_header)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'{\n  "state": "Account not exist"\n}')




if __name__ == '__main__':
    unittest.main()


