import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";

function DropDownView(props) {
  const dispatch = useDispatch();

  const [priority, setPriority] = useState("All");

  useEffect(() => {}, [priority]);
  useEffect(() => {
    dispatch({
      type: "FilterPriority",
      payload: priority,
    });
  }, [dispatch, priority]);

  return (
    <Form.Select
      style={{ marginTop: 10 }}
      onChange={(e) => {
        setPriority(e.target.value);
      }}
    >
      <option defaultValue={true} value="All">
        All
      </option>
      <option value="Completed">Completed</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </Form.Select>
  );
}

export default DropDownView;
