import serial
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

DB_URI = "mysql+mysqlconnector://gloda:glodanmax123@localhost/coursework?auth_plugin=mysql_native_password"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
db = SQLAlchemy(app)
ma = Marshmallow(app)

arduino_serial = serial.Serial("COM1", 9600, timeout=1)
cors = CORS(app)

list_of_commands = []


class Timer(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    times = db.Column(db.String(255), nullable=False)

    def __init__(self, times):
        self.times = times

    def __repr__(self):
        return f"id: {self.id}, times: {self.times}"


class TimeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'times')


time_schema = TimeSchema()
time_schemas = TimeSchema(many=True)


@app.route("/stopwatch", methods=["POST"])
def post_request():
    data = request.get_json()
    if data == "#":
        send_data(arduino_serial.readline().decode('Ascii'))
    send_command(data)
    print(f"Command: {data}, List: {list_of_commands}")
    times = Timer.query.all()
    result = time_schemas.dump(times)
    return jsonify(result)


@app.route("/stopwatch", methods=["GET"])
def get_request():
    times = Timer.query.all()
    result = time_schemas.dump(times)
    return jsonify(result)


def send_data(times):
    if times == "":
        return
    data_set = {"times": times}
    json_dump = json.dumps(data_set)
    data = TimeSchema().loads(json_dump)
    print(json_dump)

    new_timer = Timer(**data)

    db.session.add(new_timer)
    db.session.commit()


def send_command(command):
    arduino_serial.write(command.encode())


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True, use_reloader=False)