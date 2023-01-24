/* eslint-disable no-use-before-define */
import List from './ToDoList'
import Project from './project'
import Task from './tasks'

const Storage = (() => {
  function saveList(data) {
    localStorage.setItem('toDoList', JSON.stringify(data))
  }

  function getList() {
    const list = Object.assign(
      List.list(),
      JSON.parse(localStorage.getItem('toDoList'))
    )

    list.setProjects(
      list
        .getProjects()
        .map((project) => Object.assign(Project.project(), project))
    )

    list
      .getProjects()
      .forEach((project) =>
        project.setTasks(
          project.getTasks().map((task) => Object.assign(Task.task(), task))
        )
      )

    return list
  }

  function addProject(project) {
    const list = getList()
    list.addProject(project)
    saveList(list)
  }

  function deleteProject(projectName) {
    const list = getList()
    list.deleteProject(projectName)
    saveList(list)
  }

  function addTask(projectName, task) {
    const list = getList()
    list.getProject(projectName).addTask(task)
    saveList(list)
  }

  function editTask(projectName, taskId, newName, newDueDate) {
    const list = getList()
    list.getProject(projectName).getTask(taskId).setName(newName)
    list.getProject(projectName).getTask(taskId).setDate(newDueDate)
    saveList(list)
  }

  function changeTaskCompleteState(projectName, taskName, taskId) {
    const list = getList()
    const isCompleted = list
      .getProject(projectName)
      .getTask(taskId)
      .getCompleted()

    let completed
    if (isCompleted) {
      list.getProject(projectName).getTask(taskId).setCompleted(false)
      completed = false
    } else {
      completed = true
      list.getProject(projectName).getTask(taskId).setCompleted(true)
    }

    list.getProjects().forEach((project) => {
      project.getTasks().forEach((task) => {
        if (task.getId() === taskId) {
          task.setCompleted(completed)
        }
      })
    })

    saveList(list)
  }

  function deleteTask(taskId) {
    const list = getList()
    list.getProjects().forEach((project) => {
      if (project.getName() === 'Completed') return
      project.deleteTask(taskId)
    })

    saveList(list)
  }

  function deleteCompletedTask(taskId) {
    const list = getList()
    list.getProject('Completed').deleteTask(taskId)
    saveList(list)
  }

  function taskExistsOutsideCompleted(taskId) {
    let existsOutside = false
    const list = getList()
    list.getProjects().forEach((project) => {
      if (project.contains(taskId)) {
        existsOutside = true
      }
    })
    return existsOutside
  }

  function renameTask(projectName, taskName, newTaskName) {
    const list = getList()
    list.getProjects(projectName).getTask(taskName).setName(newTaskName)
  }

  function setTaskDate(projectName, taskName, newDueDate) {
    const list = getList()
    list.getProjects(projectName).getTask(taskName).setDate(newDueDate)
    saveList(list)
  }

  function updateTodayProject() {
    const list = getList()
    list.updateTodayProject()
    saveList(list)
  }

  function updateThisWeekProject() {
    const list = getList()
    list.updateThisWeekProject()
    saveList(list)
  }

  function updateCompletedProject() {
    const list = getList()
    list.updateCompletedProject()
    saveList(list)
  }

  return {
    saveList,
    getList,
    addProject,
    deleteProject,
    addTask,
    editTask,
    deleteTask,
    renameTask,
    setTaskDate,
    changeTaskCompleteState,
    updateTodayProject,
    updateThisWeekProject,
    updateCompletedProject,
    deleteCompletedTask,
    taskExistsOutsideCompleted,
  }
})()

export default Storage
