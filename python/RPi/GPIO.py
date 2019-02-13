BOARD = 1
OUT = 1
IN = 1
PUD_UP = 1


def setmode(a):
	print(a)

def setup(a, b, pull_up_down, *args, **kwargs):
	print(a)

def output(a, b):
	print(a)

def input(a):
	return 0

def cleanup():
	print('a')

def setwarnings(flag):
	print('False')
