'use client';

export default function HomePage() {
  return (
    <main>
      {/* ────── Hero Section ────── */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-badge">✨ AI-Powered Learning Platform</div>
          <h1>
            Master <span className="gradient-text">Python</span>,{' '}
            <span className="gradient-text">Data Science</span> &amp;{' '}
            <span className="gradient-text">AI</span>
          </h1>
          <p>
            Learn with interactive coding, AI tutors that review your code, and a structured
            curriculum — from Python basics to building neural networks.
          </p>
          <div className="hero-actions">
            <a href="/courses/" className="btn btn-primary btn-lg" id="cta-start">
              Start Learning Free →
            </a>
            <a href="/playground/" className="btn btn-secondary btn-lg" id="cta-playground">
              Try Playground
            </a>
          </div>
        </div>
      </section>

      {/* ────── Stats ────── */}
      <section className="container">
        <div className="stats-bar" id="stats">
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Course Modules</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3</div>
            <div className="stat-label">Learning Tracks</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">AI</div>
            <div className="stat-label">Code Review Agents</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Free & Open</div>
          </div>
        </div>
      </section>

      {/* ────── Learning Tracks ────── */}
      <section className="container" id="tracks">
        <div className="section-header">
          <h2>Learning Tracks</h2>
          <p>Structured paths from beginner to advanced, each with hands-on exercises</p>
        </div>
        <div className="courses-grid">
          {/* Python Fundamentals */}
          <a href="/courses/" className="course-card" id="card-python">
            <div className="course-card-header">
              <div className="course-icon python">🐍</div>
              <div>
                <span className="category-badge python_basics">Python Basics</span>
              </div>
            </div>
            <div className="course-card-body">
              <h3>Python Fundamentals</h3>
              <p>Variables, control flow, functions, OOP — everything you need to go from zero to confident Python developer.</p>
              <div className="course-meta">
                <span>📚 4 modules</span>
                <span>⏱️ ~90 min</span>
                <span>🟢 Beginner</span>
              </div>
            </div>
          </a>

          {/* Data Science */}
          <a href="/courses/" className="course-card" id="card-ds">
            <div className="course-card-header">
              <div className="course-icon data-science">📊</div>
              <div>
                <span className="category-badge data_science">Data Science</span>
              </div>
            </div>
            <div className="course-card-body">
              <h3>Data Science with Python</h3>
              <p>NumPy, Pandas, Matplotlib — learn to analyze, visualize, and draw insights from real-world data.</p>
              <div className="course-meta">
                <span>📚 3 modules</span>
                <span>⏱️ ~80 min</span>
                <span>🟡 Intermediate</span>
              </div>
            </div>
          </a>

          {/* AI/ML */}
          <a href="/courses/" className="course-card" id="card-ai">
            <div className="course-card-header">
              <div className="course-icon ai-ml">🤖</div>
              <div>
                <span className="category-badge ai_ml">AI / ML</span>
              </div>
            </div>
            <div className="course-card-body">
              <h3>AI &amp; Machine Learning</h3>
              <p>scikit-learn, PyTorch, Transformers — build ML models and understand the tech behind ChatGPT.</p>
              <div className="course-meta">
                <span>📚 3 modules</span>
                <span>⏱️ ~85 min</span>
                <span>🔴 Advanced</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ────── Features ────── */}
      <section className="container mt-8" id="features">
        <div className="section-header text-center">
          <h2>Why PyLearn AI?</h2>
          <p>Built for learners who want more than just video courses</p>
        </div>
        <div className="features-grid">
          <div className="feature-card" id="feat-playground">
            <div className="feature-icon">💻</div>
            <h4>Interactive Playground</h4>
            <p>Write and run Python code directly in your browser with Pyodide — no installation needed.</p>
          </div>
          <div className="feature-card" id="feat-review">
            <div className="feature-icon">🔍</div>
            <h4>AI Code Review</h4>
            <p>Get instant feedback on your code from AI agents powered by Qwen2.5-Coder and DeepSeek.</p>
          </div>
          <div className="feature-card" id="feat-tutor">
            <div className="feature-icon">🤖</div>
            <h4>AI Tutor</h4>
            <p>Ask questions, get error explanations, and clear doubts — your personal AI teaching assistant.</p>
          </div>
          <div className="feature-card" id="feat-curriculum">
            <div className="feature-icon">📚</div>
            <h4>Structured Curriculum</h4>
            <p>Progress from Python basics through Data Science to AI/ML with hands-on exercises at every step.</p>
          </div>
          <div className="feature-card" id="feat-progress">
            <div className="feature-icon">📈</div>
            <h4>Progress Tracking</h4>
            <p>Track your learning journey with completion status, scores, and personalized dashboards.</p>
          </div>
          <div className="feature-card" id="feat-secure">
            <div className="feature-icon">🔒</div>
            <h4>Secure & Private</h4>
            <p>Your code submissions are AES-256 encrypted. All agent interactions are audit-logged.</p>
          </div>
        </div>
      </section>

      {/* ────── CTA ────── */}
      <section className="container mt-8 mb-8 text-center" id="cta-section">
        <div className="glass-card" style={{ padding: '60px 40px', textAlign: 'center' }}>
          <h2>Ready to start learning?</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '12px auto 32px' }}>
            Join thousands of learners mastering Python, Data Science, and AI with AI-powered guidance.
          </p>
          <a href="/courses/" className="btn btn-primary btn-lg" id="cta-bottom">
            Get Started — It&apos;s Free →
          </a>
        </div>
      </section>
    </main>
  );
}
