import React, { useState } from 'react'

const TaskForm = (props) => {

    let [name, setName]               = useState('')
    let [description, setDescription] = useState('')
    const token = document.querySelector('[name=csrf-token]')

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/api/v1/projects/${props.id}/tasks`, {
            method: 'post',
            mode: 'cors',
            body: `{"task":{"name":"${name}","description":"${description}","finished":"false"}}`,
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token.content
            }
        })
        .then(response => response.json())
        .then(data => props.createTask(data))
        setName('')
        setDescription('')
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="my-3">
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-control"
                        id="name"
                        placeholder="New task name..."                
                        />
                    </div>

                    <div className="form-group col-md-4">
                        <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="form-control"
                        id="description"
                        placeholder="Description for your new task..."
                        />
                    </div>

                    <div className="form-group col-md-4">
                        <button className="btn btn-outline-success btn-block">Create task</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default TaskForm