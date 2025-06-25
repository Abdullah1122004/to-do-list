import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useContext } from 'react';
import { ToDosContext } from '../../contexts/ToDosContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Alert } from '@mui/material';


export default function ToDo({task, editIcon, AlertTitle, OpenAlert}) {


    const {Tasks, SetTasks} = useContext(ToDosContext)

    const [IsDialogOpen, SetIsDialogOpen] = useState(false)

    function CheckTask(TaskId) {

        let NewTasks = Tasks.map((Task) => {
            if(Task.Id === TaskId) {
                return {...Task, IsChecked: !Task.IsChecked}
            }
            return Task
        })

            localStorage.setItem("Tasks", JSON.stringify(NewTasks))
            SetTasks(NewTasks)

         if(!task.IsChecked) {
            AlertTitle("تم تحويل المهمه إلي المهام المنجزه بنجاح")
            OpenAlert(true)

            setTimeout(() => {
                OpenAlert(false)
            }, 3000)
         }else {
            AlertTitle("تم تحويل المهمه إلي المهام غير المنجزه بنجاح")
            OpenAlert(true)
            
            setTimeout(() => {
                OpenAlert(false)
            }, 3000)
        }
    }

    function DeleteTaskIcon() {
        SetIsDialogOpen(true)
    }

    function DeleteTask(TaskId) {

        let NewTasks = []

        NewTasks = Tasks.filter((Task) => {
            if(TaskId === Task.Id)
                return false

            return true
        })

        localStorage.setItem("Tasks", JSON.stringify(NewTasks))
        SetTasks(NewTasks)

        AlertTitle("تم حذف المهمه بنجاح")
        OpenAlert(true)

        setTimeout(() => {
            OpenAlert(false)
        }, 3000)
    }   

    return(
        <>
            <Dialog 
                style={{direction: "rtl"}}
                open={IsDialogOpen}          
                onClose={() => {SetIsDialogOpen(false)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    هل أنت متأكد
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       تحذير إذا ضغط إحذف سوف تحذف الهمه تمامآ
                    </DialogContentText>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={() => {SetIsDialogOpen(false)}} >تراجع</Button>
                    <Button onClick={() => {DeleteTask(task.Id)}} autoFocus>إحذف</Button>
                </DialogActions>
            </Dialog>

            <div className={"task " + (task.IsChecked ? "checked-task" : "")}>      
                    <div className="content">
                        <h2>{task.Title}</h2>
                        <p>{task.Des}</p>
                    </div>
                    
                    <div className="icons">
                        <div onClick={() => {CheckTask(task.Id)}} className={'icon icon-check ' + (task.IsChecked ? "checked-icon" : "")}>
                            <CheckIcon />
                        </div>
                        <div onClick={() => {editIcon(task.Id)}} className='icon icon-edit'>
                            <EditIcon />
                        </div>
                        <div onClick={DeleteTaskIcon} className='icon icon-delete'>
                            <DeleteIcon />
                        </div>
                    </div>   
            </div>
        </>
    )
}