import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Nunito:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f0f4ff;
    --card: #ffffff;
    --blue: #3b5bfc;
    --blue-light: #eef0ff;
    --green: #12b76a;
    --green-light: #ecfdf5;
    --red: #f04438;
    --red-light: #fef3f2;
    --yellow: #f79009;
    --yellow-light: #fffaeb;
    --text: #1a1f36;
    --sub: #6b7280;
    --border: #e5e7eb;
    --mono: 'Space Mono', monospace;
    --sans: 'Nunito', sans-serif;
  }
  body { background: var(--bg); font-family: var(--sans); color: var(--text); min-height: 100vh; }

  .app { max-width: 480px; margin: 0 auto; padding: 1.5rem 1rem 4rem; }

  /* HEADER */
  .header { text-align: center; margin-bottom: 2rem; padding-top: 1rem; }
  .header h1 {
    font-size: 2rem; font-weight: 800; letter-spacing: -0.04em;
    background: linear-gradient(135deg, var(--blue), #7c3aed);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-bottom: 0.2rem;
  }
  .header p { color: var(--sub); font-size: 0.88rem; }

  /* TABS */
  .tabs {
    display: flex; background: var(--card); border-radius: 14px;
    padding: 5px; gap: 4px; margin-bottom: 1.5rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  }
  .tab {
    flex: 1; padding: 0.6rem; border: none; border-radius: 10px;
    font-family: var(--sans); font-size: 0.85rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s; background: transparent; color: var(--sub);
  }
  .tab.active { background: var(--blue); color: #fff; box-shadow: 0 2px 8px rgba(59,91,252,0.3); }

  /* CARD */
  .card {
    background: var(--card); border-radius: 16px; padding: 1.25rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07); margin-bottom: 1rem;
  }
  .card-title {
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--sub); margin-bottom: 1rem;
  }

  /* STATS */
  .stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.75rem; margin-bottom: 1rem; }
  .stat {
    background: var(--card); border-radius: 14px; padding: 1rem 0.75rem; text-align: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  }
  .stat-num { font-size: 1.6rem; font-weight: 800; line-height: 1; }
  .stat-label { font-size: 0.72rem; color: var(--sub); margin-top: 0.3rem; font-weight: 600; }
  .blue { color: var(--blue); } .green { color: var(--green); } .yellow { color: var(--yellow); }

  /* ADD TASK */
  .add-row { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
  .input {
    flex: 1; background: var(--bg); border: 1.5px solid var(--border);
    border-radius: 10px; padding: 0.65rem 0.9rem;
    font-family: var(--sans); font-size: 0.9rem; color: var(--text);
    outline: none; transition: border-color 0.2s;
  }
  .input:focus { border-color: var(--blue); }
  .input::placeholder { color: #b0b8cc; }
  select.input { cursor: pointer; }

  .btn {
    background: var(--blue); color: #fff; border: none;
    border-radius: 10px; padding: 0.65rem 1rem;
    font-family: var(--sans); font-size: 0.9rem; font-weight: 700;
    cursor: pointer; transition: opacity 0.2s; white-space: nowrap;
  }
  .btn:hover { opacity: 0.88; }
  .btn-sm {
    padding: 0.4rem 0.7rem; font-size: 0.78rem; border-radius: 8px;
  }
  .btn-red { background: var(--red); }
  .btn-green { background: var(--green); }
  .btn-ghost {
    background: var(--bg); color: var(--text); border: 1.5px solid var(--border);
  }

  /* TASK LIST */
  .task-empty {
    text-align: center; color: var(--sub); padding: 2rem 1rem;
    font-size: 0.9rem;
  }
  .task-empty .emoji { font-size: 2rem; display: block; margin-bottom: 0.5rem; }

  .task-item {
    display: flex; align-items: flex-start; gap: 0.75rem;
    padding: 0.9rem; border-radius: 12px; margin-bottom: 0.5rem;
    background: var(--bg); border: 1.5px solid transparent;
    transition: all 0.2s; animation: fadeIn 0.3s ease;
  }
  .task-item.done { opacity: 0.6; }
  .task-item:hover { border-color: var(--border); }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

  .task-check {
    width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--border);
    background: #fff; cursor: pointer; flex-shrink: 0; margin-top: 1px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; font-size: 0.7rem;
  }
  .task-check.checked { background: var(--green); border-color: var(--green); color: #fff; }

  .task-body { flex: 1; min-width: 0; }
  .task-title {
    font-size: 0.92rem; font-weight: 600; margin-bottom: 0.25rem;
    word-break: break-word;
  }
  .task-title.done { text-decoration: line-through; color: var(--sub); }
  .task-meta { display: flex; gap: 0.4rem; flex-wrap: wrap; }

  .badge {
    font-size: 0.7rem; font-weight: 700; padding: 0.18rem 0.5rem;
    border-radius: 100px; display: inline-flex; align-items: center;
  }
  .badge-blue { background: var(--blue-light); color: var(--blue); }
  .badge-green { background: var(--green-light); color: var(--green); }
  .badge-yellow { background: var(--yellow-light); color: var(--yellow); }
  .badge-red { background: var(--red-light); color: var(--red); }

  .task-actions { display: flex; gap: 0.4rem; flex-shrink: 0; }

  /* FILTER ROW */
  .filter-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
  .filter-btn {
    padding: 0.35rem 0.8rem; border-radius: 100px; border: 1.5px solid var(--border);
    background: var(--card); font-family: var(--sans); font-size: 0.78rem; font-weight: 600;
    cursor: pointer; color: var(--sub); transition: all 0.2s;
  }
  .filter-btn.active { background: var(--blue); color: #fff; border-color: var(--blue); }

  /* PASSWORD */
  .pw-display {
    background: var(--bg); border-radius: 12px; padding: 1rem;
    font-family: var(--mono); font-size: 0.95rem; word-break: break-all;
    letter-spacing: 0.05em; color: var(--text); margin-bottom: 1rem;
    border: 1.5px solid var(--border); min-height: 60px;
    display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  }
  .pw-text { flex: 1; }
  .copy-btn {
    background: var(--blue-light); color: var(--blue); border: none;
    border-radius: 8px; padding: 0.4rem 0.7rem; font-size: 0.78rem;
    font-weight: 700; cursor: pointer; font-family: var(--sans); white-space: nowrap;
    transition: background 0.2s;
  }
  .copy-btn:hover { background: var(--blue); color: #fff; }
  .copy-btn.copied { background: var(--green); color: #fff; }

  .pw-options { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 1rem; }
  .toggle-row {
    display: flex; align-items: center; justify-content: space-between;
    background: var(--bg); border-radius: 10px; padding: 0.6rem 0.8rem;
  }
  .toggle-label { font-size: 0.82rem; font-weight: 600; color: var(--text); }
  .toggle {
    width: 36px; height: 20px; border-radius: 100px; border: none;
    cursor: pointer; transition: background 0.2s; position: relative; flex-shrink: 0;
  }
  .toggle.on { background: var(--blue); }
  .toggle.off { background: var(--border); }
  .toggle::after {
    content: ''; position: absolute; top: 2px; width: 16px; height: 16px;
    border-radius: 50%; background: #fff; transition: left 0.2s;
  }
  .toggle.on::after { left: 18px; }
  .toggle.off::after { left: 2px; }

  .slider-row { margin-bottom: 1rem; }
  .slider-label { display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.4rem; }
  input[type=range] { width: 100%; accent-color: var(--blue); }

  .strength-bar { display: flex; gap: 4px; margin-bottom: 1rem; }
  .strength-seg { flex: 1; height: 5px; border-radius: 100px; background: var(--border); transition: background 0.3s; }

  .btn-full { width: 100%; padding: 0.8rem; font-size: 0.95rem; border-radius: 12px; }
`;

const SUBJECTS = ["Math", "Science", "English", "History", "CS", "Other"];
const PRIORITIES = ["Low", "Medium", "High"];

function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

function genPassword(len, upper, numbers, symbols) {
  let chars = "abcdefghijklmnopqrstuvwxyz";
  if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*_-+=?";
  return Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

const priorityColor = p => p === "High" ? "badge-red" : p === "Medium" ? "badge-yellow" : "badge-green";

export default function StudyVault() {
  const [tab, setTab] = useState("tasks");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Read Chapter 5 - Biology", subject: "Science", priority: "High", done: false },
    { id: 2, title: "Complete algebra homework", subject: "Math", priority: "Medium", done: false },
    { id: 3, title: "Essay outline draft", subject: "English", priority: "Low", done: true },
  ]);
  const [newTask, setNewTask] = useState("");
  const [newSubject, setNewSubject] = useState("Math");
  const [newPriority, setNewPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  // Password state
  const [pw, setPw] = useState("");
  const [pwLen, setPwLen] = useState(14);
  const [upper, setUpper] = useState(true);
  const [nums, setNums] = useState(true);
  const [syms, setSyms] = useState(true);
  const [copied, setCopied] = useState(false);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTask.trim(), subject: newSubject, priority: newPriority, done: false }]);
    setNewTask("");
  };

  const toggleTask = id => setTasks(tasks.map(t => t.id === id ? {...t, done: !t.done} : t));
  const removeTask = id => setTasks(tasks.filter(t => t.id !== id));

  const filtered = filter === "All" ? tasks : filter === "Done" ? tasks.filter(t => t.done) : filter === "Pending" ? tasks.filter(t => !t.done) : tasks.filter(t => t.subject === filter);

  const generate = () => setPw(genPassword(pwLen, upper, nums, syms));

  const copyPw = () => {
    if (!pw) return;
    navigator.clipboard.writeText(pw).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = pw ? getStrength(pw) : 0;
  const strengthColors = ["#f04438","#f04438","#f79009","#12b76a","#12b76a"];
  const strengthLabels = ["","Weak","Weak","Fair","Strong","Very Strong"];

  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const high = tasks.filter(t => t.priority === "High" && !t.done).length;

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <h1>StudyVault</h1>
          <p>Your academic toolkit</p>
        </div>

        <div className="tabs">
          <button className={`tab ${tab === "tasks" ? "active" : ""}`} onClick={() => setTab("tasks")}>📚 Tasks</button>
          <button className={`tab ${tab === "password" ? "active" : ""}`} onClick={() => setTab("password")}>🔐 Password</button>
        </div>

        {tab === "tasks" && (
          <>
            <div className="stats">
              <div className="stat"><div className="stat-num blue">{total}</div><div className="stat-label">Total</div></div>
              <div className="stat"><div className="stat-num green">{done}</div><div className="stat-label">Done</div></div>
              <div className="stat"><div className="stat-num yellow">{high}</div><div className="stat-label">Urgent</div></div>
            </div>

            <div className="card">
              <div className="card-title">Add New Task</div>
              <div className="add-row">
                <input className="input" placeholder="Task description..." value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addTask()} />
                <button className="btn btn-sm" onClick={addTask}>Add</button>
              </div>
              <div className="add-row">
                <select className="input" value={newSubject} onChange={e => setNewSubject(e.target.value)}>
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
                <select className="input" value={newPriority} onChange={e => setNewPriority(e.target.value)}>
                  {PRIORITIES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="filter-row">
              {["All","Pending","Done",...SUBJECTS].map(f => (
                <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="task-empty"><span className="emoji">🎉</span>No tasks here!</div>
            ) : filtered.map(t => (
              <div key={t.id} className={`task-item ${t.done ? "done" : ""}`}>
                <div className={`task-check ${t.done ? "checked" : ""}`} onClick={() => toggleTask(t.id)}>
                  {t.done && "✓"}
                </div>
                <div className="task-body">
                  <div className={`task-title ${t.done ? "done" : ""}`}>{t.title}</div>
                  <div className="task-meta">
                    <span className="badge badge-blue">{t.subject}</span>
                    <span className={`badge ${priorityColor(t.priority)}`}>{t.priority}</span>
                  </div>
                </div>
                <div className="task-actions">
                  <button className="btn btn-sm btn-red" onClick={() => removeTask(t.id)}>✕</button>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "password" && (
          <div className="card">
            <div className="card-title">Password Generator</div>

            <div className="pw-display">
              <span className="pw-text">{pw || "Click generate below..."}</span>
              {pw && <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copyPw}>{copied ? "Copied!" : "Copy"}</button>}
            </div>

            {pw && (
              <div className="strength-bar" style={{marginBottom:"0.5rem"}}>
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="strength-seg" style={{background: i <= strength ? strengthColors[strength-1] : undefined}} />
                ))}
              </div>
            )}
            {pw && <p style={{fontSize:"0.78rem", color:"var(--sub)", marginBottom:"1rem", textAlign:"center"}}>{strengthLabels[strength]}</p>}

            <div className="slider-row">
              <div className="slider-label"><span>Length</span><span>{pwLen} chars</span></div>
              <input type="range" min={6} max={32} value={pwLen} onChange={e => setPwLen(+e.target.value)} />
            </div>

            <div className="pw-options">
              {[["Uppercase A–Z", upper, setUpper],["Numbers 0–9", nums, setNums],["Symbols !@#", syms, setSyms]].map(([label, val, set]) => (
                <div className="toggle-row" key={label}>
                  <span className="toggle-label">{label}</span>
                  <button className={`toggle ${val ? "on" : "off"}`} onClick={() => set(!val)} />
                </div>
              ))}
            </div>

            <button className="btn btn-full" onClick={generate}>⚡ Generate Password</button>
          </div>
        )}
      </div>
    </>
  );
}
