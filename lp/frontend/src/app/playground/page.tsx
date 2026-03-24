'use client';

import { useState, useEffect, useRef } from 'react';

const EXAMPLE_SNIPPETS = [
  {
    title: '👋 Hello World',
    code: 'print("Hello, World!")\nprint("Welcome to PyLearn AI!")\n',
  },
  {
    title: '🔢 FizzBuzz',
    code: 'for i in range(1, 21):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)\n',
  },
  {
    title: '📊 List Comprehension',
    code: '# List comprehension examples\nsquares = [x**2 for x in range(10)]\nprint("Squares:", squares)\n\nevens = [x for x in range(20) if x % 2 == 0]\nprint("Evens:", evens)\n\nmatrix = [[i*3+j+1 for j in range(3)] for i in range(3)]\nfor row in matrix:\n    print(row)\n',
  },
  {
    title: '🎲 Simple Calculator',
    code: 'def calculator(a, b, op):\n    operations = {\n        "+": a + b,\n        "-": a - b,\n        "*": a * b,\n        "/": a / b if b != 0 else "Error: Division by zero"\n    }\n    return operations.get(op, "Unknown operator")\n\nprint(calculator(10, 3, "+"))   # 13\nprint(calculator(10, 3, "-"))   # 7\nprint(calculator(10, 3, "*"))   # 30\nprint(calculator(10, 3, "/"))   # 3.333...\nprint(calculator(10, 0, "/"))   # Error\n',
  },
  {
    title: '🏗️ Class Example',
    code: 'class Student:\n    def __init__(self, name, grades=None):\n        self.name = name\n        self.grades = grades or []\n    \n    def add_grade(self, grade):\n        self.grades.append(grade)\n    \n    def average(self):\n        if not self.grades:\n            return 0\n        return sum(self.grades) / len(self.grades)\n    \n    def __str__(self):\n        return f"{self.name}: avg={self.average():.1f}"\n\nstudents = [\n    Student("Alice", [95, 87, 92]),\n    Student("Bob", [78, 85, 90]),\n    Student("Charlie", [92, 88, 95])\n]\n\nfor s in students:\n    print(s)\n\nbest = max(students, key=lambda s: s.average())\nprint(f"\\nTop student: {best.name}")\n',
  },
];

export default function PlaygroundPage() {
  const [code, setCode] = useState(EXAMPLE_SNIPPETS[0].code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const loadPyodide = async () => {
    if ((window as any).pyodide) {
      setPyodideLoaded(true);
      return;
    }

    setPyodideLoading(true);
    setOutput('⏳ Loading Python runtime (Pyodide)...\nThis may take 15-30 seconds on first load.\n');

    try {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
      script.onload = async () => {
        try {
          const pyodide = await (window as any).loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
            stdout: (text: string) => {
              setOutput(prev => prev + text + '\n');
            },
            stderr: (text: string) => {
              setOutput(prev => prev + '❌ ' + text + '\n');
            },
          });
          (window as any).pyodide = pyodide;
          setPyodideLoaded(true);
          setPyodideLoading(false);
          setOutput('✅ Python runtime loaded! You can now run code.\n');
        } catch (err: any) {
          setPyodideLoading(false);
          setOutput(`❌ Failed to initialize Pyodide: ${err.message}\n`);
        }
      };
      document.head.appendChild(script);
    } catch (err: any) {
      setPyodideLoading(false);
      setOutput(`❌ Failed to load Pyodide: ${err.message}\n`);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    if ((window as any).pyodide) {
      try {
        // Redirect stdout
        await (window as any).pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
`);
        await (window as any).pyodide.runPythonAsync(code);
        const stdout = await (window as any).pyodide.runPythonAsync('sys.stdout.getvalue()');
        setOutput(stdout || '✅ Code executed successfully (no output)');
      } catch (err: any) {
        setOutput(`❌ ${err.message}`);
      }
    } else {
      // Fallback simulation
      setOutput('⚠️ Pyodide not loaded. Click "Load Python" first.\n\nSimulated output:\n');
      const lines = code.split('\n');
      let sim = '';
      for (const line of lines) {
        const m = line.match(/^\s*print\((.*)\)\s*$/);
        if (m) {
          let content = m[1]
            .replace(/f['"](.*?)['"]/, '$1')
            .replace(/['"](.*?)['"]/g, '$1');
          sim += content + '\n';
        }
      }
      setOutput(prev => prev + (sim || '(analysis complete)'));
    }
    setIsRunning(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
    // Ctrl/Cmd + Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  };

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 24px)' }}>
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 style={{ fontSize: '1.8rem' }}>Python Playground</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Write, run, and experiment with Python code — right in your browser
            </p>
          </div>
          <div className="flex gap-4">
            {!pyodideLoaded && (
              <button
                className="btn btn-primary"
                onClick={loadPyodide}
                disabled={pyodideLoading}
                id="load-pyodide-btn"
              >
                {pyodideLoading ? '⏳ Loading...' : '🐍 Load Python'}
              </button>
            )}
            {pyodideLoaded && (
              <span style={{ color: 'var(--success)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ✅ Python Ready
              </span>
            )}
          </div>
        </div>

        {/* Snippet selector */}
        <div className="flex gap-4 mb-4" style={{ flexWrap: 'wrap' }}>
          {EXAMPLE_SNIPPETS.map((snippet, i) => (
            <button
              key={i}
              className="btn btn-secondary btn-sm"
              onClick={() => { setCode(snippet.code); setOutput(''); }}
              id={`snippet-${i}`}
            >
              {snippet.title}
            </button>
          ))}
        </div>

        {/* Playground */}
        <div className="playground-wrapper" id="playground">
          <div className="playground-editor">
            <div className="playground-header">
              <div className="playground-dots">
                <span></span><span></span><span></span>
              </div>
              <h4>editor.py</h4>
              <button
                className="btn btn-accent btn-sm"
                onClick={runCode}
                disabled={isRunning}
                id="run-btn"
              >
                {isRunning ? '⏳ Running...' : '▶ Run (Ctrl+Enter)'}
              </button>
            </div>
            <textarea
              ref={textareaRef}
              className="code-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              id="playground-editor"
            />
          </div>
          <div className="playground-output">
            <div className="playground-header">
              <h4>Output</h4>
              <button className="btn btn-secondary btn-sm" onClick={() => setOutput('')} id="clear-output">
                Clear
              </button>
            </div>
            <div className={`output-content ${output.includes('❌') ? 'error' : ''}`} id="playground-output">
              {output || '// Press Run or Ctrl+Enter to execute your code'}
            </div>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '12px', textAlign: 'center' }}>
          💡 Tip: Press Tab for indentation, Ctrl+Enter to run. Python runs locally in your browser via Pyodide.
        </p>
      </div>
    </div>
  );
}
