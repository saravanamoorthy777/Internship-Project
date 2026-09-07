import React, { useState } from 'react';

export default function DailyLogbook({ logbooks, setLogbooks, onShowToast }) {
  const [isAddingLog, setIsAddingLog] = useState(false);
  const [logForm, setLogForm] = useState({
    title: '',
    hoursLogged: 8,
    weekNumber: 'Week 3',
    summary: '',
    challenges: '',
    learnings: '',
    supervisor: 'Sarah Jenkins',
    creditUnits: '3 Units (University Credit)'
  });

  const handleAddLog = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `log_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      weekNumber: logForm.weekNumber,
      hoursLogged: Number(logForm.hoursLogged),
      title: logForm.title,
      summary: logForm.summary,
      challenges: logForm.challenges,
      learnings: logForm.learnings,
      supervisor: logForm.supervisor,
      creditUnits: logForm.creditUnits,
      status: 'Pending'
    };
    setLogbooks([newEntry, ...logbooks]);
    setIsAddingLog(false);
    setLogForm({ title: '', hoursLogged: 8, weekNumber: 'Week 3', summary: '', challenges: '', learnings: '', supervisor: 'Sarah Jenkins', creditUnits: '3 Units (University Credit)' });
    onShowToast("Daily work summary submitted for university credit verification!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white tracking-tight">Internship Daily Logbook</h1>
          <p className="text-gray-400 text-xs mt-0.5">Record daily work activities and track supervisor university credit sign-offs.</p>
        </div>

        <button
          onClick={() => setIsAddingLog(!isAddingLog)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-all"
        >
          {isAddingLog ? "✕ Close Form" : "+ Write Daily Log Summary"}
        </button>
      </div>

      {/* New Log Editor Form */}
      {isAddingLog && (
        <form onSubmit={handleAddLog} className="glass-card p-6 rounded-2xl border border-indigo-500/40 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3">New Daily Work Entry</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Work Title</label>
              <input
                type="text"
                required
                value={logForm.title}
                onChange={(e) => setLogForm({ ...logForm, title: e.target.value })}
                placeholder="e.g. Built API Authentication Middleware"
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Hours Logged</label>
              <input
                type="number"
                step="0.5"
                value={logForm.hoursLogged}
                onChange={(e) => setLogForm({ ...logForm, hoursLogged: e.target.value })}
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">University Credit Tag</label>
              <input
                type="text"
                value={logForm.creditUnits}
                onChange={(e) => setLogForm({ ...logForm, creditUnits: e.target.value })}
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Work Summary & Deliverables</label>
            <textarea
              rows="3"
              required
              value={logForm.summary}
              onChange={(e) => setLogForm({ ...logForm, summary: e.target.value })}
              placeholder="Detail the technical tasks completed today..."
              className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Technical Challenges Solved</label>
              <textarea
                rows="2"
                value={logForm.challenges}
                onChange={(e) => setLogForm({ ...logForm, challenges: e.target.value })}
                placeholder="Bugs encountered or state management hurdles..."
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Key Takeaways & Learnings</label>
              <textarea
                rows="2"
                value={logForm.learnings}
                onChange={(e) => setLogForm({ ...logForm, learnings: e.target.value })}
                placeholder="New frameworks or patterns learned..."
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md">
              Submit Log Entry
            </button>
          </div>
        </form>
      )}

      {/* Submitted Log Entries History */}
      <div className="space-y-4">
        {logbooks.map(log => (
          <div key={log.id} className="glass-card p-5 rounded-2xl border border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-400">{log.weekNumber} • {log.date}</span>
                  <span className="text-xs font-mono px-2 py-0.5 bg-gray-800 text-gray-300 rounded">{log.hoursLogged} Hours</span>
                </div>
                <h3 className="text-base font-extrabold text-white mt-1">{log.title}</h3>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${
                log.status === 'Approved'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                {log.status === 'Approved' ? '✓ University Credit Approved' : '⏳ Pending Supervisor Review'}
              </span>
            </div>

            <div className="mt-3 text-xs space-y-2 text-gray-300">
              <p><strong className="text-gray-400">Summary:</strong> {log.summary}</p>
              {log.challenges && <p><strong className="text-gray-400">Challenges:</strong> {log.challenges}</p>}
              {log.learnings && <p><strong className="text-gray-400">Learnings:</strong> {log.learnings}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
