// Demonstrate a counted loop and a for...of loop over an array.
document.getElementById("runLoops").addEventListener("click", function () {
  const lines = [];

  for (let i = 1; i <= 5; i++) {
    lines.push("Step " + i);
  }

  lines.push("");
  lines.push("Fruits:");

  const fruits = ["apple", "banana", "cherry"];
  for (const fruit of fruits) {
    lines.push(fruit);
  }

  document.getElementById("output").textContent = lines.join("\n");
});
