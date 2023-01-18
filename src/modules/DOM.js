/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import List from './ToDoList'
import Project from './project'
import Task from './tasks'
import Storage from './storage'

const dom = (() => {
  function loadContent() {
    initList()
    renderProjects()
    openProject('Inbox', document.getElementById('button-inbox-project'))
  }

  function initList() {
    const list = List.list()
    Storage.saveList(list)
  }

  // RENDER PROJECTS LIST

  function renderProjects() {
    Storage.getList()
      .getProjects()
      .forEach((project) => loadProject(project.name))

    initAddProjectButtons()
  }

  function loadProject(projectName) {
    const projectContainer = document.getElementById('project-list')

    const project = document.createElement('li')
    project.id = `${projectName.replaceAll(' ', '-').toLowerCase()}`
    project.textContent = projectName

    projectContainer.appendChild(project)
  }

  function openProject(projectName, projectButton) {
    renderProjectContent(projectName)
  }

  // RENDER PROJECT CONTENT

  function renderProjectContent(projectName) {
    renderTasks(projectName)
  }

  function renderTasks(projectName) {
    Storage.addTask(projectName, { name: 'lovro', dueDate: '12/12/1998' })
    Storage.getList()
      .getProject(projectName)
      .getTasks()
      .forEach((task) => loadTask(task.name, task.dueDate))
  }

  function loadTask(name, dueDate) {
    const taskCheckboxSection = document.createElement('div')
    taskCheckboxSection.classList.add('section-task-checkbox')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    taskCheckboxSection.appendChild(checkbox)

    const taskInfoSection = document.createElement('div')
    taskInfoSection.classList.add('section-task-info')
    const namePara = document.createElement('p')
    namePara.textContent = name
    const datePara = document.createElement('p')
    datePara.textContent = dueDate
    taskInfoSection.appendChild(namePara)
    taskInfoSection.appendChild(datePara)

    const task = document.createElement('div')
    task.classList.add('task-item')
    task.appendChild(taskCheckboxSection)
    task.appendChild(taskInfoSection)

    const taskContainer = document.getElementById('tasks')
    taskContainer.insertBefore(task, taskContainer.firstChild)
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
    const addProjectButton = document.getElementById('button-add-project')
    const addProjectPopup = document.getElementById('dialog-add-project')

    addProjectButton.classList.add('active')
    addProjectPopup.classList.add('active')
  }

  function closeAddProjectDialog() {
    const addProjectButton = document.getElementById('button-add-project')
    const addProjectPopup = document.getElementById('dialog-add-project')

    addProjectButton.classList.remove('active')
    addProjectPopup.classList.remove('active')
  }

  function clearForms() {
    const projectDialog = document.getElementById('dialog-add-project')
    const taskDialog = document.getElementById('dialog-add-project')
    projectDialog.reset()
    taskDialog.reset()
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
      projectName.length > 10
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

    inboxProjectButton.addEventListener('click', openInbox)
  }

  function openInbox() {
    openProject('Inbox', this)
  }

  return { loadContent }
})()

export default dom
