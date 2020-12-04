from flask import Flask, request, Blueprint
from datetime import date
import psycopg2
import json
from .logReg import _getUsername

fitness_page = Blueprint('fitness_page', __name__, template_folder='templates')


# Function handles GET and POST requests from react. POST updates database with new user info. GET returns current
# user history
@fitness_page.route('/profile/fitness/submit', methods=['POST', 'GET'])
def fitnessSubmit():
    if request.method == 'GET':
        number = _getUsername()
        conn = psycopg2.connect(
            database='teamfit',
            user='root',
            port=26257,
            host='localhost',
            sslmode='disable'
        )
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM teamfit.fitness")
            row = cur.fetchall()
            for i in range(len(row)):
                if number in row[i]:
                    idXtra, fitHistory = row[i]
                    data = json.dumps(fitHistory)
                    jsonData = json.loads(data)
                    #finishedData = json.dumps(jsonData)
                    finishedData = {'cals': [92, 580], 'cardio': [8, 60], 'date': ['12/06/20', '12/07/20'], 'weights': [5, 10]}
                    return finishedData
        #newHistory = """{"date": [], "cardio": [], "weights": [], "cals": []}"""
        newHistory = {'cals': [92, 580], 'cardio': [8, 60], 'date': ['12/06/20', '12/07/20'], 'weights': [5, 10]}
        return newHistory

    if request.method == 'POST':
        fitnessInfo = request.get_json()
        cardio = fitnessInfo['cardio']
        weights = fitnessInfo['weights']
        number = _getUsername()
        today = date.today()
        approxCal = round(((int(weights)/30)*120)+((int(cardio)/30)*270))
        dateformat = today.strftime("%m/%d/%y")
        # Save this info to user  in database
        conn = psycopg2.connect(
            database='teamfit',
            user='teamfit',
            port=26257,
            host='localhost',
            sslmode='disable'
        )
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM teamfit.fitness")
            row = cur.fetchall()
            for i in range(len(row)):
                if number in row[i]:
                    idXtra, fitHistory = row[i]
                    data = json.dumps(fitHistory)
                    jsonData = json.loads(data)
                    jsonData['date'].append(dateformat)
                    jsonData['cardio'].append(int(cardio))
                    jsonData['weights'].append(int(weights))
                    jsonData['cals'].append(int(approxCal))
                    finishedData = json.dumps(jsonData)
                    sql = 'UPDATE fitness set history = %s WHERE id =%s'
                    val = (finishedData, number)
                    cur.execute(sql, val)
                    conn.commit()
                    return "Info has been processed"
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM teamfit.nutrition")
            newData = """{"cardio": [], "date": [], "weights": [], "cals": []}"""
            newjsonData = json.loads(newData)
            newjsonData['date'].append(dateformat)
            newjsonData['cardio'].append(int(cardio))
            newjsonData['weights'].append(int(weights))
            newjsonData['cals'].append(int(approxCal))
            finaljsonData = json.dumps(newjsonData)
            sql2 = 'INSERT INTO teamfit.fitness (id, history) VALUES (%s,%s)'
            val2 = (number, finaljsonData)
            cur.execute(sql2, val2)
            conn.commit()
        return "User added to database with new info"
    newHistory = """{"cardio": [], "date": [], "weights": [], "cals": []}"""
    return newHistory
