from flask import Flask, jsonify, json, request, render_template, Blueprint, Response
import json
from flask_cors import CORS
import psycopg2
import psycopg2.errorcodes
import time
import sys
import logging
import random

message_page = Blueprint('message_page', __name__, template_folder='templates')
deletedMessages = {}

conn = psycopg2.connect(
    database='teamfit',
    user='root',
    port='26257',
    host='localhost',
    sslmode='disable'
)


@message_page.route("/makeMessageTable", methods=['POST'])
def makeMessageTable():
    with conn.cursor() as cur:
        query = 'CREATE TABLE IF NOT EXISTS messages (messageID SERIAL PRIMARY KEY, sourceID VARCHAR(320) NOT NULL, recieverID VARCHAR(320) NOT NULL, content TEXT NOT NULL,header VARCHAR(150),parentMessageID INT );'
        cur.execute(query)
    conn.commit()
    return Response(status=200)


@message_page.route("/createMessage", methods=["POST"])
def createMessage():
    data = request.get_json()
    print(request.get_json(), file=sys.stderr)
    if data.get('userID') == "":
        return jsonify({'Bad request': False, 'message': 'No userID passed'})
    message = Message("", data['header'], data['parentMessageID'], data['userID'], data['recieverID'], data['data'])
    insertMessageIntoTable(message)
    # insert a new row into the message table containing this message.
    return jsonify({'ok': True, 'message': 'Message created successfully!'}), 200


@message_page.route("/listMessages", methods=["GET"])
def listMessages():
    userID = request.headers.get('messageID')
    if userID == None or userID == '':
        return (json.dumps('There is no messageId how can you expect me to list these messages.'), 400,
                {'content-type': 'application/json'})
    query = 'SELECT * FROM messages WHERE sourceid=\'' + userID + '\''
    cur = conn.cursor()
    cur.execute(query)
    rows = cur.fetchall()  # make call to db to list all of the Message rows that have the userId as the source
    conn.commit()
    retList = convertSqlToObj(rows)
    if rows:
        return json_response(retList)
    else:
        print("printing the json stuff bc the email is not good i think", file=sys.stderr)
        return json_response(["this", "is", "empty", "list"])


@message_page.route("/listParentMessages", methods=["GET"])
def listParents():
    parentID = request.headers.get('parentID')
    if parentID == None or parentID == '':
        return (json.dumps('There is no parentID how can you expect me to list these messages.'), 400,
                {'content-type': 'application/json'})
    query = 'SELECT * FROM messages WHERE parentMessageID=' + parentID
    cur = conn.cursor()
    cur.execute(query)
    rows = cur.fetchall()
    retList = convertSqlToObj(rows)
    conn.commit()
    return json_response(retList)


@message_page.route("/deleteMessage", methods=["PUT"])
def deleteMessage():
    data = request.get_json()
    messageID = data.get('messageID')
    parentMessageID = data.get('parentMessageID')
    if messageID is not None:
        deletedMessages[messageID] = "we got deleted ;("
        query = 'DELETE FROM messages WHERE messageID='+ str(messageID)
        cur = conn.cursor()
        cur.execute(query, (messageID))
        conn.commit()
        return json_response("Deleted messageID " + str(messageID))
    if parentMessageID is not None:
        deletedMessages[messageID] = "we got deleted ;("
        query = 'DELETE FROM messages WHERE parentID=' + str(parentMessageID)
        cur.execute('DELETE FROM messages WHERE messageID=() VALUES (%s)')
        cur = conn.cursor()
        conn.commit()
        return json_response("Deleted all messages with parentMessageID=" + str(parentMessageID))
    return (json.dumps('There is no messageID how can you expect me to delete this message.'), 400,
            {'content-type': 'application/json'})

def insertMessageIntoTable(message):
    with conn.cursor() as cur:
        cur.execute(
            'INSERT into messages (header, parentMessageID, sourceID, recieverID, content) VALUES (%s,%s,%s,%s,%s)',
            (message.header, message.parentMessageID, message.sourceID, message.recieverID, message.content))
    conn.commit()

def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})
    
def convertSqlToObj(rows):
    retList = []
    for row in rows:
        message = Message(row[0], row[1], row[2], row[3], row[4], row[5])
        if message.messageID in deletedMessages or message.parentMessageID in deletedMessages:
            continue
        retList.append(json.dumps(message.__dict__))
        print(message, file=sys.stderr)
    return retList


class Message:

    def __init__(self, messageID,header, parentMessageID, userID, recieverID, data):
        self.messageID = messageID
        self.header = header
        self.parentMessageID = parentMessageID
        self.sourceID = userID  # email address of user that is sending message
        self.recieverID = recieverID  # email address of user that is recieving the message.
        self.content = data  # the actual message data