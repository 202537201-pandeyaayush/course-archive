import { jsx as _jsx, jsxs as _jsxs } from "./jsx-runtime.js";
import { useMemo, useState } from "./react.js";
const photoUrl = "https://raw.githubusercontent.com/202537201-pandeyaayush/my-portfolio/main/assets/aayush-pandey.jpg";
const student = {
    name: "Aayush Pandey",
    studentId: "202537201",
    major: "Computer Science",
    year: 2,
    gpa: 3.61,
    university: "Gachon University"
};
const studentDirectory = [
    student,
    { name: "Sample Student A", studentId: "DEMO-101", major: "Computer Science", year: 1, gpa: 3.80 },
    { name: "Sample Student B", studentId: "DEMO-102", major: "Software", year: 2, gpa: 3.45 }
];
const notifications = [
    { id: 1, type: "success", message: "Your student profile is ready to view." },
    { id: 2, type: "warning", message: "Remember to check the next assignment deadline." },
    { id: 3, type: "info", message: "New Web Programming practice materials are available." }
];
const projects = [
    { id: 1, title: "Student Profile Page", description: "A responsive profile card presenting student information.", tech: ["HTML", "CSS", "JavaScript"] },
    { id: 2, title: "React Component Gallery", description: "A collection of reusable interface components built with React.", tech: ["React", "JavaScript", "CSS"] },
    { id: 3, title: "Task Tracker", description: "A simple task interface for adding and organizing daily work.", tech: ["React", "JavaScript"] },
    { id: 4, title: "Responsive Landing Page", description: "A clean landing page with a flexible layout for different screens.", tech: ["HTML", "CSS"] }
];
function CodeExample({ children }) {
    return _jsxs("details", { className: "code-example", children: [_jsx("summary", { children: "View code example" }), _jsx("pre", { children: _jsx("code", { children: children }) })] });
}
function Exercise({ number, title, description, code, children }) {
    return (_jsxs("article", { className: "exercise-card", children: [_jsxs("div", { className: "exercise-title-row", children: [_jsx("span", { className: "task-badge", children: number }), _jsxs("div", { children: [_jsx("p", { className: "task-label", children: "WEEK 11_1 PRACTICE" }), _jsx("h3", { children: title })] })] }), _jsx("p", { className: "exercise-description", children: description }), _jsx("div", { className: "demo-area", children: children }), _jsx(CodeExample, { children: code })] }));
}
function ProfileCard({ name, role, email, avatarUrl }) {
    const [imageFailed, setImageFailed] = useState(false);
    return (_jsxs("article", { className: "profile-mini-card", children: [avatarUrl && !imageFailed
                ? _jsx("img", { className: "profile-photo", src: avatarUrl, alt: `${name} profile`, onError: () => setImageFailed(true) })
                : _jsx("div", { className: "avatar-fallback", "aria-hidden": "true", children: name.split(" ").map(part => part[0]).join("").slice(0, 2) }), _jsxs("div", { className: "profile-mini-copy", children: [_jsx("h4", { children: name }), _jsx("p", { children: role }), _jsx("a", { href: `mailto:${email}`, children: email })] })] }));
}
function NotificationDemo() {
    const [filter, setFilter] = useState("all");
    const visible = notifications.filter(item => filter === "all" || item.type === filter);
    const icons = { success: "✓", warning: "!", info: "i" };
    return (_jsxs("div", { children: [_jsx("div", { className: "filter-row", role: "group", "aria-label": "Filter notifications", children: ["all", "success", "warning", "info"].map(value => _jsx("button", { className: `chip ${filter === value ? "selected" : ""}`, onClick: () => setFilter(value), "aria-pressed": filter === value, children: value[0].toUpperCase() + value.slice(1) }, value)) }), _jsx("ul", { className: "notification-list", children: visible.map(item => _jsxs("li", { className: `notification-item ${item.type}`, children: [_jsx("span", { className: "notification-icon", "aria-hidden": "true", children: icons[item.type] }), item.message] }, item.id)) }), _jsxs("p", { className: "small-note", "aria-live": "polite", children: ["Showing ", visible.length, " of ", notifications.length, " notifications"] })] }));
}
function ReusableCard({ title, children }) {
    return _jsxs("section", { className: "reusable-card", children: [_jsx("p", { className: "mini-kicker", children: "REUSABLE CARD" }), _jsx("h4", { children: title }), _jsx("div", { children: children })] });
}
function StudentCard({ name, studentId, major, year, gpa }) {
    return _jsxs("article", { className: "directory-card", children: [_jsxs("div", { className: "directory-card-top", children: [_jsx("span", { className: "student-avatar", children: name.split(" ").map(part => part[0]).join("").slice(0, 2) }), _jsxs("div", { children: [_jsx("h4", { children: name }), _jsxs("p", { children: ["ID: ", studentId] })] })] }), _jsxs("dl", { children: [_jsxs("div", { children: [_jsx("dt", { children: "Major" }), _jsx("dd", { children: major })] }), _jsxs("div", { children: [_jsx("dt", { children: "Year" }), _jsx("dd", { children: year })] }), _jsxs("div", { children: [_jsx("dt", { children: "GPA" }), _jsx("dd", { children: Number(gpa).toFixed(2) })] })] })] });
}
function ProjectGallery() {
    const [active, setActive] = useState("All");
    const categories = useMemo(() => ["All", ...new Set(projects.flatMap(project => project.tech))], []);
    const filtered = active === "All" ? projects : projects.filter(project => project.tech.includes(active));
    return _jsxs("div", { children: [_jsx("div", { className: "filter-row", role: "group", "aria-label": "Filter projects by technology", children: categories.map(category => _jsx("button", { className: `chip ${active === category ? "selected" : ""}`, onClick: () => setActive(category), "aria-pressed": active === category, children: category }, category)) }), _jsx("div", { className: "project-grid", children: filtered.map(project => _jsxs("article", { className: "project-card", children: [_jsxs("span", { className: "project-number", children: ["PROJECT ", String(project.id).padStart(2, "0")] }), _jsx("h4", { children: project.title }), _jsx("p", { children: project.description }), _jsx("div", { className: "tag-list", children: project.tech.map(tech => _jsx("span", { children: tech }, tech)) })] }, project.id)) }), _jsxs("p", { className: "small-note", "aria-live": "polite", children: [filtered.length, " project", filtered.length === 1 ? "" : "s", " displayed"] })] });
}
function Greeting({ name = "World" }) {
    return _jsxs("p", { className: "greeting", children: ["Hello, ", _jsx("strong", { children: name }), "!"] });
}
function ProductCard({ name, price, rating, inStock }) {
    return _jsxs("article", { className: `product-card ${inStock ? "" : "sold-out"}`, children: [_jsx("h4", { children: name }), _jsxs("p", { className: "product-price", children: [price.toLocaleString("en-US"), "\uC6D0"] }), _jsxs("p", { children: ["Rating: ", rating, " / 5"] }), _jsx("span", { className: "stock-label", children: inStock ? "In stock" : "Out of stock" })] });
}
function StudentList({ students }) {
    return _jsx("ul", { className: "simple-list", children: students.map(item => _jsxs("li", { children: [_jsx("span", { children: item.name }), _jsx("strong", { children: item.grade })] }, item.id)) });
}
function ConditionalDemo() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    return _jsxs("div", { children: [message && _jsx("p", { className: "inline-alert", children: message }), user ? _jsxs("p", { className: "welcome-message", children: ["Welcome back, ", _jsx("strong", { children: user.name }), ". You are signed in."] }) : _jsx("p", { className: "muted-copy", children: "You are currently signed out. Sign in to see the welcome message." }), _jsx("button", { className: "primary-button", onClick: () => { setUser(user ? null : { name: "Aayush" }); setMessage(""); }, children: user ? "Sign out" : "Sign in" })] });
}
export default function App() {
    return _jsxs("div", { className: "site-wrap", children: [_jsxs("header", { className: "topbar", children: [_jsxs("a", { className: "brand", href: "../../index.html", children: ["AP", _jsx("span", { children: "." })] }), _jsxs("nav", { children: [_jsx("a", { href: "#exercises", children: "Exercises" }), _jsx("a", { href: "../../week11_2/index.html", children: "Week 11_2" })] }), _jsx("a", { className: "top-link", href: "https://github.com/202537201-pandeyaayush/course-archive", children: "Course archive \u2197" })] }), _jsxs("main", { children: [_jsxs("section", { className: "hero", children: [_jsxs("div", { className: "hero-content", children: [_jsx("p", { className: "eyebrow", children: "GACHON UNIVERSITY \u00B7 WEB PROGRAMMING" }), _jsxs("h1", { children: ["React components", _jsx("br", {}), _jsx("span", { children: "& props." })] }), _jsx("p", { className: "hero-copy", children: "Week 11_1 \u2014 learning how reusable components, props, lists, and conditional rendering bring a page together." }), _jsxs("div", { className: "hero-meta", children: [_jsx("span", { children: "STUDENT WORK" }), _jsx("span", { children: "2026 \u00B7 WEEK 11_1" })] })] }), _jsxs("aside", { className: "identity-card", children: [_jsx("img", { src: photoUrl, alt: "Aayush Pandey", onError: event => { event.currentTarget.style.display = "none"; event.currentTarget.nextElementSibling.style.display = "grid"; } }), _jsx("div", { className: "identity-fallback", style: { display: "none" }, children: "AP" }), _jsxs("div", { children: [_jsx("p", { className: "identity-label", children: "STUDENT PROFILE" }), _jsx("h2", { children: "Aayush Pandey" }), _jsx("p", { children: "Computer Science \u00B7 Year 2" }), _jsx("p", { className: "student-id", children: "ID 202537201" })] }), _jsxs("div", { className: "identity-stats", children: [_jsxs("div", { children: [_jsx("strong", { children: "3.61" }), _jsx("span", { children: "GPA" })] }), _jsxs("div", { children: [_jsx("strong", { children: "11_1" }), _jsx("span", { children: "WEEK" })] })] })] })] }), _jsxs("section", { className: "intro-strip", children: [_jsxs("div", { children: [_jsx("span", { className: "strip-mark", children: "01" }), _jsxs("p", { children: [_jsx("strong", { children: "Components" }), _jsx("br", {}), "Build reusable UI pieces."] })] }), _jsxs("div", { children: [_jsx("span", { className: "strip-mark", children: "02" }), _jsxs("p", { children: [_jsx("strong", { children: "Props" }), _jsx("br", {}), "Pass data between components."] })] }), _jsxs("div", { children: [_jsx("span", { className: "strip-mark", children: "03" }), _jsxs("p", { children: [_jsx("strong", { children: "Rendering" }), _jsx("br", {}), "Display lists and conditional content."] })] })] }), _jsxs("section", { className: "work-section", id: "exercises", children: [_jsxs("div", { className: "section-heading", children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow blue", children: "WEEK 11_1 / ASSIGNMENTS" }), _jsx("h2", { children: "Exercises & homework" })] }), _jsx("p", { children: "Try each example below. The interactive demos are built with React components and props." })] }), _jsxs("div", { className: "exercise-grid", children: [_jsx(Exercise, { number: "E1", title: "Profile cards with props", description: "Pass a name, role, email, and avatar into the same reusable component. The second card uses my profile photo.", code: `function ProfileCard({ name, role, email, avatarUrl }) {
  return (
    <article>
      <img src={avatarUrl} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
      <a href={\`mailto:\${email}\`}>{email}</a>
    </article>
  );
}`, children: _jsxs("div", { className: "profile-demo-grid", children: [_jsx(ProfileCard, { name: "Course Instructor", role: "Web Programming Instructor", email: "instructor@example.edu" }), _jsx(ProfileCard, { name: "Aayush Pandey", role: "Computer Science Student", email: "aayush@example.com", avatarUrl: photoUrl })] }) }), _jsx(Exercise, { number: "E2", title: "Filter a notification list", description: "Render notifications from an array, choose an icon from each type, and filter the visible messages.", code: `const iconByType = {
  success: "✓",
  warning: "!",
  info: "i",
};

{notifications.map((item) => (
  <li key={item.id}>
    <span>{iconByType[item.type]}</span>
    {item.message}
  </li>
))}`, children: _jsx(NotificationDemo, {}) }), _jsx(Exercise, { number: "E3", title: "Reusable content with children", description: "Use the children prop to place different content inside the same card wrapper.", code: `function ReusableCard({ title, children }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}`, children: _jsxs("div", { className: "two-mini-grid", children: [_jsx(ReusableCard, { title: "Lecture topics", children: _jsxs("ul", { children: [_jsx("li", { children: "Components" }), _jsx("li", { children: "Props" }), _jsx("li", { children: "JSX" })] }) }), _jsx(ReusableCard, { title: "This week's work", children: _jsx("p", { children: "Build a profile card and a filterable project gallery." }) })] }) }), _jsx(Exercise, { number: "HW1", title: "Student directory", description: "Pass five values to a StudentCard component and render each student from an array.", code: `function StudentCard({ name, studentId, major, year, gpa }) {
  return (
    <article>
      <h3>{name}</h3>
      <p>ID: {studentId}</p>
      <p>Major: {major}</p>
      <p>Year: {year}</p>
      <p>GPA: {gpa.toFixed(2)}</p>
    </article>
  );
}

{studentDirectory.map((student) => (
  <StudentCard key={student.studentId} {...student} />
))}`, children: _jsx("div", { className: "directory-grid", children: studentDirectory.map(item => _jsx(StudentCard, { ...item }, item.studentId)) }) }), _jsx(Exercise, { number: "HW2", title: "Technology-filtered project gallery", description: "Use a selected technology to filter a collection of project cards.", code: `const categories = ["All", ...new Set(
  projects.flatMap((project) => project.tech)
)];

const visibleProjects = active === "All"
  ? projects
  : projects.filter((project) => project.tech.includes(active));`, children: _jsx(ProjectGallery, {}) }), _jsx(Exercise, { number: "P1", title: "One greeting, different props", description: "Give a component a default prop value and reuse it with different names.", code: `function Greeting({ name = "World" }) {
  return <p>Hello, {name}!</p>;
}`, children: _jsxs("div", { className: "greeting-stack", children: [_jsx(Greeting, {}), _jsx(Greeting, { name: "Aayush" }), _jsx(Greeting, { name: "Gachon University" })] }) }), _jsx(Exercise, { number: "P2", title: "Product stock status", description: "Use a boolean prop to show whether an item is available.", code: `function ProductCard({ name, price, rating, inStock }) {
  return (
    <article>
      <h3>{name}</h3>
      <p>{price.toLocaleString()}원</p>
      <p>{rating} / 5</p>
      <p>{inStock ? "In stock" : "Out of stock"}</p>
    </article>
  );
}`, children: _jsxs("div", { className: "two-mini-grid", children: [_jsx(ProductCard, { name: "Wireless Mouse", price: 29000, rating: 4.6, inStock: true }), _jsx(ProductCard, { name: "USB-C Hub", price: 45000, rating: 4.2, inStock: false })] }) }), _jsx(Exercise, { number: "P3", title: "Render a list with stable keys", description: "Use each record's unique ID as the React key when rendering a list.", code: `{students.map((item) => (
  <li key={item.id}>
    {item.name} — {item.grade}
  </li>
))}`, children: _jsx(StudentList, { students: [{ id: "s1", name: "Web Programming", grade: "A" }, { id: "s2", name: "Computer Science", grade: "A-" }, { id: "s3", name: "Project Practice", grade: "B+" }] }) }), _jsx(Exercise, { number: "P4", title: "Conditional sign-in interface", description: "Switch between signed-out and signed-in content using conditional rendering.", code: `const [user, setUser] = useState(null);

{user && <p>Welcome, {user.name}.</p>}
{!user && <p>Please sign in.</p>}

<button onClick={() => setUser(user ? null : { name: "Aayush" })}>
  {user ? "Sign out" : "Sign in"}
</button>`, children: _jsx(ConditionalDemo, {}) })] })] })] }), _jsxs("footer", { className: "site-footer", children: [_jsx("a", { href: "../../index.html", children: "\u2190 Course archive" }), _jsx("span", { children: "WEEK 11_1 \u00B7 REACT COMPONENTS & PROPS" }), _jsx("a", { href: "../../week11_2/index.html", children: "Continue to Week 11_2 \u2192" })] })] });
}
