# PyLearn AI 🚀

**Python + Data Science + AI Learning Platform** with AI-powered code review agents, interactive coding playground, and structured curriculum.

---

## 🎯 Features

| Feature | Description |
|---------|-------------|
| 📚 **Structured Curriculum** | 3 tracks: Python → Data Science → AI/ML (10 modules) |
| 💻 **Code Playground** | Write & run Python code in the app |
| 🤖 **AI Code Review** | Qwen2.5-Coder & DeepSeek-Coder powered feedback |
| ❓ **AI Tutor** | Ask questions, get error explanations |
| 🔒 **Security** | AES-256 encrypted code, JWT auth, audit logs |
| 📱 **Android APK** | Auto-built via GitHub Actions on every push |

## 📁 Project Structure

```
├── .github/workflows/
│   └── build-apk.yml          # Builds APK on push → download from Actions
├── frontend/                   # Next.js web app (optional)
│   └── src/app/               # Pages: home, courses, playground, AI tutor
├── backend/                    # FastAPI Python backend
│   └── app/                   # auth, courses, agents, models, security
├── mobile/                     # Expo React Native app → APK source
│   ├── App.tsx                # Full app (4 tabs, dark theme)
│   ├── app.json               # Expo config (package name, icons)
│   └── assets/                # App icon & splash
├── .gitignore
├── .env.example
└── README.md
```

## 📱 APK Build via GitHub Actions

### How It Works
1. Push code to `main` branch
2. GitHub Actions runs `build-apk.yml` automatically
3. It installs deps → runs `expo prebuild` → builds APK with Gradle
4. **Download the APK** from Actions → Artifacts tab

### Setup Steps

1. **Create a GitHub repo** (private or public)
2. **Push all files:**
```bash
cd G:\lp
git init
git add .
git commit -m "Initial commit: PyLearn AI"
git remote add origin https://github.com/YOUR_USERNAME/pylearn-ai.git
git branch -M main
git push -u origin main
```
3. **Go to Actions tab** — the workflow starts automatically
4. **Download APK** — once the build completes, click the workflow run → scroll to "Artifacts" → download `pylearn-ai-debug-apk`

### Signed Release APK (Optional)
To build a signed release APK, add these **GitHub Secrets** (Settings → Secrets → Actions):

| Secret | How to Get It |
|--------|--------------|
| `ANDROID_SIGNING_KEY` | `base64 release.keystore` (base64-encode your keystore file) |
| `KEYSTORE_PASSWORD` | Password you set when creating the keystore |
| `KEY_ALIAS` | Alias name from keystore creation |
| `KEY_PASSWORD` | Key password from keystore creation |

Generate a keystore:
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias pylearn -keyalg RSA -keysize 2048 -validity 10000
```

### Create a GitHub Release with APK
```bash
git tag v1.0.0
git push --tags
```
The workflow auto-creates a GitHub Release with the APK attached.

## 🏗️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Mobile App | React Native + Expo |
| Web App | Next.js 14 (static export) |
| Backend API | FastAPI (Python 3.12) |
| Database | SQLAlchemy + SQLite/PostgreSQL |
| AI Agents | Hugging Face (Qwen2.5-Coder, DeepSeek-Coder, LLaMA 3.1) |
| Auth | JWT + bcrypt |
| Encryption | AES-256-GCM |
| CI/CD | GitHub Actions |

## 🤖 AI Agents

| Agent | Model | Purpose |
|-------|-------|---------|
| Code Review | Qwen2.5-Coder-7B | Style, bugs, improvements |
| Error Explain | DeepSeek-Coder-V2-Lite | Beginner-friendly error explanations |
| Doubt Clear | LLaMA-3.1-8B | Q&A for Python/DS/AI topics |

## 📊 API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Get JWT token |
| GET | `/api/courses/` | List courses |
| GET | `/api/courses/{slug}` | Course + modules |
| POST | `/api/agent/review` | AI code review |
| POST | `/api/agent/explain-error` | Explain error |
| POST | `/api/agent/ask` | Ask AI tutor |

## 📄 License

MIT — free to use, modify, and distribute.
