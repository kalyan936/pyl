"""AI Agent service — LangChain + Hugging Face integration for code review, error explanation, and doubt clearing."""

from typing import Optional
import httpx
from app.core.config import settings


# Available free models on Hugging Face Inference API
MODELS = {
    "code_review": "Qwen/Qwen2.5-Coder-7B-Instruct",
    "error_explain": "deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct",
    "doubt_clear": "meta-llama/Meta-Llama-3.1-8B-Instruct",
}

HF_API_URL = "https://api-inference.huggingface.co/models"


async def _call_hf_model(model_id: str, prompt: str, max_tokens: int = 1024) -> str:
    """Call Hugging Face Inference API (free tier)."""
    headers = {}
    if settings.HUGGINGFACE_API_TOKEN:
        headers["Authorization"] = f"Bearer {settings.HUGGINGFACE_API_TOKEN}"

    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": max_tokens,
            "temperature": 0.3,
            "return_full_text": False,
        },
    }

    async with httpx.AsyncClient(timeout=120.0) as client:
        resp = await client.post(f"{HF_API_URL}/{model_id}", json=payload, headers=headers)

        if resp.status_code == 503:
            # Model loading — retry once
            return "⏳ Model is loading. Please try again in ~30 seconds."

        if resp.status_code != 200:
            return f"⚠️ AI service returned status {resp.status_code}. Please try again later."

        data = resp.json()

        if isinstance(data, list) and len(data) > 0:
            return data[0].get("generated_text", "No response generated.")
        elif isinstance(data, dict):
            return data.get("generated_text", str(data))
        return str(data)


# ── Agent Functions ────────────────────────────────────────────────

async def review_code(code: str, language: str = "python") -> str:
    """AI code review — checks style, bugs, improvements."""
    prompt = f"""You are an expert {language} code reviewer and teacher. Review the following student code.

Provide feedback in this format:
## ✅ What's Good
- List positive aspects

## ⚠️ Issues Found
- List bugs, logic errors, or anti-patterns

## 💡 Suggestions
- Provide specific improvement suggestions with corrected code snippets

## 📊 Score: X/10

Student Code:
```{language}
{code}
```

Your review:"""

    return await _call_hf_model(MODELS["code_review"], prompt, max_tokens=1500)


async def explain_error(error_message: str, code: str, language: str = "python") -> str:
    """Explain a code error in beginner-friendly terms."""
    prompt = f"""You are a patient programming teacher helping a beginner understand an error.

Error Message:
```
{error_message}
```

Student Code:
```{language}
{code}
```

Explain:
1. **What the error means** in simple terms
2. **Why it happened** in this specific code
3. **How to fix it** with corrected code
4. **How to avoid it** in the future

Your explanation:"""

    return await _call_hf_model(MODELS["error_explain"], prompt, max_tokens=1200)


async def clear_doubt(question: str, context: Optional[str] = None) -> str:
    """Answer a student's programming/DS/AI question."""
    ctx = f"\nContext/Code:\n```\n{context}\n```\n" if context else ""

    prompt = f"""You are a friendly and knowledgeable tutor for Python, Data Science, and AI/ML.

Student Question: {question}
{ctx}
Provide a clear, educational answer with:
- Simple explanation
- Code examples where appropriate
- Real-world analogies if helpful
- Links to further reading topics

Your answer:"""

    return await _call_hf_model(MODELS["doubt_clear"], prompt, max_tokens=1500)
