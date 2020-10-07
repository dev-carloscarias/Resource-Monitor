import os
import json
from flask import Flask
from flask import jsonify
from flask import request
import requests
app = Flask(__name__)
URL_SERVERA = 'http://34.122.110.231:5000'
URL_SERVERB = 'http://34.67.110.86:5000'


@app.route('/', methods=['POST'])
def add_autor():
    autor = request.json['autor']
    nota = request.json['nota']

    response = requests.get(URL_SERVERA+'/users')
    body_a = json.loads(response.text)
    tam_a = len(body_a['result'])

    response = requests.get(URL_SERVERB+'/users')
    body_b = json.loads(response.text)
    tam_b = len(body_b['result'])

    if tam_a == tam_b:
        response = requests.get(URL_SERVERA+'/ram')
        ram_a = int(json.loads(response.text))
        
        response = requests.get(URL_SERVERB+'/ram')
        ram_b = int(json.loads(response.text))
        
        if ram_a == ram_b: 
            response = requests.get(URL_SERVERA+'/cpu')
            cpu_a = int(json.loads(response.text))
            
            response = requests.get(URL_SERVERB+'/cpu')
            cpu_b = int(json.loads(response.text))
            if cpu_a == cpu_b: 
                body = {"autor":autor, "nota":nota}
                r = requests.post(URL_SERVERA+'/user',json = body)
                return r.text
            elif cpu_a < cpu_b:
                body = {"autor":autor, "nota":nota}
                r = requests.post(URL_SERVERA+'/user',json = body)
                return r.text
            elif cpu_b < cpu_a:
                body = {"autor":autor, "nota":nota}
                r = requests.post(URL_SERVERB+'/user',json = body)
                return r.text
        elif ram_a < ram_b:
            body = {"autor":autor, "nota":nota}
            r = requests.post(URL_SERVERA+'/user',json = body)
            return r.text
        elif ram_b < ram_a:
            body = {"autor":autor, "nota":nota}
            r = requests.post(URL_SERVERB+'/user',json = body)
            return r.text
    elif tam_a < tam_b: 
        body = {"autor":autor, "nota":nota}
        r = requests.post(URL_SERVERA+'/user',json = body)
        return r.text
    elif tam_b < tam_a: 
        body = {"autor":autor, "nota":nota}
        r = requests.post(URL_SERVERB+'/user',json = body)
        return r.text

@app.route('/', methods=['GET'])
def get_server():
    return "SERVER 1 OK"

if __name__ == "__main__":
     app.run(host = '0.0.0.0', port = 80, debug = True)
