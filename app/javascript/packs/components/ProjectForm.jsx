import React, { useState } from 'react'

const ProjectForm = (props) => {

    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    const token = document.querySelector('[name=csrf-token]')

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/v1/projects', {
            method: 'post',
            mode: 'cors',
            body: `{"project":{"name":"${name}","description":"${description}","finished":"false"}}`,
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token.content
            }
        })
        .then(response => response.json())
        .then(data => props.createProject(data))
        setName('')
        setDescription('')
    }

    return(
        <form onSubmit={handleSubmit} className="my-3">
            <div className="form-row">
                <div className="form-group col-md-4">
                    <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="form-control"
                    id="name"
                    placeholder="Give your project a name..."
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    className="form-control"
                    id="description"
                    placeholder="Give some details about the project..."
                    />
                </div>
                <div className="form-group col-md-4">
                    <button className="btn btn-outline-success btn-block">
                    Add Project
                    </button>
                </div>
            </div>
      </form>
    )
}

export default ProjectForm