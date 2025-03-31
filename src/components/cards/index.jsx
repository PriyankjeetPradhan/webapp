import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteGame } from "../../api";
import { useNavigate } from "react-router-dom";

const GamesCard = ({ game, setRefresh }) => {
  const navigate = useNavigate();

  return (
    <div
      key={game.url}
      className="border w-full border-gray-300 rounded-lg text-center shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-black flex flex-col"
    >
      <div className="flex-3">
        <img
          src={game.url}
          alt={game.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </div>

      <div className="flex-2 flex flex-col justify-between p-4 text-white">
        <div>
          <h3 className="text-lg font-semibold">{game.name}</h3>
          <p className="text-sm">By: {game.author}</p>
          <p className="text-xs text-gray-400">
            Published: {new Date(game.publishedDate).toLocaleDateString()}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <a
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm transition duration-300 hover:bg-secondary w-full"
          >
            Play Now
          </a>
        </div>

        <div className="flex justify-center space-x-4 mt-3 border-t border-gray-700 pt-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => navigate(`/create/${game.id}`)}
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => {
              console.log("Delete clicked for", game);
              deleteGame(game.id).then((res) => {
                setRefresh((prev) => !prev);
              });
            }}
          >
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesCard;
