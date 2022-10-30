import React, { useState } from "react"
import { EditorState } from "draft-js"
import Editor from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import "draft-js/dist/Draft.css"
import '@draft-js-plugins/hashtag/lib/plugin.css';

const wrapper = {
  width: 400,
  height: 150,
  backgroundColor: "aliceblue"
}

const hashtagPlugin = createHashtagPlugin()

const Draft:React.FC = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  return(
    <>
      <div style={{...wrapper}}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={[hashtagPlugin]}
        />
      </div>
    </>
  )
}
export default Draft