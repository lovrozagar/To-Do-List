/* eslint-disable no-use-before-define */
import Project from './project'

const List = (() => {
  const list = () => {
    const projects = []
    projects.push(Project.project('Inbox'))
    projects.push(Project.project('Today'))
    projects.push(Project.project('This week'))
    projects.push(Project.project('Completed'))
    return {
      projects,
      setProjects,
      getProjects,
      getProject,
      contains,
      addProject,
      deleteProject,
    }
  }

  function setProjects(projects) {
    this.projects = projects
  }

  function getProjects() {
    return this.projects
  }

  function getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName)
  }

  function contains(projectName) {
    return this.projects.some((project) => project.getName() === projectName)
  }

  function addProject(newProject) {
    if (this.projects.find((project) => project.name === newProject.name)) {
      alert(`${newProject.name} already exists`)
      return
    }
    this.projects.push(newProject)
  }

  function deleteProject(projectName) {
    const projectToDelete = this.projects.find(
      (project) => project.getName() === projectName
    )
    this.projects.splice(this.projects.indexOf(projectToDelete), 1)
  }

  // function doStuff() {
  // }

  return { list }
})()

export default List
