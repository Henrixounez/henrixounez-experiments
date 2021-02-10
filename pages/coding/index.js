import { useRef } from 'react';
import styles from './style.module.css';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import { useState } from 'react';
import { useEffect } from 'react';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import { JSHINT } from 'jshint';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/hint/show-hint.css';

const Editor = () => {
  const [loaded, setLoaded] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    setLoaded(true);
    require('codemirror/mode/javascript/javascript');
    require('codemirror/addon/lint/javascript-lint');
    require('codemirror/addon/lint/lint');
    require('codemirror/addon/hint/javascript-hint');
    window.JSHINT = JSHINT;
  }, []);

  if (!loaded)
    return null;

  return (
    <div style={{
      width: "100vw",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{width: "50%"}}>
        <CodeMirror
          value='console.log("lol");'
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true,
            tabSize: 2,
            indentWithTabs: false,
            lint: true,
            gutters: ["CodeMirror-lint-markers"],
          }}
          PREVENT_CODEMIRROR_RENDER={true}
          onChange={(editor, data, value) => {
            console.log('here ?');
            let toExec = "(() => {\n";
            toExec += "let logs = \"\";\n";
            toExec += "console.oldlog = console.log;";
            toExec += "console.log = (e) => { logs += (e + \" \"); };";
            toExec += value + ";\n";
            toExec += "console.log = console.oldlog;";
            toExec += "return logs;\n";
            toExec += "})()"
            console.log(
              toExec
            );
            try {
              const returnValue = eval(toExec);
              setResult(returnValue);
            } catch (e) {
              console.log(e);
            };
          }}
        />
      </div>
      <div style={{width: "50%"}}>
          {result}
      </div>
    </div>
  );
}

export default Editor;