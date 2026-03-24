import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PyLearn AI — Learn Python, Data Science & AI',
  description: 'Master Python, Data Science, and Artificial Intelligence with AI-powered code review, interactive coding playground, and structured curriculum.',
  keywords: 'Python, Data Science, Machine Learning, AI, Learn Programming, Code Review',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar" id="main-nav">
          <div className="container">
            <a href="/" className="nav-brand">
              <span className="logo-icon">⚡</span>
              <span>PyLearn <span className="text-gradient">AI</span></span>
            </a>
            <ul className="nav-links">
              <li><a href="/" id="nav-home">Home</a></li>
              <li><a href="/courses/" id="nav-courses">Courses</a></li>
              <li><a href="/playground/" id="nav-playground">Playground</a></li>
              <li><a href="/agent/" id="nav-agent">AI Tutor</a></li>
              <li><a href="/login/" className="btn btn-primary btn-sm" id="nav-login">Sign In</a></li>
            </ul>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="container">
            <p>© 2026 PyLearn AI — Built with ❤️ for learners everywhere</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
