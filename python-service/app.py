#!flask/bin/python
from flask import Flask, jsonify
from GarageController import GarageController

IPCONFIG = "0.0.0.0"
PORT = 5000
DEBUGGER = True
RELOADER = True

app = Flask(__name__)

# app.debug = True

gc = GarageController()


@app.route("/toggle-garage-door", methods=["GET"])
def toggleGarageDoor():
    gc.toggleGarageDoor()
    return jsonify({"doorStatus": gc.getGarageState()})


@app.route("/garage-door-status", methods=["GET"])
def getGarageState():
    return jsonify({"doorStatus": gc.getGarageState()})


if __name__ == "__main__":
    app.run(host=IPCONFIG, port=PORT, debug=DEBUGGER, use_reloader=RELOADER)

