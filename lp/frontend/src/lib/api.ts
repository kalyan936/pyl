// API client utility for frontend to backend communication

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiOptions {
  method?: string;
  body?: any;
  auth?: boolean;
}

export async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, auth = false } = options;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────────
export const auth = {
  register: (data: { email: string; username: string; password: string; full_name?: string }) =>
    apiCall('/api/auth/register', { method: 'POST', body: data }),

  login: async (username: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    localStorage.setItem('token', data.access_token);
    return data;
  },

  me: () => apiCall('/api/auth/me', { auth: true }),

  logout: () => localStorage.removeItem('token'),

  isLoggedIn: () => !!localStorage.getItem('token'),
};

// ── Courses ───────────────────────────────────────────────────────
export const courses = {
  list: (category?: string) =>
    apiCall(`/api/courses/${category ? `?category=${category}` : ''}`),

  get: (slug: string) => apiCall(`/api/courses/${slug}`),

  updateProgress: (moduleId: number, status: string, score?: number) =>
    apiCall(`/api/courses/${moduleId}/progress`, {
      method: 'POST',
      body: { status, score },
      auth: true,
    }),

  myProgress: () => apiCall('/api/courses/progress/me', { auth: true }),
};

// ── AI Agents ─────────────────────────────────────────────────────
export const agent = {
  reviewCode: (code: string, language = 'python', moduleId?: number) =>
    apiCall('/api/agent/review', {
      method: 'POST',
      body: { code, language, module_id: moduleId },
      auth: true,
    }),

  explainError: (errorMessage: string, code: string, language = 'python') =>
    apiCall('/api/agent/explain-error', {
      method: 'POST',
      body: { error_message: errorMessage, code, language },
      auth: true,
    }),

  ask: (question: string, context?: string) =>
    apiCall('/api/agent/ask', {
      method: 'POST',
      body: { question, context },
      auth: true,
    }),
};
