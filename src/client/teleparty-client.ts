import { TelepartyClient, SocketEventHandler } from "teleparty-websocket-lib";

let callbackForOnConnectReady: (() => void) | null = null;
let callbackForOnMessage: ((msg: any) => void) | null = null;

const eventHandler: SocketEventHandler = {
  onConnectionReady: () => {
    console.log("Connection has been established");
    if (callbackForOnConnectReady) {
      callbackForOnConnectReady();
    }
  },
  onClose: () => {
    console.log("Socket has been closed");
  },
  onMessage: (message) => {
    console.log("Received message: " + JSON.stringify(message));
    if (callbackForOnMessage) {
      callbackForOnMessage(message);
    }
  },
};

export function getCallbackForOnConnectionReady(callback: () => void) {
  callbackForOnConnectReady = callback;
}

export function getCallbackForOnMessage(callback: (msg: any) => void) {
  callbackForOnMessage = callback;
}

const client = new TelepartyClient(eventHandler);

export default client;
