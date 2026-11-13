function StudentProfileCard({ name, studentId, major, year, gpa }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="profile-card" aria-label={`${name}'s student profile`}>
      <div className="card-topline">
        <span className="status-dot" aria-hidden="true"></span>
        <span>STUDENT PROFILE</span>
        <span className="card-label">GA CHON UNIVERSITY</span>
      </div>

      <div className="identity">
        <div className="avatar" aria-hidden="true">{initials}</div>
        <div className="identity-copy">
          <p className="identity-label">COMPUTER SCIENCE STUDENT</p>
          <h3>{name}</h3>
          <p className="student-id">STUDENT ID · {studentId}</p>
        </div>
      </div>

      <div className="card-divider"></div>

      <div className="details-grid">
        <div className="detail">
          <span className="detail-label">MAJOR</span>
          <strong>{major}</strong>
        </div>
        <div className="detail">
          <span className="detail-label">YEAR</span>
          <strong>{year}<span className="detail-unit">ND YEAR</span></strong>
        </div>
        <div className="detail gpa-detail">
          <span className="detail-label">CURRENT GPA</span>
          <strong>{gpa}<span className="gpa-scale"> / 4.5</span></strong>
        </div>
      </div>

      <div className="card-bottom">
        <span>ACADEMIC PROFILE</span>
        <span>2026 — 2027</span>
      </div>
    </article>
  );
}

export default StudentProfileCard;