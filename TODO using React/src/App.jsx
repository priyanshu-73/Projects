import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [finished, setFinished] = useState(true)

  const toggleFinished = (e) => {
    setFinished(!finished)
  }
  

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }
  }, [])
  
  const saveTOLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () =>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveTOLS()
  }
  
  const handleCheckBox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map(item => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(newTodos);
    saveTOLS()
  }
  
  const handleEdit = (e, id) =>{
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveTOLS()
  }
  
  const handleDelete = (e, id) =>{
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveTOLS()
  }
  
  return (
    <>
      <Navbar/>
      <div className="mx-3 container bg-blue-100 h-[80vh] w-[70vw] md:mx-auto rounded-md py-3 p-2 my-5 md:w-[35%]">
        <h1 className="flex justify-center font-bold">iTask - Manage your Todos at one place</h1>
        <div className="addtodo">
          <h2 className="font-bold text-xl m-1">Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="h-[35px] outline-none p-1 w-1/2 rounded-md" />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 p-3 py-1 rounded-md hover:bg-violet-950 text-white font-bold mx-3">Add</button>
        </div>
        <input type="checkbox" className="my-4" onChange={toggleFinished} checked={finished}/> Show Finished
        <h2 className="font-bold my-3 mx-1">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to Display</div>}
          {todos.map((item) =>{
            return (finished || !item.isCompleted) && (
            <div key={item.id} className="todo flex justify-between my-3 items-center">
              <div className="flex gap-5">
                <input name={item.id} type="checkbox" onChange={handleCheckBox} checked={item.isCompleted}/>
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className="bg-violet-800 p-2 py-1 rounded-md hover:bg-violet-950 text-white font-bold mx-1"><FaRegEdit /></button>
                <button onClick={(e) => {handleDelete(e, item.id)}} className="bg-violet-800 p-2 py-1 rounded-md hover:bg-violet-950 text-white font-bold mx-1"><MdDelete /></button>
            </div>
            </div>)
          })}
        </div>
      </div>
    </>
  );
}

export default App;

