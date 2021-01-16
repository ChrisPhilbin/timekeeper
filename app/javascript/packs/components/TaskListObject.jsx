import React, { useState } from 'react'

const TaskListObject = (props) => {

    let [checkout, setCheckout] = useState(props.task.is_checked_out)
    let [task, setTask] = useState(props.task)
    let [finished, setFinished] = useState(props.task.finished)

    const token = document.querySelector('[name=csrf-token]')

    const updateTask = () => {
        fetch(`/api/v1/projects/${props.projectId}/tasks/${task.id}`)
        .then(response => response.json())
        .then(data => setTask(data))
    }

    const msToHHMMSS = (ms) => {
        let seconds = ms / 1000;
        let hours = parseInt( seconds / 3600 );
        seconds = seconds % 3600;
        let minutes = parseInt( seconds / 60 );
        seconds = seconds % 60;
        seconds = seconds.toFixed(0)
        return(`${hours}:${minutes}:${seconds}`)
    }

    const handleCheckout = (e) => {
        e.preventDefault()
        let date = new Date()
        fetch(`/api/v1/projects/${props.projectId}/tasks/${task.id}`, {
            method: 'put',
            mode: 'cors',
            body: `{"task":{"check_out":"${date}","is_checked_out":"true"}}`,
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token.content
            }
        })
        .then(response => response.json())
        .then(data => setTask(data))
        setCheckout(true)
    }

    const handleCheckin = (e) => {
        updateTask()
        let checkOut = new Date(`${task.check_out}`)
        let currentDateTime = new Date()
        let totalTime = task.total_time + (currentDateTime - checkOut)
        fetch(`/api/v1/projects/${props.projectId}/tasks/${task.id}`, {
            method: 'put',
            mode: 'cors',
            body: `{"task":{"total_time":"${totalTime}","check_out":"${''}","check_in":"${currentDateTime}","is_checked_out":"false"}}`,
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token.content
            }
        })
        .then(response => response.json())
        .then(data => setTask(data))
        setCheckout(false)
    }

    const toggleFinished = () => {
        setFinished(!finished)
        fetch(`/api/v1/projects/${props.projectId}/tasks/${task.id}`, {
            method: 'put',
            mode:   'cors',
            body:   `{"task":{"finished":${finished}}}`,
            headers:{
                'Content-Type': 'application/json',
                'x-csrf-token': token.content
            }
        })
        .then(response => response.json())
        .then(data => setTask(data))
    }

    return(
        <>
            <div className={finished ? "container task-object task-object-finished" : "container task-object"}>
                <div className="row">
                    <div className="col-md-3">
                        {task.name}
                    </div>

                    <div className="col-md-3">
                        {task.description}
                    </div>

                    <div className="col-md-3">
                        {msToHHMMSS(task.total_time)}
                    </div>

                    <div className="col-md-3">
                        {checkout ? <button className="btn btn-outline-danger" onClick={handleCheckin}>Check-in task</button> : <button className="btn btn-outline-success" onClick={handleCheckout}>Check-out task</button> }
                        
                        {finished ? <button className="btn btn-outline-success" onClick={toggleFinished}>Open task</button> : <button className="btn btn-outline-danger" onClick={toggleFinished}>Close task</button> }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskListObject