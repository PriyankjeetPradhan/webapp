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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          id="imageUrl"
          {...register("imageUrl", { required: "Image URL is required" })}
        />
        {errors.imageUrl && <p>{errors.imageUrl.message}</p>}
      </div>
      <div>
        <label htmlFor="authorName">Author Name:</label>
        <input
          id="authorName"
          {...register("authorName", { required: "Author Name is required" })}
        />
        {errors.authorName && <p>{errors.authorName.message}</p>}
      </div>
      <div>
        <label htmlFor="publishedDate">Published Date:</label>
        <input
          id="publishedDate"
          type="date"
          {...register("publishedDate", {
            required: "Published Date is required",
          })}
        />
        {errors.publishedDate && <p>{errors.publishedDate.message}</p>}
      </div>
      <button type="submit">Create Game</button>
    </form>
  );
};

export default CreateGame;
