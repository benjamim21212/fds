
let length = 8;

function setLength(len) {
  length = len;
}

function generatePassword() {
  const upper = document.getElementById("uppercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;
  const noRepeat = document.getElementById("noRepeat").checked;

  let chars = "abcdefghijklmnopqrstuvwxyz";
  if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%&*?";

  let password = "";
  let used = new Set();

  while (password.length < length) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    if (noRepeat && used.has(char)) continue;
    password += char;
    used.add(char);
  }

  document.getElementById("output").textContent = password;
  updateStrength(password);
}

function updateStrength(pwd) {
  const bar = document.getElementById("barFill");
  const label = document.getElementById("strengthLabel");

  let score = 0;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;
  if (pwd.length >= 12) score++;

  let width = ["20%", "40%", "60%", "80%", "100%"][score];
  let color = ["#e84118", "#fbc531", "#00a8ff", "#4cd137", "#2ecc71"][score];
  let labels = ["Muito baixa", "Baixa", "Média", "Boa", "Excelente"];

  bar.style.width = width;
  bar.style.backgroundColor = color;
  label.textContent = "Força: " + labels[score];
}
