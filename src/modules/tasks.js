/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */
const Task = (() => {
  // PROJECT FACTORY
  const task = (name, date = 'No date', completed = false) => {
    const dueDate = getDateFormatted(date)
    return {
      name,
      dueDate,
      completed,
      setName,
      getName,
      setDate,
      getDate,
      getDateFormatted,
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

  function getDateFormatted(date) {
    const day = date.split('-')[0]
    const month = date.split('-')[1]
    const year = date.split('-')[2]
    return `${month}/${day}/${year}`
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
