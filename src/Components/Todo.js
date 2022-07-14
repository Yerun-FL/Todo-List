import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./Todo.css";
import Dropdowns from "./DropDown";
import DropView from "./DropView";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [inputForm, setinputForm] = useState("");
  const [editInputForm, setEditInputForm] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editItem, seteditItem] = useState(null);
  const [prioritys, setPrioritys] = useState("");
  const [todoList, setTodoList] = useState(useSelector((e) => e.reducer.list));
  const [filterPriority, setFilterPriority] = useState();
  const [completedTodo, setCompletedTodo] = useState(false);

  const dispatch = useDispatch();
  let selector = useSelector((e) => e.reducer.list);
  const priority = useSelector((state) => state.reducer.dropdown_val);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  // ................setting items into local storage..................
  useEffect(() => {
    console.log(selector);
    if (selector?.length !== 0) {
      localStorage.setItem("Todos", JSON.stringify(selector));
    }
  }, [selector, inputForm]);

  //.................Priority Filtering..............
  useEffect(() => {
    console.log(priority);
    if (priority !== "All") {
      setTodoList(selector.filter((element) => element.priority === priority));
    }
    if (priority === "All") {
      setTodoList(selector);
    }
    if (priority === "Completed") {
      setTodoList(
        selector.filter((element) => element.completed === completedTodo)
      );
    }
  }, [selector, priority, completedTodo]);

  // ......................Edit Functionality..............................
  const editSubmitHandler = (id) => {
    let editError = selector.find((elem) => elem.id === editItem);

    if (
      editError.data.toLowerCase().trim() ===
        editInputForm.toLowerCase().trim() &&
      editError.priority === editPriority
    ) {
      alert("Please update the values..");
    } else if (editInputForm) {
      const editedTodoList = selector.map((e) => {
        if (e.id === editItem) {
          console.log(e.data);
          return { ...e, data: editInputForm, priority: editPriority };
        }
        return e;
      });

      dispatch({
        type: "EditTodo",
        payload: {
          editedList: editedTodoList,
        },
      });

      setTodoList(editedTodoList);
      handleClose();
    } else if (!editInputForm) {
      alert("enter todo ❌");
    }
  };

  const getPriority = (prioritys) => {
    setPrioritys(prioritys);
  };

  const getFilter = (filterPriority) => {
    setFilterPriority(filterPriority);
  };

  // ............. completed Button Functionality................
  const disableHandler = (id) => {
    console.log(id);
    setCompletedTodo(true);
    const editedTodoList = selector.map((e) => {
      if (id === e.id) {
        return { ...e, completed: true };
      }
      return e;
    });

    console.log(editedTodoList);

    dispatch({
      type: "EditTodo",
      payload: {
        editedList: editedTodoList,
      },
    });
  };

  // .............View button Funtion..................
  const viewHandler = (element) => {
    console.log(element);
    navigate("view", { state: element });
  };

  // .............AddTodo Funtionality..................
  // ..................Validation.................
  let validation = selector.filter(
    (task) =>
      task.data.toLowerCase().trim() === inputForm.toLocaleLowerCase().trim()
  );
  // ...................Adding todo.................
  const addTodoHandler = () => {
    if (!inputForm) {
      alert("Please fill the Todo❌");
    } else if (!prioritys) {
      alert("fill priority ❌");
    } else if (validation.length > 0) {
      alert("task exist");
      setinputForm("");
      setPrioritys("");
    } else {
      dispatch({
        type: "AddTodo",
        payload: {
          id: new Date().toString(),
          data: inputForm,
          priority: prioritys,
          completed: false,
        },
      });
      setinputForm("");
      setPrioritys("");
    }
  };

  return (
    <div className="TodoFull">
      <Container>
        <Form.Text style={{ color: "white" }}>Enter a Todo.... </Form.Text>
        <Form.Control
          className="inputFields w-75"
          type="text"
          placeholder="enter here"
          value={inputForm}
          onChange={(e) => setinputForm(e.target.value)}
        />
        <DropView propvalue={getPriority} currPriority={prioritys} />
        {/* <Form.Text style={{ color: "white" }}>( High, Medium, Low ) </Form.Text> */}
        <br />
        <Button
          variant="outline-primary"
          onClick={() => {
            addTodoHandler();
          }}
          style={{
            marginTop: 20,
            fontWeight: 700,
            fontSize: 20,
            border: "solid",
          }}
        >
          Add Todo
        </Button>

        {/* ..........................todo section.......................... */}
        {selector.length > 0 && (
          <div className="HereTodo-Sub">
            <div className="HereTodo-text">Todo.. </div>
            <div>
              <Dropdowns propFilterValue={getFilter} />
            </div>
          </div>
        )}
        {console.log(todoList)}

        <div className="ListTodo">
          <ul>
            {todoList.map((element) => {
              return (
                <>
                  <div key={element.id}>
                    <div
                      className={
                        !element.completed
                          ? `InnerTodo ${element.priority}`
                          : `disableTodo ${element.priority}`
                      }
                    >
                      <h4>{element.data}</h4>
                      <div className="EditTodo">
                        <Button
                          variant="light"
                          onClick={() => viewHandler(element)}
                        >
                          View
                        </Button>

                        <Button
                          variant="light"
                          onClick={() => {
                            setEditInputForm(element.data);
                            setEditPriority(element.priority);
                            seteditItem(element.id);
                            handleShow();
                          }}
                          // disabled={element.completed}
                          style={{
                            display: element.completed ? "none" : "block",
                          }}
                        >
                          Edit
                        </Button>

                        {/* .......... Open Modal-("Edit")............*/}
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header
                            closeButton
                            style={{ backgroundColor: " #C0C0C0" }}
                          >
                            <Modal.Title>Edit here</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Priority:
                            <Form.Select
                              className="w-75"
                              value={editPriority}
                              onChange={(e) => {
                                setEditPriority(e.target.value);
                              }}
                              defaultValue={element.priority}
                            >
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </Form.Select>
                            <br />
                            Todo:
                            <br />
                            <input
                              className="editInput w-75"
                              placeholder="edit here"
                              value={editInputForm}
                              onChange={(e) => setEditInputForm(e.target.value)}
                            ></input>
                          </Modal.Body>
                          <Modal.Footer style={{ backgroundColor: " #C0C0C0" }}>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={editSubmitHandler}
                            >
                              Save changes
                            </Button>
                          </Modal.Footer>
                        </Modal>

                        <Button
                          variant="light"
                          onClick={() => disableHandler(element.id)}
                          // disabled={element.completed}
                          style={{
                            display: element.completed ? "none" : "block",
                          }}
                        >
                          Mark as Completed
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            {todoList.length === 0 && <p className="Ptags">No todos here..</p>}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Todo;
