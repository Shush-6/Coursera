import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Machine Learning Specialization",
    instructor: "Andrew Ng",
    institution: "Stanford University",
    rating: 4.9,
    reviews: 142500,
    price: 4199,
    originalPrice: 6999,
    duration: "3 months",
    level: "Intermediate",
    category: "Data Science",
    enrolled: "3.2M",
    badge: "Bestseller",
    color: "#0056D2",
    accent: "#E8F1FF",
    skills: ["Python", "ML", "TensorFlow"],
    image: "🤖",
  },
  {
    id: 2,
    title: "Google UX Design Professional Certificate",
    instructor: "Google Career Certificates",
    institution: "Google",
    rating: 4.8,
    reviews: 98200,
    price: 3499,
    originalPrice: 5999,
    duration: "6 months",
    level: "Beginner",
    category: "Design",
    enrolled: "1.8M",
    badge: "Top Rated",
    color: "#00704A",
    accent: "#E6F7F1",
    skills: ["Figma", "UX Research", "Prototyping"],
    image: "🎨",
  },
  {
    id: 3,
    title: "IBM Data Science Professional",
    instructor: "IBM Skills Network",
    institution: "IBM",
    rating: 4.7,
    reviews: 76400,
    price: 3799,
    originalPrice: 6499,
    duration: "4 months",
    level: "Beginner",
    category: "Data Science",
    enrolled: "980K",
    badge: "New",
    color: "#7B2FBE",
    accent: "#F3EAFF",
    skills: ["SQL", "Python", "Tableau"],
    image: "📊",
  },
  {
    id: 4,
    title: "Full-Stack Web Development",
    instructor: "Meta",
    institution: "Meta",
    rating: 4.8,
    reviews: 54300,
    price: 4499,
    originalPrice: 7499,
    duration: "8 months",
    level: "Beginner",
    category: "Development",
    enrolled: "620K",
    badge: "Bestseller",
    color: "#D93025",
    accent: "#FDECEA",
    skills: ["React", "Node.js", "MongoDB"],
    image: "💻",
  },
  {
    id: 5,
    title: "Digital Marketing Mastery",
    instructor: "Prof. Sarah Chen",
    institution: "University of Illinois",
    rating: 4.6,
    reviews: 43100,
    price: 2999,
    originalPrice: 4999,
    duration: "5 months",
    level: "Intermediate",
    category: "Business",
    enrolled: "430K",
    badge: "Top Rated",
    color: "#F29900",
    accent: "#FFF8E6",
    skills: ["SEO", "Analytics", "Ads"],
    image: "📱",
  },
  {
    id: 6,
    title: "Cloud Architecture with AWS",
    instructor: "Amazon Web Services",
    institution: "AWS",
    rating: 4.9,
    reviews: 61800,
    price: 5299,
    originalPrice: 8999,
    duration: "3 months",
    level: "Advanced",
    category: "Cloud",
    enrolled: "710K",
    badge: "Trending",
    color: "#0097A7",
    accent: "#E0F7FA",
    skills: ["AWS", "DevOps", "Architecture"],
    image: "☁️",
  },
];

const categories = ["All", "Data Science", "Design", "Development", "Business", "Cloud"];

const stats = [
  { value: "124M+", label: "Learners worldwide" },
  { value: "7,000+", label: "Courses available" },
  { value: "200+", label: "University partners" },
  { value: "92%", label: "Job outcome rate" },
];

const partners = ["Google", "IBM", "Meta", "Stanford", "AWS", "Microsoft", "Duke", "Yale"];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= Math.floor(rating) ? "#F59E0B" : "#D1D5DB"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function CourseCard({ course }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background: course.accent,
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontSize: 64,
        }}
      >
        <span role="img" aria-hidden="true">{course.image}</span>
        {course.badge && (
          <span
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background: course.color,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 20,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            {course.badge}
          </span>
        )}
      </div>

      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: course.color, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {course.category}
          </span>
          <span style={{ color: "#D1D5DB", fontSize: 12 }}>•</span>
          <span style={{ fontSize: 11, color: "#6B7280" }}>{course.level}</span>
        </div>

        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.4, margin: "0 0 6px" }}>
          {course.title}
        </h3>
        <p style={{ fontSize: 12, color: "#6B7280", margin: "0 0 10px", fontStyle: "italic" }}>
          {course.instructor} · {course.institution}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {course.skills.map((skill) => (
            <span key={skill} style={{ fontSize: 11, padding: "3px 9px", background: "#F3F4F6", borderRadius: 20, color: "#374151", fontWeight: 500 }}>
              {skill}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <StarRating rating={course.rating} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{course.rating}</span>
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>({(course.reviews / 1000).toFixed(0)}K)</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, color: "#6B7280", fontSize: 12 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={10} /><polyline points="12,6 12,12 16,14" /></svg>
          {course.duration}
          <span style={{ color: "#D1D5DB" }}>·</span>
          {course.enrolled} enrolled
        </div>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>₹{course.price.toLocaleString()}</span>
            <span style={{ fontSize: 13, color: "#9CA3AF", textDecoration: "line-through", marginLeft: 8 }}>₹{course.originalPrice.toLocaleString()}</span>
          </div>
          <button
            style={{
              background: course.color,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "9px 18px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F9FAFB", minHeight: "100vh" }}>

      {/* Navbar */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 64, gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ background: "#0056D2", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#0056D2", letterSpacing: -0.5 }}>coursera</span>
          </div>

          <div style={{ flex: 1, maxWidth: 480, position: "relative" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
              <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 16px 9px 38px",
                border: "1.5px solid #E5E7EB",
                borderRadius: 24,
                fontSize: 14,
                outline: "none",
                background: "#F9FAFB",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            <button style={{ background: "none", border: "none", fontSize: 14, fontWeight: 600, color: "#374151", cursor: "pointer", padding: "8px 12px" }}>Log in</button>
            <button style={{ background: "#0056D2", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Join for Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #0056D2 0%, #003087 100%)",
        padding: "72px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", borderRadius: 24, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: "#fff", fontWeight: 600, letterSpacing: 0.5 }}>🎓 LEARN FROM THE WORLD'S BEST</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, margin: "0 0 20px", letterSpacing: -1 }}>
            Unlock Your Potential<br />
            <span style={{ color: "#7DC4FF" }}>One Course at a Time</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginBottom: 36, lineHeight: 1.6 }}>
            Join 124 million learners. Access world-class courses from top universities and companies.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: "#fff", color: "#0056D2", border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
              Explore Courses
            </button>
            <button style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", borderRadius: 12, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
              Try for Free
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ padding: "28px 16px", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid #E5E7EB" : "none" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#0056D2", marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: "#6B7280" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div style={{ background: "#F3F4F6", padding: "24px", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: 13, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Trusted by leading organizations</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 32 }}>
            {partners.map((p) => (
              <span key={p} style={{ fontSize: 15, fontWeight: 800, color: "#9CA3AF", letterSpacing: -0.3 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Course Section */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#111827", margin: "0 0 6px", letterSpacing: -0.5 }}>Featured Courses</h2>
            <p style={{ fontSize: 15, color: "#6B7280", margin: 0 }}>Handpicked for your growth</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 24,
                  border: "1.5px solid",
                  borderColor: activeCategory === cat ? "#0056D2" : "#E5E7EB",
                  background: activeCategory === cat ? "#0056D2" : "#fff",
                  color: activeCategory === cat ? "#fff" : "#374151",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#9CA3AF" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 18, fontWeight: 600 }}>No courses found</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <div style={{ background: "linear-gradient(135deg, #111827 0%, #1F2937 100%)", padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 20 }}>🚀</div>
          <h2 style={{ fontSize: 34, fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: -0.5 }}>
            Start Learning Today
          </h2>
          <p style={{ fontSize: 17, color: "#9CA3AF", marginBottom: 36, lineHeight: 1.6 }}>
            7-day free trial on all courses. No credit card required. Cancel anytime.
          </p>
          <button style={{ background: "#0056D2", color: "#fff", border: "none", borderRadius: 12, padding: "16px 40px", fontSize: 17, fontWeight: 800, cursor: "pointer" }}>
            Get Started — It's Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#111827", padding: "40px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ background: "#0056D2", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>coursera</span>
            </div>
            <p style={{ fontSize: 13, color: "#6B7280", maxWidth: 240, lineHeight: 1.6 }}>
              Empowering learners worldwide through accessible, affordable education.
            </p>
          </div>
          {[
            { title: "Explore", links: ["Browse Courses", "Degrees", "Certificates", "For Business"] },
            { title: "Community", links: ["Learner Stories", "Blog", "Partners", "Careers"] },
            { title: "Support", links: ["Help Center", "Privacy", "Terms", "Accessibility"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 0.8, margin: "0 0 14px" }}>{col.title}</h4>
              {col.links.map((l) => (
                <div key={l} style={{ fontSize: 13, color: "#6B7280", marginBottom: 10, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1200, margin: "32px auto 0", borderTop: "1px solid #1F2937", paddingTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#4B5563" }}>© 2026 Coursera Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}