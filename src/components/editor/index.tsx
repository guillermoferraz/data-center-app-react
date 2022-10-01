import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';

interface EditorTypes {
  setContent: (e: string) => void;
  content: string;
}

export const Editor = ({setContent, content}:EditorTypes) => {

  const editor = useRef(null);


  const config : any = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: '450px',
    uploader: { insertImageAsBase64URI: true },
    style: {
      background: '#ffffff',
    },
    /*filebrowser: {
      ajax: {
         url: 'http://localhost' /* ruta de servidor con archivos estaticos */
     //} */
   //}
  };

	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			onBlur={setContent} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => { }}
		/>
	);
}


