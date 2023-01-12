const projects = (() => {
  let projectList = [
    {
      name: "Inbox",
      index: 0,
      tasks: [],
      active: true,
    },
    {
      name: "Today",
      index: 1,
      tasks: [],
    },
    {
      name: "This Week",
      index: 2,
      tasks: [],
    },
    {
      name: "Completed",
      index: 3,
      tasks: [],
    },
  ];

  if (localStorage.getItem("projects") !== null) {
    const projectsFromStorage = JSON.parse(localStorage.getItem("projects"));
    projectList = projectsFromStorage;
  }

  const project = (name) => {
    const index = projectList.length;
    const tasks = [];

    return { name, index, tasks };
  };

  function addProject(name) {
    const newProject = project(name);
    projectList.push(newProject);
  }

  let currentProject = [0];

  function setCurrentProject(index) {
    currentProject = [index];
  }

  function addToCompleted(projectIndex, completedIndex, taskIndex) {
    projects.projectList[completedIndex].tasks.push(
      projects.projectList[projectIndex].tasks[taskIndex]
    );
  }

  function removeFromCompleted(completedIndex, taskIndex) {
    projects.projectList[completedIndex].tasks.splice(taskIndex, 1);
  }

  return { projectList, addToCompleted, removeFromCompleted, addProject };
})();

export default projects;
