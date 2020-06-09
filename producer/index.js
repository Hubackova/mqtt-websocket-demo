const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://mosquitto:1883')
const periodic = require('periodic')

client.on('connect', err => {
  console.log(err)
  console.log('Producer connected to MQTT broker.')
  client.subscribe('chart', err => {
    console.log('Producer subscribed to "chart" topic.')

    if (!err) {
      periodic(40) // frequency time (ms)
        .on('tick', _ => {
          client.publish('chart', JSON.stringify({"time": Date.now(), "y": Math.random() * 100}))
        })
    } else {
      console.log(err)
    }
  })
})
