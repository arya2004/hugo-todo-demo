const storageKey = 'hugo-todo-demo.tasks';
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const empty = document.querySelector('#empty');
const count = document.querySelector('#count');
const clear = document.querySelector('#clear-completed');
const filters = document.querySelectorAll('[data-filter]');
let tasks = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
let filter = 'all';

function save() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
  render();
}

function render() {
  list.replaceChildren();
  const visible = tasks.filter((task) => filter === 'all' || (filter === 'completed' ? task.done : !task.done));
  for (const task of visible) {
    const row = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const title = document.createElement('span');
    const remove = document.createElement('button');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      save();
    });
    title.textContent = task.title;
    remove.type = 'button';
    remove.className = 'delete';
    remove.textContent = '×';
    remove.setAttribute('aria-label', `Delete ${task.title}`);
    remove.addEventListener('click', () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      save();
    });
    row.classList.toggle('done', task.done);
    label.append(checkbox, title);
    row.append(label, remove);
    list.append(row);
  }
  empty.hidden = visible.length > 0;
  empty.textContent = tasks.length ? 'Nothing in this view. Nice and tidy.' : 'A clear page. Add your first task.';
  const remaining = tasks.filter((task) => !task.done).length;
  count.textContent = `${remaining} ${remaining === 1 ? 'task' : 'tasks'} left`;
  clear.disabled = !tasks.some((task) => task.done);
  for (const button of filters) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    return;
  }
  tasks.push({ id: crypto.randomUUID(), title, done: false });
  input.value = '';
  save();
  input.focus();
});

for (const button of filters) {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    render();
  });
}

clear.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.done);
  save();
});

render();
