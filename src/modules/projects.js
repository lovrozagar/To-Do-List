const projects = (() => {
  const projectList = [
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
    {
      name: "Filmovi",
      index: 4,
      tasks: [],
      active: true,
    },
    {
      name: "Mjesta",
      index: 5,
      tasks: [],
    },
    {
      name: "Kucni poslovi",
      index: 6,
      tasks: [],
    },
  ];

  const project = (title) => {
    const index = projectList.length;
    const tasks = [];

    return { title, index, tasks };
  };

  function addProject(title) {
    const newProject = project(title);
    projectList.push(newProject);
  }

  let currentProject = [0];

  function setCurrentProject(index) {
    currentProject = [index];
  }

  return { projectList };
})();

export default projects;
