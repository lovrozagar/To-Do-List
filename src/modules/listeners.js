import tasks from "./tasks";
import dom from "./dom";
import projects from "./projects";

const listeners = (() => {
  let projectIndex = 0;
  // LISTEN FOR ALL CLICKS
  function listenClicks() {
    document.addEventListener("click", (event) => {
      const { target } = event;
      console.log(target.tagName);

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
        console.log(target);
        const taskContainer = target.closest(".task-container");
        taskContainer.classList.toggle("completed");
        const index = [...taskContainer.parentNode.children].indexOf(taskContainer);
        console.log(index);
        if (target.checked) {
          taskContainer.classList.add("completed");
          projects.projectList[0].tasks[index].completed = true;
        } else {
          taskContainer.classList.remove("completed");
          projects.projectList[0].tasks[index].completed = false;
        }
      }

      if (target.hasAttribute("data-remove-task-img")) {
        const index = [...taskContainer.parentNode.children].indexOf(taskContainer);
        tasks.projectDefault.splice(index, 1);
        dom.renderTasks();
      }

      if (target.tagName === "LI" && !target.classList.contains("active-project")) {
        console.log(target);
        const projects = document.querySelectorAll("li");
        projects.forEach((project) => {
          project.classList.remove("active-project");
        });
        target.classList.add("active-project");

        const index = [...target.parentNode.children].indexOf(target);
        projectIndex = index;
        dom.renderTasks(projectIndex);
      }
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
