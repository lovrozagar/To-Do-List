/* eslint-disable no-use-before-define */
import ToDo from './ToDoList'

const dom = (() => {
  function loadHome() {
    loadProjects()
  }

  function loadProjects() {
    ToDo.toDoList.projects.forEach((element) => {
      renderProject(element.name)
    })
  }

  function renderProject(name) {
    const projectContainer = document.getElementById('project-list')

    const project = document.createElement('li')
    project.textContent = name

    projectContainer.appendChild(project)
  }

  return { loadHome }
})()

export default dom
