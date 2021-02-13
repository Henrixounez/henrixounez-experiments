import { useEffect, useState, useRef, KeyboardEvent } from 'react';
import xw from 'xwind';
import { css } from '@emotion/react';
import 'highlight.js/styles/vs2015.css';

import { fns, addTextAt, delTextAt, postFns, initText, checkKeyBehavior } from './fns';

import styles from './style.module.css';

const Editor = () => {
  const code = useRef(null);
  
  const ws = useRef(null);
  const reconnect = useRef(null);
  const [otherClients, setOtherClients] = useState([]);

  useEffect(() => {
    connect(true);
    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
      if (reconnect.current)
        clearTimeout(reconnect.current);
    }
  }, []);

  const connect = (force: boolean = false) => {
    if (ws.current) {
      if (force) {
        ws.current.close();
        ws.current.onmessage = null;
        ws.current.onclose = null;
        ws.current = null; 
      } else {
        return;
      }
    }
    ws.current = new WebSocket(`${process.env.NODE_ENV === 'development' ? 'ws://localhost:8080' : 'wss://henrixounez-api.herokuapp.com'}/coding/connect`);
    ws.current.onopen = (mess) => {
      console.log('[WS] open');
    }
    ws.current.onmessage = (mess) => {
      const data = JSON.parse(mess.data);
      switch (data.type) {
        case 'init':
          setOtherClients([]);
          initText(code.current, data.data.text, ws.current);
          break;
        case 'addText':
          addTextAt(code.current, data.data.pos, data.data.text, ws.current);
          break;
        case 'delText':
          delTextAt(code.current, data.data.startPos, data.data.endPos, ws.current);
          break;
        case 'moveCursor':
          setOtherClients((lastClients) => {
            const index = lastClients.findIndex((e) => e.id === data.data.id);
            if (index !== -1)
              lastClients[index].pos = data.data.pos;
            else
              lastClients.push(data.data);
            return [...lastClients];
          });
          break;
        case 'removeClient':
          setOtherClients((lastClients) => lastClients.filter((e) => e.id !== data.data.id));
          break;
        default:
          console.log('Message Type', data.type, 'is not handled');
      }
    }
    ws.current.onclose = () => {
      if (ws.current)
        ws.current.onmessage = null;
      ws.current = null;
      console.log('[WS] closed');
      reconnect.current = setTimeout(() => {
        reconnect.current = null;
        connect();
      }, 3000);
    }
  }

  const handleSpecialInput = (e: KeyboardEvent<HTMLElement>) => {
    for (let fn of postFns) {
      if (
        checkKeyBehavior(e.altKey, fn.alt) &&
        checkKeyBehavior(e.ctrlKey, fn.ctrl) &&
        checkKeyBehavior(e.shiftKey, fn.shift) &&
        fn.checkKey(e.key)
      ) {
        fn.fn(e, code.current, ws.current);
        if (fn.preventDefault)
          e.preventDefault();
        return;
      }
    }
  }

  const handleInput = (e: KeyboardEvent<HTMLElement>) => {
    for (let fn of fns) {
      if (
        checkKeyBehavior(e.altKey, fn.alt) &&
        checkKeyBehavior(e.ctrlKey, fn.ctrl) &&
        checkKeyBehavior(e.shiftKey, fn.shift) &&
        fn.checkKey(e.key)
      ) {
        console.log('INSIDE');
        fn.fn(e, code.current, ws.current);
        if (fn.preventDefault)
          e.preventDefault();
        return;
      }
    }
    e.preventDefault();
  }

  return (
    <div
      css={[
        xw`flex flex-row items-center content-center`,
        css`width: 100vw;`
      ]}
    >
      <pre
        css={[
          xw`relative`,
          css`width: 100%`
        ]}
      >
        {otherClients.map((e, i) => (
          <div
            key={i}
            css={[
              xw`absolute border border-blue-400`,
              css`
                top: calc(calc(${e.pos.y} * 24.3px) + calc(2.5px + 8px));
                left: calc(calc(${e.pos.x} * 9.6px) + calc(0px + 8px));
                height: 18.5px;
                border-left: 0;
              `
            ]}
          />
        ))}
        <code
          className={"hljs " + styles.codeview}
          ref={code}
          contentEditable={true}
          onKeyDown={handleInput}
          onKeyUp={handleSpecialInput}
          style={{
            display: "block",
            minWidth: "100%",
            minHeight: "100vh",
          }}
        />
      </pre>
    </div>
  );
}

export default Editor;