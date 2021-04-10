export default function CabalWebsocketClient ({ cabalKey, websocketURL }) {
  if (!cabalKey) {
    const url = new URL(window.location.href)
    url.protocol = url.protocol.replace('https:', 'wss:').replace('http:', 'ws:')
    const parts = window.location.href.split('/')
    cabalKey = parts[parts.length - 2]
    websocketURL = url.href
  }

  function init () {
    console.log('websocket init', websocketURL)
    const websocket = new window.WebSocket(websocketURL)
    websocket.onopen = function () {
      websocket.send(JSON.stringify({
        type: 'render:cabal-join',
        data: {
          cabalKey: cabalKey
        }
      }))
    }

    websocket.onclose = function (evt) { console.log(evt) }
    websocket.onerror = function (evt) { console.warn(evt) }

    // Incoming messages from main
    websocket.onmessage = function (msg) {
      const message = JSON.parse(msg.data)
      console.log('from main -->', message)
      if (message.type) {
        window.eventEmitter.emit(message.type, message.data)
      }
    }

    // Outgoing messages to main
    const outgoingMessages = [
      'render:add-message',
      'render:add-status-message',
      'render:cabal-focus',
      'render:channel-focus',
      'render:channel-join',
      'render:channel-leave',
      'render:remove-cabal',
      'render:set-channel-topic',
      'render:set-username'
    ]
    outgoingMessages.forEach((eventName) => {
      window.eventEmitter.on(eventName, (data) => {
        websocket.send(JSON.stringify({
          type: eventName,
          data
        }))
      })
    })
  }

  window.addEventListener('load', init, false)
}
