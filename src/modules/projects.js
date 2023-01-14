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

  const completedIndex = 3;

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

  const levels = {
    currentLevel: 1,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
  };

  const levelCharacters = {
    animal: "panda",
    charactersAvailable: 5,
    2: "./assets/master.png",
    3: "./assets/viking.png",
  };

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

  function countCompleted() {
    let points = projectList[completedIndex].tasks.length;
    console.log(levels.currentLevel);
    return `${incrementLevel(points)}/${levels[levels.currentLevel]}`;
  }

  function incrementLevel(currentPoints) {
    if (currentPoints / levels[levels.currentLevel] >= 1) {
      currentPoints = currentPoints % levels[levels.currentLevel];
      levels.currentLevel += 1;
      const charImg = document.getElementById("character-img");
      charImg.src = levelCharacters[levels.currentLevel];
      console.log[levels.currentLevel];
    }
    let a = 1;
    console.log(levelCharacters[a]);
    return currentPoints;
  }

  return { projectList, addToCompleted, removeFromCompleted, addProject, countCompleted };
})();

export default projects;
