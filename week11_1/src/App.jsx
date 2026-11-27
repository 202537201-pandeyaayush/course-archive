import { useMemo, useState } from "react";

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
  return <details className="code-example"><summary>View code example</summary><pre><code>{children}</code></pre></details>;
}

function Exercise({ number, title, description, code, children }) {
  return (
    <article className="exercise-card">
      <div className="exercise-title-row">
        <span className="task-badge">{number}</span>
        <div><p className="task-label">WEEK 11_1 PRACTICE</p><h3>{title}</h3></div>
      </div>
      <p className="exercise-description">{description}</p>
      <div className="demo-area">{children}</div>
      <CodeExample>{code}</CodeExample>
    </article>
  );
}

function ProfileCard({ name, role, email, avatarUrl }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className="profile-mini-card">
      {avatarUrl && !imageFailed
        ? <img className="profile-photo" src={avatarUrl} alt={`${name} profile`} onError={() => setImageFailed(true)} />
        : <div className="avatar-fallback" aria-hidden="true">{name.split(" ").map(part => part[0]).join("").slice(0, 2)}</div>}
      <div className="profile-mini-copy"><h4>{name}</h4><p>{role}</p><a href={`mailto:${email}`}>{email}</a></div>
    </article>
  );
}

function NotificationDemo() {
  const [filter, setFilter] = useState("all");
  const visible = notifications.filter(item => filter === "all" || item.type === filter);
  const icons = { success: "✓", warning: "!", info: "i" };
  return (
    <div>
      <div className="filter-row" role="group" aria-label="Filter notifications">
        {["all", "success", "warning", "info"].map(value =>
          <button key={value} className={`chip ${filter === value ? "selected" : ""}`} onClick={() => setFilter(value)} aria-pressed={filter === value}>{value[0].toUpperCase() + value.slice(1)}</button>
        )}
      </div>
      <ul className="notification-list">
        {visible.map(item => <li key={item.id} className={`notification-item ${item.type}`}><span className="notification-icon" aria-hidden="true">{icons[item.type]}</span>{item.message}</li>)}
      </ul>
      <p className="small-note" aria-live="polite">Showing {visible.length} of {notifications.length} notifications</p>
    </div>
  );
}

function ReusableCard({ title, children }) {
  return <section className="reusable-card"><p className="mini-kicker">REUSABLE CARD</p><h4>{title}</h4><div>{children}</div></section>;
}

function StudentCard({ name, studentId, major, year, gpa }) {
  return <article className="directory-card">
    <div className="directory-card-top"><span className="student-avatar">{name.split(" ").map(part => part[0]).join("").slice(0,2)}</span><div><h4>{name}</h4><p>ID: {studentId}</p></div></div>
    <dl><div><dt>Major</dt><dd>{major}</dd></div><div><dt>Year</dt><dd>{year}</dd></div><div><dt>GPA</dt><dd>{Number(gpa).toFixed(2)}</dd></div></dl>
  </article>;
}

function ProjectGallery() {
  const [active, setActive] = useState("All");
  const categories = useMemo(() => ["All", ...new Set(projects.flatMap(project => project.tech))], []);
  const filtered = active === "All" ? projects : projects.filter(project => project.tech.includes(active));
  return <div>
    <div className="filter-row" role="group" aria-label="Filter projects by technology">
      {categories.map(category => <button key={category} className={`chip ${active === category ? "selected" : ""}`} onClick={() => setActive(category)} aria-pressed={active === category}>{category}</button>)}
    </div>
    <div className="project-grid">
      {filtered.map(project => <article className="project-card" key={project.id}><span className="project-number">PROJECT {String(project.id).padStart(2,"0")}</span><h4>{project.title}</h4><p>{project.description}</p><div className="tag-list">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div></article>)}
    </div>
    <p className="small-note" aria-live="polite">{filtered.length} project{filtered.length === 1 ? "" : "s"} displayed</p>
  </div>;
}

function Greeting({ name = "World" }) {
  return <p className="greeting">Hello, <strong>{name}</strong>!</p>;
}

function ProductCard({ name, price, rating, inStock }) {
  return <article className={`product-card ${inStock ? "" : "sold-out"}`}><h4>{name}</h4><p className="product-price">{price.toLocaleString("en-US")}원</p><p>Rating: {rating} / 5</p><span className="stock-label">{inStock ? "In stock" : "Out of stock"}</span></article>;
}

function StudentList({ students }) {
  return <ul className="simple-list">{students.map(item => <li key={item.id}><span>{item.name}</span><strong>{item.grade}</strong></li>)}</ul>;
}

function ConditionalDemo() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  return <div>
    {message && <p className="inline-alert">{message}</p>}
    {user ? <p className="welcome-message">Welcome back, <strong>{user.name}</strong>. You are signed in.</p> : <p className="muted-copy">You are currently signed out. Sign in to see the welcome message.</p>}
    <button className="primary-button" onClick={() => { setUser(user ? null : { name: "Aayush" }); setMessage(""); }}>{user ? "Sign out" : "Sign in"}</button>
  </div>;
}

export default function App() {
  return <div className="site-wrap">
    <header className="topbar">
      <a className="brand" href="../../index.html">AP<span>.</span></a>
      <nav><a href="#exercises">Exercises</a><a href="../../week11_2/index.html">Week 11_2</a></nav>
      <a className="top-link" href="https://github.com/202537201-pandeyaayush/course-archive">Course archive ↗</a>
    </header>
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">GACHON UNIVERSITY · WEB PROGRAMMING</p>
          <h1>React components<br/><span>&amp; props.</span></h1>
          <p className="hero-copy">Week 11_1 — learning how reusable components, props, lists, and conditional rendering bring a page together.</p>
          <div className="hero-meta"><span>STUDENT WORK</span><span>2026 · WEEK 11_1</span></div>
        </div>
        <aside className="identity-card">
          <img src={photoUrl} alt="Aayush Pandey" onError={event => { event.currentTarget.style.display = "none"; event.currentTarget.nextElementSibling.style.display = "grid"; }} />
          <div className="identity-fallback" style={{display:"none"}}>AP</div>
          <div><p className="identity-label">STUDENT PROFILE</p><h2>Aayush Pandey</h2><p>Computer Science · Year 2</p><p className="student-id">ID 202537201</p></div>
          <div className="identity-stats"><div><strong>3.61</strong><span>GPA</span></div><div><strong>11_1</strong><span>WEEK</span></div></div>
        </aside>
      </section>

      <section className="intro-strip">
        <div><span className="strip-mark">01</span><p><strong>Components</strong><br/>Build reusable UI pieces.</p></div>
        <div><span className="strip-mark">02</span><p><strong>Props</strong><br/>Pass data between components.</p></div>
        <div><span className="strip-mark">03</span><p><strong>Rendering</strong><br/>Display lists and conditional content.</p></div>
      </section>

      <section className="work-section" id="exercises">
        <div className="section-heading"><div><p className="eyebrow blue">WEEK 11_1 / ASSIGNMENTS</p><h2>Exercises &amp; homework</h2></div><p>Try each example below. The interactive demos are built with React components and props.</p></div>
        <div className="exercise-grid">
          <Exercise number="E1" title="Profile cards with props" description="Pass a name, role, email, and avatar into the same reusable component. The second card uses my profile photo." code={`function ProfileCard({ name, role, email, avatarUrl }) {
  return (
    <article>
      <img src={avatarUrl} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
      <a href={\`mailto:\${email}\`}>{email}</a>
    </article>
  );
}`}>
            <div className="profile-demo-grid">
              <ProfileCard name="Sample Student" role="Computer Science Student" email="student@example.edu"/>
              <ProfileCard name="Aayush Pandey" role="Computer Science Student" email="aayush@example.com" avatarUrl={photoUrl}/>
            </div>
          </Exercise>

          <Exercise number="E2" title="Filter a notification list" description="Render notifications from an array, choose an icon from each type, and filter the visible messages." code={`const iconByType = {
  success: "✓",
  warning: "!",
  info: "i",
};

{notifications.map((item) => (
  <li key={item.id}>
    <span>{iconByType[item.type]}</span>
    {item.message}
  </li>
))}`}>
            <NotificationDemo/>
          </Exercise>

          <Exercise number="E3" title="Reusable content with children" description="Use the children prop to place different content inside the same card wrapper." code={`function ReusableCard({ title, children }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}`}>
            <div className="two-mini-grid">
              <ReusableCard title="Lecture topics"><ul><li>Components</li><li>Props</li><li>JSX</li></ul></ReusableCard>
              <ReusableCard title="This week's work"><p>Build a profile card and a filterable project gallery.</p></ReusableCard>
            </div>
          </Exercise>

          <Exercise number="HW1" title="Student directory" description="Pass five values to a StudentCard component and render each student from an array." code={`function StudentCard({ name, studentId, major, year, gpa }) {
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
))}`}>
            <div className="directory-grid">{studentDirectory.map(item=><StudentCard key={item.studentId} {...item}/>)}</div>
          </Exercise>

          <Exercise number="HW2" title="Technology-filtered project gallery" description="Use a selected technology to filter a collection of project cards." code={`const categories = ["All", ...new Set(
  projects.flatMap((project) => project.tech)
)];

const visibleProjects = active === "All"
  ? projects
  : projects.filter((project) => project.tech.includes(active));`}>
            <ProjectGallery/>
          </Exercise>

          <Exercise number="P1" title="One greeting, different props" description="Give a component a default prop value and reuse it with different names." code={`function Greeting({ name = "World" }) {
  return <p>Hello, {name}!</p>;
}`}>
            <div className="greeting-stack">
              <Greeting/>
              <Greeting name="Aayush"/>
              <Greeting name="Gachon University"/>
            </div>
          </Exercise>

          <Exercise number="P2" title="Product stock status" description="Use a boolean prop to show whether an item is available." code={`function ProductCard({ name, price, rating, inStock }) {
  return (
    <article>
      <h3>{name}</h3>
      <p>{price.toLocaleString()}원</p>
      <p>{rating} / 5</p>
      <p>{inStock ? "In stock" : "Out of stock"}</p>
    </article>
  );
}`}>
            <div className="two-mini-grid">
              <ProductCard name="Wireless Mouse" price={29000} rating={4.6} inStock={true}/>
              <ProductCard name="USB-C Hub" price={45000} rating={4.2} inStock={false}/>
            </div>
          </Exercise>

          <Exercise number="P3" title="Render a list with stable keys" description="Use each record's unique ID as the React key when rendering a list." code={`{students.map((item) => (
  <li key={item.id}>
    {item.name} — {item.grade}
  </li>
))}`}>
            <StudentList students={[{id:"s1",name:"Web Programming",grade:"A"},{id:"s2",name:"Computer Science",grade:"A-"},{id:"s3",name:"Project Practice",grade:"B+"}]}/>
          </Exercise>

          <Exercise number="P4" title="Conditional sign-in interface" description="Switch between signed-out and signed-in content using conditional rendering." code={`const [user, setUser] = useState(null);

{user && <p>Welcome, {user.name}.</p>}
{!user && <p>Please sign in.</p>}

<button onClick={() => setUser(user ? null : { name: "Aayush" })}>
  {user ? "Sign out" : "Sign in"}
</button>`}>
            <ConditionalDemo/>
          </Exercise>
        </div>
      </section>
    </main>
    <footer className="site-footer">
      <a href="../../index.html">← Course archive</a>
      <span>WEEK 11_1 · REACT COMPONENTS &amp; PROPS</span>
      <a href="../../week11_2/index.html">Continue to Week 11_2 →</a>
    </footer>
  </div>;
}
