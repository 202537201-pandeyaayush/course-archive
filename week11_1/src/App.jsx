import StudentProfileCard from "./StudentProfileCard.jsx";

function App() {
  return (
    <div className="page-shell">
      <nav className="topbar" aria-label="Main navigation">
        <a href="../index.html">← Back to course archive</a>
        <span>WEB PROGRAMMING / WEEK 11</span>
      </nav>

      <main className="content">
        <header className="intro">
          <p className="eyebrow">WEEK 11 · PART 1 · REACT</p>
          <h1>Student <span>Profile.</span></h1>
          <p className="intro-copy">
            A reusable student profile card built with React components and props.
          </p>
        </header>

        <section className="profile-area" aria-labelledby="profile-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">STUDENT DIRECTORY</p>
              <h2 id="profile-heading">My profile</h2>
            </div>
            <span className="section-index">01 / 01</span>
          </div>

          <StudentProfileCard
            name="Aayush Pandey"
            studentId="202537201"
            major="Computer Science"
            year={2}
            gpa="3.61"
          />
        </section>

        <section className="learning-note">
          <span className="note-mark">↗</span>
          <div>
            <h2>Built with reusable components</h2>
            <p>
              The profile card receives the student's name, ID, major, year,
              and GPA through React props. This keeps the card reusable and
              separates its presentation from the page layout.
            </p>
          </div>
        </section>

        <footer>
          <span> Aayush Pandey · 202537201</span>
          <span>Web Programming · Week 11 Part 1</span>
        </footer>
      </main>
    </div>
  );
}

export default App;