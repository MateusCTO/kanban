import { useEffect, useState } from "react";
import { Route } from "react-router-dom";

function CardDetails(props) {
  const [cardDetails, setCardDetails] = useState(null);
  useEffect(() => {
    // Destructure props
    const { id } = props;

    fetch
      .get(`src/data/data.json/${id}`)
      .then((response) => {
        setCardDetails(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {cardDetails &&
        cardDetails.map((card) => {
          return (
            <article key={card.id}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <p>{card.assignee}</p>
              <p>{card.status}</p>
              <p>{card.priority}</p>
              <p>{card.createdDate}</p>
              <p>{card.dudeDate}</p>
            </article>
          );
        })}
    </div>
  );
}
export default CardDetails;
