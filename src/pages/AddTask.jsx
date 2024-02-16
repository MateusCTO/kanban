import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const status = "To Do";
    const createdDate = new Date().toDateString();
    const formatedDueDate = new Date(dueDate).toDateString();

    const task = {
      title,
      description,
      priority,
      dueDate: formatedDueDate,
      status,
      user,
      createdDate,
    };

    axios
      .post(`${API_URL}/cards`, task)
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  }
  return (
    <div
      className="frontSide"
      style={{ margin: "100px", height: "280px", width: "400px" }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          marginLeft: "5px",
          height: "250px",
          justifyContent: "space-between",
        }}
        onSubmit={handleSubmit}
      >
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
          User:{" "}
          <input
            value={user}
            name="user"
            type="text"
            required
            onChange={(e) => setUser(e.target.value)}
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
          <select
            name="priority"
            required
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
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

        <button
          style={{ alignSelf: "center" }}
          className="button-85"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
