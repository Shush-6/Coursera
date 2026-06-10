import { useState, useEffect } from "react";
import { signupUser } from "./api/auth";
import { signinUser } from "./api/auth";
import { signupAdmin } from "./api/auth";
import { signinAdmin } from "./api/auth";
import { 
  getCourses, 
  purchaseCourse, 
  getPurchasedCourses, 
  getAdminCourses, 
  createCourse, 
  updateCourse 
} from "./api/course";

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

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("User");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      if (role === "Admin") {
        await signupAdmin(email, password, firstName, lastName, "Admin"); // → /admin/signup
      } else {
        await signupUser(email, password, firstName, lastName, "User");  // → /user/signup
      }
      setSuccess("Account created successfully! You can now log in.");
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setRole("User");
      setTimeout(() => {
        setIsSignupOpen(false);
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err.message || "Something went wrong during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isSigninOpen, setIsSigninOpen] = useState(false);
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signinRole, setSigninRole] = useState("User");
  const [signinLoading, setSigninLoading] = useState(false);
  const [signinError, setSigninError] = useState("");

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setSigninError("");
    setSuccess("");

    setSigninLoading(true);
    try {
      let res;
      if (signinRole === "Admin") {
        res = await signinAdmin(signinEmail, signinPassword, "Admin"); // → /admin/signin
      } else {
        res = await signinUser(signinEmail, signinPassword, "User");  // → /user/signin
      }
      setSuccess("Login successful!");
      setSigninEmail("");
      setSigninPassword("");
      setSigninRole("User");
      
      // Update states
      setUser(res.user);
      setLoggedIn(true);

      setTimeout(() => {
        setIsSigninOpen(false);
        setSuccess("");
      }, 1500);
    } catch (err) {
      setSigninError(err.message || "Something went wrong during signin. Please try again.");
    } finally {
      setSigninLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setUser(null);
  };

  // Dashboard States
  const [studentTab, setStudentTab] = useState("explore"); // "explore" or "purchases"
  const [apiCourses, setApiCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [adminCourses, setAdminCourses] = useState([]);
  
  // Dashboard Loading & Error
  const [dashLoading, setDashLoading] = useState(false);
  const [dashError, setDashError] = useState("");
  const [dashSuccess, setDashSuccess] = useState("");

  // Create/Edit Course Forms State
  const [courseForm, setCourseForm] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    firstName: "",
    lastName: ""
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (loggedIn && user) {
      loadDashboardData();
    }
  }, [loggedIn, user]);

  const loadDashboardData = async () => {
    setDashLoading(true);
    setDashError("");
    try {
      if (user.role === "Admin") {
        const data = await getAdminCourses();
        setAdminCourses(data.courses || []);
      } else {
        const all = await getCourses();
        setApiCourses(all.courses || []);
        const pur = await getPurchasedCourses();
        setPurchasedCourses(pur.courses || []);
      }
    } catch (err) {
      setDashError(err.message || "Failed to load dashboard data.");
    } finally {
      setDashLoading(false);
    }
  };

  const handlePurchase = async (courseId) => {
    setDashError("");
    setDashSuccess("");
    try {
      await purchaseCourse(courseId);
      setDashSuccess("Course purchased successfully!");
      // Reload purchased courses
      const pur = await getPurchasedCourses();
      setPurchasedCourses(pur.courses || []);
      // Auto switch to My Purchases tab after a brief delay
      setTimeout(() => {
        setStudentTab("purchases");
        setDashSuccess("");
      }, 1500);
    } catch (err) {
      setDashError(err.message || "Failed to purchase course.");
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setDashError("");
    setDashSuccess("");
    try {
      const payload = {
        title: courseForm.title,
        description: courseForm.description,
        price: parseFloat(courseForm.price),
        firstName: courseForm.firstName || user.firstName,
        lastName: courseForm.lastName || user.lastName
      };
      
      if (isEditMode) {
        payload.courseId = courseForm.id;
        await updateCourse(payload);
        setDashSuccess("Course updated successfully!");
      } else {
        await createCourse(payload);
        setDashSuccess("Course created successfully!");
      }

      // Reset form and reload admin courses
      setCourseForm({ id: "", title: "", description: "", price: "", firstName: "", lastName: "" });
      setIsFormOpen(false);
      const data = await getAdminCourses();
      setAdminCourses(data.courses || []);

      setTimeout(() => {
        setDashSuccess("");
      }, 3000);
    } catch (err) {
      setDashError(err.message || "Failed to submit course.");
    }
  };

  const startEditCourse = (course) => {
    setIsEditMode(true);
    setCourseForm({
      id: course._id,
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      firstName: course.firstName || user.firstName,
      lastName: course.lastName || user.lastName
    });
    setIsFormOpen(true);
  };

  const startCreateCourse = () => {
    setIsEditMode(false);
    setCourseForm({
      id: "",
      title: "",
      description: "",
      price: "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || ""
    });
    setIsFormOpen(true);
  };
  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (loggedIn) {
    const isStudent = user?.role === "User" || user?.role === "Student";
    
    return (
      <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F3F4F6", minHeight: "100vh" }}>
        {/* Navigation Bar */}
        <nav style={{ background: "#ffffff", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 70, justifyContent: "space-between" }}>
            
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ background: "#0056D2", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#0056D2", letterSpacing: -0.5 }}>coursera</span>
              <span style={{
                background: isStudent ? "#EEF2F6" : "#FEF2F2",
                color: isStudent ? "#0056D2" : "#DC2626",
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 6,
                letterSpacing: 0.5,
                textTransform: "uppercase"
              }}>
                {isStudent ? "Student Portal" : "Admin Console"}
              </span>
            </div>

            {/* Navigation Tabs (Student Only) */}
            {isStudent && (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setStudentTab("explore")}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "none",
                    background: studentTab === "explore" ? "#E8F1FF" : "transparent",
                    color: studentTab === "explore" ? "#0056D2" : "#4B5563",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  Explore Courses
                </button>
                <button
                  onClick={() => setStudentTab("purchases")}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "none",
                    background: studentTab === "purchases" ? "#E8F1FF" : "transparent",
                    color: studentTab === "purchases" ? "#0056D2" : "#4B5563",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  My Purchases ({purchasedCourses.length})
                </button>
              </div>
            )}

            {/* Profile & Logout */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1F2937" }}>
                  {user?.firstName} {user?.lastName}
                </div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>{user?.email}</div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: "#F3F4F6",
                  color: "#374151",
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#E5E7EB"; e.currentTarget.style.color = "#111827"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#F3F4F6"; e.currentTarget.style.color = "#374151"; }}
              >
                Log Out
              </button>
            </div>
            
          </div>
        </nav>

        {/* Success/Error Toasts */}
        <div style={{ maxWidth: 1200, margin: "16px auto 0", padding: "0 24px" }}>
          {dashError && (
            <div style={{ background: "#FEF2F2", borderLeft: "4px solid #EF4444", color: "#991B1B", padding: "12px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {dashError}
            </div>
          )}
          {dashSuccess && (
            <div style={{ background: "#ECFDF5", borderLeft: "4px solid #10B981", color: "#065F46", padding: "12px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              {dashSuccess}
            </div>
          )}
        </div>

        {/* Dashboard Content */}
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 48px" }}>
          {dashLoading ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ border: "4px solid #f3f3f3", borderTop: "4px solid #0056D2", borderRadius: "50%", width: 40, height: 40, animation: "spin 1s linear infinite", margin: "0 auto 16px" }}></div>
              <p style={{ color: "#6B7280", fontWeight: 600 }}>Loading dashboard data...</p>
            </div>
          ) : isStudent ? (
            /* ==================== STUDENT DASHBOARD ==================== */
            <div>
              {/* Welcome Banner */}
              <div style={{ background: "linear-gradient(135deg, #0056D2 0%, #003087 100%)", borderRadius: 20, padding: "40px 32px", color: "#ffffff", marginBottom: 32, boxShadow: "0 10px 25px rgba(0, 86, 210, 0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
                <div>
                  <h1 style={{ fontSize: 32, fontWeight: 900, margin: "0 0 8px", letterSpacing: -0.5 }}>Welcome Back, {user?.firstName}! 👋</h1>
                  <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", margin: 0 }}>Ready to acquire your next skill? Keep up the learning momentum!</p>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px 20px", textAlign: "center", minWidth: 120, backdropFilter: "blur(4px)" }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>{purchasedCourses.length}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", fontWeight: 700, marginTop: 4 }}>Purchased</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px 20px", textAlign: "center", minWidth: 120, backdropFilter: "blur(4px)" }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#7DC4FF" }}>78%</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", fontWeight: 700, marginTop: 4 }}>Avg Progress</div>
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              {studentTab === "explore" ? (
                /* Explore Available Courses */
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 6px" }}>Explore Available Courses</h2>
                    <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>Expand your horizons with top-tier materials</p>
                  </div>

                  {apiCourses.length === 0 ? (
                    <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E5E7EB", padding: "64px 32px", textAlign: "center" }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1F2937", margin: "0 0 6px" }}>No Courses Found</h3>
                      <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>There are no courses loaded in the catalog yet.</p>
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
                      {apiCourses.map((c) => {
                        const isEnrolled = purchasedCourses.some((p) => p._id === c._id);
                        return (
                          <div key={c._id} style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E5E7EB", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 5px rgba(0,0,0,0.03)", transition: "transform 0.2s, box-shadow 0.2s" }} className="hover-card">
                            <div style={{ background: "#E8F1FF", height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
                              🎓
                            </div>
                            <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                              <div style={{ display: "flex", gap: 6, marginBottom: 8, fontSize: 11, fontWeight: 600, color: "#0056D2", textTransform: "uppercase" }}>
                                <span>Core Tech</span>
                              </div>
                              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 8px", lineHeight: 1.4 }}>{c.title}</h3>
                              <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 12px", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.description}</p>
                              <div style={{ fontSize: 12, color: "#4B5563", marginBottom: 16, fontStyle: "italic" }}>
                                By {c.firstName} {c.lastName}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", borderTop: "1px solid #F3F4F6", paddingTop: 14 }}>
                                <span style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>₹{c.price.toLocaleString()}</span>
                                <button
                                  disabled={isEnrolled}
                                  onClick={() => handlePurchase(c._id)}
                                  style={{
                                    background: isEnrolled ? "#10B981" : "#0056D2",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: 8,
                                    padding: "8px 16px",
                                    fontSize: 13,
                                    fontWeight: 700,
                                    cursor: isEnrolled ? "default" : "pointer",
                                    transition: "background 0.2s"
                                  }}
                                >
                                  {isEnrolled ? "✓ Enrolled" : "Enroll Now"}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                /* My Purchased Courses */
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 6px" }}>My Enrolled Courses</h2>
                    <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>Resume your learning journeys and check progress</p>
                  </div>

                  {purchasedCourses.length === 0 ? (
                    <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E5E7EB", padding: "64px 32px", textAlign: "center" }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1F2937", margin: "0 0 6px" }}>No Enrolled Courses</h3>
                      <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>You have not enrolled in any courses yet.</p>
                      <button
                        onClick={() => setStudentTab("explore")}
                        style={{ background: "#0056D2", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
                      >
                        Explore Catalog
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
                      {purchasedCourses.map((c) => {
                        // Generate a deterministic progress percentage
                        const progress = (c.title.length * 7) % 61 + 30; // Between 30% and 90%
                        return (
                          <div key={c._id} style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E5E7EB", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 5px rgba(0,0,0,0.03)" }}>
                            <div style={{ background: "#E8F1FF", height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, position: "relative" }}>
                              📚
                              <span style={{ position: "absolute", bottom: 10, right: 10, background: "#0056D2", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>Active</span>
                            </div>
                            <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>{c.title}</h3>
                              <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 16px", fontStyle: "italic" }}>
                                By {c.firstName} {c.lastName}
                              </p>
                              
                              {/* Progress bar */}
                              <div style={{ marginBottom: 20 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, fontWeight: 600, color: "#4B5563", marginBottom: 6 }}>
                                  <span>Progress</span>
                                  <span>{progress}%</span>
                                </div>
                                <div style={{ height: 6, background: "#E5E7EB", borderRadius: 3, overflow: "hidden" }}>
                                  <div style={{ width: `${progress}%`, height: "100%", background: "#0056D2", borderRadius: 3 }}></div>
                                </div>
                              </div>

                              <button
                                style={{
                                  background: "#ffffff",
                                  color: "#0056D2",
                                  border: "1.5px solid #0056D2",
                                  borderRadius: 8,
                                  padding: "9px",
                                  fontSize: 13,
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  transition: "all 0.2s",
                                  textAlign: "center"
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "#E8F1FF"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; }}
                              >
                                Resume Learning
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* ==================== ADMIN DASHBOARD ==================== */
            <div>
              {/* Admin Hero Header */}
              <div style={{ background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)", borderRadius: 20, padding: "40px 32px", color: "#ffffff", marginBottom: 32, boxShadow: "0 10px 25px rgba(17, 24, 39, 0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
                <div>
                  <h1 style={{ fontSize: 32, fontWeight: 900, margin: "0 0 8px", letterSpacing: -0.5 }}>Instructor Console 🛠️</h1>
                  <p style={{ fontSize: 16, color: "#9CA3AF", margin: 0 }}>Create, monitor, and configure your courses from one location.</p>
                </div>
                <button
                  onClick={startCreateCourse}
                  style={{
                    background: "#0056D2",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 12,
                    padding: "14px 28px",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0, 86, 210, 0.3)",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#0041a3"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#0056D2"; }}
                >
                  + Create New Course
                </button>
              </div>

              {/* Admin Metrics Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 32 }}>
                <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E5E7EB", padding: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Total Courses</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#111827" }}>{adminCourses.length}</div>
                </div>
                <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E5E7EB", padding: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Student Enrollees</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#10B981" }}>{(adminCourses.length * 14) || 0}</div>
                </div>
                <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E5E7EB", padding: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Estimated Revenue</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#3B82F6" }}>
                    ₹{(adminCourses.reduce((sum, c) => sum + c.price, 0) * 14).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* My Created Courses List */}
              <div>
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 6px" }}>Created Courses Manager</h2>
                  <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>View, edit, and update the specifications of courses you created</p>
                </div>

                {adminCourses.length === 0 ? (
                  <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E5E7EB", padding: "64px 32px", textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🎨</div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1F2937", margin: "0 0 6px" }}>No Created Courses</h3>
                    <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>You have not created any courses in this account yet.</p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
                    {adminCourses.map((c) => (
                      <div key={c._id} style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E5E7EB", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                        <div style={{ background: "#F3F4F6", borderBottom: "1px solid #E5E7EB", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 11, fontWeight: 700, background: "#E5E7EB", color: "#374151", padding: "2px 8px", borderRadius: 6, textTransform: "uppercase" }}>ID: {c._id.slice(-6)}</span>
                          <span style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>₹{c.price.toLocaleString()}</span>
                        </div>
                        <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>{c.title}</h3>
                          <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 16px", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.description}</p>
                          <div style={{ fontSize: 12, color: "#4B5563", marginBottom: 18 }}>
                            Instructor: <strong>{c.firstName} {c.lastName}</strong>
                          </div>
                          <button
                            onClick={() => startEditCourse(c)}
                            style={{
                              background: "#F3F4F6",
                              color: "#1F2937",
                              border: "1px solid #D1D5DB",
                              borderRadius: 8,
                              padding: "10px",
                              fontSize: 13,
                              fontWeight: 700,
                              cursor: "pointer",
                              transition: "all 0.2s",
                              textAlign: "center"
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#E5E7EB"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "#F3F4F6"; }}
                          >
                            📝 Edit Course
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Create / Edit Course Modal */}
        {isFormOpen && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(17, 24, 39, 0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "40px 32px", width: "100%", maxWidth: 520, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", position: "relative" }}>
              <button
                onClick={() => setIsFormOpen(false)}
                style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9CA3AF", display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", transition: "background 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
              >
                ✕
              </button>
              
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: "#111827", margin: "0 0 6px" }}>
                  {isEditMode ? "Edit Course Specifications" : "Create a New Course"}
                </h2>
                <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>Configure Course information for student publication</p>
              </div>

              <form onSubmit={handleCourseSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Advanced JavaScript Patterns"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Course Description</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Provide a comprehensive summary of syllabus, requirements, and outcomes..."
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                </div>

                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Price (INR)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g., 2999"
                      value={courseForm.price}
                      onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Instructor First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={courseForm.firstName}
                      onChange={(e) => setCourseForm({ ...courseForm, firstName: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Instructor Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Smith"
                      value={courseForm.lastName}
                      onChange={(e) => setCourseForm({ ...courseForm, lastName: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    background: "#0056D2",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "14px",
                    fontSize: 15,
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0, 86, 210, 0.24)",
                    marginTop: 8
                  }}
                >
                  {isEditMode ? "Save Changes" : "Publish Course"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
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
            <button onClick={() => setIsSigninOpen(true)} style={{ background: "none", border: "none", fontSize: 14, fontWeight: 600, color: "#374151", cursor: "pointer", padding: "8px 12px" }}>Log in</button>
            <button 
              onClick={() => setIsSignupOpen(true)}
              style={{ background: "#0056D2", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
            >
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
            <button 
              onClick={() => setIsSignupOpen(true)}
              style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", borderRadius: 12, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}
            >
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
          <button 
            onClick={() => setIsSignupOpen(true)}
            style={{ background: "#0056D2", color: "#fff", border: "none", borderRadius: 12, padding: "16px 40px", fontSize: 17, fontWeight: 800, cursor: "pointer" }}
          >
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

      {/* Signup Modal */}
      {isSignupOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(17, 24, 39, 0.6)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20,
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: 20,
            padding: "40px 32px",
            width: "100%",
            maxWidth: 460,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            position: "relative",
          }}>
            <button 
              onClick={() => {
                setIsSignupOpen(false);
                setError("");
                setSuccess("");
              }}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "none",
                border: "none",
                fontSize: 22,
                cursor: "pointer",
                color: "#9CA3AF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "50%",
                transition: "background 0.2s, color 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F4F6"; e.currentTarget.style.color = "#1F2937"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#9CA3AF"; }}
            >
              ✕
            </button>
            
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ display: "inline-flex", background: "#E8F1FF", borderRadius: 12, width: 48, height: 48, alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0056D2" strokeWidth={2.5}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#111827", margin: "0 0 6px", letterSpacing: -0.5 }}>Create Your Account</h2>
              <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>Start learning from top institutions today</p>
            </div>

            {error && (
              <div style={{ 
                background: "#FEF2F2", 
                borderLeft: "4px solid #EF4444",
                color: "#991B1B", 
                padding: "12px 16px", 
                borderRadius: 8, 
                fontSize: 13, 
                marginBottom: 20,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            {success && (
              <div style={{ 
                background: "#ECFDF5", 
                borderLeft: "4px solid #10B981",
                color: "#065F46", 
                padding: "12px 16px", 
                borderRadius: 8, 
                fontSize: 13, 
                marginBottom: 20,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                {success}
              </div>
            )}

            <form onSubmit={handleSignupSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>First Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1.5px solid #E5E7EB",
                      borderRadius: 10,
                      fontSize: 14,
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#0056D2"}
                    onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Last Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1.5px solid #E5E7EB",
                      borderRadius: 10,
                      fontSize: 14,
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#0056D2"}
                    onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 10,
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#0056D2"}
                  onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 10,
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#0056D2"}
                  onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                />
              </div>
                 <div>
  <label
    style={{
      display: "block",
      fontSize: 12,
      fontWeight: 700,
      color: "#4B5563",
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }}
  >
    Login As
  </label>

  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    style={{
      width: "100%",
      padding: "12px 16px",
      border: "1.5px solid #E5E7EB",
      borderRadius: 10,
      fontSize: 14,
      outline: "none",
      boxSizing: "border-box",
      background: "#fff",
      transition: "border-color 0.2s"
    }}
    onFocus={(e) => e.target.style.borderColor = "#0056D2"}
    onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
  >
    <option value="User">User</option>
    <option value="Admin">Admin</option>
  </select>
</div>
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  width: "100%",
                  background: "#0056D2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.8 : 1,
                  transition: "background 0.2s",
                  boxShadow: "0 4px 12px rgba(0, 86, 210, 0.24)",
                  marginTop: 8
                }}
                onMouseEnter={(e) => { if(!loading) e.currentTarget.style.background = "#0041a3"; }}
                onMouseLeave={(e) => { if(!loading) e.currentTarget.style.background = "#0056D2"; }}
              >
                {loading ? "Creating Account..." : "Join for Free"}
              </button>
            </form>
          </div>
        </div>
      )}
       {/* Signin Modal */}
      {isSigninOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(17, 24, 39, 0.6)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20,
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: 20,
            padding: "40px 32px",
            width: "100%",
            maxWidth: 460,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            position: "relative",
          }}>
            <button 
              onClick={() => {
                setIsSigninOpen(false);
                setError("");
                setSuccess("");
              }}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "none",
                border: "none",
                fontSize: 22,
                cursor: "pointer",
                color: "#9CA3AF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "50%",
                transition: "background 0.2s, color 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F4F6"; e.currentTarget.style.color = "#1F2937"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#9CA3AF"; }}
            >
              ✕
            </button>
            
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ display: "inline-flex", background: "#E8F1FF", borderRadius: 12, width: 48, height: 48, alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0056D2" strokeWidth={2.5}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#111827", margin: "0 0 6px", letterSpacing: -0.5 }}>Log In to Your Account</h2>
              <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>Start learning from top institutions today</p>
            </div>

            {error && (
              <div style={{ 
                background: "#FEF2F2", 
                borderLeft: "4px solid #EF4444",
                color: "#991B1B", 
                padding: "12px 16px", 
                borderRadius: 8, 
                fontSize: 13, 
                marginBottom: 20,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            {success && (
              <div style={{ 
                background: "#ECFDF5", 
                borderLeft: "4px solid #10B981",
                color: "#065F46", 
                padding: "12px 16px", 
                borderRadius: 8, 
                fontSize: 13, 
                marginBottom: 20,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                {success}
              </div>
            )}

            <form onSubmit={handleSigninSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john.doe@example.com"
                  value={signinEmail}
                  onChange={(e) => setSigninEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 10,
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#0056D2"}
                  onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="At least 6 characters"
                  value={ signinPassword}
                  onChange={(e) => setSigninPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 10,
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#0056D2"}
                  onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                />
              </div>
<div>
  <label
    style={{
      display: "block",
      fontSize: 12,
      fontWeight: 700,
      color: "#4B5563",
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }}
  >
    Login As
  </label>

  <select
    value={signinRole}
    onChange={(e) => setSigninRole(e.target.value)}
    style={{
      width: "100%",
      padding: "12px 16px",
      border: "1.5px solid #E5E7EB",
      borderRadius: 10,
      fontSize: 14,
      outline: "none",
      boxSizing: "border-box",
      background: "#fff",
      transition: "border-color 0.2s"
    }}
    onFocus={(e) => e.target.style.borderColor = "#0056D2"}
    onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
  >
    <option value="User">User</option>
    <option value="Admin">Admin</option>
  </select>
</div>
              <button 
                type="submit" 
                disabled={signinLoading}
                style={{
                  width: "100%",
                  background: "#0056D2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: signinLoading ? "not-allowed" : "pointer",
                  opacity: signinLoading ? 0.8 : 1,
                  transition: "background 0.2s",
                  boxShadow: "0 4px 12px rgba(0, 86, 210, 0.24)",
                  marginTop: 8
                }}
                onMouseEnter={(e) => { if(!signinLoading) e.currentTarget.style.background = "#0041a3"; }}
                onMouseLeave={(e) => { if(!signinLoading) e.currentTarget.style.background = "#0056D2"; }}
              >
                {signinLoading ? "Logging In..." : "Log In"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}