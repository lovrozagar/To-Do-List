/* eslint-disable no-use-before-define */
import { format, parseISO, isValid } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import Project from './project'
import Task from './tasks'
import Storage from './storage'
import Avatar from './avatar'

const DOM = (() => {
  function loadContent() {
    initAppHeight()
    renderProjects()
    initEditTaskButtons()
    openProject('Inbox')
    initHamburgerButton()
    updateAvatar()
    loadFooter()
  }

  // APP HEIGHT 100VH FIX
  function initAppHeight() {
    const appHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', appHeight)
    appHeight()
  }

  // RENDER PROJECTS LIST

  function renderProjects() {
    clearProjects()

    Storage.getList()
      .getProjects()
      .forEach((project) => loadProject(project.name))

    initAddProjectButtons()
    initProjectButtons()
  }

  function loadProject(projectName) {
    const projectContainer = document.createElement('div')
    projectContainer.dataset.projectItem = ''
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
      projectRemoveButton.dataset.removeProject = ''
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

  function clearProjects() {
    const projectList = document.getElementById('project-list')
    projectList.replaceChildren()
  }

  function openProject(projectName) {
    const allProjectButtons = document.querySelectorAll('#project-list li')

    allProjectButtons.forEach((button) => {
      if (button.textContent === projectName) button.classList.add('active')
      else button.classList.remove('active')
    })

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
    projectHeading.classList.add('project-heading')
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
          loadTask(
            task.name,
            task.dueDate,
            task.priority,
            task.completed,
            task.id
          )
        )
      })

    if (
      projectName === 'Today' ||
      projectName === 'This week' ||
      projectName === 'Completed'
    ) {
      hideAddTaskButton()
    } else {
      showAddTaskButton()
      initAddTaskButtons()
    }

    if (projectName === 'Completed') {
      const taskEditButtons = document.querySelectorAll('[data-edit]')
      taskEditButtons.forEach((button) => button.classList.add('hidden'))
    }
    initTaskButtons()
    closeAllDialogs()

    renderQuoteIfNoTasks(
      Storage.getList().getProject(projectName).getTasks().length
    )
  }

  function loadTask(name, dueDate, priority, isCompleted, taskId) {
    // CHECKBOX SECTION
    const labelAndInputId = uuidv4()
    const checkbox = document.createElement('input')
    checkbox.id = labelAndInputId
    checkbox.type = 'checkbox'
    checkbox.checked = isCompleted
    const checkboxLabel = document.createElement('label')
    checkboxLabel.id = labelAndInputId
    styleByPriority(checkboxLabel, priority)

    const taskCheckboxSection = document.createElement('div')
    taskCheckboxSection.classList.add('section-task-checkbox')
    taskCheckboxSection.appendChild(checkbox)
    taskCheckboxSection.appendChild(checkboxLabel)

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
    trashIcon.src = 'trash.svg'
    trashIcon.dataset.remove = ''
    const editIcon = document.createElement('img')
    editIcon.src = 'edit.svg'
    editIcon.dataset.edit = ''

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
    closeEditTaskDialog()
    preserveEditTaskDialog()
    const tasksContainer = document.getElementById('tasks-container')
    tasksContainer.replaceChildren()
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
    clearProjectForm()
    clearAddTaskForm()
    clearEditTaskForm()
  }

  function clearProjectForm() {
    const projectForm = document.getElementById('dialog-add-project')
    projectForm.reset()
  }

  function clearAddTaskForm() {
    const taskForm = document.getElementById('form-add-task')
    taskForm.reset()
    const date = document.getElementById('task-due-date')
    date.removeAttribute('value')
  }

  function clearEditTaskForm() {
    const editTaskForm = document.getElementById('form-edit-task')
    editTaskForm.reset()
    const editDate = document.getElementById('edit-task-date')
    editDate.setAttribute('value', '')
  }

  function addProject(event) {
    console.log(event)
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
      alert('Project names must be different')
      clearForms()
      return
    }

    Storage.addProject(Project.project(projectName))
    closeAddProjectDialog()
    clearForms()
    renderProjects()
    openProject(projectName)
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
    const projectButtons = document.querySelectorAll('[data-project-item]')
    const projectRemoveButtons = document.querySelectorAll(
      '[data-remove-project]'
    )

    inboxProjectButton.addEventListener('click', openInboxTasks)
    todayProjectButton.addEventListener('click', openTodayTasks)
    weekProjectButton.addEventListener('click', openWeekTasks)
    completed.addEventListener('click', openCompletedTasks)

    projectButtons.forEach((projectButton) => {
      projectButton.addEventListener('click', openCustomProject)
    })

    projectRemoveButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        deleteProject(event)
      })
    })
  }

  function deleteProject(e) {
    const { target } = e
    e.stopPropagation()
    const taskItem = target.closest('[data-project-item]')
    const projectName = taskItem.children[0].textContent
    const heading = document.getElementById('project-heading').textContent

    Storage.deleteProject(projectName)
    renderProjects()
    // IF A DELETED PROJECT IS CURRENTLY OPEN, OPEN INBOX INSTEAD
    if (projectName === heading) {
      openProject('Inbox')
      return
    }
    openProject(heading)
  }

  function openInboxTasks() {
    openProject('Inbox')
    closeSidebar()
  }

  function openTodayTasks() {
    Storage.updateTodayProject()
    openProject('Today')
    closeSidebar()
  }

  function openWeekTasks() {
    Storage.updateThisWeekProject()
    openProject('This week')
    closeSidebar()
  }

  function openCompletedTasks() {
    openProject('Completed')
    closeSidebar()
  }

  function openCustomProject() {
    const projectName = this.textContent
    openProject(projectName)
    closeSidebar()
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

  function showAddTaskButton() {
    const projectName = document.getElementById('project-heading').textContent
    const addTaskDialog = document.getElementById('dialog-add-task')

    if (addTaskDialog.classList.contains('active')) {
      return
    }

    if (
      projectName === 'Today' ||
      projectName === 'This week' ||
      projectName === 'Completed'
    ) {
      return
    }

    const addTaskButton = document.getElementById('button-add-task')
    addTaskButton.classList.add('active')
  }

  function hideAddTaskButton() {
    const addTaskButton = document.getElementById('button-add-task')
    addTaskButton.classList.remove('active')
  }

  function openAddTaskDialog() {
    closeAllDialogs()
    const date = document.getElementById('task-due-date')
    date.setAttribute('value', '')
    const dialog = document.getElementById('dialog-add-task')
    dialog.classList.add('active')
    hideAddTaskButton()
  }

  function closeAddTaskDialog() {
    const dialog = document.getElementById('dialog-add-task')
    dialog.classList.remove('active')
    showAddTaskButton()
    clearForms()
  }

  function addTask(e) {
    const projectName = document.getElementById('project-heading').textContent
    const taskName = document.getElementById('task-name').value
    const taskDueDate = document.getElementById('task-due-date').value
    const priority = document.getElementById('priority').value

    if (taskName === '' || taskName === null) {
      return
    }
    if (Storage.getList().getProject(projectName).contains(taskName)) {
      alert('Task already exists in project')
      clearForms()
      return
    }

    e.preventDefault()
    Storage.addTask(projectName, Task.task(taskName, taskDueDate, priority))
    clearForms()
    closeAddTaskDialog()
    renderTasks(projectName)
  }

  // TASK EVENT LISTENERS
  // eslint-disable-next-line no-unused-vars
  function initTaskButtons() {
    const checkboxLabels = document.querySelectorAll(
      '.section-task-checkbox label'
    )
    const removeButtons = document.querySelectorAll('[data-remove]')
    const editButtons = document.querySelectorAll('[data-edit]')

    checkboxLabels.forEach((checkboxLabel) =>
      checkboxLabel.addEventListener('click', (event) =>
        changeTaskCompleteState(event)
      )
    )

    removeButtons.forEach((button) => {
      button.addEventListener('click', (event) => deleteTask(event))
    })

    editButtons.forEach((button) => {
      button.addEventListener('click', (event) => editTask(event))
    })
  }

  function changeTaskCompleteState(e) {
    const { target } = e
    const projectName = document.getElementById('project-heading').textContent
    const taskItem = target.closest('[data-task-item]')
    const taskName = taskItem.children[1].children[0].textContent
    const taskId = taskItem.id

    Storage.changeTaskCompleteState(projectName, taskName, taskId)
    Storage.updateCompletedProject()
    renderTasks(projectName)
    updateAvatar()
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
    const taskName = taskItem.children[1].children[0].textContent
    const taskId = taskItem.id

    if (projectName !== 'Completed') {
      if (
        Storage.getList().getProject(projectName).getTask(taskId).completed ===
        true
      ) {
        const completedTaskSave = {
          ...Storage.getList().getProject(projectName).getTask(taskId),
        }

        Storage.addTask('Completed', completedTaskSave)
      }
    } else {
      Storage.changeTaskCompleteState(projectName, taskName, taskId)
      Storage.deleteCompletedTask(taskId)
      renderTasks(projectName)
      updateAvatar()
      return
    }
    Storage.deleteTask(taskId)
    renderTasks(projectName)
  }

  function editTask(e) {
    const { target } = e
    const taskItem = target.closest('[data-task-item]')
    // IF EDIT DIALOG IS CLICKED AGAIN FOR THE SAME TASK, CLOSE IT
    if (
      taskItem.nextElementSibling ===
        document.getElementById('dialog-edit-task') &&
      document.getElementById('dialog-edit-task').classList.contains('active')
    ) {
      closeEditTaskDialog()
      return
    }
    const taskName = taskItem.children[1].children[0].textContent
    const taskDate = taskItem.children[1].children[1].textContent || ''
    const checkboxLabel = taskItem.children[0].children[1]

    openEditTaskDialog(taskItem, taskName, taskDate, checkboxLabel)
  }

  function openEditTaskDialog(taskItem, taskName, taskDate, checkboxLabel) {
    closeAllDialogs()
    hideAddTaskButton()
    clearForms()
    const editTaskDialog = document.getElementById('dialog-edit-task')
    insertAfter(editTaskDialog, taskItem)
    editTaskDialog.classList.add('active')

    const nameInput = document.getElementById('edit-task-name')
    nameInput.value = taskName

    const dateInput = document.getElementById('edit-task-date')
    const date = new Date(taskDate)
    date.setDate(date.getDate() + 1) // JS TIMEZONE FIX FOR CROATIA
    dateInput.valueAsDate = date
    if (isValid(date)) {
      dateInput.setAttribute('value', formatDate(date, 'yyyy-MM-dd'))
    }

    const prioritySelect = document.getElementById('priority-edit')
    const priorityIndex = getPriority(checkboxLabel.className)
    prioritySelect[priorityIndex].selected = true
  }

  function closeEditTaskDialog() {
    const projectName = document.getElementById('project-heading').textContent
    const editTaskDialog = document.getElementById('dialog-edit-task')
    editTaskDialog.classList.remove('active')
    if (
      projectName === 'Today' ||
      projectName === 'This week' ||
      projectName === 'Completed'
    ) {
      return
    }
    showAddTaskButton()
  }

  function initEditTaskButtons() {
    const submitEditTaskButton = document.getElementById(
      'button-dialog-edit-task'
    )
    const cancelTaskEditDialogButton = document.getElementById(
      'button-dialog-cancel-edit-task'
    )

    submitEditTaskButton.addEventListener('click', (event) => {
      updateTask(event)
    })
    cancelTaskEditDialogButton.addEventListener('click', closeEditTaskDialog)
  }

  function updateTask(e) {
    const projectName = document.getElementById('project-heading').textContent
    const tasksContainer = document.getElementById('tasks-container')
    const editTaskDialog = document.getElementById('dialog-edit-task')
    const index = [...editTaskDialog.parentElement.children].indexOf(
      editTaskDialog
    )
    const taskItem = tasksContainer.children[index - 1]
    const taskId = taskItem.id
    const taskName = document.getElementById('edit-task-name').value
    const taskDueDate = document.getElementById('edit-task-date').value
    const taskPriority = document.getElementById('priority-edit').value

    if (taskName === '' || taskName === null) {
      return
    }

    e.preventDefault()
    Storage.editTask(projectName, taskId, taskName, taskDueDate, taskPriority)
    clearForms()
    closeEditTaskDialog()
    renderTasks(projectName)
  }

  function updateAvatar() {
    const avatarScore = document.querySelector('[data-completed]')
    const avatarTitle = document.querySelector('[data-character-title]')
    const avatarImage = document.querySelector('[data-character]')
    avatarScore.textContent = Avatar.avatar.getAvatarScore()
    avatarTitle.textContent = Avatar.avatar.getAvatarTitle()
    avatarImage.src = Avatar.avatar.getAvatarImage()
  }

  function preserveEditTaskDialog() {
    const addTaskDialog = document.getElementById('dialog-add-task')
    const editTaskDialog = document.getElementById('dialog-edit-task')
    insertAfter(editTaskDialog, addTaskDialog)
  }

  function closeAllDialogs() {
    closeAddProjectDialog()
    closeEditTaskDialog()
    closeAddTaskDialog()
  }

  function initHamburgerButton() {
    const hamburgerButton = document.getElementById('container-burger-menu')
    hamburgerButton.addEventListener('click', toggleSidebar)
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar')
    sidebar.classList.toggle('active')
  }

  function closeSidebar() {
    const sidebar = document.getElementById('sidebar')
    sidebar.classList.remove('active')
  }

  function loadFooter() {
    const currentYear = new Date().getFullYear()
    const copyrightText = document.getElementById('copyright')
    copyrightText.textContent = `Copyright ?? ${currentYear} @lovrozagar`

    const gitLogo = document.createElement('i')
    gitLogo.classList.add('fab', 'fa-github')

    const footer = document.getElementById('footer')
    footer.appendChild(gitLogo)
  }

  function formatDate(date) {
    let dateF = 'No date'
    if (isValid(parseISO(date))) {
      dateF = format(parseISO(date), 'MM/dd/yy')
    }
    return dateF
  }

  function styleByPriority(element, priority) {
    switch (priority) {
      case 'high':
        element.classList.add('high')
        break
      case 'medium':
        element.classList.add('medium')
        break
      case 'low':
        element.classList.add('low')
        break
      default:
        element.classList.add('no-priority')
    }
  }

  function getPriority(elementClassName) {
    switch (elementClassName) {
      case 'high':
        return 0
      case 'medium':
        return 1
      case 'low':
        return 2
      default:
        return 3
    }
  }

  function renderQuoteIfNoTasks(taskNumber) {
    const quoteSection = document.getElementById('quote')
    if (taskNumber === 0) {
      quoteSection.classList.remove('hidden')
      return
    }
    quoteSection.classList.add('hidden')
  }

  function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
  }

  return { loadContent }
})()

export default DOM
