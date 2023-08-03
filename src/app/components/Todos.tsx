import React from 'react'
import Image from 'next/image';
import { Todo } from '../lib/drizzle';
import EachTodo from './EachTodo';
import { data } from 'autoprefixer';

//this functions fetches all todoList
async function getData() {
  try {
    const res=await fetch('http://127.0.0.1:3000/api/todo',{method:"GET",
  cache: 'no-store'})
  console.log(res.ok)
    if (!res.ok) {
      throw new Error('Failed to get data')
    } 
    else{return res.json();}
   
  } catch (error) {
    console.log(error)
  }

}

//todoTable
const todos =async() => {
 const res:{data:Todo[]}=await getData()

 return (

    <>
    {res.data.map((item:Todo)=>{
      return(
      <div className='flex items-center bg-white shadow bg-opacity-100 py-3 px-2 my-5 rounded-lg'>
      {/* circle bullet  */}
      <div className='h-3 w-3 mx-2  bg-secondary rounded-full'></div>
      {/* Individual Todo */}
      <EachTodo key={item.id} name={item.name} id={item.id} isdone={item.isdone} />

      </div>
    )
    })}
    
    </>
  )
}

export default todos