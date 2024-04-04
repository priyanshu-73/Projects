import { useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEdit = () => {};

  const handleDelete = () => {};

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleCheckBox = (e) =>{
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = {...todos};
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="container w-[1000px] mx-auto bg-blue-100 rounded-xl my-5 p-5 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            className="outline-none w-1/2"
            type="text"
          />
          <button
            onClick={handleAdd}
            className="p-3 bg-violet-800 hover:bg-violet-950 py-1 text-white text-sm font-bold rounded-md mx-6"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.map((item) => {
            return (
              <div key={item.id} className="todo flex w-1/3 justify-between my-3">
                <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted}/>
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons">
                  <button
                    onClick={handleEdit}
                    className="p-3 bg-violet-800 hover:bg-violet-950 py-1 text-white text-sm font-bold rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-3 bg-violet-800 hover:bg-violet-950 py-1 text-white text-sm font-bold rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

