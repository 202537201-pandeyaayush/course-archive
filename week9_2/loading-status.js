// This deferred status helper runs after the HTML parser has completed.
document.addEventListener('DOMContentLoaded', () => {
  const dom = document.getElementById('domStatus');
  if (dom) dom.textContent = 'Fired';
  const async = document.getElementById('asyncStatus');
  if (async) async.textContent = window.__asyncDemoLoaded ? 'Loaded (order may vary)' : 'Not loaded before DOMContentLoaded';
  const summary = document.getElementById('loadSummary');
  if (summary) {
    summary.textContent += window.__asyncDemoLoaded
      ? ' The async demo script had loaded by the time this status was checked.'
      : ' The async demo script may still finish later.';
  }
});
