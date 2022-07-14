// import logo from "./logo.svg";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./Components/Todo";
import View from "./Components/View";
import { Routes, Route } from "react-router-dom";
import NavbarTodo from "./Components/Nav";

function App() {
  return (
    <div className="App">
      <NavbarTodo />
      <main>
        <Routes>
          {/* <Route path="/navbar" element={<NavbarTodo />}></Route> */}
          <Route path="/" element={<Todo />}></Route>
          <Route path="/view" element={<View />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
