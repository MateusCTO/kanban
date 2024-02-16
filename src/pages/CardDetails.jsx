import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CardDetails() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/cards/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCard(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const deleteCard = () => {
    axios
      .delete(`http://localhost:3000/cards/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      className="frontSide"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        borderRadius: "30px",
        margin: "100px",
        width: "500px",
      }}
    >
      {card && (
        <article
          key={card.id}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
            flexDirection: "column",
          }}
        >
          <h3>TASK: {card.title}</h3>
          <p>
            <b>Developer: </b>
            {card.assignee}
          </p>
          <p>
            <b>Description: </b>
            {card.description}
          </p>
          <p>
            <b>Status: </b>
            {card.status}
          </p>
          <p>
            <b>Priority: </b>
            {card.priority}
          </p>
          <p>
            <b>Create Date: </b>
            {card.createdDate}
          </p>
          <p>
            <b>Due Date: </b>
            {card.dueDate}
          </p>
          <div>
            <button
              style={{ margin: 10 }}
              className="button-85"
              onClick={deleteCard}
            >
              Delete Card
            </button>
          </div>
        </article>
      )}
    </div>
  );
}

export default CardDetails;
