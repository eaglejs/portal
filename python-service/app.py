#!flask/bin/python
from flask import Flask, jsonify
from GarageController import GarageController
IPCONFIG = '0.0.0.0'

app = Flask(__name__)

# app.debug = True

gc = GarageController()

@app.route('/toggle-garage-door', methods=['GET'])
def toggleGarageDoor():
	gc.toggleGarageDoor()
	return jsonify({'door-status': gc.getGarageState()})


@app.route('/garage-door-status', methods=['GET'])
def getGarageState():
	return jsonify({'door-status': gc.getGarageState()})

if __name__ == '__main__':
	app.run(host=IPCONFIG, debug=True)
