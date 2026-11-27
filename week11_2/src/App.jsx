import { useEffect, useState } from "react";

const photoUrl = "https://raw.githubusercontent.com/202537201-pandeyaayush/my-portfolio/main/assets/aayush-pandey.jpg";

function CodeExample({ children }) {
  return <details className="code-example"><summary>View code example</summary><pre><code>{children}</code></pre></details>;
}

function Exercise({ number, title, description, code, children }) {
  return <article className="exercise-card">
    <div className="exercise-title-row"><span className="task-badge">{number}</span><div><p className="task-label">WEEK 11_2 PRACTICE</p><h3>{title}</h3></div></div>
    <p className="exercise-description">{description}</p>
    <div className="demo-area">{children}</div>
    <CodeExample>{code}</CodeExample>
  </article>;
}

const initialTasks = [
  { id: 1, title: "Review React state", completed: true },
  { id: 2, title: "Practice event handlers", completed: false },
  { id: 3, title: "Build a small component", completed: false }
];

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [draft, setDraft] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Read the Week 11 notes" },
    { id: 2, title: "Try the counter example" }
  ]);
  const [nextId, setNextId] = useState(3);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(initialTasks);
  const [taskFilter, setTaskFilter] = useState("all");
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [profileMessage, setProfileMessage] = useState("");
  const [note, setNote] = useState(() => {
    try { return localStorage.getItem("aayush-week11-note") || ""; }
    catch { return ""; }
  });

  useEffect(() => {
    try { localStorage.setItem("aayush-week11-note", note); }
    catch { /* local storage may be unavailable in private browsing */ }
  }, [note]);

  function addTask(event) {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;
    setTasks(current => [...current, { id: nextId, title }]);
    setNextId(current => current + 1);
    setDraft("");
  }

  function removeTask(id) {
    setTasks(current => current.filter(task => task.id !== id));
  }

  function toggleTask(id) {
    setCompletedTasks(current => current.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function updateProfile(event) {
    const { name: field, value } = event.target;
    setProfile(current => ({ ...current, [field]: value }));
  }

  function saveProfile(event) {
    event.preventDefault();
    const cleanName = profile.name.trim();
    const cleanEmail = profile.email.trim();
    if (!cleanName || !cleanEmail) {
      setProfileMessage("Please enter both your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setProfileMessage("Please enter a valid email address.");
      return;
    }
    setProfileMessage(`Profile saved for ${cleanName}.`);
  }

  const visibleCompletedTasks = completedTasks.filter(task =>
    taskFilter === "active" ? !task.completed :
    taskFilter === "done" ? task.completed : true
  );

  return <div className="site-wrap">
    <header className="topbar">
      <a className="brand" href="../../index.html">AP<span>.</span></a>
      <nav><a href="#exercises">Exercises</a><a href="../../week11_1/index.html">Week 11_1</a></nav>
      <a className="top-link" href="https://github.com/202537201-pandeyaayush/course-archive">Course archive ↗</a>
    </header>
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">GACHON UNIVERSITY · WEB PROGRAMMING</p>
          <h1>React state<br/><span>&amp; events.</span></h1>
          <p className="hero-copy">Week 11_2 — making interfaces interactive with state, event handlers, controlled forms, lists, and browser storage.</p>
          <div className="hero-meta"><span>STUDENT WORK</span><span>2026 · WEEK 11_2</span></div>
        </div>
        <aside className="identity-card">
          <img src={photoUrl} alt="Aayush Pandey" onError={event => { event.currentTarget.style.display = "none"; event.currentTarget.nextElementSibling.style.display = "grid"; }} />
          <div className="identity-fallback" style={{display:"none"}}>AP</div>
          <div><p className="identity-label">STUDENT PROFILE</p><h2>Aayush Pandey</h2><p>Computer Science · Year 2</p><p className="student-id">ID 202537201</p></div>
          <div className="identity-stats"><div><strong>3.61</strong><span>GPA</span></div><div><strong>11_2</strong><span>WEEK</span></div></div>
        </aside>
      </section>

      <section className="intro-strip">
        <div><span className="strip-mark">01</span><p><strong>State</strong><br/>Keep track of changing values.</p></div>
        <div><span className="strip-mark">02</span><p><strong>Events</strong><br/>Respond to clicks and input.</p></div>
        <div><span className="strip-mark">03</span><p><strong>Persistence</strong><br/>Save information in the browser.</p></div>
      </section>

      <section className="work-section" id="exercises">
        <div className="section-heading"><div><p className="eyebrow blue">WEEK 11_2 / ASSIGNMENTS</p><h2>Interactive exercises</h2></div><p>Change the controls to see React update the interface. Each activity demonstrates a different state or event pattern.</p></div>
        <div className="exercise-grid">
          <Exercise number="E1" title="Update state with a counter" description="Use a functional state update so each click uses the latest counter value." code={`const [count, setCount] = useState(0);

<button onClick={() => setCount(value => value + 1)}>
  Add one
</button>`}>
            <div className="counter-demo"><output className="counter-value" aria-live="polite">{count}</output><div className="button-row"><button className="secondary-button" onClick={() => setCount(value => value - 1)}>Decrease</button><button className="primary-button" onClick={() => setCount(value => value + 1)}>Add one</button><button className="plain-button" onClick={() => setCount(0)}>Reset</button></div></div>
          </Exercise>

          <Exercise number="E2" title="Keep an input in sync" description="A controlled input stores its value in state and updates the greeting as you type." code={`const [name, setName] = useState("");

<input
  value={name}
  onChange={event => setName(event.target.value)}
/>
<p>Hello, {name || "there"}!</p>`}>
            <div className="form-demo"><label className="field-label" htmlFor="greeting-name">Your name</label><input className="field-input" id="greeting-name" value={name} maxLength={40} onChange={event => setName(event.target.value)} placeholder="Type your name"/><p className="preview-text" aria-live="polite">Hello, <strong>{name.trim() || "there"}</strong>!</p></div>
          </Exercise>

          <Exercise number="E3" title="Add and remove list items" description="Update arrays immutably, assign each item a stable ID, and handle form submission." code={`function addTask(event) {
  event.preventDefault();
  const title = draft.trim();
  if (!title) return;

  setTasks(current => [...current, { id: nextId, title }]);
  setDraft("");
}

setTasks(current => current.filter(task => task.id !== taskId));`}>
            <div className="task-demo"><form className="task-form" onSubmit={addTask}><label className="visually-hidden" htmlFor="new-task">New task</label><input id="new-task" className="field-input" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Add a task"/><button className="primary-button" type="submit" disabled={!draft.trim()}>Add</button></form>
              {tasks.length ? <ul className="task-list">{tasks.map(task => <li key={task.id}><span>{task.title}</span><button className="remove-button" onClick={() => removeTask(task.id)} aria-label={`Remove ${task.title}`}>Remove</button></li>)}</ul> : <p className="empty-message">No tasks yet. Add one above.</p>}
            </div>
          </Exercise>

          <Exercise number="E4" title="Show and hide extra content" description="Use boolean state to reveal optional information and expose the current state accessibly." code={`const [isOpen, setIsOpen] = useState(false);

<button
  aria-expanded={isOpen}
  onClick={() => setIsOpen(open => !open)}
>
  {isOpen ? "Hide details" : "Show details"}
</button>

{isOpen && <p>More information...</p>}`}>
            <div className="toggle-demo"><button className="primary-button" aria-expanded={detailsOpen} aria-controls="extra-details" onClick={() => setDetailsOpen(open => !open)}>{detailsOpen ? "Hide details" : "Show details"}</button><div id="extra-details" hidden={!detailsOpen}>{detailsOpen && <p className="detail-panel">React state stores information between renders. When the state changes, React updates the relevant part of the page.</p>}</div></div>
          </Exercise>

          <Exercise number="E5" title="Complete and filter tasks" description="Toggle a task's completed value, then filter the list by all, active, or completed status." code={`function toggleCompletedTask(taskId) {
  setCompletedTasks(current =>
    current.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    )
  );
}`}>
            <div className="completed-demo"><div className="filter-row" role="group" aria-label="Filter tasks">{[["all","All"],["active","Active"],["done","Done"]].map(([value,label])=><button key={value} className={`chip ${taskFilter===value?"selected":""}`} aria-pressed={taskFilter===value} onClick={()=>setTaskFilter(value)}>{label}</button>)}</div>
              {visibleCompletedTasks.length ? <ul className="completed-list">{visibleCompletedTasks.map(task=><li key={task.id}><label><input type="checkbox" checked={task.completed} onChange={()=>toggleTask(task.id)}/><span className={task.completed?"is-complete":""}>{task.title}</span></label></li>)}</ul> : <p className="empty-message">No tasks match this filter.</p>}
              <button className="plain-button" disabled={!completedTasks.some(task=>task.completed)} onClick={()=>setCompletedTasks(current=>current.filter(task=>!task.completed))}>Clear completed</button>
            </div>
          </Exercise>

          <Exercise number="E6" title="Validate a controlled form" description="Keep multiple fields in one state object and validate the values when the form is submitted." code={`const [profile, setProfile] = useState({
  name: "",
  email: ""
});

function updateProfile(event) {
  setProfile(current => ({
    ...current,
    [event.target.name]: event.target.value
  }));
}`}>
            <form className="profile-form" onSubmit={saveProfile} noValidate><label className="field-label" htmlFor="profile-name">Name</label><input className="field-input" id="profile-name" name="name" value={profile.name} onChange={updateProfile} placeholder="Your name"/><label className="field-label" htmlFor="profile-email">Email</label><input className="field-input" id="profile-email" name="email" type="email" value={profile.email} onChange={updateProfile} placeholder="you@example.com"/><button className="primary-button form-submit" type="submit">Save profile</button>{profileMessage && <p className="form-message" role="status">{profileMessage}</p>}</form>
          </Exercise>

          <Exercise number="E7" title="Save a note in the browser" description="Use useEffect to store the note in localStorage whenever its value changes." code={`const [note, setNote] = useState(() =>
  localStorage.getItem("aayush-week11-note") || ""
);

useEffect(() => {
  localStorage.setItem("aayush-week11-note", note);
}, [note]);`}>
            <div className="note-demo"><label className="field-label" htmlFor="saved-note">Quick note</label><textarea id="saved-note" className="field-textarea" rows="4" value={note} onChange={event=>setNote(event.target.value)} placeholder="Write a note. It will be saved in this browser..."/><div className="note-footer"><p aria-live="polite">{note ? "Saved in this browser" : "Nothing saved yet"}</p><button className="plain-button" disabled={!note} onClick={()=>setNote("")}>Clear note</button></div></div>
          </Exercise>
        </div>
      </section>
    </main>
    <footer className="site-footer"><a href="../../index.html">← Course archive</a><span>WEEK 11_2 · REACT STATE &amp; EVENTS</span><a href="../../week11_1/index.html">← Back to Week 11_1</a></footer>
  </div>;
}
