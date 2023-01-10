import tasks from './tasks';

const listeners = (() => {
  const btnAddContainer = document.getElementById('btn-add-container');
  const modal = document.getElementById('modal');
  const openModal = document.getElementById('btn-open-modal');
  const closeModal = document.getElementById('btn-close-modal');
  const cancelModal = document.getElementById('btn-cancel-modal');

  function listenForAddTask() {
    openModal.addEventListener('click', () => {
      modal.classList.toggle('active');
      openModal.classList.toggle('active');
      tasks.resetTaskDialog();
    });

    cancelModal.addEventListener('click', () => {
      modal.classList.remove('active');
      openModal.classList.toggle('active');
      tasks.resetTaskDialog();
    });

    closeModal.addEventListener('click', (e) => {
      const isValid = tasks.addTaskInProjectArray();
      if (isValid === 'valid') {
        e.preventDefault;
        modal.classList.remove('active');
        openModal.classList.toggle('active');
        tasks.displayTask();
        tasks.resetTaskDialog();
        listenForTaskCheckbox();
      }
    });
  }

  function listenForTaskCheckbox() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    console.log(checkboxes);

    for (let i = 0; i < checkboxes.length; i += 1) {
      checkboxes[i].addEventListener('change', function () {
        const taskContainer = checkboxes[i].closest('.task-container');
        if (checkboxes[i].checked) {
          taskContainer.classList.add('completed');
          tasks.projectDefault[i].completed = true;
        } else {
          taskContainer.classList.remove('completed');
          tasks.projectDefault[i].completed = false;
        }
      });
    }
  }

  return { listenForAddTask };
})();

export default listeners;
