import { compareAsc, format } from 'date-fns';
import createTask from './modules/dom';

import './styles/reset.css';
import './styles/main.css';
import './assets/editPen.png';
import './assets/trash.png';

const projectDefault = [];
console.log(projectDefault);

const task = (title, description, dueDate, priority) => {
  return { title, description, dueDate, priority };
};

function validateForm(name, description, dueDate, priority) {
  if (
    name !== '' &&
    name.length < 50 &&
    description !== '' &&
    description.length < 50 &&
    dueDate !== '' &&
    priority !== ''
  ) {
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
  }
}


function displayTask() {
  const tasks = document.getElementById('tasks');
  tasks.replaceChildren();
  for (let i = 0; i < projectDefault.length; i += 1) {
    const currentTask = createTask(
      projectDefault[i].title,
      projectDefault[i].description,
      projectDefault[i].dueDate,
      projectDefault[i].priority
    );
    tasks.appendChild(currentTask);
  }
}

const modal = document.getElementById('modal');
const taskName = document.getElementById('taskName');
const taskDescription = document.getElementById('taskDescription');
const taskDueDate = document.getElementById('taskDueDate');
const taskPriority = document.getElementById('priority');

const openModal = document.getElementById('btn-open-modal');
const closeModal = document.getElementById('btn-close-modal');

openModal.addEventListener('click', () => {
  modal.classList.toggle('active');
});

closeModal.addEventListener('click', () => {
  addTaskInProjectArray();
  displayTask();
  modal.classList.remove('active');
  console.log(projectDefault);
});

// D/M/YY
