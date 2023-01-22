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

  // function formatTaskDate() {

  // }

  function changeTaskCompleteState(projectName, taskName, taskId) {
    const list = getList()
    const isCompleted = list
      .getProject(projectName)
      .getTask(taskName)
      .getCompleted()

    let completed
    if (isCompleted) {
      list.getProject(projectName).getTask(taskName).setCompleted(false)
      completed = false
    } else {
      completed = true
      list.getProject(projectName).getTask(taskName).setCompleted(true)
    }

    list.getProjects().forEach((project) => {
      if (
        project.getName() === 'ProjectName' ||
        project.getName() === 'Today' ||
        project.getName() === 'This week' ||
        project.getName() === 'Completed'
      )
        return

      project.getTasks().forEach((task) => {
        if (task.getId() === taskId) {
          task.setCompleted(completed)
        }
      })
    })

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
    deleteTask,
    renameTask,
    setTaskDate,
    changeTaskCompleteState,
    updateTodayProject,
    updateThisWeekProject,
    updateCompletedProject,
  }
})()

export default Storage
