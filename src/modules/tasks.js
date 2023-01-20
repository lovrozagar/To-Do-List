/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */
const Task = (() => {
  // PROJECT FACTORY
  const task = (name, dueDate = 'No date', completed = null) => {
    return {
      name,
      dueDate,
      completed,
      setName,
      getName,
      setDate,
      getDate,
      setCompleted,
      getCompleted,
    }
  }

  function setName(name) {
    this.name = name
  }

  function getName() {
    return this.name
  }

  function setDate(dueDate) {
    this.dueDate = dueDate
  }

  function getDate() {
    return this.dueDate
  }

  function setCompleted(isCompleted) {
    this.completed = isCompleted
  }

  function getCompleted() {
    return this.completed
  }

  // function doStuff() {
  // }

  return { task }
})()

export default Task
