import './styles/reset.css';
import './styles/main.css';
import { compareAsc, format } from 'date-fns';

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
  return `${format(new Date(date), 'MMM d')} 📅`;
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

function createTask(name, description, dueDate, priority) {
  // TASK CONTAINER
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task-container');

  // CHECKBOX SECTION
  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('checkbox-container');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.setAttribute('id', 'checkbox');
  checkbox.classList.add('checkbox');

  const checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', 'checkbox');

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(checkboxLabel);

  // TASK INFORMATION SECTION
  const taskInfoContainer = document.createElement('div');
  taskInfoContainer.classList.add('task-info-container');

  const taskNamePara = document.createElement('p');
  taskNamePara.textContent = name;
  taskNamePara.classList.add('task-name');

  const taskDescriptionPara = document.createElement('p');
  taskDescriptionPara.textContent = description;
  taskDescriptionPara.classList.add('task-description');

  const taskDatePara = document.createElement('p');
  taskDatePara.textContent = dueDate;
  taskDatePara.classList.add('task-date');

  const taskPriority = document.createElement('p');
  taskPriority.textContent = priority;
  taskPriority.classList.add('task-priority');

  taskInfoContainer.appendChild(taskNamePara);
  taskInfoContainer.appendChild(taskDescriptionPara);
  taskInfoContainer.appendChild(taskDatePara);
  taskInfoContainer.appendChild(taskPriority);

  taskContainer.appendChild(checkboxContainer);
  taskContainer.appendChild(taskInfoContainer);

  return taskContainer;
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
