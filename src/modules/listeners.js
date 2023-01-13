import tasks from "./tasks";
import dom from "./dom";
import projects from "./projects";

const listeners = (() => {
  let projectIndex = 0;
  const completedIndex = 3;
  // LISTEN FOR ALL CLICKS
  function listenClicks() {
    document.addEventListener("click", (event) => {
      const { target } = event;

      // SHOW OR CANCEL ADD TASK DIALOG
      if (target.hasAttribute("data-btn-add-task") || target.hasAttribute("data-btn-cancel-task")) {
        dom.toggleAddTaskDialog();
      }

      // PUSH TASK AND HIDE ADD TASK DIALOG
      if (target.hasAttribute("data-btn-push-task")) {
        event.preventDefault();
        dom.pushTaskInProject(projectIndex);
      }

      // TOGGLE CHECKBOX AND IS COMPLETED OBJ PROPERTY
      if (target.type === "checkbox") {
        dom.onTaskCheck(target, projectIndex, completedIndex);
      }

      if (target.hasAttribute("data-remove-task-img")) {
        dom.deleteTask(target, projectIndex);
      }

      if (target.tagName === "LI" && !target.classList.contains("active-project")) {
        dom.closeAddTaskDialog(); // CLOSE ACTIVE DIALOG ON PROJECT SWITCH
        projectIndex = dom.onProjectSelect(target, projectIndex, completedIndex);
      }

      // if (target.hasAttribute("data-new-project-button")) {
      //   dom.pushProject();
      // }

      dom.saveToLocalStorage();
    });

    document.addEventListener("submit", (event) => {
      let { target } = event;
      event.preventDefault();
      console.log(target);
      dom.pushProject();

      dom.saveToLocalStorage();
    });
  }

  // function listenForTaskCheckbox() {
  //   const checkboxes = document.querySelectorAll('input[type=checkbox]');
  //   console.log(checkboxes);

  //   for (let i = 0; i < checkboxes.length; i += 1) {
  //     checkboxes[i].addEventListener('change', function () {
  //       const taskContainer = checkboxes[i].closest('.task-container');
  //       if (checkboxes[i].checked) {
  //         taskContainer.classList.add('completed');
  //         tasks.projectDefault[i].completed = true;
  //       } else {
  //         taskContainer.classList.remove('completed');
  //         tasks.projectDefault[i].completed = false;
  //       }
  //     });
  //   }
  // }

  // return { listenForAddTask };

  return { listenClicks };
})();

export default listeners;
