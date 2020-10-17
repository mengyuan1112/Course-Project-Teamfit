from flask import Flask, request
from flask_cors import CORS
from datetime import date
import psycopg2
import json
from .hello import _userEmail

app = Flask(__name__, template_folder='template', )
CORS(app)


# Function handles GET and POST requests from react. POST updates database with new user info. GET returns current
# user history
@app.route('/profile/nutrition/submit', methods=['POST', 'GET'])
def nutritionSubmit():
    if request.method == 'GET':
        email = _userEmail
        conn = psycopg2.connect(
            database='teamfit',
            user='aidan',
            password='roach',
            sslmode='require',
            sslrootcert='certs/ca.crt',
            sslkey='certs/client.aidan.key',
            sslcert='certs/client.aidan.crt',
            port=26257,
            host='localhost'
        )
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM teamfit.nutrition")
            row = cur.fetchall()
            for i in range(len(row)):
                if email in row[i]:
                    idXtra, nutHistory = row[i]
                    data = json.dumps(nutHistory)
                    jsonData = json.loads(data)
                    finishedData = json.dumps(jsonData)
                    return finishedData
    if request.method == 'POST':
        nutritionInfo = request.get_json()
        protein = nutritionInfo['protein']
        carbs = nutritionInfo['carbs']
        fat = nutritionInfo['fat']
        weight = nutritionInfo['weight']
        email = _userEmail
        today = date.today()
        dateformat = today.strftime("%m/%d/%y")
        calories = ((9 * int(fat)) + (4 * int(protein)) + (4 * int(carbs)))
        # Save this info to user  in database
        conn = psycopg2.connect(
            database='teamfit',
            user='aidan',
            password='roach',
            sslmode='require',
            sslrootcert='certs/ca.crt',
            sslkey='certs/client.aidan.key',
            sslcert='certs/client.aidan.crt',
            port=26257,
            host='localhost'
        )
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM teamfit.nutrition")
            row = cur.fetchall()
            for i in range(len(row)):
                if email in row[i]:
                    idXtra, nutHistory = row[i]
                    data = json.dumps(nutHistory)
                    jsonData = json.loads(data)
                    jsonData['date'].append(dateformat)
                    jsonData['calories'].append(calories)
                    jsonData['weight'].append(weight)
                    finishedData = json.dumps(jsonData)
                    sql = 'UPDATE nutrition set history = %s WHERE id =%s'
                    val = (finishedData, email)
                    cur.execute(sql, val)
                    conn.commit()
                    return "Info has been processed"
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM teamfit.nutrition")
            newData = """{"calories": [], "date": [], "weight": []}"""
            newjsonData = json.loads(newData)
            newjsonData['date'].append(dateformat)
            newjsonData['calories'].append(calories)
            newjsonData['weight'].append(weight)
            finaljsonData = json.dumps(newjsonData)
            sql2 = 'INSERT INTO teamfit.nutrition (id, history) VALUES (%s,%s)'
            val2 = (email, finaljsonData)
            cur.execute(sql2, val2)
            conn.commit()
        return "User added to database with new info"
    newHistory = """{"calories": [], "date": [], "weight": []}"""
    return newHistory
