from flask import Flask, request, Blueprint, jsonify
from datetime import date
import psycopg2
import json
from .logReg import _getUsername
import re

friends_page = Blueprint('friends_page', __name__, template_folder='templates')

def validate_num(num):
    if type(num) == str or type(num) == int:
        if len(num) != 10:
            return False
        for i in range(10):
            if not num[i].isalnum():
                return False
        return True
    
regex = re.compile(
        r'^(?:http|ftp)s?://' 
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' 
        r'localhost|'
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' 
        r'(?::\d+)?' 
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)


# Function handles GET equests from react. GET returns current
@friends_page.route('/friends/get_friends', methods=['GET'])
def friends_get():
    number = _getUsername()
    conn = psycopg2.connect(
        database='teamfit',
        user='root',
        port=26257,
        host='localhost',
    )
    if number == "":
        print("Error: didn't not get user's number")
        return {"state": "Error: didn't not get user's number"}, 500
    else:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM teamfit.user")
            row = cur.fetchall()
            for i in range(len(row)):
                if int(number) in row[i]:
                    friends_nums = row[i][10]
                    #Get the names of the friends and add them to the dict friends
                    friends = {}
                    for num in friends_nums:
                         sql = 'SELECT UserName FROM teamfit.user WHERE PhoneNumber = {num}'.format(num = num)
                        #  val = (number)
                         cur.execute(sql)
                         row = cur.fetchall()
                         friends[num] = row
                    print(friends)
                    data = json.dumps(friends)
                    print(data)
                    jsonData = json.loads(data)
                    friendsData = json.dumps(jsonData)
                    return friendsData

            print("Can't find User")
            return {"state": "Can't find User"},500
    return "Done!"


#Post method for image
@friends_page.route('/friends/addfriend', methods=['POST'])
def friends_post():
    number = _getUsername()
    friend_num = request.get_json()
    friend_num = friend_num['body']
    requester_exist = False
    if not validate_num(friend_num):
        return {'state': "Please provide a valid number"}, 200 
    # Save this info to user  in database
    if number != "" and friend_num != None:
        conn = psycopg2.connect(
            database='teamfit',
            user='root',
            port=26257,
            host='localhost'
        )
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM teamfit.user")
            row = cur.fetchall()
            for i in range(len(row)):
                if number == str(row[i][0]):
                    if int(friend_num) in row[i][10]:
                        cur.close()
                        conn.close()
                        return {"state": "User exists in your friends list."}, 200
                    requester_exist = True
            if not requester_exist:
                    return {'state': "Please login first"}, 200 
            for j in range(len(row)):
                if friend_num == str(row[j][0]):
                    sql = 'UPDATE teamfit.user SET Friends = array_append(Friends, %s) WHERE PhoneNumber = %s'
                    val = (friend_num, number)
                    cur.execute(sql, val)
                    conn.commit()
                    return {'state': "Friend has been added"}, 200
                else:
                    return {'state': "User with number: "+str(friend_num)+" doesn't exist!"}, 200 
    else:
        return {'state': "Please login first"}, 200 
    return {'state': "Friend added to database"}, 200

    
