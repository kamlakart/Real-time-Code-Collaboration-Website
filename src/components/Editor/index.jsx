import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {darcula} from '@uiw/codemirror-theme-darcula';
import {okaidia} from '@uiw/codemirror-theme-okaidia';
import './index.css'

function Editor() {
  return (
    <div className="codeArea">
      <CodeMirror
        value="console.log('hello world!');"
        height="100vh"
        // theme={okaidia}
        extensions={[javascript({ jsx: true })]}
        // onChange={onChange}
      />
    </div>
  );
}
export default Editor;
