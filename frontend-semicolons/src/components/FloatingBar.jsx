import React from "react";
import { FloatingMenu } from "@tiptap/react";


const FloatingBar = ({ editor }) => {


    // const [showInput, setshowInput] = useState(false)

    const handleAddContent = () =>{
        // setshowInput(true);
            const { view, state } = editor;
            const { from, to } = view.state.selection;
            //   const text = state.doc.textBetween(from, to, "\n");
            editor
              .chain()
              .focus()
              .deleteRange({ from: from, to: to })
              .insertContentAt(from, "hiii")
              .run();
            // editor.chain().focus().toggleHeading({ level: 1 }).run()
    }

  return (

    <FloatingMenu
      className="bg-black p-1 w-96 mx-6 rounded-md"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
    
      <div className="w-full flex flex-col items-center">
    
      <input
        type="text"
      
        placeholder="Write topic: eg-How to improve adherence to newlifestyle for recently diagnosed type 2 diabetic patients"
        className="w-full h-10 px-6 mb-2 border-[#3F3F3F] bg-[#252525] rounded-sm focus:outline-none text-white focus:ring-blue-600 focus:ring-opacity-50"
      />
      <button
        onClick={handleAddContent}
        className="inline-flex h-8 px-2 rounded-sm bg-gradient-to-b from-blue-500 to-blue-600 text-white text-sm focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
      >
        <strong>Add Content</strong>
      </button>
    </div>
    
    </FloatingMenu>
  );
};

export default FloatingBar;
