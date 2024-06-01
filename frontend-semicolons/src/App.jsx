import Editor from "./components/Editor";
import React from "react";
import NavBar from "./components/navbar";
import Home from "./Home";
import GenerateBlog from "./Generateblog";
import { Route, Routes } from "react-router-dom";
import ViewBlog from "./Viewblog";
import BlogCard from "../src/components/BlogCard";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import VerificationEditor from "./VerificationEditor";
import TipTap from "./GlobalEditor";
// import BookFilter from "./BookFilter";

const darkTheme = createTheme({
  palette: {
    mode: 'white',
  },
});

function App() {
  return (
    // <ThemeProvider theme={darkTheme}>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/generateblog" element={<GenerateBlog />} />
      <Route path="/viewblog" element={<ViewBlog />} />
      <Route path="/verify" element={<VerificationEditor />} />
    </Routes>
    // </ThemeProvider>
  );
}

export default App;

//     <div className="w-full flex flex-col items-center justify-center gap-2">
//

//
//         //   editorContent !== "" && (
//         //   <>
//         //     <p className="text-xl text-center font-bold">Preview</p>
        //     <div
        //       onClick={() => console.log(editorContent)}
        //       className="bg-white w-full max-w-lg p-3 rounded-lg shadow-lg cursor-pointer"
        //       dangerouslySetInnerHTML={{ __html: editorContent }}
        //     />
//         //   </>
//         // )
//
//     </div>
