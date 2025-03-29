import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createGame, getGameById, updateGame } from "../../api";
import { useEffect } from "react";
import { fetchGameById } from "../../api";
import { useParams } from "react-router-dom";

const CreateGame = ({ existingGame }) => {
  const { id: gameId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: existingGame || {},
  });

  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (gameId) {
      getGameById(gameId)
        .then((gameData) => {
          reset({
            name: gameData.name,
            imageUrl: gameData.url,
            authorName: gameData.author,
            publishedDate: gameData.publishedDate.split("T")[0],
          });
        })
        .catch((error) => {
          showPopup("Error fetching game data. Please try again.", true);
          console.error("Error fetching game data:", error);
        });
    }
  }, []);

  const showPopup = (message, error = false) => {
    setPopupMessage(message);
    setIsError(error);
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  };

  const onSubmit = (data) => {
    if (gameId) {
      updateGame(gameId, {
        name: data.name,
        url: data.imageUrl,
        author: data.authorName,
        publishedDate: data.publishedDate,
      })
        .then(() => {
          showPopup("Game updated successfully!");
        })
        .catch((error) => {
          showPopup("Error updating game. Please try again.", true);
          console.error("Error updating game:", error);
        });
    } else {
      createGame({
        name: data.name,
        url: data.imageUrl,
        author: data.authorName,
        publishedDate: data.publishedDate,
      })
        .then(() => {
          showPopup("Game created successfully!");
          reset();
        })
        .catch((error) => {
          showPopup("Error creating game. Please try again.", true);
          console.error("Error creating game:", error);
        });
    }
  };

  return (
    <div>
      {popupVisible && (
        <div
          className={`absolute top-16 right-4 px-4 py-2 rounded shadow-md ${
            isError ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {popupMessage}
        </div>
      )}
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
          {gameId ? "Update Game" : "Create Game"}
        </button>
      </form>
    </div>
  );
};

export default CreateGame;
