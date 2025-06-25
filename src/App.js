import './App.css';
import ToDoList from './components/ToDoList/ToDoList'
import { Routes, Route } from "react-router-dom";
import { ToDosContext } from './contexts/ToDosContext';
import { useState } from 'react';

function App() {
 
  const [Tasks, SetTasks] = useState(() => {
        let StorageTasks = localStorage.getItem("Tasks");
        return StorageTasks ? JSON.parse(StorageTasks) : []
  });
 
  return (
    
    <ToDosContext.Provider value={{Tasks,SetTasks}}>
      <div className="App">

        <Routes>
          <Route path="/" element={<ToDoList/>}/>
          <Route path="/Checked" element={<ToDoList PageType={1}/>}/>
          <Route path="/NonChecked" element={<ToDoList PageType={2}/>}/>
        </Routes>
      </div>
    </ToDosContext.Provider>
  );
}

export default App;
