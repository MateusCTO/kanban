import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const status = "To Do";
    const task = { title, description, priority, dueDate, status };

    axios
      .post(`${API_URL}/cards`, task)
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:{" "}
          <input
            value={title}
            name="title"
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description:{" "}
          <input
            value={description}
            name="description"
            type="text"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Priority :{" "}
          <input
            value={priority}
            name="priority"
            type="text"
            placeholder="Low, Medium or High"
            required
            onChange={(e) => setPriority(e.target.value)}
          />
        </label>
        <label>
          Due date :{" "}
          <input
            value={dueDate}
            name="dueDate"
            type="date"
            required
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
