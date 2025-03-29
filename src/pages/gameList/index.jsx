import React, { useEffect, useState } from "react";
import { getGames } from "../../api";
import GamesCard from "../../components/cards";
import { useDebounce } from "../../hook/useDebbounce";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debbouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    try {
      getGames(debbouncedSearch).then((response) => {
        setGames(response);
      });
    } catch (err) {
      setError("Failed to fetch games. Please try again later.");
    } finally {
      setLoading(false);
    }
    setGames([]);
  }, [refresh, debbouncedSearch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search games..."
          onChange={(e) => {
            setSearchTerm(e.target.value.toLocaleLowerCase());
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {games.map((game) => (
          <GamesCard key={game.id} game={game} setRefresh={setRefresh} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
