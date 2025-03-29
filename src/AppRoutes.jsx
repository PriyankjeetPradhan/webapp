import React from "react";
import { Route, Routes } from "react-router-dom";
import GameList from "./pages/gameList";
import CreateGame from "./pages/createGame";
import Layout from "./layout";

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/create/:id" element={<CreateGame />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
