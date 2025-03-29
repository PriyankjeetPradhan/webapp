import React, { useEffect, useState } from "react";
import { getGames } from "../../api";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      getGames().then((response) => {
        console.log("Fetched games:", response);
        setGames(response);
      });
    } catch (err) {
      setError("Failed to fetch games. Please try again later.");
    } finally {
      setLoading(false);
    }
    setGames([]);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search games..."
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setGames((prevGames) =>
              prevGames.filter((game) =>
                game.name.toLowerCase().includes(searchTerm)
              )
            );
          }}
          className="p-2 border-2 border-blue-500 rounded-lg flex-1 text-lg"
        />
        <button
          onClick={() => (window.location.href = "/create")}
          className="p-2 px-4 bg-blue-500 text-white rounded-lg text-lg transition duration-300 hover:bg-blue-700"
        >
          Create Game
        </button>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {games.map((game) => (
          <div
            key={game.imageUrl}
            className="border border-gray-300 rounded-lg p-4 w-60 text-center shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <img
              src={game.imageUrl}
              alt={game.name}
              className="w-full rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {game.name}
            </h3>
            <p className="text-sm text-gray-600 mb-1">By: {game.author}</p>
            <p className="text-sm text-gray-500 mb-2">
              Published: {new Date(game.publishedDate).toLocaleDateString()}
            </p>
            <a
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm transition duration-300 hover:bg-blue-700"
            >
              Play Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
