import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [task,setTask] = useState("");
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      setTasks(response.data);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    });
  }, [])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:task});
    axios.post(URL + 'add.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setTasks(tasks => [...tasks,response.data]);
      setTask('');
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((response) => {
        const newListWithoutRemoved = tasks.filter((item) => item.id !== id);
        setTasks(newListWithoutRemoved);
      }).catch (error => {
        alert(error.response ? error.response.data.error : error);
      });

  }
  
  return (
    <div className='container'>
      <h1>shopping List</h1>
      <form onSubmit={save}>
        <label>New Item</label>
        <input value={task} placeholder='type description' onChange={e => setTask(e.target.value)} />
        <button>Add</button>
      </form>
      {tasks?.map(task =>(
        <li key={task.id}>
          {task.description}&nbsp;
          <a href='#' className="delete" onClick={() => remove(task.id)}>
            Delete
          </a>
          </li>
      ))}
    </div>
  );
}

export default App;
