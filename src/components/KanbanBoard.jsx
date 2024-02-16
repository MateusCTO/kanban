import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import axios from "axios";

const API_URL = "http://localhost:3000";

export default function Board() {
  const [toDo, setToDo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  const deletePreviousState = (sourceDroppableId, taskId) => {
    switch (sourceDroppableId) {
      case "1":
        setToDo(removeItemById(taskId, toDo));
        break;
      case "2":
        setInProgress(removeItemById(taskId, inProgress));
        break;
      case "3":
        setDone(removeItemById(taskId, done));
        break;
      default:
        break;
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [...toDo, ...inProgress, ...done]);

    // Remove the task from the source column
    switch (source.droppableId) {
      case "1":
        setToDo(removeItemById(draggableId, toDo));
        break;
      case "2":
        setInProgress(removeItemById(draggableId, inProgress));
        break;
      case "3":
        setDone(removeItemById(draggableId, done));
        break;
      default:
        break;
    }

    setNewState(destination.droppableId, task);
  };

  const setNewState = (destinationDroppableId, task) => {
    const updatedTask = {
      ...task,
      status: getStatusByColumnId(destinationDroppableId),
    };

    axios
      .put(`${API_URL}/cards/${task.id}`, updatedTask)
      .then((response) => {
        console.log(response.data.status);
        // Handle the response or update local state if needed
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
        // Handle errors if needed
      });

    switch (destinationDroppableId) {
      case "1": // TO DO
        setToDo([...toDo, updatedTask]);
        break;
      case "2": // IN PROGRESS
        setInProgress([...inProgress, updatedTask]);
        break;
      case "3": // DONE
        setDone([...done, updatedTask]);
        break;
      default:
        break;
    }
  };

  const findItemById = (id, array) => {
    return array.find((item) => item.id === id);
  };

  const removeItemById = (id, array) => {
    return array.filter((item) => item.id !== id);
  };

  const getStatusByColumnId = (columnId) => {
    switch (columnId) {
      case "1":
        return "To Do";
      case "2":
        return "In Progress";
      case "3":
        return "Done";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/cards`)
      .then((response) => response.data)
      .then((json) => {
        setToDo(json.filter((task) => task.status === "To Do"));
        setInProgress(json.filter((task) => task.status === "In Progress"));
        setDone(json.filter((task) => task.status === "Done"));
      });
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>PROJECT BOARD</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "1300px",
          margin: "0 auto",
        }}
      >
        <Column title={"TO DO"} tasks={toDo} id={"1"} />
        <Column title={"IN PROGRESS"} tasks={inProgress} id={"2"} />
        <Column title={"DONE"} tasks={done} id={"3"} />
      </div>
    </DragDropContext>
  );
}
