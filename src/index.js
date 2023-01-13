import projects from "./modules/projects";
import tasks from "./modules/tasks";
import listeners from "./modules/listeners";
import dom from "./modules/dom";

import "./styles/reset.css";
import "./styles/main.css";
import "./assets/editPen.png";
import "./assets/trash.png";
import "./assets/lazyPanda.png";
import "./assets/pandaBeginner.png";
import "./assets/inbox.svg";
import "./assets/today.svg";
import "./assets/thisWeek.svg";
import "./assets/completed.svg";

listeners.listenClicks();
dom.renderProjects();
dom.renderTasks();
dom.selectActiveProject(0);
dom.domOnLoad();
