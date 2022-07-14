// import React from "react";
// import { useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./View.css";

const View = () => {
  // const selectorView = useSelector((e) => e.reducer.list);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  // const { element } = params;
  const { data, priority, id, completed } = location.state;

  const backHandler = () => {
    navigate("/", { replace: true });
    // alert("hi");
  };

  return (
    <div className="view-body">
      <Container>
        <div className="miniViewBody" key={id}>
          <h3>
            Description:{" "}
            <span
              style={{
                color: "#E6E6E6",
                fontWeight: 700,
              }}
            >
              {data}
            </span>
          </h3>
          <h3>
            Date:{" "}
            <span style={{ color: "#E6E6E6", fontWeight: 700 }}>{id}</span>
          </h3>
          <h3>
            Priority:{" "}
            <span style={{ color: "#E6E6E6", fontWeight: 700 }}>
              {priority}
            </span>
          </h3>
          <h3>
            Task Status:{" "}
            <span style={{ color: "#E6E6E6", fontWeight: 700 }}>
              {completed ? "Completed" : "Not Completed"}
            </span>
          </h3>
        </div>
        <Button onClick={backHandler}>Back</Button>
      </Container>
    </div>
  );
};
export default View;
