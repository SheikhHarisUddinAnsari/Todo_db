"use client";
import React, { useState, Suspense, FC, ChangeEvent } from "react";
import Image from "next/image";
import { newTodo } from "../lib/drizzle";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useTransition } from "react";
type Props = {};

const AddTodo = (props: Props) => {
  const [task, setTask] = useState<newTodo | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isFetching, setFetching] = useState(false);

  const { refresh } = useRouter();

  //create inline adding UI
  const isMutating = isPending || isFetching;

  //this function add todo
  const handleSubmit = async (e: any) => {
    setFetching(true);
    try {
      if (task) {
        e.preventDefault();
        const res = await fetch("/api/todo", {
          method: "POST",
          body: JSON.stringify({
            name: task.name,
          }),
        });
        if (!res.ok) {
          throw new Error("Failed to post data");
        } else {
          toast("Task added successfully");
          startTransition(() => {
            // Refresh the current route and fetch new data from the server without
            // losing client-side browser or React state.
            setValue("");
            refresh();
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setFetching(false);
  };

  //this function changes input field and clear it on submit
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ name: e.target.value, isdone: false });
    setValue(e.target.value);
  };

  return (
    <div>
      <form className="w-full flex gap-x-3 my-6">
        {/* Input */}
        <input
          type="text"
          placeholder="write a new task"
          value={value}
          onChange={(e) => handleChange(e)}
          className="bg-white py-3.5 px-5 border w-full rounded-3xl focus:outline-secondary "
        />
        <button
          disabled={isMutating}
          onClick={(e) => handleSubmit(e)}
          className="p-4 hover:scale-105 duration-300 shrink-0 bg-gradient-to-t from-primary to-secondary rounded-full"
        >
          {isMutating ? (
            <svg
              className="animate-spin  h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <Image
              src={"/AddButton.svg"}
              width={20}
              height={20}
              alt="arrow_vector"
            />
          )}
        </button>
      </form>

      <ToastContainer className="relative left-[33rem]" />
    </div>
  );
};

export default AddTodo;
