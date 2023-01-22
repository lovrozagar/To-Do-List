import { toDate, isToday, isThisWeek, subDays } from 'date-fns'

/* eslint-disable no-use-before-define */
const Project = (() => {
  // PROJECT FACTORY
  const project = (name) => {
    const tasks = []
    return {
      name,
      tasks,
      addTask,
      setName,
      getName,
      setTasks,
      getTasks,
      getTask,
      contains,
      deleteTask,
      getTasksToday,
      getTasksThisWeek,
      getTasksCompleted,
    }
  }

  function setName(name) {
    this.name = name
  }

  function getName() {
    return this.name
  }

  function setTasks(tasks) {
    this.tasks = tasks
  }

  function getTasks() {
    return this.tasks
  }

  function getTask(taskName) {
    return this.tasks.find((task) => task.getName() === taskName)
  }

  function contains(taskName) {
    return this.tasks.some((task) => task.getName() === taskName)
  }

  function addTask(newTask) {
    if (this.tasks.find((task) => task.getName() === newTask.name)) return
    this.tasks.push(newTask)
  }

  function deleteTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.name !== taskName)
  }

  function getTasksToday() {
    return this.tasks.filter((task) => {
      const taskDate = new Date(task.getDateFormatted())
      return isToday(toDate(taskDate))
    })
  }

  function getTasksThisWeek() {
    return this.tasks.filter((task) => {
      const taskDate = new Date(task.getDateFormatted())
      console.log(isThisWeek(subDays(toDate(taskDate), 0)))
      return isThisWeek(subDays(toDate(taskDate), 0))
    })
  }

  function getTasksCompleted() {
    return this.tasks.filter((task) => task.completed === true)
  }

  // function doStuff() {
  // }

  return { project }
})()

export default Project
