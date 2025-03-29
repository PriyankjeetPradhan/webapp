import React, { useEffect, useState } from "react";
import { getGames } from "../../api";
import GamesCard from "../../components/cards";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      getGames().then((response) => {
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
    <div className="p-8">
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
          className="p-2 border-2 border-primary rounded-lg flex-1 text-lg"
        />
        <button
          onClick={() => (window.location.href = "/create")}
          className="p-2 px-4 bg-primary text-white rounded-lg text-lg transition duration-300 hover:bg-secondary"
        >
          Create Game
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-between">
        {games.map((game) => (
          <GamesCard game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
