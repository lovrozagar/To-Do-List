/* eslint-disable no-else-return */
/* eslint-disable no-use-before-define */
// import Task from './tasks'
// import { cloneDeep } from 'lodash'
import { cloneDeep } from 'lodash'
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
      updateTodayProject,
      updateThisWeekProject,
      updateCompletedProject,
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

  function updateTodayProject() {
    this.getProject('Today').tasks = []

    this.projects.forEach((project) => {
      if (
        project.getName() === 'Today' ||
        project.getName() === 'This week' ||
        project.getName() === 'Completed'
      )
        return

      const todayTasks = project.getTasksToday()
      todayTasks.forEach((task) => {
        const taskReference = task
        this.getProject('Today').tasks.push(taskReference)
      })
    })
  }

  function updateThisWeekProject() {
    this.getProject('This week').tasks = []

    this.projects.forEach((project) => {
      if (
        project.getName() === 'Today' ||
        project.getName() === 'This week' ||
        project.getName() === 'Completed'
      )
        return

      const weekTasks = project.getTasksThisWeek()
      weekTasks.forEach((task) => {
        this.getProject('This week').tasks.push(task)
      })
    })

    this.getProject('This week').tasks.sort(sortByDate)
  }

  function updateCompletedProject() {
    this.getProject('Completed').tasks =
      this.getProject('Completed').getTasksCompleted()

    this.projects.forEach((project) => {
      if (
        project.getName() === 'Today' ||
        project.getName() === 'This week' ||
        project.getName() === 'Completed'
      )
        return

      const completedTasks = project.getTasksCompleted()
      completedTasks.forEach((task) => {
        const taskClone = cloneDeep(task)
        if (this.getProject('Completed').contains(task.id)) return
        this.getProject('Completed').tasks.push(taskClone)
      })
    })

    this.getProject('Completed').tasks.reverse()
  }

  function sortByDate(task1, task2) {
    const date1 = new Date(task1.dueDate)
    const date2 = new Date(task2.dueDate)

    if (date1 > date2) return 1
    else if (date1 < date2) return -1
    return 0
  }

  return { list }
})()

export default List
