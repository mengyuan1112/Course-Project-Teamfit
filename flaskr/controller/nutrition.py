from flask import Flask, request
from flask_cors import CORS
from datetime import date
import psycopg2
import json

app = Flask(__name__, template_folder='template', )

CORS(app)


@app.route('/profile/nutrition/submit', methods=['POST'])
def nutritionSubmit():
    if request.method == 'POST':
        nutritionInfo = request.get_json()
        protein = nutritionInfo['protein']
        carbs = nutritionInfo['carbs']
        fat = nutritionInfo['fat']
        weight = nutritionInfo['weight']
        today = date.today()
        dateformat = today.strftime("%m/%d/%y")
        calories = ((9 * int(fat)) + (4 * int(protein)) + (4 * int(carbs)))
        # Save this info to user  in database
        email = "test@test.com"

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
                sql = 'INSERT INTO teamfit.nutrition (id, history) VALUES (%s,%s)'
                val = (email, finishedData)
                cur.execute(sql, val)
        conn.commit()

    return "This is for processing"


if __name__ == '__main__':
    app.run(debug=True)
