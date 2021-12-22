const Ant = require('ant-plus')
const stick = new Ant.GarminStick3
const heartRateSensor = new Ant.HeartRateSensor(stick)
const bicyclePowerSensor = new Ant.BicyclePowerSensor(stick)
const fitnessEquipmentSensor = new Ant.FitnessEquipmentSensor(stick)
const speedCadenceSensor = new Ant.SpeedCadenceSensor(stick)
// const speedSensor = new Ant.SpeedSensor(stick)
// const cadenceSensor = new Ant.CadenceSensor(stick)
const Influx = require('influx')
const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'incline'
})

let attachedSensorIndex = 0

let sensors = [
    {name: 'heartRateSensor', object: heartRateSensor, attached: false, event: 'hbData', sensor: () => heartRateSensor.attach(0, 0)},
    {name: 'bicyclePowerSensor', object: bicyclePowerSensor, attached: false, event: 'powerData', sensor: () => bicyclePowerSensor.attach(1, 0)},
    {name: 'fitnessEquipmentSensor', object: fitnessEquipmentSensor, attached: false, event: 'fitnessData', sensor: () => fitnessEquipmentSensor.attach(2, 0)},
    {name: 'speedCadenceSensor', object: speedCadenceSensor, attached: false, event: 'speedData', sensor: () => speedCadenceSensor.attach(3, 0)},
    // {name: 'speedSensor', object: speedSensor, attached: false, event: 'speedData', sensor: () => speedSensor.attach(4, 0)},
    // {name: 'cadenceSensor', object: cadenceSensor, attached: false, event: 'cadenceSensor', sensor: () => cadenceSensor.attach(5, 0)}
]

function fillterObject (object) {
    object = removeEmptyKeys(object)
    object = removeNanValues(object)

    return object
}

function removeEmptyKeys(object) {
    Object.keys(object).forEach((key) => {
        if (object[key] === null || object[key] === undefined || typeof object[key] === 'object' || typeof object[key] === 'array') {
            delete object[key]
        }
    })

    return object
}

function removeNanValues(object) {
    Object.keys(object).forEach((key) => {
        if (object[key] === 'Nan') {
            object[key] = 0
        }
    })

    return object
}

function attachSensor(index) {
    if (index >= sensors.length || sensors[index].attahced === true) {
        return
    }

    attachedSensorIndex++

    console.log ('attaching sensor: ' + sensors[index].name)
    sensors[index].sensor()
    sensors[index].attached = true
    
    sensors[index].object.on('attached', function () {
        console.log ('attached sensor: ' + sensors[attachedSensorIndex - 1].name)
        if (typeof sensors[attachedSensorIndex] !== 'undefined' && sensors[attachedSensorIndex].attached === false) {
            attachSensor(attachedSensorIndex)
        }
    })

    sensors[index].object.on(sensors[index].event, function (data) {
        data = removeEmptyKeys(data)
        console.log(data)
        influx.writePoints([{
            measurement: sensors[index].name,
            fields: data,
        }]).catch((error) => {
            console.error('error saving data to influx!', error.stack)
        })
    })
}

if (!stick.open()) {
    console.log('stick not found!')
}

stick.on('startup', function () {
    console.log('attaching sensors')
    console.log('max channels:', stick.maxChannels)
    attachSensor(attachedSensorIndex)
})
