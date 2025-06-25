import ToDo from './ToDo'
import './ToDoList.css'
import {useState} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { ToDosContext } from '../../contexts/ToDosContext';


let IncreaseId = () => {
    let NewTaskId = localStorage.getItem("NewTaskId")
    return NewTaskId!==null ? JSON.parse(NewTaskId) : 0
}
let EditedTaskId = 0
console.log(localStorage.getItem("NewTaskId"));


export default function ToDoList({PageType = 0}) {

    const [AlertTitle, SetAlertTitle] = useState("")
    const [IsAlertOpen, SetIsAlertOpen] = useState(false)

    const [EditedTask, SetEditedTask] = useState({Id: 0, Title: "", Des: "", IsChecked: false})
    
    const [IsModalOpen, SetIsModalOpen] = useState(false)
    const [NewTask, SetNewTask] = useState("")
    
    
    
    useEffect(() => {
        alert("hi")
    }, [])
    


    const {Tasks, SetTasks} = useContext(ToDosContext)
    
    
    const TasksList = Tasks.map((Task) => {
        
        if(PageType === 1) {
            if(Task.IsChecked) {
                return (
                    <ToDo  key={Task.Id} task={Task}  editIcon={EditTaskIcon} AlertTitle={SetAlertTitle} OpenAlert={SetIsAlertOpen}/>
                )
            }
        }else if(PageType === 2) {
            if(!Task.IsChecked) {
                return (
                    <ToDo  key={Task.Id}  task={Task} editIcon={EditTaskIcon} AlertTitle={SetAlertTitle} OpenAlert={SetIsAlertOpen}/>
                )
            }
        }else 
            return (
                <ToDo  key={Task.Id}  task={Task} editIcon={EditTaskIcon} AlertTitle={SetAlertTitle} OpenAlert={SetIsAlertOpen}/>
            )
        }
    )
    
    
    function EditTaskIcon(TaskId) {
        
        EditedTaskId = TaskId
        console.log(TaskId)
        
        Tasks.map((Task) => {
            if(TaskId === Task.Id) {
                SetEditedTask(Task)
            }         
        })
        
        SetIsModalOpen(true)
    }
    
    function EditTask() {
        
        let NewTask = {...EditedTask}
        
        let NewTasks = Tasks.map((Task) => {
            if(Task.Id === EditedTaskId) {
                return NewTask
            }
            return Task
        })
        
        SetIsModalOpen(false)
        
        localStorage.setItem("Tasks", JSON.stringify(NewTasks))
        SetTasks(NewTasks)

        SetAlertTitle("تم التعديل بنجاح")
        SetIsAlertOpen(true)

        CloseAlert(3000)
    } 
    
    function AddTask() {
        
        let Id = IncreaseId()
        Id++
        console.log(Id)
        localStorage.setItem("NewTaskId", JSON.stringify(Id))
        
        let NewTaskId = JSON.parse(localStorage.getItem("NewTaskId"))
        // console.log(localStorage.getItem("NewTaskId"))
        
        let NewArr = [...Tasks, {Id: NewTaskId, Title: NewTask, Des: "", IsChecked: false}];
        
        SetNewTask("")
        
        localStorage.setItem("Tasks", JSON.stringify(NewArr))
        SetTasks(NewArr)
        
        SetAlertTitle("تم إضافة المهمه بنجاح")
        SetIsAlertOpen(true)

        CloseAlert(3000)
    }
    

    function CloseAlert(time)  {
        setTimeout(() => {
            SetIsAlertOpen(false)
        }, time)
    }

    return(

        <>
            <Alert severity="success"
            onClose={() => {SetIsAlertOpen(false)}}
            className={IsAlertOpen ? 'enaple' : 'disaple'}  
            style={{position: "absolute", bottom: "0", left: "0", gap: "10px"}}
            >{AlertTitle}</Alert>

            <main className="to-do-list">
                <h1>مهامي</h1>
                
                <section className="filter-to-dos">
                    <Link to="/">
                        <button className={PageType!==1 && PageType!==2 ? 'hold-all': ''}>الكل</button>
                    </Link>
                   
                    <Link to="/Checked">
                        <button className={PageType===1 ? 'hold-checked' : ''}>منجز</button>
                    </Link>
                   
                    <Link to="/NonChecked">
                        <button className={PageType===2 ? 'hold-non-checked': ''}>غير منجيز</button>
                    </Link>
                </section>

                <section id="tasks">
                    {TasksList}
                </section>

                <section className='new-task'>
                    <input style={{textAlign: "start"}} value={NewTask} placeholder='عنوان المهمه' onChange={
                        (event) => {SetNewTask(event.target.value)}
                    }/>
                    <button style={NewTask === "" ? {background: "gray"} : {}} disabled={NewTask === ""}  onClick={AddTask}>إضافه</button>
                </section>
                    

                <Dialog open={IsModalOpen}>
                    <DialogTitle>تعديل المهمه</DialogTitle>
                    <DialogContent>
                       <TextField
                        sx={{"input": {textAlign: "start"}}}
                        margin="dense"
                        label="عنوان المهمه"
                        fullWidth
                        value={EditedTask.Title}
                        onChange={(event) =>
                            SetEditedTask({ ...EditedTask, Title: event.target.value })
                        }
                        dir="rtl"
                        slotProps={{
                            input: {
                            style: { textAlign: "right" }
                            }
                        }}
                        />
                        <TextField
                        margin="dense"
                        label="وصف المهمه"
                        fullWidth
                        multiline
                        rows={3}
                        value={EditedTask.Des}
                        onChange={(event) => {SetEditedTask({...EditedTask, Des: event.target.value})}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={() => {SetIsModalOpen(false)}}>إلغاء</Button>
                        <Button  color="primary" onClick={EditTask}>تعديل</Button>
                    </DialogActions>
                </ Dialog >
         
          </main>

            
        </>
    )
}