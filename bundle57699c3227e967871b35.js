/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ToDoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToDoList */ "./src/modules/ToDoList.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");
/* eslint-disable no-use-before-define */


var dom = function () {
  function loadHome() {
    loadProjects();
    _storage__WEBPACK_IMPORTED_MODULE_1__["default"].saveList();
    var listy = _storage__WEBPACK_IMPORTED_MODULE_1__["default"].getList();
    console.log(listy);
  }
  function loadProjects() {
    _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].toDoList.projects.forEach(function (element) {
      renderProject(element.name);
    });
  }
  function renderProject(name) {
    var projectContainer = document.getElementById('project-list');
    var project = document.createElement('li');
    project.textContent = name;
    projectContainer.appendChild(project);
  }
  return {
    loadHome: loadHome
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);

/***/ }),

/***/ "./src/modules/ToDoList.js":
/*!*********************************!*\
  !*** ./src/modules/ToDoList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/modules/project.js");
/* eslint-disable no-use-before-define */

var List = function () {
  var list = function list() {
    var projects = [];
    projects.push(_project__WEBPACK_IMPORTED_MODULE_0__["default"].project('Inbox'));
    projects.push(_project__WEBPACK_IMPORTED_MODULE_0__["default"].project('Today'));
    projects.push(_project__WEBPACK_IMPORTED_MODULE_0__["default"].project('This week'));
    projects.push(_project__WEBPACK_IMPORTED_MODULE_0__["default"].project('Completed'));
    return {
      projects: projects,
      setProjects: setProjects,
      getProjects: getProjects,
      getProject: getProject,
      contains: contains,
      addProject: addProject,
      deleteProject: deleteProject
    };
  };
  function setProjects(projects) {
    this.projects = projects;
  }
  function getProjects() {
    return this.projects;
  }
  function getProject(projectName) {
    return this.projects.find(function (project) {
      return project.getName() === projectName;
    });
  }
  function contains(projectName) {
    return this.projects.some(function (project) {
      return project.getName() === projectName;
    });
  }
  function addProject(newProject) {
    if (this.projects.find(function (project) {
      return project.name === newProject.name;
    })) {
      alert("".concat(newProject.name, " already exists"));
    }
    this.projects.push(newProject);
  }
  function deleteProject(projectName) {
    var projectToDelete = this.projects.find(function (project) {
      return project.getName() === projectName;
    });
    this.projects.splice(this.projects.indexOf(projectToDelete), 1);
  }
  function doStuff() {
    var listy = list();
    console.log(_project__WEBPACK_IMPORTED_MODULE_0__["default"].project('Inbox').name);
    listy.addProject(_project__WEBPACK_IMPORTED_MODULE_0__["default"].project('XIAO PO'));
    console.table(listy.getProjects());
  }
  var toDoList = list();
  return {
    list: list,
    doStuff: doStuff,
    toDoList: toDoList
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);

/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-use-before-define */
var Project = function () {
  // PROJECT FACTORY
  var project = function project(name) {
    var tasks = [];
    return {
      name: name,
      tasks: tasks,
      addTask: addTask,
      setName: setName,
      getName: getName,
      setTasks: setTasks,
      getTasks: getTasks,
      contains: contains,
      deleteTask: deleteTask
    };
  };
  function setName(name) {
    this.name = name;
  }
  function getName() {
    return this.name;
  }
  function setTasks(tasks) {
    this.tasks = tasks;
  }
  function getTasks(tasks) {
    this.tasks = tasks;
  }
  function contains(taskName) {
    return this.tasks.some(function (task) {
      return task.getName() === taskName;
    });
  }
  function addTask(newTask) {
    if (this.tasks.find(function (task) {
      return task.getName() === newTask.name;
    })) return;
    this.tasks.push(newTask);
  }
  function deleteTask(taskName) {
    this.tasks = this.tasks.filter(function (task) {
      return task.name !== taskName;
    });
  }
  function doStuff() {
    var a = project('Po');
    a.addTask('Lovro');
    console.log(a.getName());
  }
  return {
    project: project,
    doStuff: doStuff
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);

/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ToDoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToDoList */ "./src/modules/ToDoList.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/modules/project.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ "./src/modules/tasks.js");



var Storage = function () {
  // SAVE LIST TO LOCAL STORAGE

  function saveList(data) {
    localStorage.setItem('toDoList', JSON.stringify(data));
  }
  function getList() {
    var list = Object.assign(_ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].list(), JSON.parse(localStorage.getItem('toDoList')));
    list.setProjects(list.getProjects().map(function (project) {
      return Object.assign(_project__WEBPACK_IMPORTED_MODULE_1__["default"].project(), project);
    }));
    list.getProjects().forEach(function (project) {
      return project.setTasks(project.getTasks().map(function (task) {
        return Object.assign(_tasks__WEBPACK_IMPORTED_MODULE_2__["default"].task(), task);
      }));
    });
    return list;
  }
  function doStuff() {
    console.log('');
  }
  return {
    saveList: saveList,
    getList: getList,
    doStuff: doStuff
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);

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
/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */
var Task = function () {
  // PROJECT FACTORY
  var task = function task(name) {
    var dueDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'No date';
    return {
      name: name,
      dueDate: dueDate,
      setName: setName,
      getName: getName,
      setDate: setDate,
      getDate: getDate
    };
  };
  function setName(name) {
    this.name = name;
  }
  function getName() {
    return this.name;
  }
  function setDate(dueDate) {
    this.dueDate = dueDate;
  }
  function getDate() {
    return this.dueDate;
  }
  function doStuff() {
    var tasky = task('taskero frende comprende');
    console.log(tasky.setName = 'lola');
  }
  return {
    task: task,
    doStuff: doStuff
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./reset.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3__);
// Imports




var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/listDot.svg */ "./src/assets/listDot.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/inbox.svg */ "./src/assets/inbox.svg?3ca6"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/today.svg */ "./src/assets/today.svg?ea8c"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/thisWeek.svg */ "./src/assets/thisWeek.svg?5d49"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/completed.svg */ "./src/assets/completed.svg?0798"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_4___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* LIGHT MODE */\n/* DARK MODE */\n/* --black: #202020;\n  --white: hsla(0, 0%, 100%, 0.87);\n  --grey: #808080;\n  --grey-transparent: #80808021;\n  --dark-grey: #242424;\n  --medium-dark-grey: #282828;\n  --grey-hover: #363636;\n  --green: #32cd32; */\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  color: #000000;\n  font-size: 16px;\n  height: 100%;\n}\n\nbody {\n  background-color: #fcfcfc;\n  height: 100vh;\n}\n\nbutton,\nselect {\n  border: none;\n  outline: none;\n}\n\n.header {\n  position: relative;\n  z-index: 20;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 4rem;\n  padding: 0 0 0 1rem;\n  box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.15);\n  background-color: #f7f7f7;\n  font-size: 1.625rem;\n  font-weight: bold;\n}\n.header .burger-menu-container {\n  position: absolute;\n  display: none;\n}\n.header .burger-menu-container .btn-burger-menu {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  width: 30px;\n  height: 20px;\n  pointer-events: none;\n}\n.header .burger-menu-container .btn-burger-menu .bar {\n  height: 4px;\n  width: 100%;\n  border-radius: 10px;\n  background-color: #000000;\n}\n.header .score {\n  display: flex;\n  align-items: center;\n}\n.header .score .character-info-container {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.375rem;\n}\n.header .score .character-info-container .completed-tasks-number {\n  font-size: 1rem;\n}\n.header .score .character-info-container .character-title {\n  font-size: 0.75rem;\n  color: var(--grey);\n}\n.header .score .character-img {\n  height: 70px;\n}\n\n.main {\n  position: relative;\n  display: flex;\n}\n.main .sidebar.slide-view {\n  transform: translate(0px);\n  height: calc(100vh - 4rem);\n}\n.main .sidebar {\n  position: absolute;\n  z-index: 10;\n  height: calc(100vh - 4rem);\n  width: 300px;\n  padding: 1.5rem;\n  transition: transform 300ms ease-out;\n  font-weight: 500;\n  background-color: #f1f1f1;\n}\n.main .sidebar .project-container {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.main .sidebar .project-container .active-project {\n  font-weight: 500;\n  background-color: #fcfcfc;\n}\n.main .sidebar .project-container .project-list {\n  font-size: 1rem;\n  font-weight: 400;\n  padding: 0.625rem 0.125rem;\n  border-radius: 5px;\n}\n.main .sidebar .project-container .project-list:hover {\n  background-color: #fcfcfc;\n}\n.main .sidebar .project-container li {\n  position: relative;\n  padding-left: 2rem !important;\n  font-weight: 400;\n  cursor: pointer;\n}\n.main .sidebar .project-container li::before {\n  content: \"\";\n  position: absolute;\n  top: 7.5px;\n  left: 5px;\n  display: inline-block;\n  height: 1.25rem;\n  width: 1.25rem;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n.main .sidebar .project-container li:first-child::before {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  filter: invert(55%) sepia(19%) saturate(1713%) hue-rotate(180deg) brightness(100%) contrast(103%);\n}\n.main .sidebar .project-container li:nth-child(2)::before {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  filter: invert(47%) sepia(92%) saturate(401%) hue-rotate(83deg) brightness(101%) contrast(91%);\n}\n.main .sidebar .project-container li:nth-child(3)::before {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  filter: invert(45%) sepia(75%) saturate(542%) hue-rotate(219deg) brightness(101%) contrast(101%);\n}\n.main .sidebar .project-container li:nth-child(4)::before {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n  filter: invert(79%) sepia(37%) saturate(5702%) hue-rotate(348deg) brightness(101%) contrast(101%);\n}\n.main .sidebar .project-container li:nth-child(4) {\n  margin-bottom: 2.5rem;\n}\n.main .sidebar .project-container li:nth-child(4)::after {\n  content: \"Projects\";\n  position: absolute;\n  top: 3.5rem;\n  left: 0;\n  display: inline;\n  pointer-events: none;\n  font-size: 1rem;\n  font-weight: normal;\n  color: #32cd32;\n}\n.main .sidebar .project-form {\n  display: flex;\n  align-items: center;\n  margin-top: 0.5rem;\n  padding: 0.25rem;\n  border: 1px solid #808080;\n  border-radius: 5px;\n}\n.main .sidebar .project-form .project-input {\n  flex: 1;\n  margin: 0;\n}\n.main .task-container-all {\n  display: flex;\n  width: calc(100vw - 300px);\n  transform: translate(300px);\n}\n.main .task-container-all .tasks {\n  position: relative;\n  flex: 1;\n  height: calc(100vh - 4rem);\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 2rem;\n  overflow: auto;\n}\n.main .task-container-all .tasks .btn-add-container {\n  display: flex;\n}\n.main .task-container-all .tasks .btn-add-container .btn-add-task {\n  flex: 1;\n  font-size: 1rem;\n  text-align: start;\n  background-color: transparent;\n  color: #808080;\n}\n.main .task-container-all .tasks .dialog .dialog-form {\n  padding: 0.75rem;\n  border: 1px solid rgba(128, 128, 128, 0.4941176471);\n  border-radius: 10px;\n  /* Removes the clear button from date inputs */\n  /* Removes the spin button */\n  /* Always display the drop down caret */\n  /* A few custom styles for date inputs */\n}\n.main .task-container-all .tasks .dialog .dialog-form .task-text {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n.main .task-container-all .tasks .dialog .dialog-form .task-name {\n  font-size: 1.25rem;\n}\n.main .task-container-all .tasks .dialog .dialog-form .task-description,\n.main .task-container-all .tasks .dialog .dialog-form .task-date,\n.main .task-container-all .tasks .dialog .dialog-form .task-priority {\n  margin-top: 0.25rem;\n  font-size: 1rem;\n}\n.main .task-container-all .tasks .dialog .dialog-form input[type=text]:first-child {\n  font-size: 1rem;\n}\n.main .task-container-all .tasks .dialog .dialog-form input[type=text]:nth-child(2) {\n  font-size: 0.75rem;\n}\n.main .task-container-all .tasks .dialog .dialog-form input {\n  margin-bottom: 0.5rem;\n}\n.main .task-container-all .tasks .dialog .dialog-form input[type=date]::-webkit-clear-button {\n  display: none;\n}\n.main .task-container-all .tasks .dialog .dialog-form input[type=date]::-webkit-inner-spin-button {\n  display: none;\n}\n.main .task-container-all .tasks .dialog .dialog-form input[type=date]::-webkit-calendar-picker-indicator {\n  filter: invert(0.5);\n}\n.main .task-container-all .tasks .dialog .dialog-form input[type=date] {\n  appearance: none;\n  margin-right: 0.5rem;\n  padding: 5px;\n  border: 1px solid rgba(128, 128, 128, 0.4941176471);\n  border-radius: 5px;\n  color: #808080;\n}\n.main .task-container-all .tasks .dialog .dialog-form select {\n  appearance: none;\n  padding: 5px;\n  border: 1px solid rgba(128, 128, 128, 0.4941176471);\n  border-radius: 5px;\n  background-color: transparent;\n  color: #808080;\n}\n.main .task-container-all .tasks .dialog-btn-container {\n  display: flex;\n  justify-content: flex-end;\n}\n.main .task-container-all .tasks .dialog-btn-container .btn-cancel-task,\n.main .task-container-all .tasks .dialog-btn-container .btn-remove-task {\n  margin: 0.5rem 0 0 0.75rem;\n  padding: 10px 12px;\n  border-radius: 5px;\n  font-size: 0.825rem;\n  font-weight: 600;\n}\n.main .task-container-all .tasks .dialog-btn-container .btn-cancel-task {\n  background-color: #e0e0e0;\n}\n.main .task-container-all .tasks .dialog-btn-container .btn-remove-task {\n  background-color: #32cd32;\n  color: #fcfcfc;\n}\n.main .task-container-all .tasks .task-container.completed {\n  text-decoration: line-through;\n  color: #808080;\n}\n.main .task-container-all .tasks .task-container {\n  display: flex;\n  width: 100%;\n  margin-bottom: 0.25rem;\n  padding: 0.5rem;\n  border-bottom: 1px solid rgba(128, 128, 128, 0.4941176471);\n}\n.main .task-container-all .tasks .task-container .checkbox-container {\n  position: relative;\n}\n.main .task-container-all .tasks .task-container .checkbox-container label {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1rem;\n  height: 1rem;\n  background-color: transparent;\n  border: 1px solid #808080;\n  border-radius: 50%;\n  cursor: pointer;\n}\n.main .task-container-all .tasks .task-container .checkbox-container label::after {\n  transition: opacity 0.4s ease;\n}\n.main .task-container-all .tasks .task-container .checkbox-container label:hover::after {\n  position: absolute;\n  top: 4.25px;\n  left: 3px;\n  height: 3px;\n  width: 6.5px;\n  border: 1.5px solid #808080;\n  border-top: none;\n  border-right: none;\n  opacity: 0;\n  transform: rotate(-45deg);\n}\n.main .task-container-all .tasks .task-container .checkbox-container input[type=checkbox]:checked + label::after {\n  content: \"\";\n  position: absolute;\n  top: 4.25px;\n  left: 3px;\n  height: 3px;\n  width: 6.5px;\n  border: 1.5px solid #fcfcfc;\n  border-top: none;\n  border-right: none;\n  opacity: 0;\n  transform: rotate(-45deg);\n}\n.main .task-container-all .tasks .task-container .checkbox-container input[type=checkbox] {\n  visibility: hidden;\n}\n.main .task-container-all .tasks .task-container .checkbox-container input[type=checkbox]:hover + label::after {\n  opacity: 1;\n}\n.main .task-container-all .tasks .task-container .checkbox-container input[type=checkbox]:checked + label {\n  border-color: #32cd32;\n  background-color: #32cd32;\n}\n.main .task-container-all .tasks .task-container .checkbox-container input[type=checkbox]:checked + label::after {\n  opacity: 1;\n}\n.main .task-container-all .tasks .task-container .task-info-container {\n  flex: 1;\n  padding-left: 0.25rem;\n}\n.main .task-container-all .tasks .task-container .task-info-container .task-info-container > p:not(:first-child) {\n  margin-top: 0.5rem;\n}\n.main .task-container-all .tasks .task-container .task-info-container .task-description,\n.main .task-container-all .tasks .task-container .task-info-container .task-date {\n  color: #808080;\n}\n.main .task-container-all .tasks .task-container .edit-container.hide {\n  display: none;\n}\n.main .task-container-all .tasks .task-container .edit-container {\n  display: flex;\n  align-items: center;\n}\n.main .task-container-all .tasks .task-container .edit-container img {\n  width: 18px;\n  height: 18px;\n  display: inline-block;\n  margin-left: 1rem;\n}\n.main .task-container-all .tasks .all-complete-container {\n  position: absolute;\n  z-index: -10;\n  top: 50%;\n  left: 50%;\n  max-width: 800px;\n  text-align: center;\n  transform: translate(-50%, -50%);\n}\n.main .task-container-all .tasks .all-complete-container img.lazy-panda {\n  height: 240px;\n  width: 300px;\n}\n.main .task-container-all .tasks .all-complete-container p {\n  font-size: 0.8rem;\n  color: #808080;\n}\n.main .task-container-all .tasks .dialog,\n.main .task-container-all .tasks .btn-add-task {\n  display: none;\n}\n.main .task-container-all .tasks .dialog.active,\n.main .task-container-all .tasks .btn-add-task.active {\n  display: block;\n}\n\ninput {\n  background-color: transparent;\n  border: none;\n  outline: none;\n}\n\n::-webkit-scrollbar {\n  width: 17.5px;\n}\n\n::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n\n::-webkit-scrollbar-thumb {\n  background-color: #e0e0e0;\n  border-radius: 20px;\n  border: 6px solid transparent;\n  background-clip: content-box;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(128, 128, 128, 0.4941176471);\n}\n\n@media only screen and (max-width: 600px) {\n  .header h1 {\n    display: none;\n  }\n  .header .score {\n    flex: 1;\n    justify-content: flex-end;\n  }\n  .header .burger-menu-container {\n    display: block;\n  }\n  .sidebar {\n    transform: translate(-300px);\n    width: 200px !important;\n  }\n  .task-container-all {\n    flex: 1;\n    width: 100vw;\n    transform: translate(0px) !important;\n  }\n  img.lazy-panda {\n    max-width: 100px;\n    height: 80px;\n  }\n}\n.low {\n  filter: invert(55%) sepia(19%) saturate(1713%) hue-rotate(180deg) brightness(100%) contrast(103%);\n}\n\n.medium {\n  filter: invert(79%) sepia(37%) saturate(5702%) hue-rotate(348deg) brightness(101%) contrast(101%);\n}\n\n.high {\n  filter: invert(21%) sepia(85%) saturate(7154%) hue-rotate(355deg) brightness(96%) contrast(80%);\n}", "",{"version":3,"sources":["webpack://./src/styles/main.scss","webpack://./src/styles/variables.scss"],"names":[],"mappings":"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","sourcesContent":["@import \"./reset.css\";\n@import \"variables\";\n\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell,\n    \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  color: $black;\n  font-size: 16px;\n  height: 100%;\n}\n\nbody {\n  background-color: $white;\n  height: 100vh;\n}\n\nbutton,\nselect {\n  border: none;\n  outline: none;\n}\n\n.header {\n  position: relative;\n  z-index: 20;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 4rem;\n  padding: 0 0 0 1rem;\n  box-shadow: $box-shadow-btm;\n  background-color: $white-mid-grey;\n  font-size: 1.625rem;\n  font-weight: bold;\n\n  .burger-menu-container {\n    position: absolute;\n    display: none;\n\n    .btn-burger-menu {\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      width: 30px;\n      height: 20px;\n      pointer-events: none;\n\n      .bar {\n        height: 4px;\n        width: 100%;\n        border-radius: 10px;\n        background-color: $black;\n      }\n    }\n  }\n\n  .score {\n    display: flex;\n    align-items: center;\n\n    .character-info-container {\n      display: flex;\n      justify-content: center;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.375rem;\n\n      .completed-tasks-number {\n        font-size: 1rem;\n      }\n\n      .character-title {\n        font-size: 0.75rem;\n        color: var(--grey);\n      }\n    }\n\n    .character-img {\n      height: 70px;\n    }\n  }\n}\n\n.main {\n  position: relative;\n  display: flex;\n\n  .sidebar.slide-view {\n    transform: translate(0px);\n    height: calc(100vh - 4rem);\n  }\n\n  .sidebar {\n    position: absolute;\n    z-index: 10;\n    height: calc(100vh - 4rem);\n    width: 300px;\n    padding: 1.5rem;\n    transition: transform 300ms ease-out;\n    font-weight: 500;\n    background-color: $white-low-grey;\n\n    .project-container {\n      display: flex;\n      flex-direction: column;\n      gap: 0.5rem;\n\n      .active-project {\n        font-weight: 500;\n        background-color: $white;\n      }\n\n      .project-list {\n        font-size: 1rem;\n        font-weight: 400;\n        padding: 0.625rem 0.125rem;\n        border-radius: 5px;\n\n        &:hover {\n          background-color: $white;\n        }\n      }\n\n      li {\n        position: relative;\n        padding-left: 2rem !important;\n        font-weight: 400;\n        cursor: pointer;\n      }\n\n      li::before {\n        content: \"\";\n        position: absolute;\n        top: 7.5px;\n        left: 5px;\n        display: inline-block;\n        height: 1.25rem;\n        width: 1.25rem;\n        background: url(\"../assets/listDot.svg\");\n      }\n\n      li:first-child::before {\n        background: url(\"../assets/inbox.svg\");\n        filter: invert(55%) sepia(19%) saturate(1713%) hue-rotate(180deg) brightness(100%)\n          contrast(103%);\n      }\n\n      li:nth-child(2)::before {\n        background: url(\"../assets/today.svg\");\n        filter: invert(47%) sepia(92%) saturate(401%) hue-rotate(83deg) brightness(101%)\n          contrast(91%);\n      }\n\n      li:nth-child(3)::before {\n        background: url(\"../assets/thisWeek.svg\");\n        filter: invert(45%) sepia(75%) saturate(542%) hue-rotate(219deg) brightness(101%)\n          contrast(101%);\n      }\n\n      li:nth-child(4)::before {\n        background: url(\"../assets/completed.svg\");\n        filter: invert(79%) sepia(37%) saturate(5702%) hue-rotate(348deg) brightness(101%)\n          contrast(101%);\n      }\n\n      li:nth-child(4) {\n        margin-bottom: 2.5rem;\n      }\n\n      li:nth-child(4)::after {\n        content: \"Projects\";\n        position: absolute;\n        top: 3.5rem;\n        left: 0;\n        display: inline;\n        pointer-events: none;\n        font-size: 1rem;\n        font-weight: normal;\n        color: $green;\n      }\n    }\n\n    .project-form {\n      display: flex;\n      align-items: center;\n      margin-top: 0.5rem;\n      padding: 0.25rem;\n      border: 1px solid $grey;\n      border-radius: 5px;\n\n      .project-input {\n        flex: 1;\n        margin: 0;\n      }\n    }\n  }\n\n  .task-container-all {\n    display: flex;\n    width: calc(100vw - 300px);\n    transform: translate(300px);\n\n    .tasks {\n      position: relative;\n      flex: 1;\n      height: calc(100vh - 4rem);\n      max-width: $tasks-max-width;\n      margin: 0 auto;\n      padding: 2rem;\n      overflow: auto;\n\n      .btn-add-container {\n        display: flex;\n\n        .btn-add-task {\n          flex: 1;\n          font-size: 1rem;\n          text-align: start;\n          background-color: transparent;\n          color: $grey;\n        }\n      }\n\n      .dialog {\n        .dialog-form {\n          padding: 0.75rem;\n          border: 1px solid $grey-transparent;\n          border-radius: 10px;\n\n          .task-text {\n            display: grid;\n            grid-template-columns: 1fr;\n          }\n\n          .task-name {\n            font-size: 1.25rem;\n          }\n\n          .task-description,\n          .task-date,\n          .task-priority {\n            margin-top: 0.25rem;\n            font-size: 1rem;\n          }\n\n          input[type=\"text\"]:first-child {\n            font-size: 1rem;\n          }\n          input[type=\"text\"]:nth-child(2) {\n            font-size: 0.75rem;\n          }\n\n          input {\n            margin-bottom: 0.5rem;\n          }\n\n          /* Removes the clear button from date inputs */\n          input[type=\"date\"]::-webkit-clear-button {\n            display: none;\n          }\n\n          /* Removes the spin button */\n          input[type=\"date\"]::-webkit-inner-spin-button {\n            display: none;\n          }\n\n          /* Always display the drop down caret */\n          input[type=\"date\"]::-webkit-calendar-picker-indicator {\n            filter: invert(0.5);\n          }\n\n          /* A few custom styles for date inputs */\n          input[type=\"date\"] {\n            appearance: none;\n            margin-right: 0.5rem;\n            padding: 5px;\n            border: 1px solid $grey-transparent;\n            border-radius: 5px;\n            color: $grey;\n          }\n\n          select {\n            appearance: none;\n            padding: 5px;\n            border: 1px solid $grey-transparent;\n            border-radius: 5px;\n            background-color: transparent;\n            color: $grey;\n          }\n        }\n      }\n\n      .dialog-btn-container {\n        display: flex;\n        justify-content: flex-end;\n\n        .btn-cancel-task,\n        .btn-remove-task {\n          margin: 0.5rem 0 0 0.75rem;\n          padding: 10px 12px;\n          border-radius: 5px;\n          font-size: 0.825rem;\n          font-weight: 600;\n        }\n\n        .btn-cancel-task {\n          background-color: $white-high-grey;\n        }\n\n        .btn-remove-task {\n          background-color: $green;\n          color: $white;\n        }\n      }\n\n      .task-container.completed {\n        text-decoration: line-through;\n        color: $grey;\n      }\n\n      .task-container {\n        display: flex;\n        width: 100%;\n        margin-bottom: 0.25rem;\n        padding: 0.5rem;\n        border-bottom: 1px solid $grey-transparent;\n\n        .checkbox-container {\n          position: relative;\n\n          label {\n            position: absolute;\n            left: 0;\n            top: 0;\n            width: 1rem;\n            height: 1rem;\n            background-color: transparent;\n            border: 1px solid $grey;\n            border-radius: 50%;\n            cursor: pointer;\n          }\n\n          label::after {\n            transition: opacity 0.4s ease;\n          }\n\n          label:hover::after {\n            position: absolute;\n            top: 4.25px;\n            left: 3px;\n            height: 3px;\n            width: 6.5px;\n            border: 1.5px solid $grey;\n            border-top: none;\n            border-right: none;\n            opacity: 0;\n            transform: rotate(-45deg);\n          }\n\n          input[type=\"checkbox\"]:checked + label::after {\n            content: \"\";\n            position: absolute;\n            top: 4.25px;\n            left: 3px;\n            height: 3px;\n            width: 6.5px;\n            border: 1.5px solid $white;\n            border-top: none;\n            border-right: none;\n            opacity: 0;\n            transform: rotate(-45deg);\n          }\n\n          input[type=\"checkbox\"] {\n            visibility: hidden;\n          }\n\n          input[type=\"checkbox\"]:hover + label::after {\n            opacity: 1;\n          }\n\n          input[type=\"checkbox\"]:checked + label {\n            border-color: $green;\n            background-color: $green;\n          }\n\n          input[type=\"checkbox\"]:checked + label::after {\n            opacity: 1;\n          }\n        }\n\n        .task-info-container {\n          flex: 1;\n          padding-left: 0.25rem;\n\n          .task-info-container > p:not(:first-child) {\n            margin-top: 0.5rem;\n          }\n\n          .task-description,\n          .task-date {\n            color: $grey;\n          }\n        }\n\n        .edit-container.hide {\n          display: none;\n        }\n        .edit-container {\n          display: flex;\n          align-items: center;\n\n          img {\n            width: 18px;\n            height: 18px;\n            display: inline-block;\n            margin-left: 1rem;\n          }\n        }\n      }\n\n      .all-complete-container {\n        position: absolute;\n        z-index: -10;\n        top: 50%;\n        left: 50%;\n        max-width: 800px;\n        text-align: center;\n        transform: translate(-50%, -50%);\n\n        img.lazy-panda {\n          height: 240px;\n          width: 300px;\n        }\n\n        p {\n          font-size: 0.8rem;\n          color: $grey;\n        }\n      }\n\n      // COMBINED ELEMENTS FROM DIFFERENT PARENTS\n      .dialog,\n      .btn-add-task {\n        display: none;\n      }\n\n      .dialog.active,\n      .btn-add-task.active {\n        display: block;\n      }\n    }\n  }\n}\n\n// .modal {\n//   position: fixed;\n//   z-index: 10;\n//   top: 50%;\n//   left: 50%;\n//   display: flex;\n//   flex-direction: column;\n//   justify-content: center;\n//   max-width: 350px;\n//   height: 400px;\n//   border-radius: 10px;\n//   transform: translate(-50%, -50%) scale(1);\n//   transition: 200ms ease-in-out;\n//   background-color: $white-high-grey;\n\n//   .modal-form {\n//     display: flex;\n//     flex-direction: column;\n//   }\n// }\n\n// .modal.active {\n//   transform: translate(-50%, -50%) scale(1);\n// }\n\n// .modal {\n//   max-width: 300px;\n//   margin: 0 auto;\n//   padding: 2rem;\n//   border-radius: 10px;\n//   background-color: $white-low-grey;\n\n//   .modal-form {\n//     display: flex;\n//     flex-direction: column;\n//     gap: 0.75rem;\n\n//     input,\n//     button,\n//     select {\n//       border-radius: 7.5px;\n//       font-size: 0.85rem;\n//     }\n\n//     input,\n//     select {\n//       padding: 0.5rem;\n//       background-color: $white;\n//     }\n\n//     button {\n//       border-radius: 7.5px;\n//       padding: 0.75rem 0;\n\n//       &:nth-child(5) {\n//         background-color: $white-high-grey;\n//       }\n\n//       &:last-child {\n//         background-color: $green;\n//       }\n//     }\n//   }\n// }\n\ninput {\n  background-color: transparent;\n  border: none;\n  outline: none;\n}\n\n::-webkit-scrollbar {\n  width: 17.5px;\n}\n\n::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n\n::-webkit-scrollbar-thumb {\n  background-color: $white-high-grey;\n  border-radius: 20px;\n  border: 6px solid transparent;\n  background-clip: content-box;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background-color: $grey-transparent;\n}\n\n@media only screen and (max-width: 600px) {\n  .header {\n    h1 {\n      display: none;\n    }\n\n    .score {\n      flex: 1;\n      justify-content: flex-end;\n    }\n\n    .burger-menu-container {\n      display: block;\n    }\n  }\n\n  .sidebar {\n    transform: translate(-300px);\n    width: 200px !important;\n  }\n\n  .task-container-all {\n    flex: 1;\n    width: 100vw;\n    transform: translate(0px) !important;\n  }\n\n  img.lazy-panda {\n    max-width: 100px;\n    height: 80px;\n  }\n}\n\n.low {\n  filter: invert(55%) sepia(19%) saturate(1713%) hue-rotate(180deg) brightness(100%) contrast(103%);\n}\n\n.medium {\n  filter: invert(79%) sepia(37%) saturate(5702%) hue-rotate(348deg) brightness(101%) contrast(101%);\n}\n\n.high {\n  filter: invert(21%) sepia(85%) saturate(7154%) hue-rotate(355deg) brightness(96%) contrast(80%);\n}\n","/* LIGHT MODE */\n$white: #fcfcfc;\n$white-high-grey: #e0e0e0;\n$white-mid-grey: #f7f7f7;\n$white-low-grey: #f1f1f1;\n$black: #000000;\n$grey: #808080;\n$grey-transparent: #8080807e;\n$box-shadow-btm: 2px 2px 1px 0px rgba(0, 0, 0, 0.15);\n$green: #32cd32;\n\n/* DARK MODE */\n/* --black: #202020;\n  --white: hsla(0, 0%, 100%, 0.87);\n  --grey: #808080;\n  --grey-transparent: #80808021;\n  --dark-grey: #242424;\n  --medium-dark-grey: #282828;\n  --grey-hover: #363636;\n  --green: #32cd32; */\n$tasks-max-width: 800px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css ***!
  \********************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n", "",{"version":3,"sources":["webpack://./src/styles/reset.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAiFE,SAAS;EACT,UAAU;EACV,SAAS;EACT,eAAe;EACf,aAAa;EACb,wBAAwB;AAC1B;AACA,gDAAgD;AAChD;;;;;;;;;;;EAWE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,YAAY;AACd;AACA;;;;EAIE,WAAW;EACX,aAAa;AACf;AACA;EACE,yBAAyB;EACzB,iBAAiB;AACnB","sourcesContent":["html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/assets/bandit.png":
/*!*******************************!*\
  !*** ./src/assets/bandit.png ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/bandit.png");

/***/ }),

/***/ "./src/assets/boss.png":
/*!*****************************!*\
  !*** ./src/assets/boss.png ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/boss.png");

/***/ }),

/***/ "./src/assets/completed.svg?57cc":
/*!**********************************!*\
  !*** ./src/assets/completed.svg ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/completed.svg");

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

/***/ "./src/assets/editPen.svg":
/*!********************************!*\
  !*** ./src/assets/editPen.svg ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/editPen.svg");

/***/ }),

/***/ "./src/assets/inbox.svg?3279":
/*!******************************!*\
  !*** ./src/assets/inbox.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/inbox.svg");

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

/***/ "./src/assets/master.png":
/*!*******************************!*\
  !*** ./src/assets/master.png ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/master.png");

/***/ }),

/***/ "./src/assets/more.png":
/*!*****************************!*\
  !*** ./src/assets/more.png ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/more.png");

/***/ }),

/***/ "./src/assets/novice.png":
/*!*******************************!*\
  !*** ./src/assets/novice.png ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/novice.png");

/***/ }),

/***/ "./src/assets/priority.png":
/*!*********************************!*\
  !*** ./src/assets/priority.png ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/priority.png");

/***/ }),

/***/ "./src/assets/student.png":
/*!********************************!*\
  !*** ./src/assets/student.png ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/student.png");

/***/ }),

/***/ "./src/assets/thisWeek.svg?9190":
/*!*********************************!*\
  !*** ./src/assets/thisWeek.svg ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/thisWeek.svg");

/***/ }),

/***/ "./src/assets/today.svg?de3c":
/*!******************************!*\
  !*** ./src/assets/today.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/today.svg");

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

/***/ "./src/assets/viking.png":
/*!*******************************!*\
  !*** ./src/assets/viking.png ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/viking.png");

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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

/***/ "./src/assets/completed.svg?0798":
/*!**********************************!*\
  !*** ./src/assets/completed.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "completed.svg";

/***/ }),

/***/ "./src/assets/inbox.svg?3ca6":
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

/***/ "./src/assets/thisWeek.svg?5d49":
/*!*********************************!*\
  !*** ./src/assets/thisWeek.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "thisWeek.svg";

/***/ }),

/***/ "./src/assets/today.svg?ea8c":
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
/* harmony import */ var _modules_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/project */ "./src/modules/project.js");
/* harmony import */ var _modules_tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tasks */ "./src/modules/tasks.js");
/* harmony import */ var _modules_ToDoList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/ToDoList */ "./src/modules/ToDoList.js");
/* harmony import */ var _modules_DOM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/DOM */ "./src/modules/DOM.js");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _assets_more_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/more.png */ "./src/assets/more.png");
/* harmony import */ var _assets_editPen_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/editPen.png */ "./src/assets/editPen.png");
/* harmony import */ var _assets_priority_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/priority.png */ "./src/assets/priority.png");
/* harmony import */ var _assets_trash_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/trash.png */ "./src/assets/trash.png");
/* harmony import */ var _assets_lazyPanda_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/lazyPanda.png */ "./src/assets/lazyPanda.png");
/* harmony import */ var _assets_novice_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/novice.png */ "./src/assets/novice.png");
/* harmony import */ var _assets_student_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./assets/student.png */ "./src/assets/student.png");
/* harmony import */ var _assets_master_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./assets/master.png */ "./src/assets/master.png");
/* harmony import */ var _assets_bandit_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./assets/bandit.png */ "./src/assets/bandit.png");
/* harmony import */ var _assets_viking_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./assets/viking.png */ "./src/assets/viking.png");
/* harmony import */ var _assets_boss_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./assets/boss.png */ "./src/assets/boss.png");
/* harmony import */ var _assets_inbox_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./assets/inbox.svg */ "./src/assets/inbox.svg?3279");
/* harmony import */ var _assets_today_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./assets/today.svg */ "./src/assets/today.svg?de3c");
/* harmony import */ var _assets_editPen_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./assets/editPen.svg */ "./src/assets/editPen.svg");
/* harmony import */ var _assets_thisWeek_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./assets/thisWeek.svg */ "./src/assets/thisWeek.svg?9190");
/* harmony import */ var _assets_completed_svg__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./assets/completed.svg */ "./src/assets/completed.svg?57cc");





















_modules_project__WEBPACK_IMPORTED_MODULE_0__["default"].doStuff();
_modules_tasks__WEBPACK_IMPORTED_MODULE_1__["default"].doStuff();
_modules_ToDoList__WEBPACK_IMPORTED_MODULE_2__["default"].doStuff();
_modules_DOM__WEBPACK_IMPORTED_MODULE_3__["default"].loadHome();
})();

/******/ })()
;
//# sourceMappingURL=bundle57699c3227e967871b35.js.map