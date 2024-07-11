

const form = document.querySelector("form");
const input = document.querySelector("input");
const taskList = document.getElementById("taskList");
const totalTasks = document.querySelector(".total-task");
const tasksCompleted = document.querySelector(".tasks-completed");

let tasks = [
  { id: 1, task: "Hacer las Camas", completed: false },
  { id: 2, task: "Hacer el desayuno", completed: false },
  { id: 3, task: "Limpiar las Habitaciones", completed: false },
];

document.addEventListener("DOMContentLoaded", () => {
  initialTasks();
  countTask();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    const newTask = {
      id: Date.now(),
      task: input.value.trim(),
      completed: false,
    };
    tasks.push(newTask);

    initialTasks();
    countTask();
    label.innerHTML = "";
  } else {
    label.innerHTML = "Debes ingresar una tarea";
  }
  form.reset();
});

const initialTasks = () => {
  template = "";
  for (const task of tasks) {
    template += createElements(task);
  }
  taskList.innerHTML = template;
};

function createElements(task) {
  return `
    <div
      class="alert ${
        task.completed ? "alert-success" : "alert-warning"
      }  d-flex justify-content-row align-items-center"
    >
      <p>${task.task}</p>
      <h3>
        <i class="fa-solid fa-circle-check text-success"  style="color: green" role="button" onclick="completedTask(${
          task.id
        })"></i>
        <i class="fa-solid fa-trash"   style="color: red" role="button" onclick="deleteTask(${
          task.id
        })"></i>
      </h3>
    </div>
  `;
}

function deleteTask(id) {
  const indexTask = tasks.findIndex((t) => t.id == id);
  tasks.splice(indexTask, 1);
  initialTasks();
  countTask();
}

function completedTask(id) {
  const indexTask = tasks.findIndex((t) => t.id == id);
  tasks[indexTask].completed = tasks[indexTask].completed ? false : true;
  initialTasks();
  countTask();
}

function countTask() {
  totalTasks.innerHTML = `Total: ${tasks.length}`;

  const totalCompletedTasks = tasks.filter((t) => t.completed == true);
  tasksCompleted.innerHTML = `Tareas realizadas: ${totalCompletedTasks.length}`;
}