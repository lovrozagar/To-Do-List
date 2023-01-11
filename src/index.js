import projects from "./modules/projects";
import tasks from "./modules/tasks";
import listeners from "./modules/listeners";
import dom from "./modules/dom";

import "./styles/reset.css";
import "./styles/main.css";
import "./assets/editPen.png";
import "./assets/trash.png";
import "./assets/lazyPanda.png";

listeners.listenClicks();
dom.renderProjects();

