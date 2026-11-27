import { jsx as _jsx, jsxs as _jsxs } from "./jsx-runtime.js";
import { useEffect, useState } from "./react.js";
const photoUrl = "https://raw.githubusercontent.com/202537201-pandeyaayush/my-portfolio/main/assets/aayush-pandey.jpg";
function CodeExample({ children }) {
    return _jsxs("details", { className: "code-example", children: [_jsx("summary", { children: "View code example" }), _jsx("pre", { children: _jsx("code", { children: children }) })] });
}
function Exercise({ number, title, description, code, children }) {
    return _jsxs("article", { className: "exercise-card", children: [_jsxs("div", { className: "exercise-title-row", children: [_jsx("span", { className: "task-badge", children: number }), _jsxs("div", { children: [_jsx("p", { className: "task-label", children: "WEEK 11_2 PRACTICE" }), _jsx("h3", { children: title })] })] }), _jsx("p", { className: "exercise-description", children: description }), _jsx("div", { className: "demo-area", children: children }), _jsx(CodeExample, { children: code })] });
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
        try {
            return localStorage.getItem("aayush-week11-note") || "";
        }
        catch {
            return "";
        }
    });
    useEffect(() => {
        try {
            localStorage.setItem("aayush-week11-note", note);
        }
        catch { /* local storage may be unavailable in private browsing */ }
    }, [note]);
    function addTask(event) {
        event.preventDefault();
        const title = draft.trim();
        if (!title)
            return;
        setTasks(current => [...current, { id: nextId, title }]);
        setNextId(current => current + 1);
        setDraft("");
    }
    function removeTask(id) {
        setTasks(current => current.filter(task => task.id !== id));
    }
    function toggleTask(id) {
        setCompletedTasks(current => current.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
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
    const visibleCompletedTasks = completedTasks.filter(task => taskFilter === "active" ? !task.completed :
        taskFilter === "done" ? task.completed : true);
    return _jsxs("div", { className: "site-wrap", children: [_jsxs("header", { className: "topbar", children: [_jsxs("a", { className: "brand", href: "../../index.html", children: ["AP", _jsx("span", { children: "." })] }), _jsxs("nav", { children: [_jsx("a", { href: "#exercises", children: "Exercises" }), _jsx("a", { href: "../../week11_1/index.html", children: "Week 11_1" })] }), _jsx("a", { className: "top-link", href: "https://github.com/202537201-pandeyaayush/course-archive", children: "Course archive \u2197" })] }), _jsxs("main", { children: [_jsxs("section", { className: "hero", children: [_jsxs("div", { className: "hero-content", children: [_jsx("p", { className: "eyebrow", children: "GACHON UNIVERSITY \u00B7 WEB PROGRAMMING" }), _jsxs("h1", { children: ["React state", _jsx("br", {}), _jsx("span", { children: "& events." })] }), _jsx("p", { className: "hero-copy", children: "Week 11_2 \u2014 making interfaces interactive with state, event handlers, controlled forms, lists, and browser storage." }), _jsxs("div", { className: "hero-meta", children: [_jsx("span", { children: "STUDENT WORK" }), _jsx("span", { children: "2026 \u00B7 WEEK 11_2" })] })] }), _jsxs("aside", { className: "identity-card", children: [_jsx("img", { src: photoUrl, alt: "Aayush Pandey", onError: event => { event.currentTarget.style.display = "none"; event.currentTarget.nextElementSibling.style.display = "grid"; } }), _jsx("div", { className: "identity-fallback", style: { display: "none" }, children: "AP" }), _jsxs("div", { children: [_jsx("p", { className: "identity-label", children: "STUDENT PROFILE" }), _jsx("h2", { children: "Aayush Pandey" }), _jsx("p", { children: "Computer Science \u00B7 Year 2" }), _jsx("p", { className: "student-id", children: "ID 202537201" })] }), _jsxs("div", { className: "identity-stats", children: [_jsxs("div", { children: [_jsx("strong", { children: "3.61" }), _jsx("span", { children: "GPA" })] }), _jsxs("div", { children: [_jsx("strong", { children: "11_2" }), _jsx("span", { children: "WEEK" })] })] })] })] }), _jsxs("section", { className: "intro-strip", children: [_jsxs("div", { children: [_jsx("span", { className: "strip-mark", children: "01" }), _jsxs("p", { children: [_jsx("strong", { children: "State" }), _jsx("br", {}), "Keep track of changing values."] })] }), _jsxs("div", { children: [_jsx("span", { className: "strip-mark", children: "02" }), _jsxs("p", { children: [_jsx("strong", { children: "Events" }), _jsx("br", {}), "Respond to clicks and input."] })] }), _jsxs("div", { children: [_jsx("span", { className: "strip-mark", children: "03" }), _jsxs("p", { children: [_jsx("strong", { children: "Persistence" }), _jsx("br", {}), "Save information in the browser."] })] })] }), _jsxs("section", { className: "work-section", id: "exercises", children: [_jsxs("div", { className: "section-heading", children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow blue", children: "WEEK 11_2 / ASSIGNMENTS" }), _jsx("h2", { children: "Interactive exercises" })] }), _jsx("p", { children: "Change the controls to see React update the interface. Each activity demonstrates a different state or event pattern." })] }), _jsxs("div", { className: "exercise-grid", children: [_jsx(Exercise, { number: "E1", title: "Update state with a counter", description: "Use a functional state update so each click uses the latest counter value.", code: `const [count, setCount] = useState(0);

<button onClick={() => setCount(value => value + 1)}>
  Add one
</button>`, children: _jsxs("div", { className: "counter-demo", children: [_jsx("output", { className: "counter-value", "aria-live": "polite", children: count }), _jsxs("div", { className: "button-row", children: [_jsx("button", { className: "secondary-button", onClick: () => setCount(value => value - 1), children: "Decrease" }), _jsx("button", { className: "primary-button", onClick: () => setCount(value => value + 1), children: "Add one" }), _jsx("button", { className: "plain-button", onClick: () => setCount(0), children: "Reset" })] })] }) }), _jsx(Exercise, { number: "E2", title: "Keep an input in sync", description: "A controlled input stores its value in state and updates the greeting as you type.", code: `const [name, setName] = useState("");

<input
  value={name}
  onChange={event => setName(event.target.value)}
/>
<p>Hello, {name || "there"}!</p>`, children: _jsxs("div", { className: "form-demo", children: [_jsx("label", { className: "field-label", htmlFor: "greeting-name", children: "Your name" }), _jsx("input", { className: "field-input", id: "greeting-name", value: name, maxLength: 40, onChange: event => setName(event.target.value), placeholder: "Type your name" }), _jsxs("p", { className: "preview-text", "aria-live": "polite", children: ["Hello, ", _jsx("strong", { children: name.trim() || "there" }), "!"] })] }) }), _jsx(Exercise, { number: "E3", title: "Add and remove list items", description: "Update arrays immutably, assign each item a stable ID, and handle form submission.", code: `function addTask(event) {
  event.preventDefault();
  const title = draft.trim();
  if (!title) return;

  setTasks(current => [...current, { id: nextId, title }]);
  setDraft("");
}

setTasks(current => current.filter(task => task.id !== taskId));`, children: _jsxs("div", { className: "task-demo", children: [_jsxs("form", { className: "task-form", onSubmit: addTask, children: [_jsx("label", { className: "visually-hidden", htmlFor: "new-task", children: "New task" }), _jsx("input", { id: "new-task", className: "field-input", value: draft, onChange: event => setDraft(event.target.value), placeholder: "Add a task" }), _jsx("button", { className: "primary-button", type: "submit", disabled: !draft.trim(), children: "Add" })] }), tasks.length ? _jsx("ul", { className: "task-list", children: tasks.map(task => _jsxs("li", { children: [_jsx("span", { children: task.title }), _jsx("button", { className: "remove-button", onClick: () => removeTask(task.id), "aria-label": `Remove ${task.title}`, children: "Remove" })] }, task.id)) }) : _jsx("p", { className: "empty-message", children: "No tasks yet. Add one above." })] }) }), _jsx(Exercise, { number: "E4", title: "Show and hide extra content", description: "Use boolean state to reveal optional information and expose the current state accessibly.", code: `const [isOpen, setIsOpen] = useState(false);

<button
  aria-expanded={isOpen}
  onClick={() => setIsOpen(open => !open)}
>
  {isOpen ? "Hide details" : "Show details"}
</button>

{isOpen && <p>More information...</p>}`, children: _jsxs("div", { className: "toggle-demo", children: [_jsx("button", { className: "primary-button", "aria-expanded": detailsOpen, "aria-controls": "extra-details", onClick: () => setDetailsOpen(open => !open), children: detailsOpen ? "Hide details" : "Show details" }), _jsx("div", { id: "extra-details", hidden: !detailsOpen, children: detailsOpen && _jsx("p", { className: "detail-panel", children: "React state stores information between renders. When the state changes, React updates the relevant part of the page." }) })] }) }), _jsx(Exercise, { number: "E5", title: "Complete and filter tasks", description: "Toggle a task's completed value, then filter the list by all, active, or completed status.", code: `function toggleCompletedTask(taskId) {
  setCompletedTasks(current =>
    current.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    )
  );
}`, children: _jsxs("div", { className: "completed-demo", children: [_jsx("div", { className: "filter-row", role: "group", "aria-label": "Filter tasks", children: [["all", "All"], ["active", "Active"], ["done", "Done"]].map(([value, label]) => _jsx("button", { className: `chip ${taskFilter === value ? "selected" : ""}`, "aria-pressed": taskFilter === value, onClick: () => setTaskFilter(value), children: label }, value)) }), visibleCompletedTasks.length ? _jsx("ul", { className: "completed-list", children: visibleCompletedTasks.map(task => _jsx("li", { children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: task.completed, onChange: () => toggleTask(task.id) }), _jsx("span", { className: task.completed ? "is-complete" : "", children: task.title })] }) }, task.id)) }) : _jsx("p", { className: "empty-message", children: "No tasks match this filter." }), _jsx("button", { className: "plain-button", disabled: !completedTasks.some(task => task.completed), onClick: () => setCompletedTasks(current => current.filter(task => !task.completed)), children: "Clear completed" })] }) }), _jsx(Exercise, { number: "E6", title: "Validate a controlled form", description: "Keep multiple fields in one state object and validate the values when the form is submitted.", code: `const [profile, setProfile] = useState({
  name: "",
  email: ""
});

function updateProfile(event) {
  setProfile(current => ({
    ...current,
    [event.target.name]: event.target.value
  }));
}`, children: _jsxs("form", { className: "profile-form", onSubmit: saveProfile, noValidate: true, children: [_jsx("label", { className: "field-label", htmlFor: "profile-name", children: "Name" }), _jsx("input", { className: "field-input", id: "profile-name", name: "name", value: profile.name, onChange: updateProfile, placeholder: "Your name" }), _jsx("label", { className: "field-label", htmlFor: "profile-email", children: "Email" }), _jsx("input", { className: "field-input", id: "profile-email", name: "email", type: "email", value: profile.email, onChange: updateProfile, placeholder: "you@example.com" }), _jsx("button", { className: "primary-button form-submit", type: "submit", children: "Save profile" }), profileMessage && _jsx("p", { className: "form-message", role: "status", children: profileMessage })] }) }), _jsx(Exercise, { number: "E7", title: "Save a note in the browser", description: "Use useEffect to store the note in localStorage whenever its value changes.", code: `const [note, setNote] = useState(() =>
  localStorage.getItem("aayush-week11-note") || ""
);

useEffect(() => {
  localStorage.setItem("aayush-week11-note", note);
}, [note]);`, children: _jsxs("div", { className: "note-demo", children: [_jsx("label", { className: "field-label", htmlFor: "saved-note", children: "Quick note" }), _jsx("textarea", { id: "saved-note", className: "field-textarea", rows: "4", value: note, onChange: event => setNote(event.target.value), placeholder: "Write a note. It will be saved in this browser..." }), _jsxs("div", { className: "note-footer", children: [_jsx("p", { "aria-live": "polite", children: note ? "Saved in this browser" : "Nothing saved yet" }), _jsx("button", { className: "plain-button", disabled: !note, onClick: () => setNote(""), children: "Clear note" })] })] }) })] })] })] }), _jsxs("footer", { className: "site-footer", children: [_jsx("a", { href: "../../index.html", children: "\u2190 Course archive" }), _jsx("span", { children: "WEEK 11_2 \u00B7 REACT STATE & EVENTS" }), _jsx("a", { href: "../../week11_1/index.html", children: "\u2190 Back to Week 11_1" })] })] });
}
