/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { format, parseISO, add, isValid } from 'date-fns'
import List from './ToDoList'
import Project from './project'
import Task from './tasks'
import Storage from './storage'

const dom = (() => {
  function loadContent() {
    renderProjects()
    initProjectButtons()
    openProject('Inbox', document.getElementById('inbox'))
  }

  // RENDER PROJECTS LIST

  function renderProjects() {
    Storage.getList()
      .getProjects()
      .forEach((project) => loadProject(project.name))

    initAddProjectButtons()
  }

  function loadProject(projectName) {
    const projectContainer = document.createElement('div')
    projectContainer.classList.add('project-container')

    const project = document.createElement('li')
    project.id = `${projectName.replaceAll(' ', '-').toLowerCase()}`
    if (
      project.id !== 'inbox' &&
      project.id !== 'today' &&
      project.id !== 'this-week' &&
      project.id !== 'completed'
    ) {
      project.dataset.projectButton = '' // ADD DATA ATTRIBUTE TO ALL NON DEFAULT PROJECTS
      project.textContent = projectName

      const projectRemoveButton = document.createElement('a')
      projectRemoveButton.textContent = '❌'
      project.appendChild(projectRemoveButton)

      projectContainer.appendChild(project)
      projectContainer.appendChild(projectRemoveButton)
    } else {
      project.textContent = projectName
      projectContainer.appendChild(project)
    }

    const projectList = document.getElementById('project-list')
    projectList.appendChild(projectContainer)
  }

  function openProject(projectName, projectButton) {
    const allProjectButtons = document.querySelectorAll('#project-list li')

    allProjectButtons.forEach((button) => button.classList.remove('active'))
    projectButton.classList.add('active')

    renderProjectContent(projectName)
  }

  // RENDER PROJECT CONTENT

  function renderProjectContent(projectName) {
    createProjectHeading(projectName)
    renderTasks(projectName)
  }

  function createProjectHeading(projectName) {
    // REMOVE HEADER IF IT ALREADY EXISTS
    if (document.getElementById('project-heading')) {
      document.getElementById('project-heading').remove()
    }

    const projectHeading = document.createElement('h2')
    projectHeading.id = 'project-heading'
    projectHeading.textContent = `${projectName}`

    const taskContainer = document.getElementById('tasks')
    taskContainer.insertBefore(projectHeading, taskContainer.firstChild)
  }

  function renderTasks(projectName) {
    clearTasks()

    Storage.getList()
      .getProject(projectName)
      .getTasks()
      .forEach((task) => {
        styleIfCompleted(
          task.completed,
          loadTask(task.name, task.dueDate, task.completed, task.id)
        )
      })

    if (
      projectName !== 'Today' &&
      projectName !== 'This week' &&
      projectName !== 'Completed'
    ) {
      initAddTaskButtons()
    }

    initTaskButtons()
  }

  function loadTask(name, dueDate, isCompleted, taskId) {
    // CHECKBOX SECTION
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = isCompleted

    const taskCheckboxSection = document.createElement('div')
    taskCheckboxSection.classList.add('section-task-checkbox')
    taskCheckboxSection.appendChild(checkbox)

    // INFO SECTION
    const taskInfoSection = document.createElement('div')
    taskInfoSection.classList.add('section-task-info')
    const namePara = document.createElement('p')
    namePara.textContent = name
    const datePara = document.createElement('p')
    datePara.textContent = formatDate(dueDate)

    taskInfoSection.appendChild(namePara)
    taskInfoSection.appendChild(datePara)

    // CHANGE SECTION

    const trashIcon = document.createElement('img')
    trashIcon.src = '../assets/trash.svg'
    trashIcon.dataset.remove = ''
    const editIcon = document.createElement('img')
    editIcon.src = '../assets/edit.svg'

    const taskChangeSection = document.createElement('div')
    taskChangeSection.classList.add('section-task-change')
    taskChangeSection.appendChild(trashIcon)
    taskChangeSection.appendChild(editIcon)

    const task = document.createElement('div')
    task.classList.add('task-item')
    task.dataset.taskItem = ''
    task.id = taskId
    task.appendChild(taskCheckboxSection)
    task.appendChild(taskInfoSection)
    task.appendChild(taskChangeSection)

    const tasksContainer = document.getElementById('tasks-container')
    tasksContainer.appendChild(task)

    return task
  }

  function clearTasks() {
    const tasksContainer = document.getElementById('tasks-container')
    tasksContainer.replaceChildren('')
  }

  // ADD PROJECT EVENT LISTENERS
  function initAddProjectButtons() {
    const addProjectButton = document.getElementById('button-add-project')
    const addProjectDialogButton = document.getElementById(
      'button-add-project-dialog'
    )
    const cancelProjectDialogButton = document.getElementById(
      'button-cancel-project-dialog'
    )

    addProjectButton.addEventListener('click', openAddProjectDialog)
    addProjectDialogButton.addEventListener('click', (event) => {
      addProject(event)
    })
    cancelProjectDialogButton.addEventListener('click', cancelAddProjectDialog)
  }

  function openAddProjectDialog() {
    closeAddTaskDialog()

    const addProjectButton = document.getElementById('button-add-project')
    const addProjectDialog = document.getElementById('dialog-add-project')

    addProjectButton.classList.add('active')
    addProjectDialog.classList.add('active')
  }

  function closeAddProjectDialog() {
    const addProjectButton = document.getElementById('button-add-project')
    const addProjectDialog = document.getElementById('dialog-add-project')

    addProjectButton.classList.remove('active')
    addProjectDialog.classList.remove('active')
  }

  function clearForms() {
    const projectForm = document.getElementById('dialog-add-project')
    const taskForm = document.getElementById('form-add-task')
    projectForm.reset()
    taskForm.reset()
  }

  function addProject(event) {
    const addProjectDialogInput = document.getElementById(
      'input-add-project-dialog'
    )
    const projectName = addProjectDialogInput.value
    // FORM VALIDATION IF FORM NOT VALID
    if (
      projectName === '' ||
      projectName.length < 3 ||
      projectName.length > 15
    ) {
      return
    }

    event.preventDefault()
    if (Storage.getList().contains(projectName)) {
      addProjectDialogInput.value = ''
      alert('Project names must be different')
      return
    }

    Storage.addProject(Project.project(projectName))
    loadProject(projectName)
    initProjectButtons()
    closeAddProjectDialog()
    clearForms()
  }

  function cancelAddProjectDialog() {
    closeAddProjectDialog()
    clearForms()
  }

  // PROJECT EVENT LISTENERS
  function initProjectButtons() {
    const inboxProjectButton = document.getElementById('inbox')
    const todayProjectButton = document.getElementById('today')
    const weekProjectButton = document.getElementById('this-week')
    const completed = document.getElementById('completed')
    const projectButtons = document.querySelectorAll('[data-project-button]')

    inboxProjectButton.addEventListener('click', openInboxTasks)
    todayProjectButton.addEventListener('click', openTodayTasks)
    weekProjectButton.addEventListener('click', openWeekTasks)
    completed.addEventListener('click', openCompletedTasks)

    projectButtons.forEach((projectButton) => {
      projectButton.addEventListener('click', openCustomProject)
    })
  }

  function openInboxTasks() {
    openProject('Inbox', this)
  }

  function openTodayTasks() {
    Storage.updateTodayProject()
    openProject('Today', this)
  }

  function openWeekTasks() {
    Storage.updateThisWeekProject()
    openProject('This week', this)
  }

  function openCompletedTasks() {
    Storage.updateCompletedProject()
    openProject('Completed', this)
  }

  function openCustomProject(e) {
    const projectName = this.textContent

    openProject(projectName, this)
  }

  // ADD TASK EVENT LISTENERS
  function initAddTaskButtons() {
    const addTaskButton = document.getElementById('button-add-task')
    const addTaskDialogButton = document.getElementById(
      'button-dialog-add-task'
    )
    const cancelTaskDialogButton = document.getElementById(
      'button-dialog-cancel-task'
    )

    addTaskButton.addEventListener('click', openAddTaskDialog)
    addTaskDialogButton.addEventListener('click', (event) => {
      addTask(event)
    })
    cancelTaskDialogButton.addEventListener('click', closeAddTaskDialog)
  }

  function openAddTaskDialog() {
    closeAddProjectDialog()

    const dialog = document.getElementById('dialog-add-task')
    const showDialogButton = document.getElementById('button-add-task')

    dialog.classList.add('active')
    showDialogButton.classList.add('active')
  }

  function closeAddTaskDialog() {
    const dialog = document.getElementById('dialog-add-task')
    const showDialogButton = document.getElementById('button-add-task')

    dialog.classList.remove('active')
    showDialogButton.classList.remove('active')
  }

  function addTask(e) {
    const projectName = document.getElementById('project-heading').textContent
    const taskName = document.getElementById('task-name').value
    const taskDueDate = document.getElementById('task-due-date').value

    if (
      taskName === '' ||
      taskName === null ||
      taskDueDate === '' ||
      taskDueDate === null
    ) {
      return
    }
    if (Storage.getList().getProject(projectName).contains(taskName)) {
      alert('Task already exists in project')
      clearForms()
      return
    }

    e.preventDefault()
    Storage.addTask(projectName, Task.task(taskName, taskDueDate))
    clearForms()
    closeAddTaskDialog()
    renderTasks(projectName)
  }

  // TASK EVENT LISTENERS
  function initTaskButtons() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')

    checkboxes.forEach((checkbox) =>
      checkbox.addEventListener('click', (event) => {
        changeTaskCompleteState(event)
      })
    )

    const removeButtons = document.querySelectorAll('[data-remove]')
    removeButtons.forEach((button) => {
      button.addEventListener('click', deleteTask)
    })
  }

  function changeTaskCompleteState(e) {
    const { target } = e
    const projectName = document.getElementById('project-heading').textContent
    const taskItem = target.closest('[data-task-item]')
    const taskName = taskItem.children[1].children[0].textContent
    const taskId = taskItem.id

    Storage.changeTaskCompleteState(projectName, taskName, taskId)
    renderTasks(projectName)
  }

  function styleIfCompleted(isCompleted, element) {
    if (isCompleted) {
      element.classList.add('line-through')
    } else {
      element.classList.remove('line-through')
    }
  }

  function deleteTask(e) {
    const { target } = e
    const projectName = document.getElementById('project-heading').textContent
    const taskItem = target.closest('[data-task-item]')
    const taskId = taskItem.id

    Storage.deleteTask(taskId)
    renderTasks(projectName)
  }

  function formatDate(date) {
    let dateF = 'No date'
    if (isValid(parseISO(date))) {
      dateF = format(parseISO(date), 'MM/dd/yy')
    }
    return dateF
  }

  return { loadContent }
})()

export default dom
