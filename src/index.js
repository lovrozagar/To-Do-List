import { compareAsc, format } from 'date-fns';
import { createTask } from './modules/dom';

import './styles/reset.css';
import './styles/main.css';
import './assets/editPen.png';
import './assets/trash.png';
import './assets/lazyPanda.png';

const projectDefault = [];
console.log(projectDefault);

const modal = document.getElementById('modal');
const taskName = document.getElementById('taskName');
const taskDescription = document.getElementById('taskDescription');
const taskDueDate = document.getElementById('taskDueDate');
const taskPriority = document.getElementById('priority');

const btnAddContainer = document.getElementById('btn-add-container');
const openModal = document.getElementById('btn-open-modal');
const closeModal = document.getElementById('btn-close-modal');
const cancelModal = document.getElementById('btn-cancel-modal');

const task = (title, description, dueDate, priority) => {
  return { title, description, dueDate, priority };
};

function validateForm(name, description, dueDate, priority) {
  if (name !== '' && name.length < 50 && dueDate !== '' && priority !== '') {
    return true;
  }
  return false;
}

function formatDate(date) {
  return `📅 ${format(new Date(date), 'd MMM')}`;
}

function addTaskInProjectArray() {
  if (
    validateForm(
      taskName.value,
      taskDescription.value,
      taskDueDate.value,
      taskPriority.value
    )
  ) {
    const obj = task(
      taskName.value,
      taskDescription.value,
      formatDate(taskDueDate.value),
      taskPriority.value
    );
    projectDefault.push(obj);
    return 'valid';
  }
  return 'invalid';
}

function removeTasks(el) {
  const elements = el.getElementsByClassName('task-container');
  while (elements[0]) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function displayTask() {
  const tasks = document.getElementById('tasks');
  removeTasks(tasks);
  for (let i = 0; i < projectDefault.length; i += 1) {
    const currentTask = createTask(
      projectDefault[i].title,
      projectDefault[i].description,
      projectDefault[i].dueDate,
      projectDefault[i].priority
    );
    tasks.insertBefore(currentTask, btnAddContainer);
  }
}

function resetTaskDialog() {
  taskName.value = '';
  taskDescription.value = '';
  taskDueDate.value = '';
  taskPriority.value = 'Medium';
}

function listenForAddTask() {
  openModal.addEventListener('click', () => {
    modal.classList.toggle('active');
    openModal.classList.toggle('active');
    resetTaskDialog();
  });

  cancelModal.addEventListener('click', () => {
    modal.classList.remove('active');
    openModal.classList.toggle('active');
    resetTaskDialog();
  });

  closeModal.addEventListener('click', (e) => {
    const isValid = addTaskInProjectArray();
    if (isValid === 'valid') {
      e.preventDefault;
      modal.classList.remove('active');
      openModal.classList.toggle('active');
      displayTask();
      resetTaskDialog();
    }
  });
}

listenForAddTask();
