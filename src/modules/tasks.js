/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */
const Task = (() => {
  // PROJECT FACTORY
  const task = (name, dueDate = 'No date') => {
    return { name, dueDate, setName, getName, setDate, getDate }
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

  // function doStuff() {
  // }

  return { task }
})()

export default Task
