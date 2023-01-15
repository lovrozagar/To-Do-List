import projects from "./modules/projects";
import tasks from "./modules/tasks";
import listeners from "./modules/listeners";
import dom from "./modules/dom";

import "./styles/main.scss";
import "./assets/editPen.png";
import "./assets/trash.png";
import "./assets/lazyPanda.png";
import "./assets/novice.png";
import "./assets/student.png";
import "./assets/master.png";
import "./assets/bandit.png";
import "./assets/viking.png";
import "./assets/boss.png";
import "./assets/inbox.svg";
import "./assets/today.svg";
import "./assets/thisWeek.svg";
import "./assets/completed.svg";

listeners.listenClicks();
dom.renderProjects();
dom.renderTasks();
dom.selectActiveProject(0);
dom.domOnLoad();
