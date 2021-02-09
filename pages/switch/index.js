import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import xw from 'xwind';
import Layout from '../../components/layout';

const Switch = () => {
  const [activated, setActivated] = useState(false);
  const [canClick, setCanClick] = useState(true);
  const ws = useRef(null);
  const reconnect = useRef(null);
  const canClickTm = useRef(null);

  const connect = () => {
    ws.current = new WebSocket(`${process.env.NODE_ENV === 'development' ? 'ws://localhost:8080' : 'wss://henrixounez-api.herokuapp.com'}/switch/connect`);
    ws.current.onopen = (mess) => {
      console.log('[WS] open');
    }
    ws.current.onmessage = (mess) => {
      const data = JSON.parse(mess.data);
      setActivated(data.value);
    }
    ws.current.onclose = () => {
      console.log('[WS] closed');
      reconnect.current = setTimeout(() => {
        reconnect.current = null;
        connect();
      }, 3000);
    }
  }

  useEffect(() => {
    connect();
    return () => {
      if (ws.current)
        ws.current.close();
      if (reconnect.current)
        clearTimeout(reconnect.current);
      if (canClickTm.current)
        clearTimeout(canClickTm.current);
    }
  }, []);

  const handleClick = () => {
    if (canClick === false || canClickTm.current)
      return;
    try {
      setCanClick(false);
      canClickTm.current = setTimeout(() => {
        setCanClick(true);
        canClickTm.current = null;
      }, 800);
      ws.current.send(!activated);
    } catch (e) {}
  }

  return (
    <Layout title='Switch' showPage description='Useless Multiplayer Switch'>
      <button css={[xw`p-5 shadow-lg rounded-lg duration-1000`, activated ? xw`bg-green-200 dark:bg-green-900` : xw`bg-red-200 dark:bg-red-900`, css`width: 100px; height: 100px`]} onClick={handleClick}>
        {activated ? 'ON' : 'OFF'}
      </button>
    </Layout>
  );
}

export default Switch;