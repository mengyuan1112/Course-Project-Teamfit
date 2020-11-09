from flask import Flask, request, Blueprint
from datetime import date
import psycopg2
import json
from .logReg import _getUsername

profile_page = Blueprint('profile_page', __name__, template_folder='templates')

# Function handles GET equests from react. GET returns current
@profile_page.route('/profile/getinfo', methods=['GET'])
def profile_get():
    number = _getUsername()
    conn = psycopg2.connect(
        database='teamfit',
        user='root',
        port=26257,
        host='localhost',
    )
    if number == "":
        print("Error: didn't not get user's number")
        return "Error: didn't not get user's number"
    else:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM teamfit.user")
            row = cur.fetchall()
            for i in range(len(row)):
                print("Number %i is equal to %i", number, row[i])
                if int(number) in row[i]:
                    userInfo = row[i]
                    print(userInfo)
                    data = json.dumps(userInfo)
                    jsonData = json.loads(data)
                    finishedData = json.dumps(jsonData)
                    return finishedData
                else:
                    print(number + " doesn't match")
    return "get profile finished"

#Post method for image
@profile_page.route('/profile/postimage', methods=['POST'])
def profile_post():
    number = _getUsername()
    image_name = request.get_json()
    # Save this info to user  in database
    if number != "":
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
                    sql = 'UPDATE teamfit.user set Image = %s WHERE PhoneNumber =%s'
                    val = (image_name, number)
                    cur.execute(sql, val)
                    conn.commit()
                    return "Info has been processed"
    else:
        print("No number provided")
    return "image added to database with new info"

# Makes a new post and appends it to the "top" of the list.

@profile_page.route("/profile/makePost", methods=["POST"])
def make_post():            
        new_post = request.get_json()
        new_post = new_post['content'] + '|'
        my_string = new_post
        # number = _getUsername()
        # print('NUMBER:', number)
        number = 3474930254 # change to _getUsername when DB works
        # print('Length of number is:')
        # print(len(number))
        # print(type(number))
        # print(number)
        conn = psycopg2.connect(
            database='teamfit',
            user='root',
            port=26257,
            host='localhost',
            sslmode='disable'
        )
        with conn.cursor() as cur:
            # sql_query1 = 'SELECT * FROM teamfit.user' 
            # cur.execute(sql_query1)
            cur.execute('SELECT * FROM teamfit.user')
            row = cur.fetchall()
            print(row)
            # for i in range(len(row)):
            #     if number in row[i]:
            #         post = json.dumps(row[i])
            #         post_data = json.loads(post)
            #         data = json.dumps(post_data)
            #         data.append(new_post)
                    # sql_query = 'INSERT INTO teamfit.user (Posts) VALUES (%s)', (made_post) 
                    # sql_query = 'UPDATE teamfit.user SET Posts = array_append(Posts, data) WHERE teamfit.user[1] = number'
            
                    # query_val = (data, number)
                    # cur.execute(sql_query)
                    # conn.commit()
            # print(type(row[0][0]))
            # print(row[0][0])
            # print(row[0])
            # print(type(row))
            if number == row[0][0]:  
                # sql_query = 'INSERT INTO user Posts VALUES (%s)', (my_string)
                # cur.execute(sql_query)
                old_string = row[0][11]
                print('OLD STRING:',old_string)
                my_string += old_string
                # cur.execute('INSERT INTO user Posts VALUES (%s)', (my_string))
                cur.execute("UPDATE teamfit.user SET Posts = (%s) WHERE PhoneNumber = 3474930254 ", (my_string,))
                conn.commit()
            
        return "New Post Has Been Added"



@profile_page.route("/profile/getPost", methods=["GET"])
def display_posts():
        # number = _getUsername()
        number = 3474930254
        conn = psycopg2.connect(
                database='teamfit',
                user='root',
                port=26257,
                host='localhost',
                sslmode='disable'
            )
        with conn.cursor() as cur:
                cur.execute("SELECT * FROM teamfit.user")
                row = cur.fetchall()
                # for i in col:
                    # if i[0] == number:
                        # return json.dumps(i[11])
                # if number == row[0][0]:
                #     all_posts = row[0][11]
                #     split_posts = all_posts.split("|")
                #     split_json = []
                #     for i in range(len(row)):
                #         split_json[i] = json.loads(split_posts[i])
                if number == row[0][0]:
                    all_posts = row[0][11]
                    split_posts = all_posts.split("|")
                    print(split_posts)
            # split_json = []
            # for i in range(len(row)):
            #     split_json[i] = json.loads(split_posts[i])
                    return jsonify({'state': split_posts})
                    # return split_json
        return "Returning my posts" 





                # for i in range(len(col)):
                #     if number in col[i]:
                #         post = json.dumps(col[i])
                #         post_data = json.loads(post)
                #         return json.dumps(post_data)