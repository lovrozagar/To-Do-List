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

  const levelIndex = 0;
  const levelTitle = 1;

  const levels = {
    currentLevel: 1,
    1: [2, "Novice"],
    2: [5, "Student"],
    3: [10, "Apprentice"],
    4: [20, "Brawler"],
    5: [50, "Warrior"],
    6: [100, "Boss"],
  };

  const levelCharacters = {
    animal: "panda",
    charactersAvailable: 5,
    1: "./assets/novice.png",
    2: "./assets/student.png",
    3: "./assets/master.png",
    4: "./assets/bandit.png",
    5: "./assets/viking.png",
    6: "./assets/boss.png",
  };

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
    return [
      `${incrementLevel(points)}/${levels[levels.currentLevel][levelIndex]}`,
      `${levels[levels.currentLevel][levelTitle]}`,
    ];
  }

  function incrementLevel(totalPoints) {
    let newLvlPoints = 0;
    levels.currentLevel = 1;

    while (totalPoints / getNextLevelScore(levels.currentLevel) >= 1) {
      levels.currentLevel += 1;
    }

    newLvlPoints = totalPoints % getNextLevelScore(levels.currentLevel);

    const charImg = document.getElementById("character-img");
    charImg.src = levelCharacters[levels.currentLevel];

    return newLvlPoints;
  }

  function getNextLevelScore(level) {
    let nextLevelScore = 0;
    if (level > 0) {
      nextLevelScore += levels[level][levelIndex];
      level -= 1;
    }
    return nextLevelScore;
  }

  return { projectList, addToCompleted, removeFromCompleted, addProject, countCompleted };
})();

export default projects;
