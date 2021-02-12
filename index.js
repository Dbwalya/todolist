import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./style.css";

function Todo({todo, index, completeTodo, handleFilter}){
  return(
  <div className="todoList" style={{textDecoration:todo.onCompleted ? 'line-through':""}}>
    {todo.text}
    <div>
    <button onClick={() => completeTodo(index)} className = "accomplished"> Accomplished </button>
    <button onClick={() => handleFilter(index)} className = "cancel"> X </button>
  </div> 
  </div>

  );
}

function TodoForm({addTodo}) {
  const [value,setValue] = useState("")

  function handleSubmit(e) {

    e.preventDefault(); 

    if(!value) return;

    addTodo(value)

    setValue("")
  }


  return(
     <div className = "enter">
        <form onSubmit = { handleSubmit }>
             <input type = "text" className = "input" value = { value }
             onChange = {e => setValue (e.target.value) }/>
        </form>
     </div>
    
  )
}

function App() {

  const [todoList, setTodos] = useState([
    {
      text: "Getting started with React",
      onCompleted: false
    },
    {
      text:"Walking the dog",
      onCompleted:false
    }
  ]);


  function addTodo(text){
    const newTodos = [...todoList,{text}];
    setTodos(newTodos);
  }

  function completeTodo(index){  const newTodos = [...todoList];

    newTodos[index].onCompleted = true;

    setTodos(newTodos);

  }


  function handleFilter(index) {
    const newTodos = [...todoList];

    newTodos.splice(index,1);

    setTodos(newTodos);
  }

  return(
    <div className="app">
    <div class="todo-list">
      {todoList.map((todoList, index) => (
        <Todo
        key={index}
        index={index}
        todo={todoList}
        completeTodo={completeTodo}
        handleFilter={handleFilter}
        />
      ))}
    </div> 
      <TodoForm addTodo={addTodo}/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
