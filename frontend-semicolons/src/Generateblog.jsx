import React from "react";
import Editor from "./components/Editor";

const GenerateBlog = () => {
  let contentData =
    "<p><strong>Hello World,</strong></p><p>This Is a Demo Use of The Editor</p><p></p><p>Try Your Self like<u> UnderLine</u></p><p>or <s>Strike</s></p><p><strong>Bold is Gold</strong></p><p><em>Italic Is Elite</em></p><p><em><mark>Or You Want To Highlight</mark></em></p><p>Did I told You About Justify</p><p style='text-align: right'>Left</p><p>right</p><p style='text-align: center'>or even center</p><p>try The Link &amp; visit <a target='_blank' rel='noopener noreferrer nofollow' class='link link' href='https://github.com/mahmoud-bebars'>My GitHub</a></p><p style='text-align: center'></p>";
  // const [editorContent, setEditorContent] = React.useState(contentData);
  return (
    <div>
      <div className="h-auto w-full dark:bg-black bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[10] relative flex items-start justify-center pt-40 pb-80">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
        <Editor content={contentData}  />
      </div>
    </div>
  );
};

export default GenerateBlog;
