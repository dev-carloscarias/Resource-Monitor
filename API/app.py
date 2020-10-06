import os
import json
from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'serverdb'
app.config['MONGO_URI'] = 'mongodb://mongodb:27017/serverdb'

mongo = PyMongo(app)

@app.route('/users', methods=['GET'])
def get_all_stars():
  users = mongo.db.users
  output = []
  for user in users.find():
    output.append({'autor' : user['autor'], 'nota' : user['nota']})
  return jsonify({'result' : output})

@app.route('/userinsert', methods=['GET'])
def insert_star():
  user = mongo.db.users
  name = "carlos"
  nota = "hola que tal es mi comentario."
  user_id = user.insert({'autor': name, 'nota': nota})
  new_user = user.find_one({'_id': user_id })
  output = {'autor' : new_user['autor'], 'nota' : new_user['nota']}
  return jsonify({'result' : output})

@app.route('/user', methods=['POST'])
def add_star():
  user = mongo.db.users
  autor = request.json['autor']
  nota = request.json['nota']
  user.insert_one({'autor': autor, 'nota': nota})
  return jsonify({'result' : 'ok'})

@app.route('/')
def main_message():
    return "API PYTHON SOPES"

@app.route('/cpu')
def get_cpu():
    with open('/usr/src/app/cpu.txt') as json_file:
        data = json.load(json_file)
        return data

@app.route('/ram')
def get_cpu():
    with open('/usr/src/app/ram.txt') as json_file:
        data = json.load(json_file)
        return data

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
