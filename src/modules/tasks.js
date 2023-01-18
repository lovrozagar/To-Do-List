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

  function doStuff() {
    const tasky = task('taskero frende comprende')
    console.log((tasky.setName = 'lola'))
  }

  return { task, doStuff }
})()

export default Task
