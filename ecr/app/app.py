from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/api/hello", methods=['GET'])
def hello():
    model = {}
    name = request.args.get('name')
    if not name:
        model['errors'] = {"msg": "Name not provided"}
    else:
        model['data'] = {"msg": f"Hello {name}!"}

    if 'errors' in model and model['errors'] is not None:
        return jsonify(model['errors']), 422
    else:
        return jsonify(model['data']), 200

if __name__ == '__main__':
    app.run(debug=True)
