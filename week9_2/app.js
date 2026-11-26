// Main Student Budget Tracker page script — loaded with defer.
document.addEventListener('DOMContentLoaded', () => {
  const status = document.getElementById('deferStatus');
  if (status) status.textContent = 'Loaded after HTML parsing';
  const summary = document.getElementById('loadSummary');
  if (summary) summary.textContent = 'The deferred app script ran after the document was parsed.';
});
