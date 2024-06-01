import React from "react";
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

import MenuBar from "./MenuBar.jsx";
import FloatingBar from "./FloatingBar";
import BubbleMenuBar from "./BubbleMenu";
import CircleLoader from "react-spinners/CircleLoader";
import axios from "axios";

const Editor = ({ content }) => {
  let contentData =
    "<p><strong>Hello World,</strong></p><p>This Is a Demo Use of The Editor</p><p></p><p>Try Your Self like<u> UnderLine</u></p><p>or <s>Strike</s></p><p><strong>Bold is Gold</strong></p><p><em>Italic Is Elite</em></p><p><em><mark>Or You Want To Highlight</mark></em></p><p>Did I told You About Justify</p><p style='text-align: right'>Left</p><p>right</p><p style='text-align: center'>or even center</p><p>try The Link &amp; visit <a target='_blank' rel='noopener noreferrer nofollow' class='link link' href='https://github.com/mahmoud-bebars'>My GitHub</a></p><p style='text-align: center'></p>";

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
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  const data = "Hello World";

  const [isEditorVisible, setIsEditorVisible] = React.useState(false);
  const [responseData, setResponseData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [topic, setTopic] = React.useState();
  const [allData, setAllData] = React.useState(null);
  const [showSave, setShowSave] = React.useState(false);
  const [regeneratedText, setRegeneratedText] = React.useState(null);


  const generateOutline = async (event) => {
    event.preventDefault();

      setLoading(true);
    if (!topic) {
      throw new Error("Topic variable is not defined");
    }

    const outlinePrompt = `
      Task: Provide a prompt to write a blog on provided topic.
      Topic: ${topic}
      Persona:
        - You are a famous medical field blog writer.
      Required Points:
        - Title
        - keywords
        - Create a outline for a blog post about a topic.
        - Include a list of key points, including the main points, supporting points, and key takeaways.
        - Use bullet points to organize the list.
        - Include a summary of the topic.
      Format: HTML (Answer should be embedded in HTML document)
    `;

    const formData = {
      generate: "outline",
      prompt: outlinePrompt,
      token: 1000,
      temp: 0.7,
    };

    try {

      const response = await axios.post(
        "https://sgfq0sbbhe.execute-api.us-east-2.amazonaws.com/default/generate_content",
        formData
      );
      setResponseData(response.data);
      setIsEditorVisible(!false);
      console.log(response.data);
      console.log("herrerererre",JSON.parse(response.data.body).response);
      editor.commands.setContent(JSON.parse(response.data.body).response);

    } catch (err) {
      setError(err);
      console.log("error", err);
    } finally {
      setLoading(false);
    }

  };

  const generateBlog = async ()=>{
    editor.commands.selectAll();
    const { view, state } = editor;
            const { from, to } = view.state.selection;
            const selectedOutline = state.doc.textBetween(from, to, "\n");
            console.log("Selected Text", selectedOutline);
            

    if (!selectedOutline) {
      throw new Error("Outline is not selected");
    }

    const blogPrompt = `
      Task: Write a blog on provided outline.
      Outline: ${selectedOutline}
      Persona:
        - You are a famous medical field blog writer.
      Format: HTML (Answer should be embedded in HTML document)
    `;
    setLoading(true);
    const formData = {
      generate: "content",
      prompt: blogPrompt,
      token: 1500,
      temp: 0.7,
    };

    
    try {

      const response = await axios.post(
        "https://sgfq0sbbhe.execute-api.us-east-2.amazonaws.com/default/generate_content",
        formData
      );
      setResponseData(response.data);
      setIsEditorVisible(!false);
      // console.log(response.data);
      console.log(JSON.parse(response.data.body).maincontent);
      editor.commands.setContent(JSON.parse(response.data.body).maincontent);

      JSON.parse(response.data.body).maincontent &&  setShowSave(true);

    } catch (err) {
      setError(err);
      console.log("error", err);
    } finally {
      setLoading(false);
    }

  }



  return (
    <div className="w-8/12 h-auto lg:flex md:flex flex-col gap-8 items-start justify-center">
      <h1> Hi eieiedkfds</h1>
      {
        <div className="h-20 w-full flex items-start">
          {isEditorVisible ? (
            <button onClick={generateBlog}
            className="inline-flex w-full h-full w-50 text-2xl font-bold items-center justify-center px-10 rounded-md bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
              {
                loading?<CircleLoader color="#fff" className="px-6 font-extrabold"/>:
                <strong>Generate Blog</strong>
}
            </button>
          ) : (
            <>
              <input
                type="text"
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
                placeholder="Write topic: eg-How to improve adherence to newlifestyle for recently diagnosed type 2 diabetic patients"
                className="h-full w-4/5 px-6 mb-3 border-[#3F3F3F] bg-[#252525] rounded-l-md focus:outline-none text-white focus:ring-blue-600 focus:ring-opacity-50"
              />
              <button
                onClick={() => generateOutline(event)}
                className="inline-flex h-full w-50 items-center justify-center px-10 rounded-r-md bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
              >
                {loading?<CircleLoader color="#fff" className="px-6 font-extrabold"/>:(<strong>Create Outline</strong>)}
              </button>
            </>
          )}
        </div>
      }

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

export default Editor;
