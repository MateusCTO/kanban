import React from "react";
import { Routes, Route } from "react-router-dom";
import KanbanBoard from "./components/KanbanBoard";
import CardDetails from "./pages/CardDetails";
import Navbar from "./components/Navbar";
import "./App.css";
import AddTask from "./pages/AddTask";

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<KanbanBoard />} />;
          <Route path="/cards/:id" element={<CardDetails />} />
          <Route path="/cards/addtask" element={<AddTask />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
