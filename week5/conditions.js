// Check that the score is valid, then use if/else to assign a grade.
document.getElementById("gradeForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const score = Number(document.getElementById("score").value);
  const result = document.getElementById("gradeResult");

  if (!Number.isFinite(score) || score < 0 || score > 100) {
    result.textContent = "Please enter a score from 0 to 100.";
  } else if (score >= 90) {
    result.textContent = "Grade: A";
  } else if (score >= 80) {
    result.textContent = "Grade: B";
  } else if (score >= 70) {
    result.textContent = "Grade: C";
  } else if (score >= 60) {
    result.textContent = "Grade: D";
  } else {
    result.textContent = "Grade: F";
  }
});
