import tasks from "./tasks";
import dom from "./dom";
import projects from "./projects";

const listeners = (() => {
  let projectIndex = 0;
  const completedIndex = 3;
  // LISTEN FOR ALL CLICKS
  function listenClicks() {
    window.addEventListener("resize", function () {
      const sidebar = document.getElementById("sidebar");
      if (window.innerWidth > 600) sidebar.classList.remove("slide-view");
    });

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
        dom.renderCompletedTasks();
      }

      if (target.hasAttribute("data-remove-task-img")) {
        dom.deleteTask(target, projectIndex);
      }

      if (target.tagName === "LI" && !target.classList.contains("active-project")) {
        dom.closeAddTaskDialog(); // CLOSE ACTIVE DIALOG ON PROJECT SWITCH
        projectIndex = dom.onProjectSelect(target, projectIndex, completedIndex);
      }

      if (target.hasAttribute("data-burger-menu-container") || target.hasAttribute("data-tasks")) {
        dom.toggleSidebar(target);
      }

      dom.saveToLocalStorage();
    });

    document.addEventListener("submit", (event) => {
      let { target } = event;
      event.preventDefault();
      projectIndex = dom.pushProject();
      dom.renderTasks(projectIndex);
      dom.saveToLocalStorage();
    });
  }

  return { listenClicks };
})();

export default listeners;
