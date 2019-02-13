import sys
import json

import RPi.GPIO as GPIO

# "relay_pin": 23,
# "state_pin": 17,
# "state_pin_closed_value" : 0

GPIO.setmode(GPIO.BOARD)

class GarageController:
	def __init__(self):
		self.relay_pin = 23
		self.state_pin = 17
		self.state_pin_closed_value = 0

		GPIO.setup(self.relay_pin, GPIO.OUT, pull_up_down=GPIO.PUD_UP)
		GPIO.setup(self.state_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
		GPIO.output(self.relay_pin, True)
		sys.stdout.flush()

	def get_state(self):
		if GPIO.input(self.state_pin) == self.state_pin_closed_value:
		    return True
		else:
		    return False

	def toggle_relay(self):
		print('hello')
		GPIO.output(self.relay_pin, False)
		GPIO.output(self.relay_pin, True)
