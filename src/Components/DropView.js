// import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./DropView.css";

function DropView(props) {
  const Dropviewhandler = (e) => {
    props.propvalue(e.target.value);
  };

  return (
    <div className="dropview">
      <Form.Select
        onChange={Dropviewhandler}
        className="w-25 inputdropView"
        value={props.currPriority}
      >
        <option style={{ display: "none" }}>Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </Form.Select>
    </div>
  );
}

export default DropView;
