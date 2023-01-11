import lists from './modules/lists';
import tasks from './modules/tasks';
import listeners from './modules/listeners';

import './styles/reset.css';
import './styles/main.css';
import './assets/editPen.png';
import './assets/trash.png';
import './assets/lazyPanda.png';

lists.saveAndRender();
// listeners.listenForAddTask();
listeners.listenClicks();
