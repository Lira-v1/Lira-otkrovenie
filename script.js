// script.js — логика сайта, связь с input.json
async function checkGPTCommands() {
  try {
    const res = await fetch('input.json?' + Date.now());
    const cmd = await res.json();
    if (!cmd || !cmd.action) return;

    if (cmd.action === "add_task") {
      addTaskFromGPT(cmd.content);
    } else if (cmd.action === "log") {
      logMessage("🤖 GPT: " + cmd.content);
    } else if (cmd.action === "clear_tasks") {
      clearTasks();
    }

    logMessage("✅ Команда выполнена: " + cmd.action);
  } catch (e) {
    logMessage("⚠ Ошибка: " + e.message);
  }
}

function addTaskFromGPT(text) {
  const input = document.getElementById("task-input");
  input.value = text;
  addTask();
}

function clearTasks() {
  document.getElementById("task-list").innerHTML = '';
  logMessage("🧹 Задачи очищены");
}

function logMessage(msg) {
  const log = document.getElementById("lira-log");
  const item = document.createElement("div");
  item.textContent = msg;
  log.prepend(item);
}

function addTask() {
  const input = document.getElementById("task-input");
  const task = input.value.trim();
  if (!task) return;

  const li = document.createElement("li");
  li.textContent = task;
  document.getElementById("file-list").appendChild(li);
  input.value = "";
  logMessage("📝 Задача добавлена: " + task);
}

setInterval(checkGPTCommands, 15000);
