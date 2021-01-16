import React, { useState, useEffect } from 'react'
import TaskList from './TaskList'

const ProjectDetails = (props) => {

    const { project } = props
    let [name, setName]               = useState(project.name)
    let [description, setDescription] = useState(project.description)
    let [complete, setComplete]       = useState(project.finished)
    let [showTaskForm, setShowTaskForm] = useState(false)
    
    console.log(project, "project from project details component")
    return(
        <>
            <TaskList id={project.id} />
        </>
    )
}

export default ProjectDetails