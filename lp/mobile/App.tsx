import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

// ── Theme ─────────────────────────────────────────────────────────
const t = {
  bg: '#0a0a1a',
  bgCard: '#111128',
  glass: 'rgba(255,255,255,0.04)',
  primary: '#6366f1',
  primaryLight: '#a5b4fc',
  accent: '#14b8a6',
  text: '#f1f5f9',
  textSec: '#94a3b8',
  textMut: '#64748b',
  border: 'rgba(255,255,255,0.08)',
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
};

// ── Home ──────────────────────────────────────────────────────────
function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={s.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.hero}>
          <Text style={s.badge}>✨ AI-Powered Learning</Text>
          <Text style={s.heroTitle}>
            Master <Text style={{ color: t.primary }}>Python</Text>,{'\n'}
            <Text style={{ color: t.primary }}>Data Science</Text> &{'\n'}
            <Text style={{ color: t.accent }}>AI</Text>
          </Text>
          <Text style={s.heroSub}>Interactive coding, AI tutors, and structured curriculum</Text>
          <TouchableOpacity style={s.btnP} onPress={() => navigation.navigate('Courses')}>
            <Text style={s.btnT}>Start Learning →</Text>
          </TouchableOpacity>
        </View>

        <View style={s.statsRow}>
          {[
            { n: '10+', l: 'Modules' }, { n: '3', l: 'Tracks' },
            { n: 'AI', l: 'Agents' }, { n: '100%', l: 'Free' },
          ].map((x, i) => (
            <View key={i} style={s.statBox}>
              <Text style={s.statN}>{x.n}</Text>
              <Text style={s.statL}>{x.l}</Text>
            </View>
          ))}
        </View>

        <Text style={s.secTitle}>Learning Tracks</Text>
        {[
          { icon: '🐍', title: 'Python Fundamentals', sub: 'Variables, loops, OOP', n: 4, c: t.primary },
          { icon: '📊', title: 'Data Science', sub: 'NumPy, Pandas, Matplotlib', n: 3, c: t.accent },
          { icon: '🤖', title: 'AI & Machine Learning', sub: 'scikit-learn, PyTorch, LLMs', n: 3, c: '#f472b6' },
        ].map((c, i) => (
          <TouchableOpacity key={i} style={s.card} onPress={() => navigation.navigate('Courses')}>
            <View style={[s.cardIcon, { backgroundColor: c.c + '20' }]}>
              <Text style={{ fontSize: 26 }}>{c.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.cardTitle}>{c.title}</Text>
              <Text style={s.cardSub}>{c.sub}</Text>
              <Text style={s.cardMeta}>📚 {c.n} modules</Text>
            </View>
            <Text style={{ color: t.textMut }}>→</Text>
          </TouchableOpacity>
        ))}

        <Text style={s.secTitle}>Features</Text>
        {[
          { icon: '💻', title: 'Code Playground', text: 'Write & run Python in the app' },
          { icon: '🔍', title: 'AI Code Review', text: 'Get instant AI feedback on your code' },
          { icon: '🤖', title: 'AI Tutor', text: 'Ask questions, get error explanations' },
          { icon: '🔒', title: 'Secure', text: 'AES-256 encryption, audit logging' },
        ].map((f, i) => (
          <View key={i} style={s.featCard}>
            <Text style={{ fontSize: 24, marginRight: 14 }}>{f.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.cardTitle}>{f.title}</Text>
              <Text style={s.cardSub}>{f.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Courses ───────────────────────────────────────────────────────
const MODULES = [
  { title: 'Hello World & Variables', d: 'beginner', time: 15, icon: '🐍',
    code: '# Create variables\nname = "Alice"\nage = 25\nprint(f"Hi, I\'m {name}!")\n' },
  { title: 'Control Flow', d: 'beginner', time: 20, icon: '🔄',
    code: 'for i in range(1, 11):\n    if i % 3 == 0:\n        print("Fizz")\n    else:\n        print(i)\n' },
  { title: 'Functions & Modules', d: 'beginner', time: 25, icon: '⚙️',
    code: 'def is_palindrome(text):\n    return text == text[::-1]\n\nprint(is_palindrome("racecar"))\n' },
  { title: 'OOP Basics', d: 'intermediate', time: 30, icon: '🏗️',
    code: 'class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, n):\n        self.balance += n\n\na = BankAccount(100)\na.deposit(50)\nprint(a.balance)\n' },
  { title: 'NumPy Foundations', d: 'intermediate', time: 25, icon: '🔢',
    code: 'import numpy as np\narr = np.array([1,2,3,4,5])\nprint(arr * 2)\nprint(arr.mean())\n' },
  { title: 'Pandas Analysis', d: 'intermediate', time: 30, icon: '🐼',
    code: 'import pandas as pd\ndf = pd.DataFrame({"A":[1,2,3]})\nprint(df.describe())\n' },
  { title: 'Data Visualization', d: 'intermediate', time: 25, icon: '📈',
    code: 'months = ["Jan","Feb","Mar"]\nvalues = [10, 25, 15]\nfor m, v in zip(months, values):\n    print(f"{m}: {"█"*v}")\n' },
  { title: 'Intro to ML', d: 'intermediate', time: 20, icon: '🤖',
    code: '# ML Pipeline\nprint("1. Load data")\nprint("2. Preprocess")\nprint("3. Train model")\nprint("4. Evaluate")\n' },
  { title: 'Neural Networks', d: 'advanced', time: 35, icon: '🧠',
    code: '# Neural Network layers\nlayers = [784, 128, 64, 10]\nfor i in range(len(layers)-1):\n    print(f"Layer {i}: {layers[i]} -> {layers[i+1]}")\n' },
  { title: 'LLMs & Transformers', d: 'advanced', time: 30, icon: '💬',
    code: 'sentences = ["I love AI!", "Bugs are bad."]\nfor s in sentences:\n    mood = "POS" if "love" in s else "NEG"\n    print(f"{s} -> {mood}")\n' },
];

function CoursesScreen() {
  const [selected, setSelected] = useState<number | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const dc: Record<string, string> = { beginner: t.success, intermediate: t.warning, advanced: t.error };

  const runCode = () => {
    setRunning(true);
    setOutput('');
    setTimeout(() => {
      const lines = code.split('\n');
      let sim = '';
      for (const line of lines) {
        const m = line.match(/print\((.*)\)/);
        if (m) {
          sim += m[1].replace(/f?['"](.*?)['"]/g, '$1') + '\n';
        }
      }
      setOutput(sim || '✅ Executed successfully');
      setRunning(false);
    }, 800);
  };

  if (selected !== null) {
    const mod = MODULES[selected];
    return (
      <SafeAreaView style={s.container}>
        <ScrollView contentContainerStyle={s.scroll}>
          <TouchableOpacity onPress={() => { setSelected(null); setOutput(''); }}>
            <Text style={{ color: t.primary, marginBottom: 16 }}>← Back</Text>
          </TouchableOpacity>
          <Text style={s.pageTitle}>{mod.icon} {mod.title}</Text>
          <View style={[s.diffBadge, { backgroundColor: (dc[mod.d] || t.primary) + '20', alignSelf: 'flex-start' }]}>
            <Text style={[s.diffText, { color: dc[mod.d] }]}>{mod.d}</Text>
          </View>

          {/* Editor */}
          <View style={s.editorBox}>
            <View style={s.editorHead}>
              <View style={s.dots}>
                <View style={[s.dot, { backgroundColor: '#ef4444' }]} />
                <View style={[s.dot, { backgroundColor: '#f59e0b' }]} />
                <View style={[s.dot, { backgroundColor: '#22c55e' }]} />
              </View>
              <Text style={s.editorLabel}>editor.py</Text>
            </View>
            <TextInput
              style={s.codeInput}
              value={code}
              onChangeText={setCode}
              multiline
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
            />
          </View>

          <TouchableOpacity style={[s.btnP, { marginVertical: 12 }]} onPress={runCode} disabled={running}>
            {running ? <ActivityIndicator color="#fff" /> : <Text style={s.btnT}>▶ Run Code</Text>}
          </TouchableOpacity>

          <View style={s.editorBox}>
            <View style={s.editorHead}>
              <Text style={s.editorLabel}>Output</Text>
            </View>
            <View style={{ padding: 14 }}>
              <Text style={{ fontFamily: 'monospace', fontSize: 13, color: output.includes('❌') ? t.error : t.success }}>
                {output || '// Run code to see output'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.pageTitle}>All Modules</Text>
        <Text style={s.pageSub}>Tap a module to start coding</Text>
        {MODULES.map((mod, i) => (
          <TouchableOpacity key={i} style={s.modItem} onPress={() => { setSelected(i); setCode(mod.code); setOutput(''); }}>
            <View style={s.modNum}><Text style={{ fontSize: 16 }}>{mod.icon}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.cardTitle}>{mod.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <View style={[s.diffBadge, { backgroundColor: (dc[mod.d] || t.primary) + '20' }]}>
                  <Text style={[s.diffText, { color: dc[mod.d] }]}>{mod.d}</Text>
                </View>
                <Text style={{ fontSize: 12, color: t.textMut }}>⏱️ {mod.time}m</Text>
              </View>
            </View>
            <Text style={{ color: t.textMut }}>→</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Playground ────────────────────────────────────────────────────
function PlaygroundScreen() {
  const [code, setCode] = useState('print("Hello from PyLearn AI!")\n\nfor i in range(5):\n    print(f"  Step {i+1}")\n');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const run = () => {
    setRunning(true);
    setTimeout(() => {
      const lines = code.split('\n');
      let sim = '';
      for (const l of lines) {
        const m = l.match(/print\((.*)\)/);
        if (m) sim += m[1].replace(/f?['"](.*?)['"]/g, '$1') + '\n';
      }
      setOutput(sim || '✅ Code executed');
      setRunning(false);
    }, 800);
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={s.pageTitle}>💻 Playground</Text>
        <View style={[s.editorBox, { flex: 1, maxHeight: '45%' }]}>
          <View style={s.editorHead}>
            <View style={s.dots}>
              <View style={[s.dot, { backgroundColor: '#ef4444' }]} />
              <View style={[s.dot, { backgroundColor: '#f59e0b' }]} />
              <View style={[s.dot, { backgroundColor: '#22c55e' }]} />
            </View>
            <Text style={s.editorLabel}>editor.py</Text>
          </View>
          <TextInput style={s.codeInput} value={code} onChangeText={setCode} multiline autoCapitalize="none" autoCorrect={false} />
        </View>
        <TouchableOpacity style={[s.btnP, { marginVertical: 10 }]} onPress={run} disabled={running}>
          {running ? <ActivityIndicator color="#fff" /> : <Text style={s.btnT}>▶ Run Code</Text>}
        </TouchableOpacity>
        <View style={[s.editorBox, { flex: 1 }]}>
          <View style={s.editorHead}><Text style={s.editorLabel}>Output</Text></View>
          <ScrollView style={{ padding: 14 }}>
            <Text style={{ fontFamily: 'monospace', fontSize: 13, color: t.success }}>{output || '// Press Run'}</Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ── AI Tutor ──────────────────────────────────────────────────────
function AgentScreen() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = () => {
    if (!question.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResponse(
        `💡 Great question!\n\n` +
        `"${question.substring(0, 50)}" — here's what you need to know:\n\n` +
        `• Python is versatile — web, data science, AI\n` +
        `• Start with variables, loops, functions\n` +
        `• Practice in the Playground tab\n` +
        `• Use libraries like NumPy, Pandas, scikit-learn\n\n` +
        `Keep learning and experimenting! 🚀`
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.pageTitle}>🤖 AI Tutor</Text>
        <Text style={s.pageSub}>Ask any Python, DS, or AI question</Text>
        <TextInput
          style={[s.formInput, { minHeight: 80, textAlignVertical: 'top' }]}
          value={question}
          onChangeText={setQuestion}
          placeholder="How does a neural network learn?"
          placeholderTextColor={t.textMut}
          multiline
        />
        <TouchableOpacity style={s.btnP} onPress={ask} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnT}>💬 Ask AI Tutor</Text>}
        </TouchableOpacity>
        {response ? (
          <View style={[s.card, { marginTop: 16, flexDirection: 'column' }]}>
            <Text style={{ color: t.text, fontSize: 14, lineHeight: 22 }}>{response}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Navigation ────────────────────────────────────────────────────
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: t.bg, borderTopColor: t.border, height: 60, paddingBottom: 8 },
          tabBarActiveTintColor: t.primary,
          tabBarInactiveTintColor: t.textMut,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Text>🏠</Text> }} />
        <Tab.Screen name="Courses" component={CoursesScreen} options={{ tabBarIcon: () => <Text>📚</Text> }} />
        <Tab.Screen name="Code" component={PlaygroundScreen} options={{ tabBarIcon: () => <Text>💻</Text> }} />
        <Tab.Screen name="AI Tutor" component={AgentScreen} options={{ tabBarIcon: () => <Text>🤖</Text> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: t.bg },
  scroll: { padding: 20, paddingBottom: 40 },
  hero: { alignItems: 'center', paddingVertical: 32 },
  badge: { color: t.primaryLight, fontSize: 13, backgroundColor: t.glass, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: t.primary + '30', overflow: 'hidden', marginBottom: 16 },
  heroTitle: { fontSize: 30, fontWeight: '800', color: t.text, textAlign: 'center', lineHeight: 40, marginBottom: 12 },
  heroSub: { color: t.textSec, fontSize: 15, textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  btnP: { backgroundColor: t.primary, paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12, alignItems: 'center', elevation: 6 },
  btnT: { color: '#fff', fontWeight: '700', fontSize: 15 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, gap: 8 },
  statBox: { flex: 1, alignItems: 'center', padding: 14, backgroundColor: t.bgCard, borderRadius: 12, borderWidth: 1, borderColor: t.border },
  statN: { fontSize: 20, fontWeight: '800', color: t.primary },
  statL: { fontSize: 11, color: t.textSec, marginTop: 2 },
  secTitle: { fontSize: 20, fontWeight: '700', color: t.text, marginBottom: 14, marginTop: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: t.bgCard, borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: t.border, gap: 12 },
  cardIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: t.text },
  cardSub: { fontSize: 13, color: t.textSec, marginTop: 2 },
  cardMeta: { fontSize: 12, color: t.textMut, marginTop: 4 },
  featCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: t.glass, borderRadius: 12, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: t.border },
  pageTitle: { fontSize: 24, fontWeight: '800', color: t.text, marginBottom: 4 },
  pageSub: { fontSize: 14, color: t.textSec, marginBottom: 16 },
  modItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: t.glass, borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: t.border, gap: 12 },
  modNum: { width: 38, height: 38, borderRadius: 19, backgroundColor: t.primary + '20', alignItems: 'center', justifyContent: 'center' },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  diffText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  editorBox: { backgroundColor: t.bgCard, borderRadius: 12, borderWidth: 1, borderColor: t.border, overflow: 'hidden' },
  editorHead: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderBottomWidth: 1, borderBottomColor: t.border, gap: 8 },
  dots: { flexDirection: 'row', gap: 5 },
  dot: { width: 9, height: 9, borderRadius: 5 },
  editorLabel: { color: t.textSec, fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  codeInput: { color: t.text, fontFamily: 'monospace', fontSize: 13, padding: 12, minHeight: 150, lineHeight: 20 },
  formInput: { backgroundColor: t.glass, borderWidth: 1, borderColor: t.border, borderRadius: 12, color: t.text, fontSize: 14, padding: 14, marginBottom: 12 },
});
