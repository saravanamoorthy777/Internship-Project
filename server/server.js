const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database persistent store (JSON / SQLite bridge)
const DB_FILE = path.join(__dirname, 'db_data.json');

const initialData = {
  students: [
    {
      id: "std_101",
      name: "Aarav Sharma",
      email: "aarav.sharma@iitb.ac.in",
      phone: "+91 98765 43210",
      university: "Indian Institute of Technology (IIT) Bombay",
      major: "B.Tech Computer Science Engineering",
      gradYear: "2026",
      bio: "Passionate full-stack developer with focus on React web apps, UPI payment integrations, and AI-driven REST APIs.",
      skills: ["React.js", "Node.js", "Tailwind CSS", "TypeScript", "Python", "MongoDB", "Express.js"],
      industries: ["Software & SaaS", "Fintech & UPI", "Artificial Intelligence", "Edtech", "E-Commerce"],
      portfolioUrl: "https://aaravsharma.dev",
      githubUrl: "https://github.com/aaravsharma-dev",
      linkedinUrl: "https://linkedin.com/in/aaravsharma-in",
      resumeFileName: "Aarav_Sharma_IITB_Resume.pdf",
      resumeUploadedAt: "2026-08-15"
    }
  ],
  jobs: [
    {
      id: "job_01",
      title: "Software Engineering Intern",
      company: "Flipkart Tech",
      department: "E-Commerce Core",
      location: "Bengaluru, Karnataka (Hybrid)",
      type: "Full-Time",
      stipendType: "Paid",
      stipendAmount: "₹65,000 / month",
      duration: "3 Months (Summer 2026)",
      requirements: ["React.js", "Node.js", "Java / Python", "Data Structures"],
      description: "Join Flipkart high-scale engineering team to build micro-frontend features and payment checkout experiences.",
      status: "Active",
      postedDate: "2026-08-01",
      applicantCount: 28
    },
    {
      id: "job_02",
      title: "Full-Stack Developer Intern",
      company: "Razorpay",
      department: "Fintech Core Platform",
      location: "Bengaluru, Karnataka (Remote)",
      type: "Full-Time",
      stipendType: "Paid",
      stipendAmount: "₹50,000 / month",
      duration: "6 Months",
      requirements: ["Node.js", "React.js", "PostgreSQL", "REST APIs"],
      description: "Build merchant dashboards and instant payout APIs serving millions of Indian businesses.",
      status: "Active",
      postedDate: "2026-08-10",
      applicantCount: 19
    },
    {
      id: "job_03",
      title: "Frontend React Engineer Intern",
      company: "Zomato AI Labs",
      department: "Customer Experience",
      location: "Gurugram, NCR (Onsite)",
      type: "Full-Time",
      stipendType: "Paid",
      stipendAmount: "₹45,000 / month",
      duration: "3 Months",
      requirements: ["React.js", "Tailwind CSS", "Redux", "TypeScript"],
      description: "Develop real-time delivery tracking maps and high-performance mobile-first web components.",
      status: "Active",
      postedDate: "2026-08-12",
      applicantCount: 12
    }
  ],
  applications: [
    {
      id: "app_1",
      jobId: "job_01",
      company: "Flipkart Tech",
      role: "Software Engineering Intern",
      stipend: "₹65,000 / month",
      location: "Bengaluru, Karnataka (Hybrid)",
      appliedDate: "2026-08-02",
      status: "Interviewing",
      interviewDate: "2026-08-23 T11:00:00",
      interviewer: "Rohan Verma (Senior Staff Engineer)",
      matchScore: 95,
      notes: "Passed Machine Coding round. System Architecture interview scheduled."
    },
    {
      id: "app_2",
      jobId: "job_02",
      company: "Razorpay",
      role: "Full-Stack Developer Intern",
      stipend: "₹50,000 / month",
      location: "Bengaluru, Karnataka (Remote)",
      appliedDate: "2026-08-10",
      status: "Offered",
      interviewDate: null,
      interviewer: "Ananya Deshmukh (Engineering Lead)",
      matchScore: 91,
      notes: "Offer letter signed! Stipend: ₹50,000/mo. Joining Sept 1."
    }
  ],
  logbooks: [
    {
      id: "log_1",
      date: "2026-08-18",
      weekNumber: "Week 3",
      hoursLogged: 8,
      title: "Built React Glassmorphism Dashboard & UPI Payment Flow",
      summary: "Created modular UI primitives with React and Tailwind CSS. Integrated responsive navigation tabs, dark theme tokens, and dynamic application status badges.",
      challenges: "Ensuring mobile responsiveness across Android devices and India network conditions.",
      learnings: "Mastered React state hooks and AICTE internship compliance standards.",
      supervisor: "Rohan Verma",
      creditUnits: "4 AICTE Credits (Degree Requirement)",
      status: "Approved"
    }
  ],
  evaluations: [
    {
      id: "eval_1",
      studentId: "std_101",
      studentName: "Aarav Sharma",
      internshipRole: "Software Engineering Intern",
      evaluatorName: "Rohan Verma",
      evaluatorTitle: "Senior Staff Engineer",
      company: "Flipkart Tech",
      evaluationDate: "2026-08-15",
      technicalScore: 5,
      communicationScore: 5,
      punctualityScore: 4,
      teamworkScore: 5,
      overallRating: 4.8,
      feedback: "Aarav performed extraordinarily well! Consistently delivered high-quality React code ahead of deadlines and demonstrated outstanding problem-solving skills.",
      recommendCredit: true
    }
  ]
};

function getDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return initialData;
  }
}

function saveDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// REST Routes

// 0. Auth Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, role, companyName } = req.body;
  res.json({
    success: true,
    user: {
      email,
      role: role || 'student',
      companyName: companyName || (role === 'employer' ? 'TechCorp India' : null)
    },
    message: `Logged in successfully as ${role}`
  });
});

// 1. Student Profile
app.get('/api/student/profile', (req, res) => {
  const db = getDb();
  res.json({ success: true, profile: db.students[0] });
});

app.put('/api/student/profile', (req, res) => {
  const db = getDb();
  db.students[0] = { ...db.students[0], ...req.body };
  saveDb(db);
  res.json({ success: true, profile: db.students[0], message: "Profile updated successfully!" });
});

// 2. Applications (Kanban Board)
app.get('/api/applications', (req, res) => {
  const db = getDb();
  res.json({ success: true, applications: db.applications });
});

app.post('/api/applications', (req, res) => {
  const db = getDb();
  const newApp = {
    id: `app_${Date.now()}`,
    jobId: req.body.jobId || "custom",
    company: req.body.company || "New Company",
    role: req.body.role || "Intern",
    stipend: req.body.stipend || "$30 / hr",
    location: req.body.location || "Remote",
    appliedDate: new Date().toISOString().split('T')[0],
    status: req.body.status || "Applied",
    interviewDate: null,
    interviewer: null,
    matchScore: req.body.matchScore || Math.floor(Math.random() * 20) + 80,
    notes: req.body.notes || ""
  };
  db.applications.unshift(newApp);
  saveDb(db);
  res.json({ success: true, application: newApp });
});

app.patch('/api/applications/:id/status', (req, res) => {
  const db = getDb();
  const appItem = db.applications.find(a => a.id === req.params.id);
  if (!appItem) return res.status(404).json({ success: false, message: "Application not found" });
  
  appItem.status = req.body.status;
  if (req.body.interviewDate) appItem.interviewDate = req.body.interviewDate;
  if (req.body.interviewer) appItem.interviewer = req.body.interviewer;
  
  saveDb(db);
  res.json({ success: true, application: appItem });
});

// 3. Logbook
app.get('/api/logbooks', (req, res) => {
  const db = getDb();
  res.json({ success: true, logbooks: db.logbooks });
});

app.post('/api/logbooks', (req, res) => {
  const db = getDb();
  const newLog = {
    id: `log_${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    weekNumber: req.body.weekNumber || `Week ${db.logbooks.length + 1}`,
    hoursLogged: Number(req.body.hoursLogged) || 8,
    title: req.body.title || "Daily Log Entry",
    summary: req.body.summary || "",
    challenges: req.body.challenges || "",
    learnings: req.body.learnings || "",
    supervisor: req.body.supervisor || "Sarah Jenkins",
    creditUnits: req.body.creditUnits || "3 Units",
    status: "Pending"
  };
  db.logbooks.unshift(newLog);
  saveDb(db);
  res.json({ success: true, logbook: newLog });
});

// 4. Job Listings (Employer Portal)
app.get('/api/jobs', (req, res) => {
  const db = getDb();
  res.json({ success: true, jobs: db.jobs });
});

app.post('/api/jobs', (req, res) => {
  const db = getDb();
  const newJob = {
    id: `job_${Date.now()}`,
    title: req.body.title,
    company: req.body.company || "Nexus Technologies",
    department: req.body.department,
    location: req.body.location,
    type: req.body.type || "Full-Time",
    stipendType: req.body.stipendType || "Paid",
    stipendAmount: req.body.stipendAmount,
    duration: req.body.duration,
    requirements: Array.isArray(req.body.requirements) ? req.body.requirements : req.body.requirements.split(',').map(s => s.trim()),
    description: req.body.description,
    status: "Active",
    postedDate: new Date().toISOString().split('T')[0],
    applicantCount: 0
  };
  db.jobs.unshift(newJob);
  saveDb(db);
  res.json({ success: true, job: newJob });
});

app.put('/api/jobs/:id', (req, res) => {
  const db = getDb();
  const idx = db.jobs.findIndex(j => j.id === req.params.id);
  if (idx !== -1) {
    db.jobs[idx] = { ...db.jobs[idx], ...req.body };
    saveDb(db);
    res.json({ success: true, job: db.jobs[idx] });
  } else {
    res.status(404).json({ success: false, message: "Job not found" });
  }
});

// 5. Evaluations (Employer Portal)
app.get('/api/evaluations', (req, res) => {
  const db = getDb();
  res.json({ success: true, evaluations: db.evaluations });
});

app.post('/api/evaluations', (req, res) => {
  const db = getDb();
  const newEval = {
    id: `eval_${Date.now()}`,
    studentId: req.body.studentId || "std_101",
    studentName: req.body.studentName || "Alex Rivera",
    internshipRole: req.body.internshipRole || "Frontend Engineering Intern",
    evaluatorName: req.body.evaluatorName || "Sarah Jenkins",
    evaluatorTitle: req.body.evaluatorTitle || "Engineering Lead",
    company: req.body.company || "Nexus Technologies",
    evaluationDate: new Date().toISOString().split('T')[0],
    technicalScore: Number(req.body.technicalScore) || 5,
    communicationScore: Number(req.body.communicationScore) || 5,
    punctualityScore: Number(req.body.punctualityScore) || 5,
    teamworkScore: Number(req.body.teamworkScore) || 5,
    overallRating: Number(req.body.overallRating) || 5.0,
    feedback: req.body.feedback || "",
    recommendCredit: Boolean(req.body.recommendCredit)
  };
  db.evaluations.unshift(newEval);
  saveDb(db);
  res.json({ success: true, evaluation: newEval });
});

app.listen(PORT, () => {
  console.log(`🚀 Internship Management API server listening on http://localhost:${PORT}`);
});
