import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:4000";
const GAMES_ENDPOINT = `${API_URL}/games`;
export const getGames = async () => {
  const response = await axios.get(GAMES_ENDPOINT);
  return response.data;
};

export const getGameById = async (id) => {
  const response = await axios.get(`${GAMES_ENDPOINT}/${id}`);
  return response.data;
};

/**
 * @typedef {Object} GameData
 * @property {string} name - The name of the game (minimum 4 characters).
 * @property {string} url - The URL of the game (must be a valid URL).
 * @property {string} author - The author of the game (minimum 4 characters).
 * @property {Date} publishedDate - The published date of the game.
 */
export const createGame = async (gameData) => {
  const response = await axios.post(GAMES_ENDPOINT, gameData);
  return response.data;
};

export const updateGame = async (id, gameData) => {
  const response = await axios.put(`${GAMES_ENDPOINT}/${id}`, gameData);
  return response.data;
};

export const deleteGame = async (id) => {
  await axios.delete(`${GAMES_ENDPOINT}/${id}`);
};
