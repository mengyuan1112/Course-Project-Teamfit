from flask import Flask, request, Blueprint, jsonify
from datetime import date
import psycopg2
import json
from .logReg import _getUsername
import re

profile_page = Blueprint('profile_page', __name__, template_folder='templates')

regex = re.compile(
        r'^(?:http|ftp)s?://' 
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' 
        r'localhost|'
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' 
        r'(?::\d+)?' 
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)


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
                if int(number) in row[i]:
                    userInfo = row[i]
                    print(userInfo)
                    data = json.dumps(userInfo)
                    jsonData = json.loads(data)
                    finishedData = json.dumps(jsonData)
                    return finishedData

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
    new_post = new_post['body']

    valid=False
    if isinstance(new_post,str):
        valid=re.match(regex, new_post)
    if not valid:
        new_post = new_post['content']
        if new_post == "" or len(new_post) == 0 or new_post == None:
            return {"state": "Empty post"}, 200
    number = _getUsername()
    conn = psycopg2.connect(
        database='teamfit',
        user='root',
        port=26257,
        host='localhost',
        sslmode='disable'
    )
    with conn.cursor() as cur:
        cur.execute('SELECT * FROM teamfit.user')
        rows = cur.fetchall()
        for i in range(len(rows)):
            if number == str(rows[i][0]):
                sql_query = 'UPDATE teamfit.user SET posts = array_append(posts, %s) WHERE PhoneNumber = %s'
                query_val = (new_post, number)
                cur.execute(sql_query, query_val)
                conn.commit()
                return {"state": "New Post Has Been Added"},200

    return "New Post Has Been Added"



@profile_page.route("/profile/getPost", methods=["GET"])
def display_posts():
    number = _getUsername()
    conn = psycopg2.connect(
        database='teamfit',
        user='root',
        port=26257,
        host='localhost',
        sslmode='disable'
    )
    # {"zayed": ["post","post"], "second user": ["post"]...}
    # {"zayed": [["{post:[comments]}","post"],[0,1]], "second user": ["post"]...}
    
    all_posts = {}
    posts_and_liked = []
    friends_nums = []
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM teamfit.user")
        rows = cur.fetchall()
        for i in range(len(rows)):
            if number == str(rows[i][0]):
                name = rows[i][3]
                all_posts[name] = rows[i][11]
                friends_nums = rows[i][10]
        if len(friends_nums) != 0:
            for j in friends_nums:
                sql_query = 'SELECT * FROM teamfit.user WHERE PhoneNumber = '+str(j)
                cur.execute(sql_query)
                rows = cur.fetchall()
                print(rows)
                name = rows[0][3]
                all_posts[name] = rows[0][11]
        return {'state': all_posts}, 200
    return "Returning my posts"

@profile_page.route("/profile/likePost", methods=["POST"])
def like_post():
    liked_post = request.get_json()
    liked_post = liked_post['body']
    print(liked_post)

    number = _getUsername()
    conn = psycopg2.connect(
        database='teamfit',
        user='root',
        port=26257,
        host='localhost',
        sslmode='disable'
    )

    with conn.cursor() as cur:
        sql_query = 'SELECT * FROM teamfit.user WHERE PhoneNumber = %s' % str(number)
        cur.execute(sql_query)
        rows = cur.fetchall()

        friends_nums = rows[0][10]
        posts = rows[0][11]
        for i in range(len(posts)):
            if posts[i] == liked_post:
                print("Updating for user")
                sql_query = 'UPDATE teamfit.user SET liked = array_append(liked, %i) WHERE PhoneNumber = %s' % (i,str(number))
                cur.execute(sql_query)
                conn.commit()

        for friend_num in friends_nums:
            sql_query = 'SELECT * FROM teamfit.user WHERE PhoneNumber = %s' % str(friend_num)
            cur.execute(sql_query)
            rows = cur.fetchall()
            posts = rows[0][11]
            for j in range(len(posts)):
                if posts[j] == liked_post:
                    print("Updating for friend")
                    sql_query = 'UPDATE teamfit.user SET liked = array_append(liked, %i) WHERE PhoneNumber = %s' % (i,str(number))
                    cur.execute(sql_query)
                    conn.commit()
                    return {"state": "Post liked"}, 200

            return {"state": "Not liked"}, 200
    return "My Liked Posts"