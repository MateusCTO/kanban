import React from "react";
import { Routes, Route } from "react-router-dom";
import KanbanBoard from "./components/KanbanBoard";
import CardDetails from "./pages/CardDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />;
        <Route path="/cardDetails/:id" element={<CardDetails />} />
      </Routes>
    </div>
  );
}

export default App;
