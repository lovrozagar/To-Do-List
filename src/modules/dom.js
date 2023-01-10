import { id } from 'date-fns/locale';
import tasks from './tasks';

const dom = (() => {
  function createTask(name, description, dueDate, priority, completed) {
    // TASK CONTAINER
    const taskContainer = createDiv('task-container', '');

    // CHECKBOX SECTION
    const checkboxContainer = createDiv('checkbox-container', '');
    const checkboxId = crypto.randomUUID(); // make IDS connect with for and be unique
    const checkbox = createInput('checkbox', checkboxId, 'checkbox');
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

  return { createTask };
})();

export default dom;
