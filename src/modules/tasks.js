import { compareAsc, format } from 'date-fns';
import { is } from 'date-fns/locale';
import dom from './dom';

const tasks = (() => {
  const projectDefault = [];
  console.log(projectDefault);

  const btnAddContainer = document.getElementById('btn-add-container');
  const taskName = document.getElementById('taskName');
  const taskDescription = document.getElementById('taskDescription');
  const taskDueDate = document.getElementById('taskDueDate');
  const taskPriority = document.getElementById('priority');

  // TASK FACTORY
  const task = (title, description, dueDate, priority) => {
    let completed = false;
    return { title, description, dueDate, priority, completed };
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

  function addTaskInProject() {
    if (
      validateForm(
        taskName.value,
        taskDescription.value,
        taskDueDate.value,
        taskPriority.value
      )
    ) {
      const newTask = task(
        taskName.value,
        taskDescription.value,
        formatDate(taskDueDate.value),
        taskPriority.value
      );
      projectDefault.push(newTask);
    }
  }

  function styleIfCompleted(el, isCompleted) {
    if (isCompleted) {
      el.classList.add('completed');
      return true;
    }
    el.classList.remove('completed');
    return false;
  }

  function resetTaskDialog() {
    taskName.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
    taskPriority.value = 'Medium';
  }

  return {
    projectDefault,
    addTaskInProject,
    resetTaskDialog,
    styleIfCompleted,
  };
})();

export default tasks;
