from flask import Flask
from flask import request
import os

app = Flask(__name__)

@app.route("/api/messages/@<string:handle>", methods=['GET'])
def hello():
    name = request.args.get('name')
    model = {
        errors: {msg:"Name not provided"},
        data: {msg: "Hello {name}"}
    }

    if model['errors'] is not None:
        return model['errors'], 422
    else:
        return model['data'], 200
