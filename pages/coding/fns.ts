import { KeyboardEvent } from "react";
import { selRange, sendToWs, addTextAt, delTextAt, cursorPosition, findPosInText } from './helpers';

function checkKeyArray(keys: string[]) {
  return (key: string) => {
    return keys.includes(key);
  }
}

/************************/

function normalKey(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const {curPos, lastPos} = selRange(code);
  sendToWs(ws, {
    type: 'addText',
    data: { text: e.key, pos: curPos, endPos: lastPos }
  });
  addTextAt(code, curPos, lastPos, e.key, ws);
}
function backspaceKey(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const {curPos, lastPos} = selRange(code);
  if (curPos > 0 && curPos === lastPos) {
    sendToWs(ws, {
      type: 'delText',
      data: { startPos: curPos - 1, endPos: curPos }
    });
    delTextAt(code, curPos - 1, curPos, ws);
  } else if (curPos !== lastPos) {
    sendToWs(ws, {
      type: 'delText',
      data: { startPos: curPos, endPos: lastPos }
    });
    delTextAt(code, curPos, lastPos, ws);    
  }
}
function deleteKey(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const {curPos, lastPos} = selRange(code);
  if (curPos < code.textContent.length && curPos === lastPos) {
    sendToWs(ws, {
      type: 'delText',
      data: { startPos: curPos, endPos: curPos + 1 }
    });
    delTextAt(code, curPos, curPos + 1, ws);
  } else {
    sendToWs(ws, {
      type: 'delText',
      data: { startPos: curPos, endPos: lastPos }
    });
    delTextAt(code, curPos, lastPos, ws);
  }
}
function tabKey(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const {curPos, lastPos} = selRange(code);
  sendToWs(ws, {
    type: 'addText',
    data: { text: "  ", pos: curPos, endPos: lastPos }
  });
  addTextAt(code, curPos, lastPos, "  ", ws);
}
function enterKey(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const {curPos, lastPos} = selRange(code);
  const atEnd = (curPos === code.textContent.length - 1);

  if (!code.textContent.endsWith('\n')) {
    sendToWs(ws, {
      type: 'addText',
      data: { text: "\n", pos: curPos, endPos: curPos }
    });
    addTextAt(code, curPos, curPos, "\n", ws);
  }
  sendToWs(ws, {
    type: 'addText',
    data: { text: "\n", pos: curPos, endPos: lastPos }
  });
  addTextAt(code, curPos, lastPos, "\n", ws);
  if (atEnd)
    code.parentElement.scrollTo(0, code.parentElement.scrollHeight);
}
async function pasteKey(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const {curPos, lastPos} = selRange(code);
  const text = await navigator.clipboard.readText();
  sendToWs(ws, {
    type: 'addText',
    data: { text: text, pos: curPos, endPos: lastPos }
  });
  addTextAt(code, curPos, lastPos, text, ws);
}

/************************/

function moveCursor(e: KeyboardEvent<HTMLElement>, code: HTMLElement, ws: WebSocket) {
  const curPos = cursorPosition(code);
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
    fn: () => {},
    checkKey: checkKeyArray(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]),
    preventDefault: false,
    alt: SpecialKeyBehavior.IGNORED,
    ctrl: SpecialKeyBehavior.IGNORED,
    shift: SpecialKeyBehavior.IGNORED,
  }),
  createFunction({
    fn: pasteKey,
    checkKey: checkKeyArray(["v", "V"]),
    ctrl: SpecialKeyBehavior.PRESSED,
  }),
  createFunction({
    fn: () => {},
    checkKey: checkKeyArray(["c", "C",]),
    preventDefault: false,
    ctrl: SpecialKeyBehavior.PRESSED,
  }),
  createFunction({
    fn: () => {},
    checkKey: checkKeyArray(["r", "R",]),
    preventDefault: false,
    ctrl: SpecialKeyBehavior.PRESSED,
  }),
  createFunction({
    fn: () => {},
    checkKey: checkKeyArray(["i", "I",]),
    preventDefault: false,
    ctrl: SpecialKeyBehavior.PRESSED,
    shift: SpecialKeyBehavior.PRESSED,
  }),
  createFunction({
    fn: () => {},
    checkKey: (k) => k[0] === "F" && !isNaN(Number(k.substr(1))),
    preventDefault: false,
  })
]

export const postFns: Function[] = [
  createFunction({
    fn: moveCursor,
    checkKey: checkKeyArray(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]),
    shift: SpecialKeyBehavior.UNPRESSED
  })
];