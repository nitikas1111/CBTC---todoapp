let taskCount = 0; // track of the number of tasks

// Fun. to add new task
function addTask() {
  const taskInput = document.getElementById("display");
  const taskText = taskInput.value.trim();
  const dueDateInput = document.querySelector(".dueDate");
  const dueDate = dueDateInput.value.trim();

  // If task not empty
  if (taskText !== "") {
    // Increment the task counter
    taskCount++;

    // new list item for the task
    const taskItem = document.createElement("li");

    // span for task number
    const taskNumberSpan = document.createElement("span");
    taskNumberSpan.className = "task-number";
    taskNumberSpan.textContent = taskCount + ". ";

    // span for task text
    const taskTextSpan = document.createElement("span");
    taskTextSpan.className = "task-text";
    taskTextSpan.textContent = taskText;

    // span for due date
    const dueDateTimeSpan = document.createElement("span");
    dueDateTimeSpan.className = "due-date";
    dueDateTimeSpan.textContent = dueDate !== "" ? "Due: " + formatDate(dueDate) : "No due date";

    // div for the logos
    const logosDiv = document.createElement("div");
    logosDiv.className = "task-logos";

    // logo images
    const completeLogo = document.createElement("img");
    completeLogo.src = "./Logo/complete.png";
    completeLogo.alt = "Complete";
    completeLogo.onclick = () => completeTask(taskItem, dueDate);

    const updateLogo = document.createElement("img");
    updateLogo.src = "./Logo/update.png";
    updateLogo.alt = "Update";
    updateLogo.onclick = () => updateTask(taskItem);

    const removeLogo = document.createElement("img");
    removeLogo.src = "./Logo/remove.png";
    removeLogo.alt = "Remove";
    removeLogo.onclick = () => removeTask(taskItem);

    // Append logos to the logos div
    logosDiv.appendChild(completeLogo);
    logosDiv.appendChild(updateLogo);
    logosDiv.appendChild(removeLogo);

    // Append number span, text span, due date span, and logos div to the list item
    taskItem.appendChild(taskNumberSpan);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(dueDateTimeSpan);
    taskItem.appendChild(logosDiv);

    // Append the new task to the activated tasks list
    document.getElementById("activatedTasks").appendChild(taskItem);

    // Clear input field
    taskInput.value = "";
    dueDateInput.value = "";

    // Update task numbering for activated tasks
    updateTaskNumbers("activatedTasks");
  }
}

// Function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}

// Function to mark a task as complete
function completeTask(taskItem, dueDate) {
  const completedTasks = document.getElementById("completedTasks");

  // Clone the task item
  const completedTaskItem = taskItem.cloneNode(true);

  // Get the completed date
  const completedDateTime = new Date().toLocaleString();

  // Remove logos from the completed task
  const logosDiv = completedTaskItem.querySelector(".task-logos");
  if (logosDiv) {
    logosDiv.remove();
  }

  // span for completed date
  const completedDateSpan = document.createElement("span");
  completedDateSpan.className = "completed-date";
  completedDateSpan.textContent = "Completed: " + formatDate(completedDateTime);

  // span for due date
  const dueDateSpan = completedTaskItem.querySelector(".due-date");
  if (dueDate !== "") {
    dueDateSpan.textContent = "Due: " + formatDate(dueDate);
  }

  // Append the completed date span to the completed task
  completedTaskItem.appendChild(completedDateSpan);

  // Append the completed task to the completed tasks list
  completedTasks.appendChild(completedTaskItem);

  // Remove the task from the activated tasks list
  taskItem.remove();

  // Update task numbering for activated tasks
  updateTaskNumbers("activatedTasks");

  // Update task numbering for completed tasks
  updateTaskNumbers("completedTasks");
}

// Function to update a task by allowing users to edit the task directly
function updateTask(taskItem) {
  // Create an input field
  const taskTextInput = document.createElement("input");
  taskTextInput.type = "text";
  taskTextInput.value = taskItem.querySelector(".task-text").textContent; 
  const taskTextSpan = taskItem.querySelector(".task-text");
  taskItem.replaceChild(taskTextInput, taskTextSpan);

  // handle updating the task on Enter key press
  taskTextInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      taskTextSpan.textContent = taskTextInput.value;
      taskItem.replaceChild(taskTextSpan, taskTextInput);
    }
  });

  taskTextInput.focus();
}

// Function to remove task
function removeTask(taskItem) {
  taskItem.remove();

  // Update task numbering for activated tasks
  updateTaskNumbers("activatedTasks");
}

// update task numbering
function updateTaskNumbers(listId) {
  const tasksList = document.getElementById(listId);
  const tasks = tasksList.querySelectorAll("li");
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskNumberSpan = task.querySelector(".task-number");
    if (taskNumberSpan) {
      taskNumberSpan.textContent = (i + 1) + ". ";
    }
  }
}
