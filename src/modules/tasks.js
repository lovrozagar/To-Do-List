import { compareAsc, format } from "date-fns";
import { is } from "date-fns/locale";
import dom from "./dom";
import projects from "./projects";

const tasks = (() => {
  // TASK FACTORY
  const task = (title, description, date, priority, projectIndex) => {
    let completed = false;
    return { title, description, date, priority, projectIndex, completed };
  };

  function addTask(title, description, date, priority, projectIndex) {
    const newTask = task(title, description, date, priority, projectIndex);

    projects.projectList[projectIndex].tasks.push(newTask);
  }

  function validateForm(name) {
    if (name !== "" && name.length < 50) {
      return true;
    }
    return false;
  }

  return {
    task,
    addTask,
  };
})();

export default tasks;
