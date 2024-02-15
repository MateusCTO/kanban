import React from "react";
import styled from "styled-components";
import Card from "./Card";
import "./scroll.css";
import { Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #f4f5f7;
  border-radius: 10px;
  width: 400px;
  height: 900px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid gray;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: #2e2d63;
  text-align: center;
`;

const TaskList = styled.div`
  padding: 3px;
  transistion: background-color 0.2s ease;
  background-color: #f4f5f7;
  flex-grow: 1;
  min-height: 500px;
`;

export default function Column({ title, tasks, id }) {
  return (
    <Container className="column">
      <Title
        style={{
          position: "sticky",
          top: "0",
        }}
      >
        {title}
      </Title>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Link style={{ textDecoration: "none" }} to={`/cards/${task.id}`}>
                <Card key={index} index={index} task={task} />
              </Link>
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
