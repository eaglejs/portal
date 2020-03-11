import sys
import json

import RPi.GPIO as GPIO

# "RELAY_PIN": 23,
# "STATE_PIN": 17,
# "STATE_PIN_CLOSED_VALUE" : 0

GPIO.setmode(GPIO.BOARD)

class GarageController:

	def __init__(self):
		self.RELAY_PIN = 23
		self.STATE_PIN = 7
		self.STATE_PIN_CLOSED_VALUE = 0

		GPIO.setup(self.RELAY_PIN, GPIO.OUT, pull_up_down=GPIO.PUD_UP)
		GPIO.setup(self.STATE_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
		GPIO.output(self.RELAY_PIN, True)
		sys.stdout.flush()

	def getGarageState(self):
		if GPIO.input(self.STATE_PIN) == self.STATE_PIN_CLOSED_VALUE:
			return True
		else:
			return False

	def toggleGarageDoor(self):
		GPIO.output(self.RELAY_PIN, not self.getGarageState())
