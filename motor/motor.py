import time
import RPi.GPIO as GPIO

def init():
	GPIO.setwarnings(True)
	GPIO.setmode(GPIO.BCM)
	GPIO.setup(5, GPIO.OUT)
	GPIO.setup(6, GPIO.OUT) 
	GPIO.setup(12, GPIO.OUT)
	GPIO.setup(13, GPIO.OUT)

def up(x):
	init()
	print("Moving up")
	GPIO.output(5, True)
	GPIO.output(6, True)	
	time.sleep(x)
	GPIO.output(5, False)
	GPIO.output(6, False)
	GPIO.cleanup()

def down(x):
	init()
	print("Moving down")
	GPIO.output(12, True)
	GPIO.output(13, True)
	time.sleep(x)
	GPIO.output(12, False)
	GPIO.output(13, False)
	
	GPIO.cleanup()

up(3)
down(3)
up(3)
down(3)
up(3)
down(3)
	
