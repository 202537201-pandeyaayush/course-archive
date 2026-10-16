// Week 5: a simple counter using variables, functions, and click events.
let count = 0;

const countOutput = document.getElementById("count");

function renderCount() {
  countOutput.textContent = count;
}

document.getElementById("addBtn").addEventListener("click", function () {
  count = count + 1;
  renderCount();
});

document.getElementById("subtractBtn").addEventListener("click", function () {
  count = count - 1;
  renderCount();
});

document.getElementById("resetBtn").addEventListener("click", function () {
  count = 0;
  renderCount();
});
