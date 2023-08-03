
import React,{Suspense} from "react";
import Image from "next/image";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import 'react-toastify/dist/ReactToastify.css';



export default function Home() {
  
//this function displays spinner when the content of the page is loading
  const Spinner=()=> {
    return (
      // animation effect while waiting for rendering
  <span className="h-screen w-full flex justify-center items-center">
        <span className="animate-ping relative flex h-10 w-10  rounded-full bg-purple-400 opacity-75"></span>
      </span>
    );
  }
  
  return (
    
    <main className="bg-gradient-to-tr from-primary to-secondary min-h-screen max-h-full flex justify-start items-center ">
      {/* Todos or Todo List*/}
    <Suspense fallback={Spinner()}>
      <div className=" max-w-md  md:py-8 bg-gradient-to-tr from-[#D9D9D9]/50 opacity-80 blur-[0.5px] to-[#D9D9D9]/80 backdrop:blur-3xl w-full px-3 py-12 rounded-xl  mx-auto my-auto drop-shadow-lg ">
        {/* @ts-ignore */}
        <div className="h-96 px-2    scrollbar-thumb-secondary scrollbar-thin scrollbar-track-gray-100 overflow-x-hidden overflow-y-scroll rounded-lg">
          <Todos />
        </div>
        {/* <AddTodo> */}
        <AddTodo />
        {/* horizontal line */}
        <div className="bg-[#2D2D2D] h-1.5 w-1/2 mx-auto rounded blur-none"></div>
      </div>
      </Suspense>
    </main>
  );
}

