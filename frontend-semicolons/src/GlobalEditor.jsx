// Create tiptap editor

import React,  { useState } from 'react';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent } from '@tiptap/react';
import MenuBar from './components/MenuBar';
import FloatingBar from './components/FloatingBar';
import BubbleMenuBar from './components/BubbleMenu';



const TipTap = () => {
    const editor = new Editor({
    extensions: [StarterKit],
    content: `
      <h1>
        Hi there,
      </h1>
      
    `,
    
  });
  const [showSave, setShowSave] = React.useState(false);
  console.log("Why execute two times");
    return (
    <div>
    <MenuBar editor={editor}  />
    <FloatingBar editor={editor} />
    <BubbleMenuBar editor={editor} />
      <EditorContent className="bg-[#252525] text-white w-full p-6 rounded-b-md focus:border" editor={editor} />
    </div>
  );
}
export default TipTap;

