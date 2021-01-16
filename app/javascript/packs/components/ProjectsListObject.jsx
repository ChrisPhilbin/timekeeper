import React, { useState } from 'react'
import ProjectDetails from './ProjectDetails'

const ProjectsListObject = (props) => {

    const { project } = props

    let [name, setName]               = useState(project.name)
    let [description, setDescription] = useState(project.description)
    let [complete, setComplete]       = useState(project.finished)
    let [showDetails, setShowDetails] = useState(false)

    console.log(project, "project from PLO component")

    const token = document.querySelector('[name=csrf-token]')

    const handleDelete = () => {
        const confirmation = confirm("Are you sure? Doing so will delete all child tasks of this project!")

        if (confirmation) {
            fetch(`/api/v1/projects/${project.id}`, {
                method: 'delete',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'x-csrf-token': token.content
                }
            })
            .then(response => props.getProjectObjects())
            .catch(error => console.log(error))
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        fetch(`/api/v1/projects/${project.id}`, {
            method: 'put',
            mode: 'cors',
            body: `{"project":{"name":"${name}","description":"${description}","finished":"${complete}"}}`,
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token.content
            }
        })
        setComplete(true)
    }

    const handleDetails = (e) => {
        e.preventDefault
        setShowDetails(true)
    }

    const hideDetails = (e) => {
        e.preventDefault
        setShowDetails(false)
    }

    return (
        <>
            <tr className={`${complete ? 'table-light' : ''}`}>
                <td>
                    <svg
                    className={`bi bi-check-circle ${
                        complete ? `text-success` : `text-muted`
                    }`}
                    width="2em"
                    height="2em"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fillRule="evenodd"
                        d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
                        clipRule="evenodd"
                    />
                    </svg>
                </td>
                <td>
                    {!showDetails ?
                    <button className="btn btn-outline-primary" onClick={handleDetails}>Show details</button>
                        :
                    <button className="btn btn-outline-danger" onClick={hideDetails}>Hide Details</button>
                    }
                </td>
                <td>
                    <h4>{name}</h4>
                    {/* <input
                    type="text"
                    defaultValue={name}
                    onChange={e => setName(e.target.value)}
                    disabled={complete}
                    className="form-control"
                    id={`project__-${project.id}`}
                    /> */}
                </td>
                <td className="text-right">
                    <div className="form-check form-check-inline">
                    <input
                        type="boolean"
                        defaultChecked={complete}
                        onChange={e => setComplete(e.target.value)}
                        type="checkbox"
                        className="form-check-input"
                        id={`complete-${project.id}`}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={`complete-${project.id}`}
                    >
                        Complete?
                    </label>
                    </div>
                    <button onClick={handleDelete} className="btn btn-outline-danger">Delete</button>&nbsp;
                    <button onClick={handleUpdate} className="btn btn-outline-success">Update</button>

                </td>
            </tr>
            { showDetails ? 
            <tr>
                <td colSpan="4">
                    <ProjectDetails project={project} />
                </td>
            </tr>
            : null }
            
        </>
    )
}        

export default ProjectsListObject