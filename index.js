const WebSocketServer = require('ws').Server
const http = require('http')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use(express.static(__dirname + '/'))

const server = http.createServer(app)
server.listen(port)
console.log(`http server listening on port ${port}`)

const wss = new WebSocketServer({ server })
console.log('websocket server created')

wss.on('connection', (ws) => {
  let id = setInterval(() => {
    ws.send(JSON.stringify(new Date()), () => {})
  }, 1000)

  console.log('websocket connection open')

  ws.on('close', () => {
    console.log('websocket connection close')
    clearInterval(id)
  })
})
