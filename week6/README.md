# Week 6 — Jokes, on demand

This folder is styled to match the course archive's cream paper/grid background, dark navigation bar, bold headings, and simple bordered panels.

## Files
- `index.html` — joke fetcher page
- `style.css` — page styling
- `script.js` — category filters, 20 built-in jokes, online joke fetch, favourites saved in local storage

## Add to GitHub
Upload this whole `week6` folder to the repository root. To show it on your homepage, add this item before the closing `</ul>` in the root `index.html`:

```html
<li>
  <a class="row" href="week6/index.html">
    <span class="num">6</span>
    <span>
      <h3>Week 6</h3>
      <p>JavaScript: joke fetcher, categories and favourite jokes.</p>
    </span>
    <span class="go">Open week</span>
  </a>
</li>
```

The built-in jokes work offline. The “Try a fresh joke online” button needs an internet connection and a working public API.
