'use client';

import { useState } from 'react';

type AgentMode = 'review' | 'error' | 'ask';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function AgentPage() {
  const [mode, setMode] = useState<AgentMode>('ask');
  const [question, setQuestion] = useState('');
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ q: string; a: string; type: AgentMode }>>([]);

  const submit = async () => {
    if (mode === 'ask' && !question.trim()) return;
    if (mode === 'review' && !code.trim()) return;
    if (mode === 'error' && (!errorMsg.trim() || !code.trim())) return;

    setLoading(true);
    setResponse('');

    try {
      // For demo/static we'll simulate — in production this calls the backend
      let result = '';

      if (mode === 'review') {
        result = simulateReview(code);
      } else if (mode === 'error') {
        result = simulateErrorExplain(errorMsg, code);
      } else {
        result = simulateAnswer(question);
      }

      // Simulate typing delay
      await new Promise(r => setTimeout(r, 1500));

      setResponse(result);
      setHistory(prev => [{ q: mode === 'ask' ? question : code, a: result, type: mode }, ...prev].slice(0, 10));
    } catch (err: any) {
      setResponse(`❌ Error: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 32px)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="text-center mb-8">
          <h1>🤖 AI Tutor</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Get code reviews, error explanations, and answers to your programming questions
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="agent-panel">
          <div className="agent-tabs">
            <button
              className={`agent-tab ${mode === 'ask' ? 'active' : ''}`}
              onClick={() => setMode('ask')}
              id="tab-ask"
            >
              ❓ Ask a Question
            </button>
            <button
              className={`agent-tab ${mode === 'review' ? 'active' : ''}`}
              onClick={() => setMode('review')}
              id="tab-review"
            >
              🔍 Code Review
            </button>
            <button
              className={`agent-tab ${mode === 'error' ? 'active' : ''}`}
              onClick={() => setMode('error')}
              id="tab-error"
            >
              🐛 Explain Error
            </button>
          </div>

          <div style={{ padding: '24px' }}>
            {mode === 'ask' && (
              <div>
                <label className="form-group">
                  <span style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Your Python / DS / AI question:
                  </span>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="How does a neural network learn? What is gradient descent?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    id="ask-input"
                    style={{ resize: 'vertical' }}
                  />
                </label>
              </div>
            )}

            {mode === 'review' && (
              <div>
                <label className="form-group">
                  <span style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Paste your code for AI review:
                  </span>
                  <textarea
                    className="code-textarea"
                    rows={8}
                    placeholder="def my_function():&#10;    # paste your code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    id="review-input"
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '16px',
                    }}
                  />
                </label>
              </div>
            )}

            {mode === 'error' && (
              <div>
                <label className="form-group">
                  <span style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Error message:
                  </span>
                  <textarea
                    className="form-input"
                    rows={2}
                    placeholder='TypeError: unsupported operand type(s) for +: "int" and "str"'
                    value={errorMsg}
                    onChange={(e) => setErrorMsg(e.target.value)}
                    id="error-msg-input"
                    style={{ resize: 'vertical', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}
                  />
                </label>
                <label className="form-group">
                  <span style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Your code:
                  </span>
                  <textarea
                    className="code-textarea"
                    rows={6}
                    placeholder="# paste the code that caused the error..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    id="error-code-input"
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '16px',
                    }}
                  />
                </label>
              </div>
            )}

            <button
              className="btn btn-primary w-full mt-4"
              onClick={submit}
              disabled={loading}
              id="submit-agent"
            >
              {loading ? '🤔 Thinking...' : mode === 'ask' ? '💬 Get Answer' : mode === 'review' ? '🔍 Review Code' : '🐛 Explain Error'}
            </button>
          </div>

          {/* Response */}
          {(response || loading) && (
            <div className="agent-response" style={{ borderTop: '1px solid var(--border-subtle)', minHeight: '200px' }}>
              {loading ? (
                <div className="loading-center">
                  <div className="spinner"></div>
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: response
                      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                      .replace(/^## (.*$)/gm, '<h2 style="margin-top:16px">$1</h2>')
                      .replace(/```python\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                      .replace(/`([^`]+)`/g, '<code>$1</code>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/^- (.*$)/gm, '<li>$1</li>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/\n/g, '<br/>')
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4">Recent Interactions</h3>
            <div className="module-list">
              {history.map((item, i) => (
                <div key={i} className="module-item" onClick={() => setResponse(item.a)} style={{ cursor: 'pointer' }}>
                  <div className="module-number" style={{ fontSize: '1rem' }}>
                    {item.type === 'ask' ? '❓' : item.type === 'review' ? '🔍' : '🐛'}
                  </div>
                  <div className="module-info">
                    <h4 style={{ fontSize: '0.9rem' }}>{item.q.substring(0, 80)}...</h4>
                    <div className="module-meta">
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {item.type === 'ask' ? 'Question' : item.type === 'review' ? 'Code Review' : 'Error Explain'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Demo Simulation Functions ─────────────────────────────────────
function simulateReview(code: string): string {
  const lines = code.split('\n').filter(l => l.trim());
  const hasFunc = code.includes('def ');
  const hasClass = code.includes('class ');
  const hasComments = code.includes('#');

  return `## ✅ What's Good
- ${hasFunc ? 'Good use of functions for code organization' : 'Code is straightforward and readable'}
- ${hasComments ? 'Comments help explain the logic' : 'The logic flow is clear'}
${hasClass ? '- Nice OOP structure with classes' : ''}
- Code has ${lines.length} lines — concise implementation

## ⚠️ Issues Found
- Consider adding type hints for better code clarity
- ${!hasComments ? 'Missing comments — add docstrings to functions' : 'Some functions could use more detailed docstrings'}
- Consider handling edge cases (empty inputs, invalid types)

## 💡 Suggestions
- Add error handling with try/except blocks
- Use \`typing\` module for type annotations:
\`\`\`python
def my_function(param: str) -> bool:
    """Describe what this function does."""
    ...
\`\`\`
- Consider writing unit tests with \`pytest\`

## 📊 Score: ${Math.min(10, Math.max(5, Math.floor(lines.length / 3) + (hasFunc ? 2 : 0) + (hasComments ? 1 : 0)))}/10`;
}

function simulateErrorExplain(error: string, code: string): string {
  const errorType = error.split(':')[0] || 'Error';

  return `## 🔍 What This Error Means

**${errorType}** is a ${errorType.includes('Type') ? 'type-related' : errorType.includes('Name') ? 'naming-related' : 'runtime'} error in Python.

In simple terms: Python encountered a situation where the operation you're trying to perform isn't valid for the data types involved.

## 🤔 Why It Happened

Looking at your code, the error occurred because:
1. The values being used have incompatible types for the operation
2. This commonly happens when mixing strings and numbers, or accessing undefined variables

## 🔧 How to Fix It

\`\`\`python
# Make sure to convert types explicitly
# Use str() for strings, int() for integers, float() for decimals
result = str(value1) + str(value2)  # For string concatenation
result = int(value1) + int(value2)  # For numeric addition
\`\`\`

## 🛡️ How to Avoid This

- Always check variable types with \`type()\` when unsure
- Use type hints: \`def func(x: int, y: int) -> int:\`
- Add validation at function entry points
- Use Python's \`isinstance()\` for type checking`;
}

function simulateAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('neural network') || q.includes('deep learning')) {
    return `## 🧠 Neural Networks

A **neural network** is a computational model inspired by biological brains. It consists of layers of interconnected nodes (neurons).

### How It Works
1. **Input Layer** — receives the data
2. **Hidden Layers** — process the data through weighted connections
3. **Output Layer** — produces the prediction

### Learning Process
The network learns through **backpropagation**:
- Forward pass: data flows through the network
- Loss calculation: measure error between prediction and actual
- Backward pass: calculate gradients
- Update weights: adjust connections to reduce error

\`\`\`python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(10, 64),
    nn.ReLU(),
    nn.Linear(64, 1)
)
\`\`\`

### Real-World Analogy
Think of it like training a new employee — they make mistakes at first, get feedback, and gradually improve!`;
  }

  if (q.includes('pandas') || q.includes('dataframe')) {
    return `## 🐼 Pandas DataFrames

A DataFrame is a 2D labeled data structure — like a spreadsheet in Python!

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'Score': [95, 87, 92]
})

# Key operations
print(df.describe())     # Summary stats
print(df[df.Age > 25])   # Filtering
print(df.groupby('Age').mean())  # Grouping
\`\`\``;
  }

  return `## 💡 Great Question!

Here's what you need to know about "${question.substring(0, 50)}":

### Key Concepts
- Python is a versatile language used in web development, data science, AI/ML, and more
- The Python ecosystem includes powerful libraries like NumPy, Pandas, scikit-learn, PyTorch
- Practice is key — use the **Playground** to experiment!

### Getting Started
\`\`\`python
# Start with the basics
print("Hello, learner!")

# Explore data structures
my_list = [1, 2, 3, 4, 5]
my_dict = {"key": "value"}

# Functions are your building blocks
def solve(problem):
    return f"Solution to {problem}"
\`\`\`

### Next Steps
1. Check out our **Python Fundamentals** course
2. Practice in the **Playground**
3. Use **Code Review** to get AI feedback on your solutions

Feel free to ask more specific questions! 🚀`;
}
