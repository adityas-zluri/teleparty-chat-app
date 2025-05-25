import { TelepartyClient, SocketEventHandler } from "teleparty-websocket-lib";

const eventHandler: SocketEventHandler = {
  onConnectionReady: () => {
    console.log("Connection has been established");
  },
  onClose: () => {
    console.log("Socket has been closed");
  },
  onMessage: (message) => {
    console.log("Received message: " + JSON.stringify(message));
  },
};

const client = new TelepartyClient(eventHandler);

export default client;
