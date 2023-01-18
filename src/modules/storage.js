import List from './ToDoList'
import Project from './project'
import Task from './tasks'

const Storage = (() => {
  // SAVE LIST TO LOCAL STORAGE

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

  function deleteTask(projectName, taskName) {
    const list = getList()
    list.getProject(projectName).deleteTask(taskName)
    saveList(list)
  }

  function renameTask(projectName, taskName, newTaskName) {
    const list = getList()
    list.getProjects(projectName).getTask(taskName).setName(newTaskName)
  }

  function setTaskDate(projectName, taskName, newDueDate) {
    const list = getList()
    list.getProjects(projectName).getTask(taskName).setDate(newDueDate)
  }

  return {
    saveList,
    getList,
    addProject,
    deleteProject,
    addTask,
    deleteTask,
    renameTask,
    setTaskDate,
  }
})()

export default Storage
