from flask import Flask, request, Blueprint
from datetime import date
import psycopg2
import json

friends_page = Blueprint('friends_page', __name__, template_folder='templates')

# Function handles GET equests from react. GET returns current
@friends_page.route('/friends/friends_get', methods=['GET'])

def friends_get():
    conn = psycopg2.connect(
        database='teamfit',
        user='root',
        port=26257,
        host='localhost',
    )
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM teamfit.friends")
        row = cur.fetchall()
        cur.execute(query)
        rows = cur.fetchall()  # make call to db to list all of the Message rows that have the userId as the source
        conn.commit()
    return json_response(rows)
        
        

