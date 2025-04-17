document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  const filterDropdown = document.getElementById('filterDropdown');

  let tasks = [];

  function renderTasks() {
    const filterValue = filterDropdown.value;
    taskList.innerHTML = '';

    tasks
      .filter(task => {
        if (filterValue === 'completed') return task.completed;
        if (filterValue === 'incomplete') return !task.completed;
        return true;
      })
      .forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        const taskLeft = document.createElement('div');
        taskLeft.className = 'task-left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.completed) {
          taskText.style.textDecoration = 'line-through';
          taskText.style.color = '#888';
        }
        taskText.addEventListener('click', () => toggleTask(index));

        taskLeft.appendChild(checkbox);
        taskLeft.appendChild(taskText);

        const buttons = document.createElement('div');
        buttons.className = 'task-buttons';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTask(index));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Hapus';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);

        taskItem.appendChild(taskLeft);
        taskItem.appendChild(buttons);

        taskList.appendChild(taskItem);
      });
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      taskInput.value = '';
      renderTasks();
    }
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }

  function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null) {
      tasks[index].text = newText.trim();
      renderTasks();
    }
  }

  function deleteTask(index) {
    if (confirm('Yakin ingin menghapus task ini?')) {
      tasks.splice(index, 1);
      renderTasks();
    }
  }

  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
  });
  filterDropdown.addEventListener('change', renderTasks);

  renderTasks();
});
