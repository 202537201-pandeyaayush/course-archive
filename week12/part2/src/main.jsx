import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function CodeDisclosure({ children }) {
  return (
    <details className="code-disclosure">
      <summary>View code</summary>
      <pre><code>{children}</code></pre>
    </details>
  );
}

function Exercise({ number, id, title, description, code, children }) {
  return (
    <article className="exercise-card" id={id}>
      <div className="exercise-heading">
        <span className="exercise-number">{number}</span>
        <div>
          <p className="exercise-origin">WEEK 12 · PART 2 PRACTICE</p>
          <h3>{title}</h3>
        </div>
      </div>
      <p className="exercise-description">{description}</p>
      <div className="exercise-demo">{children}</div>
      <CodeDisclosure>{code}</CodeDisclosure>
    </article>
  );
}

function DependencyMount() {
  const [runs, setRuns] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setRuns((value) => value + 1);
  }, []);

  return (
    <div className="small-demo">
      <p><strong>{runs}</strong> effect run(s) after mount</p>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Re-render: {count}
      </button>
      <small>With [], the effect does not run again.</small>
    </div>
  );
}

function DependencyChange() {
  const [name, setName] = useState('Aayush');
  const [runs, setRuns] = useState(0);

  useEffect(() => {
    setRuns((value) => value + 1);
  }, [name]);

  return (
    <div className="small-demo">
      <label>
        Name
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <p><strong>{runs}</strong> effect run(s)</p>
      <small>With [name], it runs only when name changes.</small>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="clock-demo" aria-live="polite">
      <span>Live clock</span>
      <strong>{time.toLocaleTimeString('en-US')}</strong>
      <small>Cleanup clears the interval on unmount.</small>
    </div>
  );
}

function ThemeSync() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('aayush-week12-theme') || 'light',
  );

  useEffect(() => {
    localStorage.setItem('aayush-week12-theme', theme);
    document.documentElement.dataset.effectTheme = theme;
  }, [theme]);

  return (
    <div className="theme-demo">
      <p>Current theme: <strong>{theme}</strong></p>
      <button
        type="button"
        onClick={() => setTheme((value) => (value === 'light' ? 'dark' : 'light'))}
      >
        Toggle theme
      </button>
      <small>Reload to restore this value from localStorage.</small>
    </div>
  );
}

function DocumentTitle() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    document.title = `Aayush Pandey · Inbox (${count})`;
  }, [count]);

  return (
    <div className="title-demo">
      <p><strong>{count}</strong> unread messages</p>
      <div>
        <button type="button" onClick={() => setCount((value) => value + 1)}>Add</button>
        <button type="button" onClick={() => setCount((value) => Math.max(0, value - 1))}>Read one</button>
      </div>
      <small>The browser tab title updates with the count.</small>
    </div>
  );
}

function GitHubLookup() {
  const [username, setUsername] = useState('202537201-pandeyaayush');
  const [submittedName, setSubmittedName] = useState('202537201-pandeyaayush');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUser() {
      setLoading(true);
      setError('');
      setUser(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(submittedName)}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(response.status === 404 ? 'User not found (404)' : 'Could not load this user');
        }
        const data = await response.json();
        setUser(data);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchUser();
    return () => controller.abort();
  }, [submittedName]);

  function search(event) {
    event.preventDefault();
    const cleanName = username.trim();
    if (cleanName) setSubmittedName(cleanName);
  }

  return (
    <div className="github-demo">
      <form onSubmit={search}>
        <label htmlFor="github-name">GitHub username</label>
        <div>
          <input
            id="github-name"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="202537201-pandeyaayush"
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {loading && <p className="status" role="status">Loading…</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {user && (
        <div className="github-result">
          <img src={user.avatar_url} alt="" />
          <div>
            <h4>{user.name || user.login}</h4>
            <p>{user.bio || 'No bio provided.'}</p>
            <span>{user.followers} followers · {user.public_repos} repositories</span>
          </div>
        </div>
      )}
    </div>
  );
}

function DerivedName() {
  const [first, setFirst] = useState('Ada');
  const [last, setLast] = useState('Lovelace');
  const fullName = `${first} ${last}`.trim();

  return (
    <div className="derived-demo">
      <label>First <input value={first} onChange={(event) => setFirst(event.target.value)} /></label>
      <label>Last <input value={last} onChange={(event) => setLast(event.target.value)} /></label>
      <p>Derived value: <strong>{fullName}</strong></p>
      <small>No extra state and no effect are needed.</small>
    </div>
  );
}

function App() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="wordmark" href="../../../index.html" aria-label="Aayush Pandey course archive">AP<span>.</span></a>
        <nav aria-label="Page navigation">
          <a href="#samples">Samples</a>
          <a href="#exercises">Exercises</a>
        </nav>
        <a className="header-link" href="../../index.html">Week 12 overview <span aria-hidden="true">↗</span></a>
      </header>

      <main id="main-content">
        <section className="lesson-hero" aria-labelledby="lesson-title">
          <p className="eyebrow">WEB PROGRAMMING <span>/</span> WEEK 12 · PART 2</p>
          <h1 id="lesson-title">React Effects<br /><em>&amp; useEffect.</em></h1>
          <p className="lesson-intro">
            Aayush Pandey · Student ID 202537201 · Computer Science, Year 2 · GPA 3.61 · Gachon University. Practice effects for browser APIs, timers, subscriptions, and network requests.
          </p>
          <div className="render-flow" aria-label="React effect render flow">
            <span><b>1</b> Render</span>
            <i>→</i>
            <span><b>2</b> Paint</span>
            <i>→</i>
            <span><b>3</b> Effect</span>
          </div>
        </section>

        <section className="section" id="samples" aria-labelledby="samples-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SAMPLES</p>
              <h2 id="samples-title">See the effect lifecycle.</h2>
            </div>
            <p className="section-note">Each sample is small enough to connect the code with the behavior.</p>
          </div>
          <div className="sample-grid">
            <article className="sample-card">
              <p className="sample-label">MOUNT · []</p>
              <h3>Run once</h3>
              <DependencyMount />
              <CodeDisclosure>{`useEffect(() => {
  setRuns(value => value + 1);
}, []);`}</CodeDisclosure>
            </article>
            <article className="sample-card">
              <p className="sample-label">CHANGE · [name]</p>
              <h3>Run on a change</h3>
              <DependencyChange />
              <CodeDisclosure>{`useEffect(() => {
  setRuns(value => value + 1);
}, [name]);`}</CodeDisclosure>
            </article>
            <article className="sample-card">
              <p className="sample-label">CLEANUP · TIMER</p>
              <h3>Stop resources</h3>
              <LiveClock />
              <CodeDisclosure>{`useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);`}</CodeDisclosure>
            </article>
            <article className="sample-card">
              <p className="sample-label">LOCAL STORAGE</p>
              <h3>Sync browser storage</h3>
              <ThemeSync />
              <CodeDisclosure>{`useEffect(() => {
  localStorage.setItem('aayush-week12-theme', theme);
}, [theme]);`}</CodeDisclosure>
            </article>
          </div>
        </section>

        <section className="section exercise-section" id="exercises" aria-labelledby="exercise-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXERCISES</p>
              <h2 id="exercise-title">Practice on a working page.</h2>
            </div>
            <p className="section-note">Try every demo, then inspect and modify the effect code.</p>
          </div>

          <div className="exercise-grid">
            <Exercise
              number="E1"
              id="document-title"
              title="Sync the document title"
              description="Change an external value—the browser tab title—when count changes."
              code={`useEffect(() => {
  document.title = \`Inbox (\${count})\`;
}, [count]);`}
            >
              <DocumentTitle />
            </Exercise>

            <Exercise
              number="E2"
              id="github-fetch"
              title="Fetch and display a GitHub user"
              description="An async operation loads inside the effect, with loading, error, and abort cleanup states."
              code={`useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  return () => controller.abort();
}, [submittedName]);`}
            >
              <GitHubLookup />
            </Exercise>

            <Exercise
              number="E3"
              id="derived-value"
              title="Do not store a derived value"
              description="When a value can be calculated from existing state, calculate it during rendering."
              code={`const [first, setFirst] = useState('Ada');
const [last, setLast] = useState('Lovelace');

const fullName = \`\${first} \${last}\`.trim();`}
            >
              <DerivedName />
            </Exercise>
          </div>
        </section>

        <section className="takeaways" aria-labelledby="takeaway-title">
          <p className="eyebrow">KEY TAKEAWAYS</p>
          <h2 id="takeaway-title">Five rules to remember</h2>
          <ol>
            <li><b>01</b><span>Effects run after rendering.</span></li>
            <li><b>02</b><span>[] runs once; [value] runs on change.</span></li>
            <li><b>03</b><span>Include every component value the effect reads.</span></li>
            <li><b>04</b><span>Return cleanup for timers and subscriptions.</span></li>
            <li><b>05</b><span>Put async work inside the effect callback.</span></li>
          </ol>
        </section>
      </main>

      <footer className="site-footer">
        <a href="../../../index.html">Course archive <span aria-hidden="true">↑</span></a>
        <a href="../../index.html">Week 12 overview <span aria-hidden="true">↗</span></a>
        <span>AAYUSH PANDEY · 202537201</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
