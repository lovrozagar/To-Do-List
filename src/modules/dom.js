import { id } from 'date-fns/locale';
import tasks from './tasks';

const dom = (() => {
  const _tasks = document.querySelector('[data-tasks]');
  const taskName = document.getElementById('taskName');
  const taskDescription = document.getElementById('taskDescription');
  const taskDueDate = document.getElementById('taskDueDate');
  const taskPriority = document.getElementById('priority');

  const btnAddContainer = document.getElementById('btn-add-container');
  const btnAddTask = document.querySelector('[data-btn-add-task]');
  const btnCancelTask = document.getElementById('[btn-cancel-task]');
  const dialog = document.getElementById('dialog');

  function pushTaskInProject() {
    tasks.addTaskInProject();
    toggleAddTaskDialog();
    renderTasks();
    console.log(tasks.projectDefault);
  }

  function renderTasks() {
    removeTasks(_tasks);
    for (let i = 0; i < tasks.projectDefault.length; i += 1) {
      const currentTask = dom.createTask(
        tasks.projectDefault[i].title,
        tasks.projectDefault[i].description,
        tasks.projectDefault[i].dueDate,
        tasks.projectDefault[i].priority,
        tasks.projectDefault[i].completed
      );
      _tasks.insertBefore(currentTask, btnAddContainer);
    }
  }

  function removeTasks(el) {
    const elements = el.getElementsByClassName('task-container');
    while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  function toggleAddTaskDialog() {
    dialog.classList.toggle('active');
    toggleBtnAddTask();
    resetAddTaskDialogValues();
  }

  function toggleBtnAddTask() {
    btnAddTask.classList.toggle('active');
  }

  function resetAddTaskDialogValues() {
    taskName.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
    taskPriority.value = 'Medium';
  }

  function createTask(name, description, dueDate, priority, completed) {
    // TASK CONTAINER
    const taskContainer = createDiv('task-container', '');

    // CHECKBOX SECTION
    const checkboxContainer = createDiv('checkbox-container', '');
    const checkboxId = crypto.randomUUID(); // make IDS connect with for and be unique
    const checkbox = createInput('checkbox', checkboxId, 'checkbox');
    taskContainer.dataset.id = checkboxId;
    checkbox.checked = tasks.styleIfCompleted(taskContainer, completed); // If task was checked render it as checked again and apply checked styling to the whole task container
    const checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute('for', checkboxId);

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabel);

    // TASK INFORMATION SECTION
    const taskInfoContainer = createDiv('task-info-container', '');
    const taskNamePara = createPara('task-name', '', name);
    const taskDescriptionPara = createPara('task-description', '', description);
    const taskDatePara = createPara('task-date', '', dueDate);
    const taskPriority = createPara('task-priority', '', priority);

    // EDIT SECTION
    const changeContainer = createDiv('edit-container', '');
    const editImg = document.createElement('img');
    editImg.classList.add('edit');
    editImg.src = './assets/editPen.png';
    const removeImg = document.createElement('img');
    removeImg.classList.add('remove');
    removeImg.setAttribute('data-remove-task-img', '');
    removeImg.src = './assets/trash.png';

    changeContainer.appendChild(editImg);
    changeContainer.appendChild(removeImg);

    taskInfoContainer.appendChild(taskNamePara);
    taskInfoContainer.appendChild(taskDescriptionPara);
    taskInfoContainer.appendChild(taskDatePara);
    taskInfoContainer.appendChild(taskPriority);

    taskContainer.appendChild(checkboxContainer);
    taskContainer.appendChild(taskInfoContainer);
    taskContainer.appendChild(changeContainer);

    return taskContainer;
  }

  function createDiv(className, idName) {
    const div = document.createElement('div');
    div.classList.add(className);
    if (idName && typeof idName === 'string') {
      div.setAttribute('id', idName);
    }
    return div;
  }

  function createPara(className, idName, text) {
    const para = document.createElement('p');
    para.classList.add(className);
    if (idName && typeof idName === 'string') {
      para.setAttribute('id', idName);
    }
    if (text) {
      para.textContent = text;
    }
    return para;
  }

  function createInput(className, idName, type) {
    const input = document.createElement('input');
    input.type = type;
    input.classList.add(className);
    if (idName && typeof idName === 'string') {
      input.setAttribute('id', idName);
    }
    return input;
  }

  return { createTask, toggleAddTaskDialog, pushTaskInProject, renderTasks };
})();

export default dom;
