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

  function addTaskInProjectArray() {
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
      const currentTask = dom.createTask(
        projectDefault[i].title,
        projectDefault[i].description,
        projectDefault[i].dueDate,
        projectDefault[i].priority,
        projectDefault[i].completed
      );
      tasks.insertBefore(currentTask, btnAddContainer);
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
    addTaskInProjectArray,
    displayTask,
    resetTaskDialog,
    styleIfCompleted,
  };
})();

export default tasks;
