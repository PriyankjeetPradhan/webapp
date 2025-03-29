import React from "react";
import { useForm } from "react-hook-form";
import { createGame } from "../../api";

const CreateGame = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createGame({
      name: data.name,
      url: data.imageUrl,
      author: data.authorName,
      publishedDate: data.publishedDate,
    })
      .then((response) => {
        console.log("Game created successfully:", response);
      })
      .catch((error) => {
        console.error("Error creating game:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-[#2C2F40] shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-16"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-white text-sm font-bold mb-2"
        >
          Name:
        </label>
        <input
          id="name"
          {...register("name", { required: "Name is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="imageUrl"
          className="block text-white text-sm font-bold mb-2"
        >
          Image URL:
        </label>
        <input
          id="imageUrl"
          {...register("imageUrl", { required: "Image URL is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.imageUrl && (
          <p className="text-red-500 text-xs italic">
            {errors.imageUrl.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="authorName"
          className="block text-white text-sm font-bold mb-2"
        >
          Author Name:
        </label>
        <input
          id="authorName"
          {...register("authorName", { required: "Author Name is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.authorName && (
          <p className="text-red-500 text-xs italic">
            {errors.authorName.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="publishedDate"
          className="block text-white text-sm font-bold mb-2"
        >
          Published Date:
        </label>
        <input
          id="publishedDate"
          type="date"
          {...register("publishedDate", {
            required: "Published Date is required",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.publishedDate && (
          <p className="text-red-500 text-xs italic">
            {errors.publishedDate.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Game
      </button>
    </form>
  );
};

export default CreateGame;

// popup for success and rejection
// reset form state after success creation
// loading screen on listing page - card skeleton

// add button icons in each cards
