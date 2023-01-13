/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/modules/tasks.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }



var dom = function () {
  var tasksContainer = document.querySelector("[data-tasks]");
  var taskName = document.getElementById("taskName");
  var taskDescription = document.getElementById("taskDescription");
  var taskDate = document.getElementById("taskDate");
  var taskPriority = document.getElementById("priority");
  var projectContainer = document.querySelector("[data-lists]");
  var newProjectInput = document.querySelector("[data-new-project-input]");
  var projectForm = document.querySelector("[data-new-project-form]");
  var btnAddContainer = document.getElementById("btn-add-container");
  var btnAddTask = document.querySelector("[data-btn-add-task]");
  var btnCancelTask = document.getElementById("[btn-cancel-task]");
  var dialog = document.getElementById("dialog");
  var dialogForm = document.querySelector("[data-dialog-form]");
  function pushTaskInProject() {
    var projectIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    _tasks__WEBPACK_IMPORTED_MODULE_0__["default"].addTask(taskName.value, taskDescription.value, taskDate.value, taskPriority.value, projectIndex);
    renderTasks(projectIndex);
    toggleAddTaskDialog();
  }
  function renderTasks() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    removeTasks(tasksContainer, "task-container");
    console.log(_projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[index].tasks[0]);
    for (var i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[index].tasks.length; i += 1) {
      var currentTask = createTask(_projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[index].tasks[i].title, _projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[index].tasks[i].description, _projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[index].tasks[i].date, _projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[index].tasks[i].priority, _projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[index].tasks[i].completed, index);
      tasksContainer.insertBefore(currentTask, btnAddContainer);
    }
  }
  function removeTasks(el, className) {
    var elements = el.getElementsByClassName(className);
    while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
  function toggleAddTaskDialog() {
    dialog.classList.toggle("active");
    if (dialog.classList.contains("active")) {
      dialog.scrollIntoView();
    }
    toggleBtnAddTask();
    resetForm(dialogForm);
  }
  function closeAddTaskDialog() {
    dialog.classList.remove("active");
    resetForm(dialogForm);
  }
  function toggleBtnAddTask() {
    btnAddTask.classList.toggle("active");
  }
  function onTaskCheck(target, projectIndex, completedIndex) {
    var taskContainer = target.closest(".task-container");
    var index = _toConsumableArray(taskContainer.parentNode.children).indexOf(taskContainer);
    if (target.checked) {
      styleIfCompleted(taskContainer, true);
      _projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[projectIndex].tasks[index].completed = true;
      _projects__WEBPACK_IMPORTED_MODULE_1__["default"].addToCompleted(projectIndex, completedIndex, index);
    } else {
      styleIfCompleted(taskContainer, false);
      _projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[projectIndex].tasks[index].completed = false;
      _projects__WEBPACK_IMPORTED_MODULE_1__["default"].removeFromCompleted(completedIndex, index);
    }
    renderTasks(projectIndex);
  }
  function deleteTask(target, projectIndex) {
    var taskContainer = target.closest(".task-container");
    var index = _toConsumableArray(taskContainer.parentNode.children).indexOf(taskContainer);
    _projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[projectIndex].tasks.splice(index, 1);
    renderTasks(projectIndex);
  }
  function onProjectSelect(target, projectIndex, completedIndex) {
    var projects = document.querySelectorAll("li");
    projects.forEach(function (project) {
      project.classList.remove("active-project");
    });
    target.classList.add("active-project");
    var index = _toConsumableArray(target.parentNode.children).indexOf(target);
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
  function resetForm(formEl) {
    formEl.reset();
  }
  function styleIfCompleted(el, isCompleted) {
    if (isCompleted) {
      el.classList.add("completed");
      return true;
    }
    el.classList.remove("completed");
    return false;
  }
  function pushProject() {
    _projects__WEBPACK_IMPORTED_MODULE_1__["default"].addProject(newProjectInput.value);
    renderProjects();
    resetForm(projectForm);
  }
  function renderProjects() {
    removeTasks(projectContainer, "project-list");
    for (var i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList.length; i += 1) {
      console.log(_projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[i].name);
      var currentProject = createProject(_projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[i].name);
    }
  }
  function createProject(name) {
    var project = createLi("project-list");
    project.textContent = name;
    projectContainer.appendChild(project);
  }
  function initInboxDefaultView() {
    var inbox = document.querySelector("li:first-of-type");
    inbox.classList.add("active-project");
  }
  function createTask(name, description, dueDate, priority, completed) {
    // TASK CONTAINER
    var taskContainer = createDiv("task-container", "");

    // CHECKBOX SECTION
    var checkboxContainer = createDiv("checkbox-container", "");
    var checkboxId = crypto.randomUUID(); // make IDS connect with for and be unique
    var checkbox = createInput("checkbox", checkboxId, "checkbox");
    taskContainer.dataset.id = checkboxId;
    checkbox.checked = styleIfCompleted(taskContainer, completed); // If task was checked render it as checked again and apply checked styling to the whole task container
    var checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("for", checkboxId);
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabel);

    // TASK INFORMATION SECTION
    var taskInfoContainer = createDiv("task-info-container", "");
    var taskNamePara = createPara("task-name", "", name);
    var taskDescriptionPara = createPara("task-description", "", description);
    var taskDatePara = createPara("task-date", "", dueDate);
    var taskPriority = createPara("task-priority", "", priority);

    // EDIT SECTION
    var changeContainer = createDiv("edit-container", "");
    var editImg = document.createElement("img");
    editImg.classList.add("edit");
    editImg.src = "./assets/editPen.png";
    var removeImg = document.createElement("img");
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
    var div = document.createElement("div");
    div.classList.add(className);
    if (idName && typeof idName === "string") {
      div.setAttribute("id", idName);
    }
    return div;
  }
  function createPara(className, idName, text) {
    var para = document.createElement("p");
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
    var input = document.createElement("input");
    input.type = type;
    input.classList.add(className);
    if (idName && typeof idName === "string") {
      input.setAttribute("id", idName);
    }
    return input;
  }
  function createLi(className) {
    var li = document.createElement("li");
    li.classList.add(className);
    return li;
  }
  function saveToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(_projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList));
  }
  return {
    createTask: createTask,
    toggleAddTaskDialog: toggleAddTaskDialog,
    closeAddTaskDialog: closeAddTaskDialog,
    pushTaskInProject: pushTaskInProject,
    renderTasks: renderTasks,
    renderProjects: renderProjects,
    saveToLocalStorage: saveToLocalStorage,
    hideBtnAddTaskOnCompleted: hideBtnAddTaskOnCompleted,
    onTaskCheck: onTaskCheck,
    onProjectSelect: onProjectSelect,
    initInboxDefaultView: initInboxDefaultView,
    pushProject: pushProject,
    deleteTask: deleteTask
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);

/***/ }),

/***/ "./src/modules/listeners.js":
/*!**********************************!*\
  !*** ./src/modules/listeners.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/modules/tasks.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");



var listeners = function () {
  var projectIndex = 0;
  var completedIndex = 3;
  // LISTEN FOR ALL CLICKS
  function listenClicks() {
    document.addEventListener("click", function (event) {
      var target = event.target;

      // SHOW OR CANCEL ADD TASK DIALOG
      if (target.hasAttribute("data-btn-add-task") || target.hasAttribute("data-btn-cancel-task")) {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].toggleAddTaskDialog();
      }

      // PUSH TASK AND HIDE ADD TASK DIALOG
      if (target.hasAttribute("data-btn-push-task")) {
        event.preventDefault();
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].pushTaskInProject(projectIndex);
      }

      // TOGGLE CHECKBOX AND IS COMPLETED OBJ PROPERTY
      if (target.type === "checkbox") {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].onTaskCheck(target, projectIndex, completedIndex);
      }
      if (target.hasAttribute("data-remove-task-img")) {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].deleteTask(target, projectIndex);
      }
      if (target.tagName === "LI" && !target.classList.contains("active-project")) {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].closeAddTaskDialog(); // CLOSE ACTIVE DIALOG ON PROJECT SWITCH
        projectIndex = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].onProjectSelect(target, projectIndex, completedIndex);
      }

      // if (target.hasAttribute("data-new-project-button")) {
      //   dom.pushProject();
      // }

      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].saveToLocalStorage();
    });
    document.addEventListener("submit", function (event) {
      var target = event.target;
      event.preventDefault();
      console.log(target);
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].pushProject();
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].saveToLocalStorage();
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

  return {
    listenClicks: listenClicks
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (listeners);

/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var projects = function () {
  var projectList = [{
    name: "Inbox",
    index: 0,
    tasks: [],
    active: true
  }, {
    name: "Today",
    index: 1,
    tasks: []
  }, {
    name: "This Week",
    index: 2,
    tasks: []
  }, {
    name: "Completed",
    index: 3,
    tasks: []
  }];
  if (localStorage.getItem("projects") !== null) {
    var projectsFromStorage = JSON.parse(localStorage.getItem("projects"));
    projectList = projectsFromStorage;
  }
  var project = function project(name) {
    var index = projectList.length;
    var tasks = [];
    return {
      name: name,
      index: index,
      tasks: tasks
    };
  };
  function addProject(name) {
    var newProject = project(name);
    projectList.push(newProject);
  }
  var currentProject = [0];
  function setCurrentProject(index) {
    currentProject = [index];
  }
  function addToCompleted(projectIndex, completedIndex, taskIndex) {
    projects.projectList[completedIndex].tasks.push(projects.projectList[projectIndex].tasks[taskIndex]);
  }
  function removeFromCompleted(completedIndex, taskIndex) {
    projects.projectList[completedIndex].tasks.splice(taskIndex, 1);
  }
  return {
    projectList: projectList,
    addToCompleted: addToCompleted,
    removeFromCompleted: removeFromCompleted,
    addProject: addProject
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projects);

/***/ }),

/***/ "./src/modules/tasks.js":
/*!******************************!*\
  !*** ./src/modules/tasks.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");




var tasks = function () {
  // TASK FACTORY
  var task = function task(title, description, date, priority, projectIndex) {
    var completed = false;
    return {
      title: title,
      description: description,
      date: date,
      priority: priority,
      projectIndex: projectIndex,
      completed: completed
    };
  };
  function addTask(title, description, date, priority, projectIndex) {
    var newTask = task(title, description, date, priority, projectIndex);
    _projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList[projectIndex].tasks.push(newTask);
  }
  function validateForm(name) {
    if (name !== "" && name.length < 50) {
      return true;
    }
    return false;
  }
  return {
    task: task,
    addTask: addTask
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tasks);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.css":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.css ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/listDot.svg */ "./src/assets/listDot.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/inbox.svg */ "./src/assets/inbox.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/today.svg */ "./src/assets/today.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/thisWeek.svg */ "./src/assets/thisWeek.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/completed.svg */ "./src/assets/completed.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --black: #202020;\n  --white: hsla(0, 0%, 100%, 0.87);\n  --grey: #808080;\n  --grey-transparent: #80808080;\n  --dark-grey: #242424;\n  --medium-dark-grey: #282828;\n  --grey-hover: #363636;\n  --green: #32cd32;\n  --tasks-width: 800px;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  color: var(--white);\n  font-size: 16px;\n}\n\nbody {\n  background-color: var(--black);\n}\n\nbutton,\nselect {\n  border: none;\n  outline: none;\n}\n\n.header {\n  display: flex;\n  align-items: center;\n  height: 60px;\n  padding-left: 1rem;\n  background-color: var(--medium-dark-grey);\n  font-size: 1.625rem;\n  font-weight: bold;\n}\n\n.main {\n  display: flex;\n  min-height: calc(100vh - 60px);\n}\n\n.sidebar {\n  padding: 1rem;\n  font-weight: 500;\n  width: 200px;\n  background-color: var(--dark-grey);\n}\n\n.project-form {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  border: 1px solid var(--grey-transparent);\n  padding: 0.25rem;\n  border-radius: 5px;\n  margin-top: 0.5rem;\n}\n\n.project-input {\n  flex: 1;\n  margin: 0;\n}\n\n.btn-add-project {\n  background-color: transparent;\n  font-size: 1rem;\n  padding-left: 1rem;\n  color: var(--grey);\n}\n\n.project-list {\n  font-size: 1rem;\n  font-weight: 400;\n  padding: 0.625rem 0.125rem;\n  border-radius: 5px;\n  margin: 0.25rem 0;\n}\n\n.project-list:hover {\n  background-color: var(--grey-hover);\n}\n\n.active-project {\n  color: var(--white);\n  font-weight: 500;\n}\n\nli {\n  position: relative;\n  padding-left: 2rem !important;\n}\n\nli::before {\n  position: absolute;\n  top: 6.5px;\n  left: 5px;\n  content: \"\";\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  height: 1.25rem;\n  width: 1.25rem;\n  display: inline-block;\n}\n\nli:first-child::before {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  filter: invert(55%) sepia(19%) saturate(1713%) hue-rotate(180deg) brightness(100%) contrast(103%);\n}\n\nli:nth-child(2)::before {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  filter: invert(47%) sepia(92%) saturate(401%) hue-rotate(83deg) brightness(101%) contrast(91%);\n}\n\nli:nth-child(3)::before {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  filter: invert(45%) sepia(75%) saturate(542%) hue-rotate(219deg) brightness(101%) contrast(101%);\n}\n\nli:nth-child(4)::before {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n  filter: invert(79%) sepia(37%) saturate(5702%) hue-rotate(348deg) brightness(101%) contrast(101%);\n}\n\nli:nth-child(4) {\n  margin-bottom: 2.5rem;\n}\n\nli:nth-child(4)::after {\n  display: inline;\n  content: \"Projects\";\n  position: absolute;\n  top: 3.5rem;\n  left: 0;\n  font-size: 1rem;\n  font-weight: normal;\n  color: var(--green);\n  pointer-events: none;\n}\n\n.tasks {\n  position: relative;\n  max-width: var(--tasks-width);\n  margin: 0 auto;\n  padding: 1rem 0 5rem 0;\n  flex: 1;\n}\n\n.btn-add-container {\n  display: flex;\n}\n\n.btn-add-task {\n  font-size: 1rem;\n  flex: 1;\n  text-align: start;\n  color: var(--grey);\n  background-color: transparent;\n}\n\n.dialog,\n.btn-add-task {\n  display: none;\n}\n\n.dialog.active,\n.btn-add-task.active {\n  display: block;\n}\n\n.dialog-form {\n  border: 1px solid var(--grey-transparent);\n  padding: 0.75rem;\n  border-radius: 10px;\n}\n\n.btn-remove-container {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.btn-cancel-task,\n.btn-remove-task {\n  font-size: 0.825rem;\n  font-weight: 600;\n  padding: 10px 12px;\n  border-radius: 5px;\n  margin: 0.5rem 0 0 0.75rem;\n}\n\n.btn-cancel-task {\n  background-color: var(--medium-dark-grey);\n  color: var(--white);\n}\n\n.btn-remove-task {\n  background-color: var(--green);\n  color: var(--white);\n}\n\ninput {\n  background-color: transparent;\n  border: none;\n  outline: none;\n  color: var(--white);\n}\n\n.task-text {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n\ninput[type=text]:first-child {\n  font-size: 1rem;\n}\n\ninput[type=text]:nth-child(2) {\n  font-size: 0.75rem;\n}\n\ninput {\n  margin-bottom: 0.5rem;\n}\n\n/* MADE TASKS */\n.task-name {\n  font-size: 1.25rem;\n}\n\n.task-description,\n.task-date,\n.task-priority {\n  margin-top: 0.25rem;\n  font-size: 1rem;\n}\n\n/* Removes the clear button from date inputs */\ninput[type=date]::-webkit-clear-button {\n  display: none;\n}\n\n/* Removes the spin button */\ninput[type=date]::-webkit-inner-spin-button {\n  display: none;\n}\n\n/* Always display the drop down caret */\ninput[type=date]::-webkit-calendar-picker-indicator {\n  filter: invert(0.5);\n}\n\n/* A few custom styles for date inputs */\ninput[type=date] {\n  appearance: none;\n  -webkit-appearance: none;\n  color: var(--grey);\n  border: 1px solid var(--grey-transparent);\n  padding: 5px;\n  border-radius: 5px;\n  margin-right: 0.5rem;\n}\n\nselect {\n  appearance: none;\n  -webkit-appearance: none;\n  border: 1px solid var(--grey-transparent);\n  padding: 5px;\n  border-radius: 5px;\n  background-color: transparent;\n  color: var(--grey);\n}\n\n.task-info-container {\n  padding-left: 0.25rem;\n  flex: 1;\n}\n\n.task-info-container > p:not(:first-child) {\n  margin-top: 0.5rem;\n}\n\n.task-container {\n  padding: 1rem;\n  margin-bottom: 0.25rem;\n  width: 100%;\n  display: flex;\n  border-bottom: 1px solid var(--grey-transparent);\n}\n\n.task-description,\n.task-date {\n  color: var(--grey);\n}\n\n.checkbox-container {\n  position: relative;\n}\n\n.checkbox-container label {\n  background-color: transparent;\n  border: 1px solid var(--grey);\n  border-radius: 50%;\n  cursor: pointer;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1rem;\n  height: 1rem;\n}\n\n.checkbox-container label::after {\n  transition: opacity 0.4s ease;\n}\n\n.checkbox-container label:hover::after {\n  border: 1.5px solid var(--grey);\n  border-top: none;\n  border-right: none;\n  content: \"\";\n  opacity: 0;\n  transform: rotate(-45deg);\n  position: absolute;\n  top: 4.25px;\n  left: 3px;\n  height: 3px;\n  width: 6.5px;\n}\n\n.checkbox-container input[type=checkbox]:checked + label::after {\n  border: 1.5px solid var(--white);\n  border-top: none;\n  border-right: none;\n  content: \"\";\n  opacity: 0;\n  transform: rotate(-45deg);\n  position: absolute;\n  top: 4.25px;\n  left: 3px;\n  height: 3px;\n  width: 6.5px;\n}\n\n.checkbox-container input[type=checkbox] {\n  visibility: hidden;\n}\n\n.checkbox-container input[type=checkbox]:hover + label::after {\n  opacity: 1;\n}\n\n.checkbox-container input[type=checkbox]:checked + label {\n  background-color: var(--green);\n  border-color: var(--green);\n}\n\n.checkbox-container input[type=checkbox]:checked + label::after {\n  opacity: 1;\n}\n\n.edit-container {\n  display: flex;\n}\n\n.edit,\n.remove {\n  margin-left: 1rem;\n  display: inline-block;\n  height: 24px;\n  filter: invert(48%) sepia(1%) saturate(1020%) hue-rotate(346deg) brightness(105%) contrast(85%);\n}\n\n.all-complete-container {\n  max-width: 800px;\n  position: absolute;\n  text-align: center;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: -10;\n}\n\nimg.lazy-panda {\n  height: 240px;\n  width: 300px;\n}\n\n.all-complete-container > p {\n  font-size: 0.8rem;\n  color: var(--grey);\n}\n\n@media only screen and (max-width: 600px) {\n  .sidebar {\n    max-width: 100px;\n  }\n  img.lazy-panda {\n    max-width: 100px;\n    height: 80px;\n  }\n}\nli {\n  color: var(--grey);\n  cursor: pointer;\n}\n\n.completed {\n  text-decoration: line-through;\n  color: var(--grey);\n}", "",{"version":3,"sources":["webpack://./src/styles/main.css"],"names":[],"mappings":"AAAA;EACE,gBAAA;EACA,gCAAA;EACA,eAAA;EACA,6BAAA;EACA,oBAAA;EACA,2BAAA;EACA,qBAAA;EACA,gBAAA;EACA,oBAAA;AACF;;AAEA;EACE,sBAAA;AACF;;AAEA;EACE,wIAAA;EAEA,mBAAA;EACA,eAAA;AAAF;;AAGA;EACE,8BAAA;AAAF;;AAGA;;EAEE,YAAA;EACA,aAAA;AAAF;;AAGA;EACE,aAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;EACA,yCAAA;EACA,mBAAA;EACA,iBAAA;AAAF;;AAGA;EACE,aAAA;EACA,8BAAA;AAAF;;AAGA;EACE,aAAA;EACA,gBAAA;EACA,YAAA;EACA,kCAAA;AAAF;;AAGA;EACE,aAAA;EACA,mBAAA;EACA,WAAA;EACA,yCAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AAAF;;AAGA;EACE,OAAA;EACA,SAAA;AAAF;;AAGA;EACE,6BAAA;EACA,eAAA;EACA,kBAAA;EACA,kBAAA;AAAF;;AAGA;EACE,eAAA;EACA,gBAAA;EACA,0BAAA;EACA,kBAAA;EACA,iBAAA;AAAF;;AAGA;EACE,mCAAA;AAAF;;AAGA;EACE,mBAAA;EACA,gBAAA;AAAF;;AAGA;EACE,kBAAA;EACA,6BAAA;AAAF;;AAGA;EACE,kBAAA;EACA,UAAA;EACA,SAAA;EACA,WAAA;EACA,mDAAA;EACA,eAAA;EACA,cAAA;EACA,qBAAA;AAAF;;AAGA;EACE,mDAAA;EACA,iGAAA;AAAF;;AAGA;EACE,mDAAA;EACA,8FAAA;AAAF;;AAGA;EACE,mDAAA;EACA,gGAAA;AAAF;;AAGA;EACE,mDAAA;EACA,iGAAA;AAAF;;AAGA;EACE,qBAAA;AAAF;;AAGA;EACE,eAAA;EACA,mBAAA;EACA,kBAAA;EACA,WAAA;EACA,OAAA;EACA,eAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;AAAF;;AAGA;EACE,kBAAA;EACA,6BAAA;EACA,cAAA;EACA,sBAAA;EACA,OAAA;AAAF;;AAGA;EACE,aAAA;AAAF;;AAGA;EACE,eAAA;EACA,OAAA;EACA,iBAAA;EACA,kBAAA;EACA,6BAAA;AAAF;;AAGA;;EAEE,aAAA;AAAF;;AAGA;;EAEE,cAAA;AAAF;;AAGA;EACE,yCAAA;EACA,gBAAA;EACA,mBAAA;AAAF;;AAGA;EACE,aAAA;EACA,yBAAA;AAAF;;AAGA;;EAEE,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;EACA,0BAAA;AAAF;;AAGA;EACE,yCAAA;EACA,mBAAA;AAAF;;AAGA;EACE,8BAAA;EACA,mBAAA;AAAF;;AAGA;EACE,6BAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;AAAF;;AAGA;EACE,aAAA;EACA,0BAAA;AAAF;;AAGA;EACE,eAAA;AAAF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,qBAAA;AACF;;AAEA,eAAA;AACA;EACE,kBAAA;AACF;;AAEA;;;EAGE,mBAAA;EACA,eAAA;AACF;;AAEA,8CAAA;AACA;EACE,aAAA;AACF;;AAEA,4BAAA;AACA;EACE,aAAA;AACF;;AAEA,uCAAA;AACA;EACE,mBAAA;AACF;;AAEA,wCAAA;AACA;EACE,gBAAA;EACA,wBAAA;EACA,kBAAA;EACA,yCAAA;EACA,YAAA;EACA,kBAAA;EACA,oBAAA;AACF;;AAEA;EACE,gBAAA;EACA,wBAAA;EACA,yCAAA;EACA,YAAA;EACA,kBAAA;EACA,6BAAA;EACA,kBAAA;AACF;;AAEA;EACE,qBAAA;EACA,OAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,WAAA;EACA,aAAA;EACA,gDAAA;AACF;;AAEA;;EAEE,kBAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,6BAAA;EACA,6BAAA;EACA,kBAAA;EACA,eAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;AACF;;AAEA;EACE,6BAAA;AACF;;AAEA;EACE,+BAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EACA,UAAA;EACA,yBAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;AACF;;AAEA;EACE,gCAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EACA,UAAA;EACA,yBAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,UAAA;AACF;;AAEA;EACE,8BAAA;EACA,0BAAA;AACF;;AAEA;EACE,UAAA;AACF;;AAEA;EACE,aAAA;AACF;;AAEA;;EAEE,iBAAA;EACA,qBAAA;EACA,YAAA;EACA,+FAAA;AACF;;AAEA;EACE,gBAAA;EACA,kBAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,YAAA;AACF;;AAEA;EACE,aAAA;EACA,YAAA;AACF;;AAEA;EACE,iBAAA;EACA,kBAAA;AACF;;AAEA;EACE;IACE,gBAAA;EACF;EAEA;IACE,gBAAA;IACA,YAAA;EAAF;AACF;AAGA;EACE,kBAAA;EACA,eAAA;AADF;;AAIA;EACE,6BAAA;EACA,kBAAA;AADF","sourcesContent":[":root {\n  --black: #202020;\n  --white: hsla(0, 0%, 100%, 0.87);\n  --grey: #808080;\n  --grey-transparent: #80808080;\n  --dark-grey: #242424;\n  --medium-dark-grey: #282828;\n  --grey-hover: #363636;\n  --green: #32cd32;\n  --tasks-width: 800px;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell,\n    \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  color: var(--white);\n  font-size: 16px;\n}\n\nbody {\n  background-color: var(--black);\n}\n\nbutton,\nselect {\n  border: none;\n  outline: none;\n}\n\n.header {\n  display: flex;\n  align-items: center;\n  height: 60px;\n  padding-left: 1rem;\n  background-color: var(--medium-dark-grey);\n  font-size: 1.625rem;\n  font-weight: bold;\n}\n\n.main {\n  display: flex;\n  min-height: calc(100vh - 60px);\n}\n\n.sidebar {\n  padding: 1rem;\n  font-weight: 500;\n  width: 200px;\n  background-color: var(--dark-grey);\n}\n\n.project-form {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  border: 1px solid var(--grey-transparent);\n  padding: 0.25rem;\n  border-radius: 5px;\n  margin-top: 0.5rem;\n}\n\n.project-input {\n  flex: 1;\n  margin: 0;\n}\n\n.btn-add-project {\n  background-color: transparent;\n  font-size: 1rem;\n  padding-left: 1rem;\n  color: var(--grey);\n}\n\n.project-list {\n  font-size: 1rem;\n  font-weight: 400;\n  padding: 0.625rem 0.125rem;\n  border-radius: 5px;\n  margin: 0.25rem 0;\n}\n\n.project-list:hover {\n  background-color: var(--grey-hover);\n}\n\n.active-project {\n  color: var(--white);\n  font-weight: 500;\n}\n\nli{\n  position: relative;\n  padding-left: 2rem !important;\n}\n\nli::before {\n  position: absolute;\n  top: 6.5px;\n  left: 5px;\n  content: \"\";\n  background: url(\"../assets/listDot.svg\");\n  height: 1.25rem;\n  width: 1.25rem;\n  display: inline-block;\n}\n\nli:first-child::before {\n  background: url(\"../assets/inbox.svg\");\n  filter: invert(55%) sepia(19%) saturate(1713%) hue-rotate(180deg) brightness(100%) contrast(103%);\n}\n\nli:nth-child(2)::before {\n  background: url(\"../assets/today.svg\");\n  filter: invert(47%) sepia(92%) saturate(401%) hue-rotate(83deg) brightness(101%) contrast(91%);\n}\n\nli:nth-child(3)::before {\n  background: url(\"../assets/thisWeek.svg\");\n  filter: invert(45%) sepia(75%) saturate(542%) hue-rotate(219deg) brightness(101%) contrast(101%);\n}\n\nli:nth-child(4)::before {\n  background: url(\"../assets/completed.svg\");\n  filter: invert(79%) sepia(37%) saturate(5702%) hue-rotate(348deg) brightness(101%) contrast(101%);\n}\n\nli:nth-child(4) {\n  margin-bottom: 2.5rem;\n}\n\nli:nth-child(4)::after {\n  display: inline;\n  content: \"Projects\";\n  position: absolute;\n  top: 3.5rem;\n  left: 0;\n  font-size: 1rem;\n  font-weight: normal;\n  color: var(--green);\n  pointer-events: none;\n}\n\n.tasks {\n  position: relative;\n  max-width: var(--tasks-width);\n  margin: 0 auto;\n  padding: 1rem 0 5rem 0;\n  flex: 1;\n}\n\n.btn-add-container {\n  display: flex;\n}\n\n.btn-add-task {\n  font-size: 1rem;\n  flex: 1;\n  text-align: start;\n  color: var(--grey);\n  background-color: transparent;\n}\n\n.dialog,\n.btn-add-task {\n  display: none;\n}\n\n.dialog.active,\n.btn-add-task.active {\n  display: block;\n}\n\n.dialog-form {\n  border: 1px solid var(--grey-transparent);\n  padding: 0.75rem;\n  border-radius: 10px;\n}\n\n.btn-remove-container {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.btn-cancel-task,\n.btn-remove-task {\n  font-size: 0.825rem;\n  font-weight: 600;\n  padding: 10px 12px;\n  border-radius: 5px;\n  margin: 0.5rem 0 0 0.75rem;\n}\n\n.btn-cancel-task {\n  background-color: var(--medium-dark-grey);\n  color: var(--white);\n}\n\n.btn-remove-task {\n  background-color: var(--green);\n  color: var(--white);\n}\n\ninput {\n  background-color: transparent;\n  border: none;\n  outline: none;\n  color: var(--white);\n}\n\n.task-text {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n\ninput[type=\"text\"]:first-child {\n  font-size: 1rem;\n}\ninput[type=\"text\"]:nth-child(2) {\n  font-size: 0.75rem;\n}\n\ninput {\n  margin-bottom: 0.5rem;\n}\n\n/* MADE TASKS */\n.task-name {\n  font-size: 1.25rem;\n}\n\n.task-description,\n.task-date,\n.task-priority {\n  margin-top: 0.25rem;\n  font-size: 1rem;\n}\n\n/* Removes the clear button from date inputs */\ninput[type=\"date\"]::-webkit-clear-button {\n  display: none;\n}\n\n/* Removes the spin button */\ninput[type=\"date\"]::-webkit-inner-spin-button {\n  display: none;\n}\n\n/* Always display the drop down caret */\ninput[type=\"date\"]::-webkit-calendar-picker-indicator {\n  filter: invert(0.5);\n}\n\n/* A few custom styles for date inputs */\ninput[type=\"date\"] {\n  appearance: none;\n  -webkit-appearance: none;\n  color: var(--grey);\n  border: 1px solid var(--grey-transparent);\n  padding: 5px;\n  border-radius: 5px;\n  margin-right: 0.5rem;\n}\n\nselect {\n  appearance: none;\n  -webkit-appearance: none;\n  border: 1px solid var(--grey-transparent);\n  padding: 5px;\n  border-radius: 5px;\n  background-color: transparent;\n  color: var(--grey);\n}\n\n.task-info-container {\n  padding-left: 0.25rem;\n  flex: 1;\n}\n\n.task-info-container > p:not(:first-child) {\n  margin-top: 0.5rem;\n}\n\n.task-container {\n  padding: 1rem;\n  margin-bottom: 0.25rem;\n  width: 100%;\n  display: flex;\n  border-bottom: 1px solid var(--grey-transparent);\n}\n\n.task-description,\n.task-date {\n  color: var(--grey);\n}\n\n.checkbox-container {\n  position: relative;\n}\n\n.checkbox-container label {\n  background-color: transparent;\n  border: 1px solid var(--grey);\n  border-radius: 50%;\n  cursor: pointer;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1rem;\n  height: 1rem;\n}\n\n.checkbox-container label::after {\n  transition: opacity 0.4s ease;\n}\n\n.checkbox-container label:hover::after {\n  border: 1.5px solid var(--grey);\n  border-top: none;\n  border-right: none;\n  content: \"\";\n  opacity: 0;\n  transform: rotate(-45deg);\n  position: absolute;\n  top: 4.25px;\n  left: 3px;\n  height: 3px;\n  width: 6.5px;\n}\n\n.checkbox-container input[type=\"checkbox\"]:checked + label::after {\n  border: 1.5px solid var(--white);\n  border-top: none;\n  border-right: none;\n  content: \"\";\n  opacity: 0;\n  transform: rotate(-45deg);\n  position: absolute;\n  top: 4.25px;\n  left: 3px;\n  height: 3px;\n  width: 6.5px;\n}\n\n.checkbox-container input[type=\"checkbox\"] {\n  visibility: hidden;\n}\n\n.checkbox-container input[type=\"checkbox\"]:hover + label::after {\n  opacity: 1;\n}\n\n.checkbox-container input[type=\"checkbox\"]:checked + label {\n  background-color: var(--green);\n  border-color: var(--green);\n}\n\n.checkbox-container input[type=\"checkbox\"]:checked + label::after {\n  opacity: 1;\n}\n\n.edit-container {\n  display: flex;\n}\n\n.edit,\n.remove {\n  margin-left: 1rem;\n  display: inline-block;\n  height: 24px;\n  filter: invert(48%) sepia(1%) saturate(1020%) hue-rotate(346deg) brightness(105%) contrast(85%);\n}\n\n.all-complete-container {\n  max-width: 800px;\n  position: absolute;\n  text-align: center;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: -10;\n}\n\nimg.lazy-panda {\n  height: 240px;\n  width: 300px;\n}\n\n.all-complete-container > p {\n  font-size: 0.8rem;\n  color: var(--grey);\n}\n\n@media only screen and (max-width: 600px) {\n  .sidebar {\n    max-width: 100px;\n  }\n\n  img.lazy-panda {\n    max-width: 100px;\n    height: 80px;\n  }\n}\n\nli {\n  color: var(--grey);\n  cursor: pointer;\n}\n\n.completed {\n  text-decoration: line-through;\n  color: var(--grey);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/reset.css":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/reset.css ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nblockquote,\nq {\n  quotes: none;\n}\n\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}", "",{"version":3,"sources":["webpack://./src/styles/reset.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAiFE,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,wBAAA;AACF;;AACA,gDAAA;AACA;;;;;;;;;;;EAWE,cAAA;AAEF;;AAAA;EACE,cAAA;AAGF;;AADA;;EAEE,gBAAA;AAIF;;AAFA;;EAEE,YAAA;AAKF;;AAHA;;;;EAIE,WAAA;EACA,aAAA;AAMF;;AAJA;EACE,yBAAA;EACA,iBAAA;AAOF","sourcesContent":["html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/assets/editPen.png":
/*!********************************!*\
  !*** ./src/assets/editPen.png ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/editPen.png");

/***/ }),

/***/ "./src/assets/lazyPanda.png":
/*!**********************************!*\
  !*** ./src/assets/lazyPanda.png ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/lazyPanda.png");

/***/ }),

/***/ "./src/assets/trash.png":
/*!******************************!*\
  !*** ./src/assets/trash.png ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/trash.png");

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/reset.css":
/*!******************************!*\
  !*** ./src/styles/reset.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./reset.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/reset.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/completed.svg":
/*!**********************************!*\
  !*** ./src/assets/completed.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "completed.svg";

/***/ }),

/***/ "./src/assets/inbox.svg":
/*!******************************!*\
  !*** ./src/assets/inbox.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "inbox.svg";

/***/ }),

/***/ "./src/assets/listDot.svg":
/*!********************************!*\
  !*** ./src/assets/listDot.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "listDot.svg";

/***/ }),

/***/ "./src/assets/thisWeek.svg":
/*!*********************************!*\
  !*** ./src/assets/thisWeek.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "thisWeek.svg";

/***/ }),

/***/ "./src/assets/today.svg":
/*!******************************!*\
  !*** ./src/assets/today.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "today.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bundle": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/projects */ "./src/modules/projects.js");
/* harmony import */ var _modules_tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tasks */ "./src/modules/tasks.js");
/* harmony import */ var _modules_listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/listeners */ "./src/modules/listeners.js");
/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/dom */ "./src/modules/dom.js");
/* harmony import */ var _styles_reset_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/reset.css */ "./src/styles/reset.css");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _assets_editPen_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/editPen.png */ "./src/assets/editPen.png");
/* harmony import */ var _assets_trash_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/trash.png */ "./src/assets/trash.png");
/* harmony import */ var _assets_lazyPanda_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/lazyPanda.png */ "./src/assets/lazyPanda.png");
/* harmony import */ var _assets_inbox_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/inbox.svg */ "./src/assets/inbox.svg");
/* harmony import */ var _assets_today_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/today.svg */ "./src/assets/today.svg");
/* harmony import */ var _assets_thisWeek_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./assets/thisWeek.svg */ "./src/assets/thisWeek.svg");
/* harmony import */ var _assets_completed_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./assets/completed.svg */ "./src/assets/completed.svg");













_modules_listeners__WEBPACK_IMPORTED_MODULE_2__["default"].listenClicks();
_modules_dom__WEBPACK_IMPORTED_MODULE_3__["default"].renderProjects();
_modules_dom__WEBPACK_IMPORTED_MODULE_3__["default"].renderTasks();
_modules_dom__WEBPACK_IMPORTED_MODULE_3__["default"].initInboxDefaultView();
})();

/******/ })()
;
//# sourceMappingURL=bundleb34b17eef83e03af7e07.js.map