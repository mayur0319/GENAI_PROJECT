import React from "react";
import { BubbleMenu } from "@tiptap/react";
import axios from "axios";

const BubbleMenuBar = ({ editor }) => {

  const regenerateText=async()=>{

    console.log("regenerate");
    const { view, state } = editor;
            const { from, to } = view.state.selection;
            const selectedText = state.doc.textBetween(from, to, "\n");
            console.log("Selected Text", selectedText);


    if (!selectedText) {
      throw new Error("Outline is not selected");
    }

    const regeneratePrompt = `
      Task: Rephrase and rewrite the below text and make it more creative and informative using context of text.
      Text: ${selectedText}
      Result: A paragraph of text that is more creative and informative than the original text.
      Format: HTML (Answer should be embedded in HTML document.Don't add h2 tag in this response just add p tag) 
    `;
    // setLoading(true);
    const formData = {
      generate: "regenerate",
      prompt: regeneratePrompt,
      token: 500,
      temp: 0.7,
    };

    try {
      console.log("here");
      const response = await axios.post(
        "https://sgfq0sbbhe.execute-api.us-east-2.amazonaws.com/default/generate_content",
        formData
      );
      console.log("response", response.data);
      console.log("herrerererre in regenerate",JSON.parse(response.data.body).response);
     response && editor
      .chain()
      .focus()
      .deleteRange({ from: from, to: to })
      .insertContentAt(from, JSON.parse(response.data.body).response)
      .run();

    } catch (err) {
      // setError(err);
      console.log("error", err);
    } finally {
      // setLoading(false);
      console.log("Done");
    }
}

  const activeButton = " text-white  m-1 px-3 py-1 rounded-lg bg-[#3F3F3F] ";
  const inActiveButton =
    " bg-black text-white px-2 py-1 m-1 border-2 border-[#3F3F3F] rounded-sm hover:bg-[#3F3F3F]";
  return (
    <BubbleMenu
      className="bg-black p-2 mx-2 rounded-md"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <button
        onClick={regenerateText}
        className="h-6 px-4 w-32 rounded-sm bg-gradient-to-b from-blue-500 to-blue-600 text-white text-sm focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
      >
        Re-generate
      </button>
    </BubbleMenu>
  );
};

export default BubbleMenuBar;
