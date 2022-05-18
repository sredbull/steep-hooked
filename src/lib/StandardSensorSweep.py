from sensorSimulation import sweeper
from System.Timers import Timer

eventTimer = Timer(1000)
sweepCadence = sweeper()

sweepCadence.minValue = 0.0
sweepCadence.maxValue = 254.0
sweepCadence.sweepTime = 60
sweepCadence.constantTime = 5.0

eventCount = 1

logScriptEvent("Sweeping Instantaneous Power & Instantaneous Cadence...")
simulator.StandardPowerOnly.EventCount = eventCount
simulator.StandardPowerOnly.InstantaneousPower = sweepCadence.minValue
simulator.StandardPowerOnly.InstantaneousCadence = sweepCadence.minValue

def update(sender, args):
  global eventCount
  eventCount += 1
  value = sweepCadence.getNextValue()
  simulator.StandardPowerOnly.EventCount = eventCount
  simulator.StandardPowerOnly.InstantaneousPower = value
  simulator.StandardPowerOnly.InstantaneousCadence = value
  simulator.TurnOn()

def stopScript():
  sweepCadence.stop()
  eventTimer.Stop()
  simulator.TurnOff()

eventTimer.Elapsed += update
simulator.TurnOn()
eventTimer.Start()
sweepCadence.start()
