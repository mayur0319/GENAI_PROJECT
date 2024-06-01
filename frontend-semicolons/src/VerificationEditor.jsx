import {useEffect, useState} from "react";
// Main TipTap Components & editor Initator
import { EditorContent, useEditor } from "@tiptap/react";
// Tiptap STraterKit
import StarterKit from "@tiptap/starter-kit";
// Document & Paragraph
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
// For Link Adding
import Link from "@tiptap/extension-link";
// Text Styles & Formating
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";

import MenuBar from "./components/MenuBar";
import FloatingBar from "./components/FloatingBar";
import BubbleMenuBar from "./components/BubbleMenu";
import CircleLoader from "react-spinners/CircleLoader";
import axios from "axios";
import { useLocation } from "react-router-dom";


const VerificationEditor = ({ }) => {
  let content =
    "<p><strong>Hello World,</strong></p><p>This Is a Demo Use of The Editor</p><p></p><p>Try Your Self like<u> UnderLine</u></p><p>or <s>Strike</s></p><p><strong>Bold is Gold</strong></p><p><em>Italic Is Elite</em></p><p><em><mark>Or You Want To Highlight</mark></em></p><p>Did I told You About Justify</p><p style='text-align: right'>Left</p><p>right</p><p style='text-align: center'>or even center</p><p>try The Link &amp; visit <a target='_blank' rel='noopener noreferrer nofollow' class='link link' href='https://github.com/mahmoud-bebars'>My GitHub</a></p><p style='text-align: center'></p>";
  const location = useLocation();
  const showSave = false;
  const blogBody = location.state.blog;

  const [isEditorVisible, setIsEditorVisible] = useState(false);

//   console.log("verification blog", blogBody);
  const startTag = '<body>';
const endTag = '</body>';

// Find the starting and ending positions of the body content
const startIndex = blogBody.indexOf(startTag) + startTag.length;
const endIndex = blogBody.lastIndexOf(endTag);

// Extract the content between the start and end positions
const bodyContent = blogBody.substring(startIndex, endIndex);

console.log(bodyContent);
// editor.commands.setContent(bodyContent)


const startEdit = () => {
    editor.commands.setContent(bodyContent);
    setIsEditorVisible(true);
}

  
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    extensions: [
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Underline,
      Document,
      Paragraph,

      Link.configure({
        openOnClick: true,
        validate: (href) => /^https?:\/\//.test(href),
        HTMLAttributes: {
          class: "link",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: blogBody,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });


  
  return (
    <div className="h-auto mx-48 flex flex-col gap-8 align-center justify-center">
      <h1> Hi eieiedkfds</h1>
        <div className="h-20 w-full flex items-start">
          
            <button onClick={startEdit}
            className="inline-flex w-full h-full w-50 text-2xl font-bold items-center justify-center px-10 rounded-md bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                     
                <strong>Edit</strong>

            </button>
        </div>
 

      {isEditorVisible && (
        <div className="relative w-full">
          <MenuBar editor={editor} showSave={showSave} />
          <FloatingBar editor={editor} />
          <BubbleMenuBar editor={editor} />
          <EditorContent
            editor={editor}
            className="bg-[#252525] text-white w-full p-6 rounded-b-md focus:border"
          />
        </div>
      )}
    </div>
  );
};

export default VerificationEditor;
