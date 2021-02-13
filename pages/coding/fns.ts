import { KeyboardEvent } from "react";
import hljs from 'highlight.js';

interface WsData {
  type: string,
  data: any,
}

function sendToWs(ws: WebSocket, data: WsData) {
  if (ws)
    ws.send(JSON.stringify(data));
}

function highlightAll(code: HTMLElement, text: string) {
  code.innerHTML =  hljs.highlight('javascript', text).value;
}

function cursorPosition() {
  let sel: Selection = document.getSelection();
  (sel as any).modify("extend", "backward", "documentboundary");
  let pos = sel.toString().length;
  if (sel.anchorNode != undefined)
    sel.collapseToEnd();
  return pos;
}

function _SetCaretAtPosition(el: any, pos: number) {            
  for (let node of el.childNodes) {
    if (node.nodeType === 3) {
      if (node.length >= pos) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(node, pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return -1;
      } else {
        pos -= node.length;
      }
    } else {
      pos = _SetCaretAtPosition(node, pos);
      if (pos === -1)
        return -1;
    }
  }
  return pos;
}

function SetCaretAtPosition(el: any, pos: number, ws: WebSocket) {
  sendToWs(ws, {
    type: 'moveCursor',
    data: {
      pos: pos
    }
  });
  _SetCaretAtPosition(el, pos);
}

function checkKeyArray(keys: string[]) {
  return (key: string) => {
    return keys.includes(key);
  }
}

export function addTextAt(code: HTMLElement, pos: number, textAdd: string, ws: WebSocket) {
  const curPos = cursorPosition();
  let text = code.textContent;
  text = text.substr(0, pos) + textAdd + text.substr(pos);
  highlightAll(code, text);
  SetCaretAtPosition(code, curPos + (curPos >= pos ? textAdd.length : 0), ws);
}

export function delTextAt(code: HTMLElement, posStart: number, posEnd: number, ws: WebSocket) {
  const curPos = cursorPosition();
  let text = code.textContent;
  text = text.substr(0, posStart) + text.substr(posEnd);
  highlightAll(code, text);
  if (curPos >= posStart && curPos <= posEnd)
    SetCaretAtPosition(code, posStart, ws);
  else if (curPos > posEnd)
    SetCaretAtPosition(code, curPos - (posEnd - posStart), ws);
  else
    SetCaretAtPosition(code, curPos, ws);
}

export function initText(code: HTMLElement, textAdd: string, ws: WebSocket) {
  const curPos = cursorPosition();
  let text = textAdd;
  highlightAll(code, text);
  if (curPos > text.length) {
    SetCaretAtPosition(code, text.length, ws);
  }
}

/************************/

function normalKey(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const curPos = cursorPosition();
  sendToWs(ws, {
    type: 'addText',
    data: { text: e.key, pos: curPos }
  });
  addTextAt(code, curPos, e.key, ws);
}
function backspaceKey(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const curPos = cursorPosition();
  if (curPos > 0) {
    sendToWs(ws, {
      type: 'delText',
      data: { startPos: curPos - 1, endPos: curPos }
    });
    delTextAt(code, curPos - 1, curPos, ws);
  }
}
function deleteKey(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const curPos = cursorPosition();
  if (curPos < code.textContent.length) {
    sendToWs(ws, {
      type: 'delText',
      data: { startPos: curPos, endPos: curPos + 1 }
    });
    delTextAt(code, curPos, curPos + 1, ws);
  }
}
function tabKey(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const curPos = cursorPosition();
  sendToWs(ws, {
    type: 'addText',
    data: { text: "  ", pos: curPos }
  });
  addTextAt(code, curPos, "  ", ws);
}
function enterKey(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const curPos = cursorPosition();
  if (!code.textContent.endsWith('\n')) {
    sendToWs(ws, {
      type: 'addText',
      data: { text: "\n", pos: curPos }
    });
    addTextAt(code, curPos, "\n", ws);
  }
  sendToWs(ws, {
    type: 'addText',
    data: { text: "\n", pos: curPos }
  });
  addTextAt(code, curPos, "\n", ws);
}

/************************/

function moveCursor(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const curPos = cursorPosition();
  sendToWs(ws, {
    type: 'moveCursor',
    data: {
      pos: curPos
    }
  });
}


/************************/

enum SpecialKeyBehavior {
  IGNORED = 'IGNORED',
  UNPRESSED = 'UNPRESSED',
  PRESSED = 'PRESSED'
}

export function checkKeyBehavior(keyPressed: boolean, behavior: SpecialKeyBehavior) {
  return (
    (behavior === SpecialKeyBehavior.IGNORED) ||
    (behavior === SpecialKeyBehavior.PRESSED && keyPressed) ||
    (behavior === SpecialKeyBehavior.UNPRESSED && !keyPressed)
  );
}

interface Function {
  fn(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket): void,
  checkKey(key: string): boolean,
  alt: SpecialKeyBehavior,
  ctrl: SpecialKeyBehavior,
  shift: SpecialKeyBehavior,
  preventDefault: boolean,
}

interface FunctionInput {
  fn(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket): void,
  checkKey(key: string): boolean,
  alt?: SpecialKeyBehavior,
  ctrl?: SpecialKeyBehavior,
  shift?: SpecialKeyBehavior,
  preventDefault?: boolean,
}

function createFunction(fn: FunctionInput) {
  return ({
    alt: SpecialKeyBehavior.UNPRESSED,
    ctrl: SpecialKeyBehavior.UNPRESSED,
    shift: SpecialKeyBehavior.IGNORED,
    ignoreShiftKey: true,
    ignoreSpecialKey: false,
    preventDefault: true,
    ...fn,
  }) as Function;
}

export const fns: Function[] = [
  createFunction({
    fn: normalKey,
    checkKey: (k) => k.length === 1,
  }),
  createFunction({
    fn: backspaceKey,
    checkKey: checkKeyArray(["Backspace"]),
  }),
  createFunction({
    fn: deleteKey,
    checkKey: checkKeyArray(["Delete"]),
  }),
  createFunction({
    fn: tabKey,
    checkKey: checkKeyArray(["Tab"]),
  }),
  createFunction({
    fn: enterKey,
    checkKey: checkKeyArray(["Enter"]),
  }),
  createFunction({
    fn: (_, __) => {},
    checkKey: checkKeyArray(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]),
    preventDefault: false,
    alt: SpecialKeyBehavior.IGNORED,
    ctrl: SpecialKeyBehavior.IGNORED,
    shift: SpecialKeyBehavior.IGNORED,
  })
]

export const postFns: Function[] = [
  createFunction({
    fn: moveCursor,
    checkKey: checkKeyArray(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]),
    shift: SpecialKeyBehavior.UNPRESSED
  })
];