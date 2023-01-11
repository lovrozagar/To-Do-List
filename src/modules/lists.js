const lists = (() => {
  const listsContainer = document.querySelector('[data-lists]');
  const newListForm = document.querySelector('[data-new-list-form]');
  const newListInput = document.querySelector('[data-new-list-input]');

  const LOCAL_STORAGE_LIST_KEY = 'task.lists';
  const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';

  let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
  let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

  listsContainer.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'li') {
      console.log(e.target);
      selectedListId = e.target.dataset.listId;
      saveAndRender();
      console.log(selectedListId);
    }
  });

  function clearElement(element) {
    while (element.lastChild) {
      element.removeChild(element.lastChild);
    }
  }

  function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
  }

  function render() {
    clearElement(listsContainer);
    lists.forEach((list) => {
      const listElement = document.createElement('li');
      listElement.dataset.listId = list.id;
      listElement.classList.add('list-name');
      listElement.innerText = list.name;
      if (list.id === selectedListId) listElement.classList.add('active-list');
      listsContainer.appendChild(listElement);
    });
  }

  function saveAndRender() {
    save();
    render();
  }

  function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: [] };
  }

  newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const listName = newListInput.value;
    if (listName === null || listName === '') return;
    const list = createList(listName);
    newListInput.value = null;
    lists.push(list);
    saveAndRender();
  });

  return { saveAndRender };
})();

export default lists;
