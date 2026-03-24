'use client';

import { useState, useEffect } from 'react';

interface CourseModule {
  id: number;
  title: string;
  slug: string;
  content_md: string;
  code_template: string;
  expected_output: string;
  order_index: number;
  difficulty: string;
  estimated_minutes: number;
}

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  modules: CourseModule[];
}

// Embedded curriculum data (for static export / GitHub Pages)
const COURSES: Course[] = [
  {
    id: 1, title: "Python Fundamentals", slug: "python-fundamentals",
    description: "Master Python from scratch — variables, loops, functions, OOP, and more.",
    category: "python_basics", icon: "🐍",
    modules: [
      { id: 1, title: "Hello World & Variables", slug: "hello-world-variables", difficulty: "beginner", estimated_minutes: 15, order_index: 1,
        content_md: "# Hello World & Variables\n\n## Welcome to Python! 🎉\n\nPython is one of the most popular programming languages. Let's start!\n\n### Print Statement\n```python\nprint(\"Hello, World!\")\n```\n\n### Variables\n```python\nname = \"Alice\"\nage = 25\nheight = 5.6\nis_student = True\n```\n\n### F-Strings\n```python\nprint(f\"My name is {name} and I'm {age} years old.\")\n```\n\n## 🏋️ Exercise\nCreate variables for your name, age, and favorite language. Print using f-strings.",
        code_template: "# Create your variables\nname = \"\"\nage = 0\nfavorite_lang = \"\"\n\n# Print with f-string\nprint(f\"Hi, I'm {name}!\")\n",
        expected_output: "Hi, I'm" },
      { id: 2, title: "Control Flow — if/else & Loops", slug: "control-flow", difficulty: "beginner", estimated_minutes: 20, order_index: 2,
        content_md: "# Control Flow\n\n## Conditional Statements\n```python\ntemp = 30\nif temp > 35:\n    print(\"Very hot!\")\nelif temp > 25:\n    print(\"Warm.\")\nelse:\n    print(\"Cool.\")\n```\n\n## For Loops\n```python\nfor fruit in [\"apple\", \"banana\"]:\n    print(f\"I like {fruit}\")\n```\n\n## 🏋️ Exercise\nWrite FizzBuzz for numbers 1-20.",
        code_template: "# FizzBuzz Challenge\nfor i in range(1, 21):\n    if i % 15 == 0:\n        print(\"FizzBuzz\")\n    elif i % 3 == 0:\n        print(\"Fizz\")\n    elif i % 5 == 0:\n        print(\"Buzz\")\n    else:\n        print(i)\n",
        expected_output: "FizzBuzz" },
      { id: 3, title: "Functions & Modules", slug: "functions-modules", difficulty: "beginner", estimated_minutes: 25, order_index: 3,
        content_md: "# Functions & Modules\n\n## Defining Functions\n```python\ndef greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"\n```\n\n## Lambda Functions\n```python\nsquare = lambda x: x ** 2\n```\n\n## 🏋️ Exercise\nWrite `is_palindrome(text)` that returns True if text reads same forwards & backwards.",
        code_template: "def is_palindrome(text):\n    text = text.lower().replace(\" \", \"\")\n    return text == text[::-1]\n\nprint(is_palindrome(\"racecar\"))  # True\nprint(is_palindrome(\"hello\"))    # False\n",
        expected_output: "True" },
      { id: 4, title: "Object-Oriented Programming", slug: "oop-basics", difficulty: "intermediate", estimated_minutes: 30, order_index: 4,
        content_md: "# Object-Oriented Programming\n\n## Classes\n```python\nclass Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n    def bark(self):\n        return f\"{self.name} says Woof!\"\n```\n\n## 🏋️ Exercise\nCreate a BankAccount class with deposit(), withdraw(), get_balance().",
        code_template: "class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n    \n    def deposit(self, amount):\n        self.balance += amount\n    \n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n    \n    def get_balance(self):\n        return self.balance\n\naccount = BankAccount(\"Alice\", 100)\naccount.deposit(50)\naccount.withdraw(30)\nprint(account.get_balance())  # 120\n",
        expected_output: "120" },
    ]
  },
  {
    id: 2, title: "Data Science with Python", slug: "data-science-python",
    description: "Learn NumPy, Pandas, Matplotlib, and real-world data analysis techniques.",
    category: "data_science", icon: "📊",
    modules: [
      { id: 5, title: "NumPy Foundations", slug: "numpy-foundations", difficulty: "intermediate", estimated_minutes: 25, order_index: 1,
        content_md: "# NumPy Foundations\n\n## What is NumPy?\nThe fundamental package for numerical computing.\n\n```python\nimport numpy as np\narr = np.array([1, 2, 3, 4, 5])\nprint(arr * 2)  # [2, 4, 6, 8, 10]\nprint(arr.mean())  # 3.0\n```\n\n## 🏋️ Exercise\nCreate a 5x5 identity matrix and multiply by random matrix.",
        code_template: "import numpy as np\n\nidentity = np.eye(5)\nrandom_matrix = np.random.rand(5, 5)\nresult = identity @ random_matrix\nprint(np.allclose(result, random_matrix))\n",
        expected_output: "True" },
      { id: 6, title: "Pandas for Data Analysis", slug: "pandas-data-analysis", difficulty: "intermediate", estimated_minutes: 30, order_index: 2,
        content_md: "# Pandas for Data Analysis\n\n## DataFrames\n```python\nimport pandas as pd\ndf = pd.DataFrame({'Name': ['Alice', 'Bob'], 'Age': [25, 30]})\n```\n\n## 🏋️ Exercise\nCreate a student DataFrame and calculate averages.",
        code_template: "import pandas as pd\n\nstudents = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie'],\n    'Math': [85, 92, 78],\n    'Science': [90, 85, 82]\n})\nstudents['Average'] = (students['Math'] + students['Science']) / 2\nprint(students)\n",
        expected_output: "Average" },
      { id: 7, title: "Data Visualization", slug: "matplotlib-visualization", difficulty: "intermediate", estimated_minutes: 25, order_index: 3,
        content_md: "# Data Visualization\n\n## Matplotlib Basics\n```python\nimport matplotlib.pyplot as plt\nimport numpy as np\nx = np.linspace(0, 10, 100)\nplt.plot(x, np.sin(x))\n```\n\n## Chart Types\n- `plt.bar()`, `plt.scatter()`, `plt.hist()`, `plt.pie()`",
        code_template: "# Data Visualization\nmonths = ['Jan', 'Feb', 'Mar', 'Apr']\nvalues = [10, 25, 15, 30]\nprint('Chart data ready:', months, values)\n",
        expected_output: "Chart data ready" },
    ]
  },
  {
    id: 3, title: "AI & Machine Learning", slug: "ai-machine-learning",
    description: "Build ML models with scikit-learn, understand neural networks with PyTorch.",
    category: "ai_ml", icon: "🤖",
    modules: [
      { id: 8, title: "Introduction to ML", slug: "intro-ml", difficulty: "intermediate", estimated_minutes: 20, order_index: 1,
        content_md: "# Introduction to Machine Learning\n\n## Types of ML\n1. **Supervised** — labeled data\n2. **Unsupervised** — no labels\n3. **Reinforcement** — rewards\n\n## scikit-learn Example\n```python\nfrom sklearn.datasets import load_iris\nfrom sklearn.ensemble import RandomForestClassifier\n```",
        code_template: "# Machine Learning intro\nprint('ML model trained!')\n",
        expected_output: "ML model trained!" },
      { id: 9, title: "Neural Networks with PyTorch", slug: "neural-networks-pytorch", difficulty: "advanced", estimated_minutes: 35, order_index: 2,
        content_md: "# Neural Networks with PyTorch\n\n## Tensors\n```python\nimport torch\nx = torch.tensor([1.0, 2.0, 3.0])\n```\n\n## Building a Network\n```python\nclass SimpleNet(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.layers = nn.Sequential(\n            nn.Linear(784, 128),\n            nn.ReLU(),\n            nn.Linear(128, 10)\n        )\n```",
        code_template: "# Neural Network\nprint('Neural network created!')\n",
        expected_output: "Neural network created!" },
      { id: 10, title: "LLMs & Transformers", slug: "llms-transformers", difficulty: "advanced", estimated_minutes: 30, order_index: 3,
        content_md: "# Large Language Models & Transformers\n\n## Self-Attention\nTransformers process all tokens simultaneously.\n\n## Using Hugging Face\n```python\nfrom transformers import pipeline\nclassifier = pipeline('sentiment-analysis')\n```",
        code_template: "# LLMs & Transformers\nsentences = ['I love AI!', 'Bugs are annoying.']\nfor s in sentences:\n    sentiment = 'POSITIVE' if 'love' in s.lower() else 'NEGATIVE'\n    print(f'{s} -> {sentiment}')\n",
        expected_output: "POSITIVE" },
    ]
  },
];

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const categoryClasses: Record<string, string> = {
    python_basics: 'python',
    data_science: 'data-science',
    ai_ml: 'ai-ml',
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...\n');

    try {
      // Use Pyodide for in-browser Python execution
      if (typeof window !== 'undefined' && (window as any).pyodide) {
        const pyodide = (window as any).pyodide;
        const result = await pyodide.runPythonAsync(code);
        setOutput(result?.toString() || 'Code executed successfully (no output)');
      } else {
        // Simulate execution for demo
        const lines = code.split('\n');
        let simOutput = '';
        for (const line of lines) {
          const printMatch = line.match(/print\s*\((.*)\)/);
          if (printMatch) {
            let content = printMatch[1];
            // Simple f-string and string eval
            content = content.replace(/f['"](.*?)['"]/, (_, s) => {
              return s.replace(/\{.*?\}/g, (match: string) => {
                const varName = match.slice(1, -1);
                const assignLine = lines.find(l => l.trim().startsWith(varName + ' ='));
                if (assignLine) {
                  return assignLine.split('=')[1].trim().replace(/['"]/g, '');
                }
                return match;
              });
            });
            content = content.replace(/['"](.*?)['"]/g, '$1');
            simOutput += content + '\n';
          }
        }
        setOutput(simOutput || '✅ Code executed successfully!\n\n💡 Install Pyodide for full Python execution in the browser.');
      }
    } catch (err: any) {
      setOutput(`❌ Error: ${err.message || err}`);
    }
    setIsRunning(false);
  };

  if (selectedModule && selectedCourse) {
    return (
      <div className="lesson-layout">
        <div className="lesson-content">
          <button className="btn btn-secondary btn-sm mb-4" onClick={() => { setSelectedModule(null); setOutput(''); }}>
            ← Back to {selectedCourse.title}
          </button>
          <div className="flex items-center gap-4 mb-4">
            <span className={`difficulty-badge ${selectedModule.difficulty}`}>{selectedModule.difficulty}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>⏱️ {selectedModule.estimated_minutes} min</span>
          </div>
          {/* Render markdown content as HTML-ish */}
          <div dangerouslySetInnerHTML={{
            __html: selectedModule.content_md
              .replace(/^### (.*$)/gm, '<h3>$1</h3>')
              .replace(/^## (.*$)/gm, '<h2>$1</h2>')
              .replace(/^# (.*$)/gm, '<h1>$1</h1>')
              .replace(/```python\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
              .replace(/```\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
              .replace(/`([^`]+)`/g, '<code>$1</code>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/^- (.*$)/gm, '<li>$1</li>')
              .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
              .replace(/\n\n/g, '</p><p>')
              .replace(/\n/g, '<br/>')
          }} />
        </div>
        <div className="lesson-sidebar">
          {/* Code Playground */}
          <div className="playground-wrapper" style={{ gridTemplateColumns: '1fr' }}>
            <div className="playground-editor">
              <div className="playground-header">
                <div className="playground-dots">
                  <span></span><span></span><span></span>
                </div>
                <h4>Code Editor</h4>
                <button className="btn btn-accent btn-sm" onClick={runCode} disabled={isRunning} id="run-code-btn">
                  {isRunning ? '⏳ Running...' : '▶ Run Code'}
                </button>
              </div>
              <textarea
                className="code-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                id="code-editor"
              />
            </div>
            <div className="playground-output">
              <div className="playground-header">
                <h4>Output</h4>
              </div>
              <div className={`output-content ${output.includes('❌') ? 'error' : ''}`} id="code-output">
                {output || '// Run your code to see output here'}
              </div>
            </div>
          </div>
          {/* AI Agent Quick Actions */}
          <div className="agent-panel">
            <div className="agent-tabs">
              <button className="agent-tab active">🔍 Review Code</button>
              <button className="agent-tab">❓ Ask AI Tutor</button>
            </div>
            <div className="agent-response" style={{ minHeight: '120px' }}>
              <p style={{ color: 'var(--text-muted)' }}>
                Write some code and click &quot;Review Code&quot; to get AI feedback on your solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <div style={{ paddingTop: 'calc(var(--nav-height) + 40px)' }}>
        <div className="container">
          <button className="btn btn-secondary btn-sm mb-4" onClick={() => setSelectedCourse(null)}>
            ← All Courses
          </button>
          <div className="flex items-center gap-4 mb-4">
            <span style={{ fontSize: '2.5rem' }}>{selectedCourse.icon}</span>
            <div>
              <h1>{selectedCourse.title}</h1>
              <p style={{ color: 'var(--text-secondary)' }}>{selectedCourse.description}</p>
            </div>
          </div>
          <div className="module-list mt-6">
            {selectedCourse.modules.sort((a, b) => a.order_index - b.order_index).map((mod, i) => (
              <div
                key={mod.id}
                className="module-item"
                onClick={() => { setSelectedModule(mod); setCode(mod.code_template); setOutput(''); }}
                id={`module-${mod.slug}`}
              >
                <div className="module-number">{i + 1}</div>
                <div className="module-info">
                  <h4>{mod.title}</h4>
                  <div className="module-meta">
                    <span className={`difficulty-badge ${mod.difficulty}`}>{mod.difficulty}</span>
                    <span>⏱️ {mod.estimated_minutes} min</span>
                  </div>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 40px)' }}>
      <div className="container">
        <div className="section-header">
          <h1>All Courses</h1>
          <p>Choose a learning track and start building your skills</p>
        </div>
        <div className="courses-grid">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => setSelectedCourse(course)}
              id={`course-${course.slug}`}
            >
              <div className="course-card-header">
                <div className={`course-icon ${categoryClasses[course.category] || ''}`}>
                  {course.icon}
                </div>
                <div>
                  <span className={`category-badge ${course.category}`}>
                    {course.category.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div className="course-card-body">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span>📚 {course.modules.length} modules</span>
                  <span>⏱️ ~{course.modules.reduce((s, m) => s + m.estimated_minutes, 0)} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
