import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Machine Learning Specialization",
    instructor: "Andrew Ng",
    institution: "Stanford University",
    rating: 4.9,
    reviews: 132540,
    price: 4999,
    originalPrice: 8999,
    category: "Data Science",
    level: "Beginner",
    duration: "3 months",
    enrolled: "4.2M",
    image: "🤖",
    color: "#0056D2",
    badge: "Bestseller",
  },
  {
    id: 2,
    title: "Full-Stack Web Development",
    instructor: "Angela Yu",
    institution: "London App Brewery",
    rating: 4.8,
    reviews: 98320,
    price: 3999,
    originalPrice: 6999,
    category: "Web Dev",
    level: "Intermediate",
    duration: "4 months",
    enrolled: "1.8M",
    image: "💻",
    color: "#00897B",
    badge: "Popular",
  },
  {
    id: 3,
    title: "Python for Everybody",
    instructor: "Charles Severance",
    institution: "University of Michigan",
    rating: 4.8,
    reviews: 245670,
    price: 2999,
    originalPrice: 5999,
    category: "Programming",
    level: "Beginner",
    duration: "2 months",
    enrolled: "6.1M",
    image: "🐍",
    color: "#5E35B1",
    badge: "Top Rated",
  },
  {
    id: 4,
    title: "Google Data Analytics",
    instructor: "Google Career Certificates",
    institution: "Google",
    rating: 4.7,
    reviews: 189450,
    price: 3499,
    originalPrice: 6499,
    category: "Data Science",
    level: "Beginner",
    duration: "6 months",
    enrolled: "2.9M",
    image: "📊",
    color: "#D32F2F",
    badge: "Certificate",
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    instructor: "Michael Wong",
    institution: "California Institute of Arts",
    rating: 4.9,
    reviews: 67800,
    price: 4499,
    originalPrice: 7999,
    category: "Design",
    level: "Beginner",
    duration: "3 months",
    enrolled: "890K",
    image: "🎨",
    color: "#F57C00",
    badge: "New",
  },
  {
    id: 6,
    title: "AWS Cloud Practitioner",
    instructor: "Stephane Maarek",
    institution: "Amazon Web Services",
    rating: 4.8,
    reviews: 112300,
    price: 5499,
    originalPrice: 9999,
    category: "Cloud",
    level: "Intermediate",
    duration: "2 months",
    enrolled: "1.2M",
    image: "☁️",
    color: "#0277BD",
    badge: "Bestseller",
  },
];

const categories = ["All", "Data Science", "Web Dev", "Programming", "Design", "Cloud"];

const stats = [
  { value: "92M+", label: "Learners worldwide" },
  { value: "7,000+", label: "Courses available" },
  { value: "200+", label: "University partners" },
  { value: "97%", label: "Satisfaction rate" },
];

const partners = ["Google", "Meta", "IBM", "Stanford", "MIT", "Microsoft", "Amazon", "Yale"];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [enrolled, setEnrolled] = useState([]);

  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const handleEnroll = (id) => {
    if (!enrolled.includes(id)) {
      setEnrolled((prev) => [...prev, id]);
      setCartCount((c) => c + 1);
    }
  };

  const stars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? "#F9A825" : "#E0E0E0", fontSize: 14 }}>★</span>
    ));
  };

  return (
    <div style={{ fontFamily: "'Söhne', 'Helvetica Neue', Arial, sans-serif", background: "#FAFAFA", minHeight: "100vh", color: "#1A1A2E" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E8E8E8", position: "sticky", top: 0, zIndex: 100, padding: "0 5%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32, height: 64, maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, background: "#0056D2", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>C</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px", color: "#0056D2" }}>coursera</span>
          </div>

          <div style={{ flex: 1, maxWidth: 480, position: "relative" }}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn?"
              style={{
                width: "100%", padding: "10px 16px 10px 42px", border: "1.5px solid #C5C5C5",
                borderRadius: 24, fontSize: 14, outline: "none", background: "#F9F9F9",
                boxSizing: "border-box", transition: "border-color 0.2s"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0056D2")}
              onBlur={(e) => (e.target.style.borderColor = "#C5C5C5")}
            />
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
          </div>

          <div style={{ display: "flex", gap: 24, marginLeft: "auto", alignItems: "center" }}>
            {["Explore", "For Business", "For Campus"].map((item) => (
              <span key={item} style={{ fontSize: 14, color: "#444", cursor: "pointer", fontWeight: 500, whiteSpace: "nowrap" }}
                onMouseEnter={(e) => (e.target.style.color = "#0056D2")}
                onMouseLeave={(e) => (e.target.style.color = "#444")}>
                {item}
              </span>
            ))}
            <div style={{ position: "relative", cursor: "pointer" }}>
              <span style={{ fontSize: 20 }}>🛒</span>
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -8, right: -8, background: "#0056D2",
                  color: "#fff", borderRadius: "50%", width: 18, height: 18,
                  fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700
                }}>{cartCount}</span>
              )}
            </div>
            <button style={{
              background: "#0056D2", color: "#fff", border: "none", padding: "9px 20px",
              borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: "pointer"
            }}>Join Free</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #0056D2 0%, #003A8C 50%, #001D5C 100%)",
        padding: "80px 5%", color: "#fff", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 400, height: 400, background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -80, left: "40%", width: 300, height: 300, background: "rgba(255,255,255,0.03)", borderRadius: "50%" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", padding: "6px 14px", borderRadius: 20, fontSize: 13, marginBottom: 20 }}>
              <span>🎓</span> <span>Learn from the world's best instructors</span>
            </div>
            <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1.5px" }}>
              Learn Without<br />
              <span style={{ color: "#82B4FF" }}>Limits.</span>
            </h1>
            <p style={{ fontSize: 18, opacity: 0.85, lineHeight: 1.6, marginBottom: 36, maxWidth: 460 }}>
              Start, switch, or advance your career with 7,000+ courses from world-class universities and companies.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button style={{
                background: "#fff", color: "#0056D2", border: "none", padding: "14px 32px",
                borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: "pointer", letterSpacing: "-0.2px"
              }}>Start For Free</button>
              <button style={{
                background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)",
                padding: "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: "pointer"
              }}>Browse Courses</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {stats.map((s) => (
              <div key={s.value} style={{
                background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)", borderRadius: 16,
                padding: "28px 24px", textAlign: "center"
              }}>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-1px", marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontSize: 13, opacity: 0.75, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section style={{ background: "#fff", borderBottom: "1px solid #E8E8E8", padding: "24px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "#888", fontWeight: 600, whiteSpace: "nowrap" }}>TRUSTED BY:</span>
          {partners.map((p) => (
            <span key={p} style={{ fontSize: 15, fontWeight: 800, color: "#BDBDBD", letterSpacing: "-0.3px" }}>{p}</span>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section style={{ padding: "60px 5%", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-1px", marginBottom: 8 }}>Most Popular Courses</h2>
            <p style={{ color: "#666", fontSize: 16 }}>Handpicked by our learning experts</p>
          </div>
          <span style={{ color: "#0056D2", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>View all courses →</span>
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "9px 20px", borderRadius: 24, border: "1.5px solid",
                borderColor: activeCategory === cat ? "#0056D2" : "#E0E0E0",
                background: activeCategory === cat ? "#0056D2" : "#fff",
                color: activeCategory === cat ? "#fff" : "#555",
                fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s"
              }}
            >{cat}</button>
          ))}
        </div>

        {/* Course Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {filtered.map((course) => (
            <div
              key={course.id}
              style={{
                background: "#fff", borderRadius: 16, border: "1px solid #EBEBEB",
                overflow: "hidden", transition: "all 0.25s", cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,86,210,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
              }}
            >
              {/* Card Header */}
              <div style={{
                height: 160, background: `${course.color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 72, position: "relative", borderBottom: `3px solid ${course.color}20`
              }}>
                {course.image}
                <div style={{ position: "absolute", top: 12, left: 12 }}>
                  <span style={{
                    background: course.badge === "Bestseller" ? "#FF6F00" : course.badge === "New" ? "#2E7D32" : "#0056D2",
                    color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 4, letterSpacing: "0.5px"
                  }}>{course.badge}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(course.id); }}
                  style={{
                    position: "absolute", top: 10, right: 12, background: "#fff",
                    border: "none", width: 32, height: 32, borderRadius: "50%",
                    cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
                  }}>
                  {wishlist.includes(course.id) ? "❤️" : "🤍"}
                </button>
              </div>

              {/* Card Body */}
              <div style={{ padding: "20px 22px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: course.color, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                    {course.category}
                  </span>
                  <span style={{ fontSize: 11, color: "#AAA" }}>•</span>
                  <span style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>{course.level}</span>
                </div>

                <h3 style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.3, marginBottom: 6, letterSpacing: "-0.3px" }}>
                  {course.title}
                </h3>
                <p style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>{course.instructor}</p>
                <p style={{ fontSize: 12, color: "#AAA", marginBottom: 14 }}>{course.institution}</p>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                  <span style={{ fontWeight: 800, fontSize: 14, color: "#F9A825" }}>{course.rating}</span>
                  <div style={{ display: "flex" }}>{stars(course.rating)}</div>
                  <span style={{ fontSize: 12, color: "#888" }}>({(course.reviews / 1000).toFixed(0)}K)</span>
                </div>

                <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                  {[
                    { icon: "⏱", val: course.duration },
                    { icon: "👥", val: `${course.enrolled} enrolled` },
                  ].map((item) => (
                    <div key={item.val} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 12 }}>{item.icon}</span>
                      <span style={{ fontSize: 12, color: "#777" }}>{item.val}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: 22, fontWeight: 900, color: "#1A1A2E" }}>₹{course.price.toLocaleString()}</span>
                    <span style={{ fontSize: 14, color: "#BDBDBD", textDecoration: "line-through", marginLeft: 8 }}>₹{course.originalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleEnroll(course.id)}
                    style={{
                      background: enrolled.includes(course.id) ? "#2E7D32" : "#0056D2",
                      color: "#fff", border: "none", padding: "10px 20px",
                      borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer",
                      transition: "all 0.2s", whiteSpace: "nowrap"
                    }}
                    onMouseEnter={(e) => !enrolled.includes(course.id) && (e.target.style.background = "#0041A8")}
                    onMouseLeave={(e) => !enrolled.includes(course.id) && (e.target.style.background = "#0056D2")}
                  >
                    {enrolled.includes(course.id) ? "✓ Enrolled" : "Enroll Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#888" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 18, fontWeight: 600 }}>No courses found</p>
            <p style={{ fontSize: 14 }}>Try a different search term or category</p>
          </div>
        )}
      </section>

      {/* BANNER */}
      <section style={{ background: "#0056D2", padding: "70px 5%", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-1px", marginBottom: 16, lineHeight: 1.1 }}>
              Coursera for<br /><span style={{ color: "#82B4FF" }}>Business</span>
            </h2>
            <p style={{ fontSize: 17, opacity: 0.85, lineHeight: 1.6, marginBottom: 32 }}>
              Upskill your entire workforce with access to 7,000+ top courses, certificates, and degree programs.
            </p>
            <button style={{
              background: "#fff", color: "#0056D2", border: "none",
              padding: "14px 32px", borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: "pointer"
            }}>Get Started for Teams</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "📚", title: "7,000+ Courses", desc: "Across every discipline" },
              { icon: "🏆", title: "Industry Certs", desc: "Recognized globally" },
              { icon: "📈", title: "Progress Tracking", desc: "Real-time analytics" },
              { icon: "🌍", title: "25+ Languages", desc: "Learn in your language" },
            ].map((item) => (
              <div key={item.title} style={{
                background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 14, padding: "22px 20px"
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 13, opacity: 0.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1A1A2E", color: "#AAA", padding: "60px 5% 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, background: "#0056D2", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>C</span>
                </div>
                <span style={{ fontWeight: 800, fontSize: 20, color: "#fff" }}>coursera</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
                Build skills for today, tomorrow, and beyond. Education for everyone, everywhere.
              </p>
            </div>
            {[
              { title: "Coursera", links: ["About", "What We Offer", "Leadership", "Careers", "Catalog", "Coursera Plus"] },
              { title: "Community", links: ["Learners", "Partners", "Beta Testers", "Blog", "The Coursera Podcast"] },
              { title: "More", links: ["Press", "Investors", "Terms", "Privacy", "Help", "Accessibility"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: "0.5px" }}>{col.title}</h4>
                {col.links.map((link) => (
                  <div key={link} style={{ fontSize: 13, marginBottom: 10, cursor: "pointer" }}
                    onMouseEnter={(e) => (e.target.style.color = "#fff")}
                    onMouseLeave={(e) => (e.target.style.color = "#AAA")}>{link}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #2A2A3E", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 13 }}>© 2025 Coursera Inc. All rights reserved.</p>
            <div style={{ display: "flex", gap: 16 }}>
              {["🐦", "👔", "📘", "📺"].map((icon, i) => (
                <span key={i} style={{ fontSize: 18, cursor: "pointer" }}>{icon}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
