import React, { useState, useMemo } from 'react';
import './App.css';

function App() {
  const [filter, setFilter] = useState('all')
  const [todos, setTodos] = useState([{
    id: 1,
    title: 'Buy milk',
    description: 'Buy 1 liter of milk in Auchan',
    done: false
  }, {
    id: 2,
    title: 'Wash a car',
    description: "Wash sister`s Audy before New Year party",
    done: false
  }
  ])
  
  const [finished, setFinished] = useState([1])
  console.log(todos)
 const markup = {
   actions: ({id, title, description, done}) => {
      return (
        <div className={finished.includes(id) ? "todo todos__done" : "todo"} key={id}>
          <h2>{title}</h2> 
          <p>{description}</p>
          {!finished.includes(id) ? 
          <button className="btn-todo" onClick={() => setFinished(prev => [...prev, id])}>Done</button> :
          <button className="btn-todo" onClick={() => setFinished(prev => prev.filter(i => i!==id))}>Restore</button>
        }
          
          <button className="btn-todo" onClick={() => setTodos(prev => prev.filter(i => i.id!==id))}>Delete</button>
        </div>
      )
   }
 }

const submit = (e) => {
  e.preventDefault()
  setTodos(prev => [{
    id: Date.now(),
    title: document.getElementById("title").value,
    description: document.getElementById("descr").value,
    done: false
  }, ...prev])
}
const renderedList = []

const renderList = () => {
  renderedList.length = 0
  if (filter === 'all'){
    todos.forEach(action => renderedList.push(markup.actions(action)))
  } if(filter === 'done') {
    todos.forEach(i => finished.includes(i.id) ? renderedList.push(markup.actions(i)) : false)
  } if(filter === 'active') {
    todos.forEach(i => finished.includes(i.id) ? false :renderedList.push(markup.actions(i)))
  }
}
console.log(finished)
renderList()
  return (
    <div className="App">

      <select className="filter" onChange={(e) => {setFilter(e.target.value)}}>
        <option value="all">To Do</option>
        <option value="done">Done</option>
        <option value="active">Active</option>
      </select>

      <form  onSubmit={submit}>
      <input className="field" type="text" minlength="5" id="title" placeholder="Create your to do action"></input>
      <input className="field" type="text" minlength="5" id="descr" placeholder="Describe your to do action"></input>
      <input className="field" type="submit"></input>
      </form>
        <div className="todos">
        {renderedList}
        </div>  
    </div>
  );
}

export default App;