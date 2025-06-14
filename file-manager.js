// file-manager.js — создание и загрузка файлов в папку /files
function saveFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function createFileFromInput() {
  const name = prompt("Введите имя файла (с расширением):");
  if (!name) return;

  const content = prompt("Введите содержимое файла:");
  if (content === null) return;

  saveFile(name, content);
}