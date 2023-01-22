// import { format } from 'date-fns'
/* eslint-disable arrow-body-style */

import { format, parseISO, isValid } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

/* eslint-disable no-use-before-define */
const Task = (() => {
  // PROJECT FACTORY
  const task = (name, dueDate, completed = false) => {
    const id = uuidv4()
    return {
      name,
      dueDate,
      completed,
      id,
      setName,
      getName,
      setDate,
      getDate,
      getId,
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

  function getId() {
    return this.id
  }

  function getDateFormatted() {
    let dateF = 'No date'
    if (isValid(parseISO(this.dueDate))) {
      dateF = format(parseISO(this.dueDate), 'MM/dd/yy')
    }
    return dateF
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
