const WebSocket = require('ws')
const { port } = require('./package')
const wsPort = port+1
let wss

function verifyClient (info) {
  var origin=info.origin.match(/^(:?.+\:\/\/)([^\/]+)/)
  return origin.length>=3 && origin[2].indexOf('arknodejs')>-1
}

function connect (s) {
  s.onmessage = () => {
    log.info('WebSocketServer message')
  }
  s.onclose = () => {
    log.info('WebSocketServer closes')
  }
  s.onerror = err => {
    log.error('WebSocketServer error: ', err) 
  }
  s.onopen = () => {
    log.info('WebSocketServer connected')
  }

  s.send('{"data":"hello"}')
}

function init () {
  if (wss) return 
  wss = new WebSocket.Server({
    port: wsPort,//监听的端口
    verifyClient,
    perMessageDeflate: false,
  });
  wss.on('connection', connect);
  log.debug(`WebSocketServer is running on port ${wsPort}`);
}

module.exports = (() => {
  init()
  return wss
})()