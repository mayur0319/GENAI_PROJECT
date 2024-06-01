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

import FormatBoldOutlinedIcon from "@mui/icons-material/FormatBoldOutlined";
// import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined';
// import StrikethroughSOutlinedIcon from '@mui/icons-material/StrikethroughSOutlined';
// import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined';
// import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
// import AlignHorizontalCenterOutlinedIcon from "@mui/icons-material/AlignHorizontalCenterOutlined";
// import FormatUnderlinedOutlinedIcon from "@mui/icons-material/FormatUnderlinedOutlined";

const MenuBar = ({ editor, showSave }) => {
  const setLink = React.useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }
  const activeButton = " text-white  px-3 py-1 rounded-lg bg-[#3F3F3F]  ";
  const inActiveButton =
    " bg-black text-white px-2 py-1 rounded-sm hover:bg-[#3F3F3F] ";
  return (
    <div className="sticky top-15 z-40 flex flex-col gap-3">
      <div className="bg-[#252525] border-b-2 border-[#3F3F3F] p-2 rounded-t-lg w-full">
        <div className=" flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              editor.chain().focus().toggleBold().run();
            }}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? activeButton : inActiveButton}
          >
          <FormatBoldOutlinedIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? activeButton : inActiveButton
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.9768 1.00002H9C8.44772 1.00002 8 1.44773 8 2.00002C8 2.5523 8.44772 3.00002 9 3.00002H13.656L8.25597 21H3C2.44772 21 2 21.4477 2 22C2 22.5523 2.44772 23 3 23H8.97753C8.99281 23.0004 9.00805 23.0004 9.02325 23H15C15.5523 23 16 22.5523 16 22C16 21.4477 15.5523 21 15 21H10.344L15.744 3.00002H21C21.5523 3.00002 22 2.5523 22 2.00002C22 1.44773 21.5523 1.00002 21 1.00002H15.0225C15.0072 0.999667 14.992 0.999669 14.9768 1.00002Z"
                fill="#1C274C"
              />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={
              editor.isActive("strike") ? activeButton : inActiveButton
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.8478904,11.5001562 L19.5006547,11.5001562 C20.0529395,11.5001562 20.5006547,11.9478714 20.5006547,12.5001562 C20.5006547,13.0524409 20.0529395,13.5001562 19.5006547,13.5001562 L17.1137633,13.5001562 C17.7747503,14.2751195 18.1123743,15.1751423 18.1123743,16.1846657 C18.1123743,19.1136639 14.8315614,21.0995436 11.0788131,20.6634184 C8.75105766,20.3928985 7.11435978,19.4445262 6.25234572,17.8309482 C5.99210883,17.3438187 6.04470088,16.8153343 6.5,16.5 C6.95529912,16.1846657 7.75616099,16.4014175 8.01639789,16.888547 C8.54931939,17.8861066 9.61990333,18.4804107 11.309689,18.676789 C13.896445,18.9774086 16.1123743,17.7669108 16.1123743,16.1846657 C16.1123743,15.0863913 15.5648903,14.2452102 14.0050052,13.5001562 L5,13.5001562 C4.44771525,13.5001562 4,13.0524409 4,12.5001562 C4,11.9478714 4.44771525,11.5001562 5,11.5001562 L13.8119942,11.5001562 C13.8307081,11.4999479 13.8317916,11.4999479 13.8478904,11.5001562 Z M6.98665712,9.69502914 C6.88193369,9.53686417 6.78285514,9.37004162 6.68906499,9.18567756 C6.38864048,8.59513068 6.22082631,7.97078799 6.2541897,7.35 C6.41351811,4.38539771 9.18804866,2.63703628 12.8561724,3.06332691 C15.1166494,3.32602801 16.8455314,4.1472353 18.0031217,5.55 C18.3546422,5.97597157 18.2759716,6.59847949 17.85,6.95 C17.4240284,7.30152051 16.8015205,7.27597157 16.45,6.85 C15.6371571,5.8649993 14.3820633,5.25411876 12.6252965,5.04995629 C10.0646712,4.75237349 8.25382943,5.76809262 8.25382943,7.37339471 C8.25382943,8.08716624 8.49271744,8.59318684 9.01562556,9.18315041 C9.24071099,9.43709981 9.66268082,9.70868258 10.281535,9.99789872 L7.19220303,9.99789872 C7.08081789,9.8347183 7.01230258,9.73376177 6.98665712,9.69502914 Z"
              />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline") ? activeButton : inActiveButton
            }
          >
           U
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 })
                ? activeButton
                : inActiveButton
            }
          >
            <strong>H1</strong>
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 })
                ? activeButton
                : inActiveButton
            }
          >
            <strong>H2</strong>
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 })
                ? activeButton
                : inActiveButton
            }
          >
            <strong>H3</strong>
          </button>
          <div className="border-r h-5 rounded-lg border-gray-200 mx-1  " />
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={
              editor.isActive("highlight") ? activeButton : inActiveButton
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                d="M5.25 2C4.00736 2 3 3.00736 3 4.25V7.25C3 8.49264 4.00736 9.5 5.25 9.5H18.75C19.9926 9.5 21 8.49264 21 7.25V4.25C21 3.00736 19.9926 2 18.75 2H5.25Z"
                fill="#212121"
              />
              <path
                d="M5 11.75V11H19V11.75C19 12.9926 17.9926 14 16.75 14H7.25C6.00736 14 5 12.9926 5 11.75Z"
                fill="#212121"
              />
              <path
                d="M7.50294 15.5H16.5013L16.5017 16.7881C16.5017 17.6031 16.0616 18.3494 15.36 18.7463L15.2057 18.8259L8.57101 21.9321C8.10478 22.1504 7.57405 21.8451 7.50953 21.3536L7.503 21.2529L7.50294 15.5Z"
                fill="#212121"
              />
            </svg>
          </button>
          <div className="border-r h-5 rounded-lg border-gray-200 mx-1  " />
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" })
                ? activeButton
                : inActiveButton
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              fill="currentColor"
              className="w-5 h-5"
            >
              <g id="Q3_icons" data-name="Q3 icons">
                {" "}
                <g id="Q3_icons" data-name="Q3 icons">
                  <path d="M44,16a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2H4a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2Z" />
                  <path d="M32,8a2,2,0,0,1-2,2H6A2,2,0,0,1,4,8H4A2,2,0,0,1,6,6H30a2,2,0,0,1,2,2Z" />
                  <path d="M44,32a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2H4a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2Z" />
                  <path d="M32,24a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2H4a2,2,0,0,1,2-2H30a2,2,0,0,1,2,2Z" />
                  <path d="M32,40a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2H4a2,2,0,0,1,2-2H30a2,2,0,0,1,2,2Z" />
                </g>
              </g>
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" })
                ? activeButton
                : inActiveButton
            }
          >
            Center
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" })
                ? activeButton
                : inActiveButton
            }
          >
            Right
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" })
                ? activeButton
                : inActiveButton
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              fill="currentColor"
              className="w-5 h-5"
            >
              <g id="Q3_icons" data-name="Q3 icons">
                <path d="M44,16a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2H4a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2Z" />
                <path d="M44,8a2,2,0,0,1-2,2H6A2,2,0,0,1,4,8H4A2,2,0,0,1,6,6H42a2,2,0,0,1,2,2Z" />
                <path d="M44,32a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2H4a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2Z" />
                <path d="M44,24a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2H4a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2Z" />
                <path d="M44,40a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2H4a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2Z" />
              </g>
            </svg>
          </button>
          <div className="border-r h-5 rounded-lg border-gray-200 mx-1  " />
          <button
            onClick={setLink}
            className={editor.isActive("link") ? activeButton : inActiveButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
              strokeLinecap="round"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 12C14 14.7614 11.7614 17 9 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H7.5M10 12C10 9.23858 12.2386 7 15 7H17C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17H16.5"
              />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
            className={editor.isActive("link") ? inActiveButton : activeButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
              strokeLinecap="round"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 7C4.23858 7 2 9.23858 2 12C2 14.7614 4.23858 17 7 17H9C11.1636 17 13.0062 15.6258 13.7026 13.7026M17 17H16.5M10 12C10 11.4021 10.1049 10.8288 10.2974 10.2974M21 21L13.7026 13.7026M3 3L10.2974 10.2974M10.2974 10.2974L13.7026 13.7026M13.0464 7.39604C13.6466 7.14106 14.3068 7 15 7H17C19.7614 7 22 9.23858 22 12C22 13.2151 21.5665 14.329 20.8458 15.1954"
              />
            </svg>
          </button>
          {
            showSave ?
            <button 
          className="px-4 py-1 border-2 rounded-md bg-gradient-to-b from-blue-500 to-blue-600  focus:ring-2 focus:ring-blue-400 hover:shadow-xl">
          <Link to="/" >Save Blog</Link>
          </button>: ""
        }
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
