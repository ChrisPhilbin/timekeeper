import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import ProjectList from './ProjectsList'
import ProjectForm from './ProjectForm'
import ProjectListObject from './ProjectsListObject'

const TimekeeperApp = () => {

    let [projectObjects, setProjectObjects] = useState([])

    useEffect( () => {
      getProjectObjects();
    }, [])

    const getProjectObjects = () => {
      fetch('/api/v1/projects')
      .then(response => response.json())
      .then(data => setProjectObjects(data))
      .catch(error => console.log(error))
    }

    const createProject = (project) => {
      const projects = [project, ...projectObjects]
      setProjectObjects(projects)
    }

    return(
      <>
        <ProjectForm createProject={createProject}/>
        <ProjectList>
          {projectObjects.map(project => (
            <ProjectListObject
              key={project.id}
              project={project}
              getProjectObjects={getProjectObjects}
            />
          ))}
        </ProjectList>
      </>
    )
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('timekeeper-app')
  app && ReactDOM.render(<TimekeeperApp />, app)
})