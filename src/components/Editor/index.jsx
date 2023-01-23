import { useEffect, useMemo, useRef } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import {githubLight, githubDark} from '@uiw/codemirror-theme-github'
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import './index.css'
import { useState } from 'react';
import ACTIONS from '../../Actions';

const extensions = [cpp()];

export default function Editor({socket, roomId, onCodeChange}) {
  const editor = useRef();
  const [code, setCode] = useState('');
  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    value: code,
    theme: bbedit,
    height: '100vh',
    width: '75vw',
    onChange: ((code, codeUpdates)=> {
      setCode(code);
      onCodeChange(code);
      if(codeUpdates.selectionSet)
      {
        socket.emit(ACTIONS.CODE_CHANGE, {code, roomId});
      }
    }),
  });

  useEffect(() => {
    if (editor.current) {
      socket.on(ACTIONS.CODE_CHANGE, ({code})=> {
        setCode(code);
      })
      setContainer(editor.current);
    }
    return ()=> {
      socket.off(ACTIONS.CODE_CHANGE);
    }
  }, [editor.current]);

  return <div className='codeArea' ref={editor} />;
}