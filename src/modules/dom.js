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

  const taskNamePara = document.createElement('h2');
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

  // EDIT SECTION
  const changeContainer = document.createElement('div');
  changeContainer.classList.add('edit-container');

  const editImg = document.createElement('img');
  editImg.src = './assets/editPen.png';

  const removeImg = document.createElement('img');
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

export { createTask };
