export interface Project {
  id: string;
  name: string;
  category: 'AI' | 'WEB' | 'SYSTEMS' | 'EXPERIMENTS';
  shortDescription: string;
  year: string;
  featured: boolean;
  problem: string;
  idea: string;
  architecture: string[];
  implementation: string;
  technologies: string[];
  challenges: string;
  solution: string;
  result: string;
  metrics?: { label: string; value: string }[];
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
  architectureDiagram?: string; // Inline SVG/Mermaid type representation or description
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'AI / ML' | 'Databases' | 'Cloud / DevOps' | 'Tools';
  level: number; // 1-5
  howIUseIt: string;
  relatedProjects: string[]; // Project IDs
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: 'Programming Languages' | 'AI / ML';
  date: string;
  badge: string;
  verificationUrl?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  metric?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "AYUSHMAN SAHOO",
    title: "DEVELOPER",
    subtitle: "I build software, experiment with intelligent systems, and turn difficult problems into things people can actually use.",
    status: "AVAILABLE FOR OPPORTUNITIES",
    location: "India",
    education: "B.Tech in Computer Science Engineering — VIT-AP",
    focus: "Full-Stack Software Engineering + AI / ML",
    mindset: "Curious → Experimental → Practical",
    goal: "Building high-impact software & intelligent systems",
    bioStory: [
      "I don't just write code; I construct complete digital systems from first principles.",
      "My work spans full-stack web applications, agentic AI systems with local & cloud LLMs, and real-time data automation tools.",
      "Whether it's isolating 5G network outages using causal graph reasoning or scraping & deduplicating thousands of event signals across India, I thrive on breaking complex challenges into reliable, high-performance software."
    ],
    socials: {
      github: "https://github.com/Ayushmansahoo098",
      linkedin: "https://linkedin.com/in/ayush-man-sahoo",
      email: "ayushmansahoo098@gmail.com",
      resume: "#"
    }
  },

  profilePanel: {
    NAME: "Ayushman Sahoo",
    ROLE: "Developer",
    FOCUS: "Full-Stack + AI / ML",
    EDUCATION: "B.Tech, Computer Science Engineering — VIT-AP",
    LOCATION: "India",
    STATUS: "Available for Opportunities",
    MINDSET: "Curious → Experimental → Practical",
    GOAL: "Building high-impact software & intelligent systems"
  },

  terminalCommands: {
    whoami: `Ayushman Sahoo
Computer Science Engineering student, VIT-AP
Developer — Full-Stack + AI/ML
Building high-impact software & intelligent systems`,

    skills: `LANGUAGES  :: Python, TypeScript/JavaScript, Java, C, Swift
FRONTEND   :: React.js, Next.js, Tailwind CSS, SwiftUI
BACKEND    :: Node.js, FastAPI, Express
AI / ML    :: LLMs / Agentic AI, LangChain-style workflows, Groq (Llama 3.3 70B), Core ML
DATABASES  :: Firebase, SQLite (GRDB.swift), PostgreSQL
DEVOPS     :: Docker, Vercel, Hugging Face Spaces, Vite, Git`,

    projects: `[1] Telco-Root-cause-analysis — AI 5G Outage Root Cause Analysis (Llama 3.3 70B + Graph Reasoning)
[2] Kairo-Event-Discovery-app — Real-time Event Discovery Aggregator (Next.js + Playwright)
[3] pdf-to-quiz-nlp — Offline NLP System generating Quizzes from PDFs (spaCy + TF-IDF)
[4] SafeRoute — Safety Navigation & Spatial Route Analytics Web App`,

    journey: `2023 :: Mastered core CS fundamentals & algorithms
2024 :: Built full-stack web applications & Python NLP / Computer Vision projects
2025 :: Shipped Telco-Root-cause-analysis (Hugging Face) & Kairo-Event-Discovery-app (Vercel)
2026 :: Building systems tools & earning Oracle Agentic AI certification`,

    contact: `GITHUB   :: github.com/Ayushmansahoo098
LINKEDIN :: linkedin.com/in/ayush-man-sahoo
EMAIL    :: ayushmansahoo098@gmail.com`
  },

  projects: [
    {
      id: "telco-rca",
      name: "Telco-Root-cause-analysis",
      category: "AI",
      year: "2025",
      featured: true,
      shortDescription: "AI-driven root cause analysis platform for 5G network outages using graph reasoning and autonomous fault isolation.",
      problem: "5G telecom outage telemetry is noisy, high-volume, and deeply interconnected. Manual root-cause diagnosis during critical cell tower failures takes hours and leads to significant MTTR delays.",
      idea: "Construct a 4-layer hierarchical 5G knowledge graph with causal graph reasoning and an autonomous Functional Cognitive Loop powered by Llama 3.3 70B via Groq for sub-second fault diagnosis.",
      architecture: [
        "4-Layer Hierarchical 5G Knowledge Graph (up to 1,000 nodes across 4 difficulty tiers)",
        "Functional Cognitive Loop: Trace → Check → Diagnose",
        "Causal Shuffling Engine & Anti-Loop Safeguards",
        "FastAPI Backend + Groq Llama 3.3 70B Inference Engine",
        "React + Vite + Tailwind CSS Interactive Visualizer Dashboard"
      ],
      implementation: "Engineered in Python & FastAPI with Groq API integration for sub-second inference. Developed a custom graph traversal and causal isolation algorithm that runs across 1,000 simulated 5G tower & network node relationships.",
      technologies: ["Python", "FastAPI", "React", "Groq (Llama 3.3 70B)", "Docker", "Vite", "Tailwind CSS"],
      challenges: "Preventing LLM hallucination loops during complex topological cascades and maintaining real-time telemetry rendering without blocking the cognitive reasoning engine.",
      solution: "Implemented a strict 3-phase Functional Cognitive Loop with anti-loop verification hashes, strict JSON output schemas, and state decoupling.",
      result: "Achieved sub-second causal inference with 94%+ fault localization accuracy and dramatic reduction in simulated MTTR.",
      metrics: [
        { label: "Graph Capacity", value: "1,000 Nodes" },
        { label: "Inference Speed", value: "< 800ms" },
        { label: "Graph Tiers", value: "4 Difficulty Levels" },
        { label: "Deployment", value: "Hugging Face" }
      ],
      liveDemoUrl: "https://github.com/Ayushmansahoo098/Telco-Root-cause-analysis",
      sourceCodeUrl: "https://github.com/Ayushmansahoo098/Telco-Root-cause-analysis"
    },
    {
      id: "kairo",
      name: "Kairo-Event-Discovery-app",
      category: "WEB",
      year: "2025",
      featured: true,
      shortDescription: "Real-time intelligent event discovery platform aggregating 500+ tech hackathons and developer events across 50+ cities.",
      problem: "Developer events, hackathons, and conferences are scattered across fragmented platforms (Devfolio, Unstop, HackerEarth, Eventbrite), causing students to miss deadlines and networking opportunities.",
      idea: "Build a single, unified, auto-updating event intelligence platform with automated web scrapers, deduplication algorithms, and a weighted relevance ranking formula.",
      architecture: [
        "Playwright Headless Scraper Network targeting Devfolio, Unstop, HackerEarth & Eventbrite",
        "Fuzzy String Matching & Deduplication Pipeline",
        "Weighted Event Ranking Engine (Relevance, Date, Location, Prize Pool)",
        "Next.js App Router + React + TypeScript Frontend",
        "Firebase Firestore Data Store with automated cron sync"
      ],
      implementation: "Built using Next.js, React, TypeScript, Node.js, and Playwright. Engineered robust scrapers that bypass anti-bot challenges, normalize event data into a clean schema, and serve an ultra-fast search UI.",
      technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Firebase", "Playwright"],
      challenges: "Handling inconsistent DOM structures across major event platforms and preventing duplicate event listings.",
      solution: "Designed a multi-stage normalization pipeline utilizing Jaro-Winkler string distance and domain-specific hash keys to guarantee deduplication efficiency.",
      result: "Successfully indexed over 500+ active events across 50+ cities with real-time ranking and instant multi-city search filters.",
      metrics: [
        { label: "Active Events", value: "500+" },
        { label: "Cities Covered", value: "50+" },
        { label: "Sources", value: "4 Platforms" },
        { label: "Platform", value: "Vercel" }
      ],
      liveDemoUrl: "https://github.com/Ayushmansahoo098/Kairo-Event-Discovery-app",
      sourceCodeUrl: "https://github.com/Ayushmansahoo098/Kairo-Event-Discovery-app"
    },
    {
      id: "pdf-to-quiz",
      name: "pdf-to-quiz-nlp",
      category: "AI",
      year: "2024",
      featured: true,
      shortDescription: "Offline NLP system converting PDF documents into interactive quizzes using TF-IDF text extraction and spaCy entity processing.",
      problem: "Students and educators struggle to quickly extract key concepts and test comprehension from lengthy academic PDF textbooks and research papers.",
      idea: "Develop an offline Python NLP pipeline that parses unstructured PDF text, computes sentence importance scores via TF-IDF, and extracts key entities using spaCy to auto-generate multiple-choice quiz questions.",
      architecture: [
        "PyPDF2 / PDFMiner Document Ingestion & Text Normalization Layer",
        "TF-IDF Sentence Ranking & Keyword Extractor",
        "spaCy Named Entity Recognition (NER) & Part-of-Speech Distractor Generator",
        "Interactive Quiz Engine Interface"
      ],
      implementation: "Built entirely in Python utilizing spaCy, NLTK, and scikit-learn. The system extracts salient sentences, selects key noun phrases as answer targets, and dynamically generates plausible distractors.",
      technologies: ["Python", "spaCy", "NLTK", "scikit-learn", "TF-IDF", "NLP"],
      challenges: "Generating plausible, context-aware distractor choices without using expensive external LLM API calls.",
      solution: "Engineered a semantic distractor generator utilizing word vector similarity and shared hypernym POS matching.",
      result: "Generates 20+ structured quiz questions from a 50-page PDF in under 5 seconds with zero internet connectivity required.",
      metrics: [
        { label: "Generation Speed", value: "< 5 sec / 50pg" },
        { label: "Execution Mode", value: "100% Offline" },
        { label: "NLP Library", value: "spaCy + TF-IDF" }
      ],
      liveDemoUrl: "https://github.com/Ayushmansahoo098/pdf-to-quiz-nlp",
      sourceCodeUrl: "https://github.com/Ayushmansahoo098/pdf-to-quiz-nlp"
    },
    {
      id: "saferoute",
      name: "SafeRoute",
      category: "WEB",
      year: "2024",
      featured: false,
      shortDescription: "Hackathon safety navigation web application calculating safe travel routes based on location intelligence and emergency response mapping.",
      problem: "Standard navigation apps prioritize shortest physical distance without accounting for real-time safety factors like street lighting, incident history, or emergency service proximity.",
      idea: "Create a safe-routing web app that layers spatial risk heatmaps over map navigation APIs to recommend safety-optimized walking and transit routes.",
      architecture: [
        "Leaflet / Mapbox GL JS Spatial Map Rendering",
        "Safety Score Algorithm combining lighting, venue activity, and emergency hubs",
        "Node.js & Express Routing API",
        "React Frontend UI with live route switching"
      ],
      implementation: "Developed during a competitive hackathon. Integrated open map datasets with custom scoring algorithms to calculate dynamic route safety indices.",
      technologies: ["React.js", "Node.js", "Express", "Leaflet", "JavaScript", "CSS3"],
      challenges: "Computing multi-waypoint safety scores along high-resolution geographical paths in real time.",
      solution: "Optimized spatial bounding box queries and cached route segment safety metrics locally.",
      result: "Built a fully functional prototype demoed live at hackathon judging.",
      metrics: [
        { label: "Type", value: "Hackathon Project" },
        { label: "Stack", value: "React + Leaflet" },
        { label: "Focus", value: "Safety Navigation" }
      ],
      liveDemoUrl: "https://github.com/Ayushmansahoo098/SafeRoute",
      sourceCodeUrl: "https://github.com/Ayushmansahoo098/SafeRoute"
    }
  ] as Project[],

  skillsConstellation: [
    // Programming
    { id: "python", name: "Python", category: "Programming", level: 5, howIUseIt: "Core language for AI/ML development, FastAPI services, graph algorithms, and data pipelines.", relatedProjects: ["telco-rca", "pdf-to-quiz"] },
    { id: "typescript", name: "TypeScript / JS", category: "Programming", level: 5, howIUseIt: "Full-stack development across React, Next.js, Node.js, and interactive canvas components.", relatedProjects: ["telco-rca", "kairo"] },
    { id: "java", name: "Java", category: "Programming", level: 4, howIUseIt: "Object-oriented programming, data structures, and academic algorithms implementation.", relatedProjects: [] },
    { id: "c", name: "C", category: "Programming", level: 4, howIUseIt: "Low-level system concepts, memory management, and foundational computer science fundamentals.", relatedProjects: [] },
    { id: "swift", name: "Swift", category: "Programming", level: 4, howIUseIt: "Native mobile & desktop application exploration and Swift API fundamentals.", relatedProjects: [] },

    // Frontend
    { id: "react", name: "React.js", category: "Frontend", level: 5, howIUseIt: "Building dynamic user interfaces, reactive dashboards, state management, and custom hooks.", relatedProjects: ["telco-rca", "kairo", "saferoute"] },
    { id: "next", name: "Next.js", category: "Frontend", level: 4, howIUseIt: "Server-side rendering, App Router architecture, API routes, and SEO-optimized web apps.", relatedProjects: ["kairo"] },
    { id: "tailwind", name: "Tailwind CSS", category: "Frontend", level: 5, howIUseIt: "Designing modern, responsive dark mode design systems with smooth transitions.", relatedProjects: ["telco-rca", "kairo"] },
    { id: "swiftui", name: "SwiftUI", category: "Frontend", level: 4, howIUseIt: "Declarative native UI exploration for mobile and desktop platforms.", relatedProjects: [] },

    // Backend
    { id: "node", name: "Node.js", category: "Backend", level: 4, howIUseIt: "Asynchronous backend microservices, real-time WebSocket servers, and scraper workers.", relatedProjects: ["kairo", "saferoute"] },
    { id: "fastapi", name: "FastAPI", category: "Backend", level: 5, howIUseIt: "High-performance Python APIs for AI inference, graph processing, and telemetry endpoints.", relatedProjects: ["telco-rca"] },
    { id: "express", name: "Express", category: "Backend", level: 4, howIUseIt: "Lightweight REST API backend architecture and route controllers.", relatedProjects: ["saferoute"] },

    // AI / ML
    { id: "llms", name: "LLMs / Agentic AI", category: "AI / ML", level: 5, howIUseIt: "Prompt engineering, structured outputs, multi-agent orchestration, and autonomous cognitive loops.", relatedProjects: ["telco-rca"] },
    { id: "groq", name: "Groq (Llama 3.3 70B)", category: "AI / ML", level: 5, howIUseIt: "Ultra-fast LLM inference acceleration for sub-second causal graph reasoning.", relatedProjects: ["telco-rca"] },
    { id: "nlp", name: "NLP & Text Analytics", category: "AI / ML", level: 4, howIUseIt: "Text processing, spaCy NER, TF-IDF ranking, and keyword extraction.", relatedProjects: ["pdf-to-quiz"] },

    // Databases
    { id: "firebase", name: "Firebase", category: "Databases", level: 4, howIUseIt: "Cloud Firestore real-time databases, authentication, and cloud functions.", relatedProjects: ["kairo"] },
    { id: "sqlite", name: "SQLite", category: "Databases", level: 4, howIUseIt: "Embedded high-performance local database for application state persistence.", relatedProjects: [] },
    { id: "postgres", name: "PostgreSQL", category: "Databases", level: 4, howIUseIt: "Relational database modeling, complex SQL queries, and transactional data integrity.", relatedProjects: [] },

    // Cloud / DevOps
    { id: "vercel", name: "Vercel", category: "Cloud / DevOps", level: 5, howIUseIt: "Instant CI/CD deployment for Next.js and frontend applications.", relatedProjects: ["kairo"] },
    { id: "docker", name: "Docker", category: "Cloud / DevOps", level: 4, howIUseIt: "Containerizing FastAPI backend microservices and deployment environments.", relatedProjects: ["telco-rca"] },
    { id: "huggingface", name: "Hugging Face Spaces", category: "Cloud / DevOps", level: 4, howIUseIt: "Deploying interactive AI application demos and model endpoints.", relatedProjects: ["telco-rca"] },

    // Tools
    { id: "playwright", name: "Playwright", category: "Tools", level: 4, howIUseIt: "Automated headless web scraping, browser automation, and data aggregation pipelines.", relatedProjects: ["kairo"] },
    { id: "vite", name: "Vite", category: "Tools", level: 5, howIUseIt: "Ultra-fast frontend tooling, bundling, and hot module replacement.", relatedProjects: ["telco-rca"] },
    { id: "git", name: "Git / GitHub", category: "Tools", level: 5, howIUseIt: "Version control, feature branching, collaborative workflow, and open-source releases.", relatedProjects: ["telco-rca", "kairo", "pdf-to-quiz", "saferoute"] }
  ] as SkillNode[],

  timeline: [
    {
      year: "2023",
      title: "Foundations & Computer Science Core",
      subtitle: "VIT-AP University",
      description: "Immersed deeply into core computer science fundamentals, data structures, object-oriented design in Java/C, and web development basics.",
      highlights: [
        "Mastered Data Structures & Algorithms fundamentals",
        "Built first dynamic web projects in HTML/CSS/JavaScript",
        "Explored low-level programming in C and Java"
      ],
      technologies: ["C", "Java", "JavaScript", "HTML/CSS"]
    },
    {
      year: "2024",
      title: "Full-Stack Development & Certifications",
      subtitle: "MERN Stack & Programming Excellence",
      description: "Advanced into modern full-stack development with the MERN stack while securing foundational industry certifications across major programming languages.",
      highlights: [
        "Earned HackerRank JavaScript Certification",
        "Achieved CTTC (MSME Affiliated) Certification in Java, Python & C Programming",
        "Engineered full-stack web applications with React and Node.js"
      ],
      technologies: ["React.js", "Node.js", "Python", "Java", "Express", "MongoDB"]
    },
    {
      year: "2025",
      title: "AI / ML Deep Dive & Shipped Projects",
      subtitle: "Telco-RCA & Kairo Release",
      description: "Pivoted heavily into AI/ML engineering, integrating Large Language Models and causal graph reasoning to build and ship production-grade applications.",
      highlights: [
        "Built Telco-RCA: AI 5G Root Cause Analysis with Llama 3.3 70B & 1000-node Knowledge Graph",
        "Shipped Kairo: Real-time Event Aggregator with 500+ indexed events deployed on Vercel",
        "Deployed AI models live on Hugging Face Spaces"
      ],
      technologies: ["Python", "FastAPI", "Groq (Llama 3.3 70B)", "Next.js", "Docker", "Playwright", "Firebase"]
    },
    {
      year: "2026",
      title: "Systems Engineering & Agentic AI Certification",
      subtitle: "Aether & Oracle Certification",
      description: "Pushing the boundaries of systems programming on macOS with Swift/SwiftUI while mastering enterprise Autonomous Agentic AI architecture.",
      highlights: [
        "Earned Oracle Certified Professional Agentic AI Specialist",
        "Engineered Aether: Native macOS AI Workspace Operating Layer in Swift & Core ML",
        "Showcased Robot-as-a-Web-Service real-time dashboard at ECS Expo"
      ],
      technologies: ["Swift", "SwiftUI", "Core ML", "Oracle Agentic AI", "GRDB.swift", "WebSockets"]
    }
  ] as TimelineItem[],

  certificates: [
    {
      id: "agentic-ai-oracle",
      title: "Agentic AI Specialist",
      issuer: "Oracle",
      category: "AI / ML",
      date: "2026",
      badge: "Oracle Certified Professional",
      verificationUrl: "https://oracle.com"
    },
    {
      id: "java-python-c-cttc",
      title: "Java, Python & C Programming",
      issuer: "CTTC (MSME Affiliated)",
      category: "Programming Languages",
      date: "2024",
      badge: "MSME Certified",
      verificationUrl: "https://cttc.gov.in"
    },
    {
      id: "javascript-hackerrank",
      title: "JavaScript (Intermediate)",
      issuer: "HackerRank",
      category: "Programming Languages",
      date: "2024",
      badge: "HackerRank Verified",
      verificationUrl: "https://hackerrank.com"
    }
  ] as Certificate[],

  achievements: [
    {
      id: "ach-1",
      title: "Telco-RCA 1000-Node Graph",
      category: "AI / ML Milestone",
      description: "Engineered 4-layer hierarchical 5G outage reasoning engine with sub-second causal isolation.",
      iconName: "Cpu",
      metric: "1,000 Nodes"
    },
    {
      id: "ach-2",
      title: "Kairo 500+ Active Events",
      category: "Full-Stack Deployment",
      description: "Indexed live developer events across 50+ Indian cities via Playwright scrape network.",
      iconName: "Globe",
      metric: "500+ Events"
    },
    {
      id: "ach-3",
      title: "Hugging Face & Vercel Shipping",
      category: "Live Production",
      description: "Shipped AI models and web platforms live on cloud infrastructure with zero downtime.",
      iconName: "Rocket",
      metric: "Live Apps"
    },
    {
      id: "ach-4",
      title: "Oracle Agentic AI Certified",
      category: "Professional Credential",
      description: "Certified in building autonomous agentic workflows and multi-agent systems.",
      iconName: "Award",
      metric: "Oracle Certified"
    }
  ] as Achievement[],

  currentlyBuilding: {
    projectName: "AETHER",
    progressPercent: 70,
    statusText: "Core macOS APIs integrated, building Core ML behavior classifier",
    exploringTopics: [
      "Autonomous AI Agents",
      "On-device ML (Core ML)",
      "macOS Systems Programming (Swift)",
      "Workspace Analytics & GRDB.swift"
    ]
  },

  githubStats: {
    username: "Ayushmansahoo098",
    publicRepos: 18,
    contributionsThisYear: 480,
    primaryLanguages: ["Python", "TypeScript", "Swift", "JavaScript", "C++"],
    avatarUrl: "https://github.com/Ayushmansahoo098.png"
  },

  beyondCode: [
    {
      id: "motion-design",
      title: "Motion Design",
      description: "Crafting fluid vector motion, dynamic UI transitions, and micro-interactions that make digital software feel alive.",
      tag: "CREATIVE TECH"
    },
    {
      id: "video-editing",
      title: "Video Editing & Visual Storytelling",
      description: "Pacing, timing, and sound design to create compelling visual narratives for tech showcases and product demos.",
      tag: "MEDIA"
    },
    {
      id: "dsa-practice",
      title: "DSA & Problem Solving",
      description: "Consistently sharpening algorithmic intuition, graph theory, dynamic programming, and space/time optimization.",
      tag: "ENGINEERING"
    },
    {
      id: "experimental-ai",
      title: "Experimental AI Workflows",
      description: "Testing open-weights models (Llama 3.3, DeepSeek, Qwen), prompt chaining, and autonomous multi-agent tool loops.",
      tag: "RESEARCH"
    }
  ]
};
