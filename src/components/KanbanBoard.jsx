import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function Board() {
  const [toDo, setToDo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/cards")
      .then((response) => response.json())
      .then((json) => {
        setToDo(json.filter((task) => task.status === "To Do"));
        setInProgress(json.filter((task) => task.status === "In Progress"));
        setDone(json.filter((task) => task.status === "Done"));
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [...toDo, ...inProgress, ...done]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId, taskId) {
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
    }
  }

  function setNewState(destinationDroppableId, task) {
    switch (destinationDroppableId) {
      case "1": // TO DO
        setToDo([...toDo, task]);
        break;
      case "2": // IN PROGRESS
        setInProgress([...inProgress, task]);
        break;
      case "3": // DONE
        setDone([...done, task]);
        break;
    }
  }

  function findItemById(id, array) {
    return array.find((item) => item.id === id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id !== id);
  }

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
