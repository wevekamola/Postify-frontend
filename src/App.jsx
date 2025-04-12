import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import PostDetailsPage from "./pages/PostDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
