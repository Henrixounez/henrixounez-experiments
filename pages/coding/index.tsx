import { useEffect, useRef, KeyboardEvent } from 'react';
import Head from "next/head";
import xw from 'xwind';
import { css } from '@emotion/react';
import { observer } from 'mobx-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';

import { fns, postFns, checkKeyBehavior } from './fns';
import { wsFns } from './wsFns';
import { highlightAll } from './helpers';
import EditorStore from './store';

import styles from './style.module.css';

const customScrollbar = css`
:focus {
  outline: none;
}
::-webkit-scrollbar {
  background-color: transparent;
  width: 10px;
  height: 10px;

  &-corner {
    background-color: transparent;
  }
  &-thumb {
    background-color: #79797966;
    border: 0px;
  }
}
`

const BottomBar = observer(({ws}) => 
  <div
    css={[
      xw`absolute flex flex-row items-center`,
      css`
        color: #FFF;
        background-color: #007ACC;
        font-size: 10px;
        bottom: 0;
        width: 100%;
        height: 22px;
      `
    ]}
  >
    <div
      css={[
        xw`relative px-2 cursor-pointer items-center flex`,
        css`
          height: 100%;
          &:hover {
            background-color: #ffffff1f;
          }
        `
      ]}
      onClick={() => EditorStore.setOpenLanguageTab(!EditorStore.openLanguageTab)}
    >
      {EditorStore.language}
      {EditorStore.openLanguageTab &&
        <div
          css={[
            xw`absolute flex flex-col py-1`,
            css`
              background-color: #252526;
              bottom: 22px;
              left: -0.2rem;
              max-height: 25vh;
              overflow: auto;
            `,
            customScrollbar
          ]}
        >
          {hljs.listLanguages().map((e, i) => (
            <span
              key={i}
              onClick={() => EditorStore.setLanguage(e)}
              css={[
                xw`px-2 py-0.5`,
                css`
                  cursor: pointer;
                  &:hover {
                    background-color: #2c2c2d;
                  }
                `
              ]}
            >
              {e}
            </span>
          ))}
        </div>
      }
    </div>
    <div css={xw`mx-2`}>
      {EditorStore.connected ? "Connected" : "Not connected"}
    </div>
    <div css={xw`mx-2`}>
      Name:&nbsp;{EditorStore.myClient.name}
    </div>
  </div>
);

const ClientsCursors = observer(() => 
  <>
    {EditorStore.otherClients.map((e, i) => (
      <div
        key={i}
        className={styles.monospaced}
        css={[
          xw`absolute border border-blue-400`,
          css`
            top: calc(calc(${e.pos.y} * 21px) + calc(2.5px + 8px));
            left: calc(calc(${e.pos.x} * 8.428px) + calc(0px + 8px));
            height: 14px;
            border-left: 0;
          `
        ]}
      >
        {e.name && (
        <pre
          css={[
            xw`absolute`,
            css`top: -14px; font-size: 10px;`
          ]}
        >
          {e.name}
        </pre>
        )}
      </div>
    ))}
  </>
);

const Editor = observer(() => {
  const code = useRef(null);
  const ws = useRef(null);
  const scrollnumbers = useRef(null);
  const reconnect = useRef(null);

  useEffect(() => {
    connect(true);
    return () => {
      if (ws.current) {
        ws.current.onmessage = null;
        ws.current.onclose = null;
        EditorStore.setConnected(false);
        ws.current.close();
        ws.current = null;
      }
      if (reconnect.current)
        clearTimeout(reconnect.current);
    }
  }, []);

  useEffect(() => {
    highlightAll(code.current, code.current && code.current.textContent || "");
  }, [EditorStore.language]);

  const connect = (force: boolean = false) => {
    if (ws.current) {
      if (force) {
        ws.current.onmessage = null;
        ws.current.onclose = null;
        EditorStore.setConnected(false);
        ws.current.close();
        ws.current = null;
      } else {
        return;
      }
    }
    ws.current = new WebSocket(`${process.env.NODE_ENV === 'development' ? 'ws://localhost:8080' : 'wss://henrixounez-api.herokuapp.com'}/coding/connect`);
    ws.current.onopen = (mess) => {
      EditorStore.setConnected(true);
      console.info('[WS] open');
    }
    ws.current.onmessage = (mess) => {
      const data = JSON.parse(mess.data);
      if (wsFns[data.type]) {
        wsFns[data.type](data.data, code.current, ws.current);
      } else {
        console.info('Message Type', data.type, 'is not handled');
      }
    }
    ws.current.onerror = () => {
      console.info('[WS] error');
      EditorStore.setConnected(false);
    }
    ws.current.onclose = () => {
      const isNull = ws.current === null;
      console.info('[WS] closed');
      EditorStore.setConnected(false);
      if (!isNull) {
        ws.current.onmessage = null;
        reconnect.current = setTimeout(() => {
          reconnect.current = null;
          connect();
        }, 3000);
      }
      ws.current = null;
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
        fn.fn(e, code.current, ws.current);
        if (fn.preventDefault)
          e.preventDefault();
        return;
      }
    }
    e.preventDefault();
  }

  return (
    <div>
      <Head>
        <title>Collaborative Coding | Henrixounez</title>
        <meta name="Description" content="Online Collaborative Text Editor"/>
      </Head>
      <div
        css={[
          xw`flex flex-col items-center content-center relative overflow-hidden`,
          css`
            min-width: max-content;
            min-height: 100vh;
            background-color: #1E1E1E;
          `
        ]}
      >
        <div
          ref={scrollnumbers}
          className={styles.monospaced}
          css={[
            xw`absolute`,
            css`
              padding-left: 0.5em;
              font-size: 14px;
              line-height: 21px;
              top: calc(0.5em - ${EditorStore.scrollTop}px);
              left: 0;
              color: #858585;
            `
          ]}
        >
          {Array(EditorStore.totalLines).fill(undefined).map((e, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <pre
          onScrollCapture={(e: any) => {
            scrollnumbers.current.style.top = "calc(-" + e.target.scrollTop + "px + 0.5em)";
            EditorStore.setScrollTop(e.target.scrollTop);
          }}
          css={[
            xw`absolute overflow-scroll`,
            css`
              margin-left: 0.5em;
              left: calc(${(EditorStore.totalLines).toString().length} * 9px + 1em);
              min-width: calc(100vw - ${(EditorStore.totalLines).toString().length} * 9px - 1.5em);
              max-width: calc(100vw - ${(EditorStore.totalLines).toString().length} * 9px - 1.5em);
              max-height: calc(100vh - 22px);
              min-height: calc(100vh - 22px);
            `,
            customScrollbar
          ]}
        >
          <ClientsCursors/>
          <code
            className={"hljs " + styles.codeview}
            ref={code}
            contentEditable={true}
            spellCheck={false}
            onKeyDown={handleInput}
            onKeyUp={handleSpecialInput}
            css={[
              xw`block pr-16 overflow-visible`,
              css`
                width: fit-content;
                height: fit-content;
              `,
            ]}
          />
        </pre>
        <BottomBar ws={ws}/>
      </div>
    </div>
  );
})

export default Editor;