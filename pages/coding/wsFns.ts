import { toJS } from "mobx";
import { addTextAt, delTextAt, initText } from "./helpers";
import EditorStore from "./store";

export const wsFns = {
  'ping': (data: any, code: HTMLElement, ws: WebSocket) => {},
  'init': (data: any, code: HTMLElement, ws: WebSocket) => {
    EditorStore.setOtherClients(data.clients);
    EditorStore.setMyClient(data.owner);
    initText(code, data.text, ws);
  },
  'addText': (data: any, code: HTMLElement, ws: WebSocket) => {
    addTextAt(code, data.pos, data.endPos, data.text, ws);
  },
  'delText': (data: any, code: HTMLElement, ws: WebSocket) => {
    delTextAt(code, data.startPos, data.endPos, ws);
  },
  'moveCursor': (data: any, code: HTMLElement, ws: WebSocket) => {
    const lastClients = toJS(EditorStore.otherClients);
    const index = lastClients.findIndex((e) => e.id === data.id);
    if (index !== -1)
      lastClients[index].pos = data.pos;
    else
      lastClients.push(data);
    EditorStore.setOtherClients(lastClients);
  },
  'removeClient': (data: any, code: HTMLElement, ws: WebSocket) => {
    EditorStore.setOtherClients(EditorStore.otherClients.filter((e) => e.id !== data.id));
  },
};