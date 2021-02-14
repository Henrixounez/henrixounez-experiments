import hljs from 'highlight.js';
import EditorStore from "./store";

interface WsData {
  type: string,
  data: any,
}

export function sendToWs(ws: WebSocket, data: WsData) {
  try {
    if (ws && ws.readyState == ws.OPEN)
      ws.send(JSON.stringify(data));
  } catch (e) {}
}

export function highlightAll(code: HTMLElement, text: string) {
  if (code)
    code.innerHTML = hljs.highlight(EditorStore.language, text).value;
}

export function cursorPosition() {
  let sel: Selection = document.getSelection();
  (sel as any).modify("extend", "backward", "documentboundary");
  let pos = sel.toString().length;
  if (sel.anchorNode != undefined)
    sel.collapseToEnd();
  return pos;
}
export function selRange(code: HTMLElement) {
  const sel = document.getSelection();
  const lastNode = sel.focusNode;
  const lastOffset = sel.focusOffset;
  const curPos = cursorPosition();
  sel.setPosition(lastNode, lastOffset);
  const lastPos = cursorPosition();
  _SetCaretAtPosition(code, curPos);
  if (curPos < lastPos) 
    return {curPos, lastPos};
  else
    return {curPos: lastPos, lastPos: curPos};
}

export function _SetCaretAtPosition(el: any, pos: number) {            
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

export function SetCaretAtPosition(el: any, pos: number, ws: WebSocket) {
  sendToWs(ws, {
    type: 'moveCursor',
    data: {
      pos: pos
    }
  });
  _SetCaretAtPosition(el, pos);
}

export function addTextAt(code: HTMLElement, startPos: number, endPos: number, textAdd: string, ws: WebSocket) {
  const curPos = cursorPosition();
  let text = code.textContent;
  text = text.substr(0, startPos) + textAdd + text.substr(endPos);
  highlightAll(code, text);
  if (curPos >= startPos && curPos <= endPos)
    SetCaretAtPosition(code, startPos + textAdd.length, ws);
  else if (curPos > endPos)
    SetCaretAtPosition(code, curPos + textAdd.length, ws);
  else
    SetCaretAtPosition(code, curPos, ws);
  EditorStore.setText(text);
  return text;
}
export function delTextAt(code: HTMLElement, startPos: number, endPos: number, ws: WebSocket) {
  const curPos = cursorPosition();
  let text = code.textContent;
  text = text.substr(0, startPos) + text.substr(endPos);
  highlightAll(code, text);
  if (curPos >= startPos && curPos <= endPos)
    SetCaretAtPosition(code, startPos, ws);
  else if (curPos > endPos)
    SetCaretAtPosition(code, curPos - (endPos - startPos), ws);
  else
    SetCaretAtPosition(code, curPos, ws);
  EditorStore.setText(text);
  return text;
}
export function initText(code: HTMLElement, textAdd: string, ws: WebSocket) {
  const curPos = cursorPosition();
  let text = textAdd;
  highlightAll(code, text);
  if (curPos > text.length) {
    SetCaretAtPosition(code, text.length, ws);
  } else {
    SetCaretAtPosition(code, curPos, ws);
  }
  EditorStore.setText(text);
  return text;
}

export function findPosInText(pos: number, text: string) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < pos; i++) {
    if (this._text[i] === '\n') {
      y++;
      x = 0;
    } else {
      x++;
    }
  }
  return {x, y};
}