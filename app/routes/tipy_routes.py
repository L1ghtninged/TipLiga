import flask
app = flask.Flask(__name__)

@app.route('/api/uzivatele', methods=['GET'])
def get_users():
    pass
