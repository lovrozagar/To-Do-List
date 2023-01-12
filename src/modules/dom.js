import { compareAsc, format } from "date-fns";
import tasks from "./tasks";
import projects from "./projects";

const dom = (() => {
  const tasksContainer = document.querySelector("[data-tasks]");
  const taskName = document.getElementById("taskName");
  const taskDescription = document.getElementById("taskDescription");
  const taskDate = document.getElementById("taskDate");
  const taskPriority = document.getElementById("priority");

  const projectContainer = document.querySelector("[data-lists]");

  const btnAddContainer = document.getElementById("btn-add-container");
  const btnAddTask = document.querySelector("[data-btn-add-task]");
  const btnCancelTask = document.getElementById("[btn-cancel-task]");
  const dialog = document.getElementById("dialog");

  function pushTaskInProject(projectIndex = 0) {
    tasks.addTask(
      taskName.value,
      taskDescription.value,
      taskDate.value,
      taskPriority.value,
      projectIndex
    );
    renderTasks(projectIndex);
    toggleAddTaskDialog();
  }

  function renderTasks(index = 0) {
    removeTasks(tasksContainer, "task-container");
    console.log(projects.projectList[index].tasks[0]);
    for (let i = 0; i < projects.projectList[index].tasks.length; i += 1) {
      const currentTask = createTask(
        projects.projectList[index].tasks[i].title,
        projects.projectList[index].tasks[i].description,
        projects.projectList[index].tasks[i].date,
        projects.projectList[index].tasks[i].priority,
        projects.projectList[index].tasks[i].completed,
        index
      );
      tasksContainer.insertBefore(currentTask, btnAddContainer);
    }
  }

  function removeTasks(el, className) {
    const elements = el.getElementsByClassName(className);
    while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  function toggleAddTaskDialog() {
    dialog.classList.toggle("active");
    toggleBtnAddTask();
    resetAddTaskDialogValues();
  }

  function toggleBtnAddTask() {
    btnAddTask.classList.toggle("active");
  }

  function onTaskCheck(target, projectIndex, completedIndex) {
    const taskContainer = target.closest(".task-container");
    const index = [...taskContainer.parentNode.children].indexOf(taskContainer);
    if (target.checked) {
      styleIfCompleted(taskContainer, true);
      projects.projectList[projectIndex].tasks[index].completed = true;
      projects.addToCompleted(projectIndex, completedIndex, index);
    } else {
      styleIfCompleted(taskContainer, false);
      projects.projectList[projectIndex].tasks[index].completed = false;
      projects.removeFromCompleted(completedIndex, index);
    }
    dom.renderTasks(projectIndex);
  }

  function onProjectSelect(target, projectIndex, completedIndex) {
    const projects = document.querySelectorAll("li");
    projects.forEach((project) => {
      project.classList.remove("active-project");
    });
    target.classList.add("active-project");

    const index = [...target.parentNode.children].indexOf(target);
    projectIndex = index;
    renderTasks(projectIndex);
    hideBtnAddTaskOnCompleted(projectIndex, completedIndex);
    return projectIndex;
  }

  function hideBtnAddTaskOnCompleted(projectIndex, completedIndex) {
    if (projectIndex === completedIndex) {
      btnAddTask.classList.remove("active");
      return;
    }
    btnAddTask.classList.add("active");
  }

  function resetAddTaskDialogValues() {
    taskName.value = "";
    taskDescription.value = "";
    taskDate.value = "";
    taskPriority.value = "Medium";
  }

  function styleIfCompleted(el, isCompleted) {
    if (isCompleted) {
      el.classList.add("completed");
      return true;
    }
    el.classList.remove("completed");
    return false;
  }

  function renderProjects() {
    removeTasks(projectContainer, "project-list");
    for (let i = 0; i < projects.projectList.length; i += 1) {
      console.log(projects.projectList[i].name);
      const currentProject = createProject(projects.projectList[i].name);
    }
    initInboxDefaultView();
  }

  function createProject(name) {
    const project = createLi("project-list");
    project.textContent = name;

    projectContainer.appendChild(project);
  }

  function initInboxDefaultView() {
    const inbox = document.querySelector("li:first-of-type");
    inbox.classList.add("active-project");
  }

  function createTask(name, description, dueDate, priority, completed) {
    // TASK CONTAINER
    const taskContainer = createDiv("task-container", "");

    // CHECKBOX SECTION
    const checkboxContainer = createDiv("checkbox-container", "");
    const checkboxId = crypto.randomUUID(); // make IDS connect with for and be unique
    const checkbox = createInput("checkbox", checkboxId, "checkbox");
    taskContainer.dataset.id = checkboxId;
    checkbox.checked = styleIfCompleted(taskContainer, completed); // If task was checked render it as checked again and apply checked styling to the whole task container
    const checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("for", checkboxId);

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabel);

    // TASK INFORMATION SECTION
    const taskInfoContainer = createDiv("task-info-container", "");
    const taskNamePara = createPara("task-name", "", name);
    const taskDescriptionPara = createPara("task-description", "", description);
    const taskDatePara = createPara("task-date", "", dueDate);
    const taskPriority = createPara("task-priority", "", priority);

    // EDIT SECTION
    const changeContainer = createDiv("edit-container", "");
    const editImg = document.createElement("img");
    editImg.classList.add("edit");
    editImg.src = "./assets/editPen.png";
    const removeImg = document.createElement("img");
    removeImg.classList.add("remove");
    removeImg.setAttribute("data-remove-task-img", "");
    removeImg.src = "./assets/trash.png";

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
    const div = document.createElement("div");
    div.classList.add(className);
    if (idName && typeof idName === "string") {
      div.setAttribute("id", idName);
    }
    return div;
  }

  function createPara(className, idName, text) {
    const para = document.createElement("p");
    para.classList.add(className);
    if (idName && typeof idName === "string") {
      para.setAttribute("id", idName);
    }
    if (text) {
      para.textContent = text;
    }
    return para;
  }

  function createInput(className, idName, type) {
    const input = document.createElement("input");
    input.type = type;
    input.classList.add(className);
    if (idName && typeof idName === "string") {
      input.setAttribute("id", idName);
    }
    return input;
  }

  function createLi(className) {
    const li = document.createElement("li");
    li.classList.add(className);

    return li;
  }

  function saveToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(projects.projectList));
  }

  return {
    createTask,
    toggleAddTaskDialog,
    pushTaskInProject,
    renderTasks,
    renderProjects,
    saveToLocalStorage,
    hideBtnAddTaskOnCompleted,
    onTaskCheck,
    onProjectSelect,
  };
})();

export default dom;
