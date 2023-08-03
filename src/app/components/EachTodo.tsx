"use client";
import React, { useTransition } from "react";
import Image from "next/image";
import { Todo } from "../lib/drizzle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
type Props = { name: string; id: number; isdone: boolean };

//Each Todo
const EachTodo = (props: Props) => {
  const [check, setCheck] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setDeleting] = useState(false);

  const { refresh } = useRouter();

  const isMutating = isPending || isDeleting;
  // this function deletes todo
  const delTodo = async (id: number) => {
    setDeleting(true);

    try {
      const res = await fetch("/api/todo", {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      } else {
        toast.success("Todo Deleted");
        startTransition(() => {
          refresh();
        });
      }
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
  };

  //this function updates todo
  const updateTodo = async (id: number, isdone: boolean) => {
    try {
      const res = await fetch("/api/todo", {
        method: "PATCH",
        body: JSON.stringify({ id: id, isdone: !isdone }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to patch data");
      }
      else{
        const data = await res.json();
      toast.success("Todo Updated");
      startTransition(() => {
        refresh();
      });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="font-medium px-3 py-2 text-lg">{props.name}</div>
      <div className="ml-auto flex justify-center items-center">
        <div>
          {/* input */}
          <input
            className="h-6 w-6 mr-4 mt-1 "
            onClick={() => updateTodo(props.id, props.isdone)}
            checked={props.isdone}
            type="checkbox"
            name="checkbox"
            id="checkbox"
          />
        </div>
        <button
          disabled={isMutating}
          className={` hover:scale-105 duration-300 
                ${isMutating ? "bg-slate-200" : "text-red-200"}`}
        >
          <Image
            onClick={() => delTodo(props.id)}
            src={"/del.svg"}
            width={40}
            height={40}
            alt="del_Icon"
          />
        </button>
      </div>
    </>
  );
};

export default EachTodo;
