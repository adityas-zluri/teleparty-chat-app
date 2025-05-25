import { TelepartyClient, SocketEventHandler } from "teleparty-websocket-lib";

const eventHandler: SocketEventHandler = {
  onConnectionReady: () => {
    alert("Connection has been established");
  },
  onClose: () => {
    alert("Socket has been closed");
  },
  onMessage: (message) => {
    alert("Received message: " + message);
  },
};

const client = new TelepartyClient(eventHandler);

export default client;
