import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import TaskListObject from './TaskListObject'

const TaskList = (props) => {

    const id = props.id
    let [taskObjects, setTaskObjects] = useState([])
    
    const getTasks = () => {
        fetch(`/api/v1/projects/${id}/tasks/`)
        .then(response => response.json())
        .then(data => setTaskObjects(data))
    }

    const createTask = (task) => {
        let tasks = [task, ...taskObjects]
        setTaskObjects(tasks)
    }

    useEffect(() => {
        getTasks()
    }, [])

    return(
        <>
            <TaskForm createTask={createTask} id={id} />

            <div className="container task-header">
                <div className="row">
                    <div className="col-md-3">
                        Task name
                    </div>

                    <div className="col-md-3">
                        Task description
                    </div>

                    <div className="col-md-3">
                        Time spent (HH:MM:SS)
                    </div>

                    <div className="col-md-3">
                        Task actions
                    </div>
                </div>
            </div>

            {taskObjects.length? taskObjects.map((task) =>
                <TaskListObject key={task.id} task={task} projectId={id} />
                ) : <h4>It doesn't look like you have any tasks for this project yet.</h4>}

        </>
    )
}

export default TaskList