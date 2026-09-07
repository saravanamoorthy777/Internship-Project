import React, { useState } from 'react';

export default function KanbanBoard({ applications, setApplications, onShowToast }) {
  const [filterSearch, setFilterSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAppModal, setSelectedAppModal] = useState(null);

  const [newAppForm, setNewAppForm] = useState({
    company: '',
    role: '',
    stipend: '$35 / hr',
    location: 'Remote',
    status: 'Applied',
    notes: ''
  });

  const COLUMNS = [
    { id: 'Applied', name: 'Applied', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { id: 'Interviewing', name: 'Interviewing', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 'Offered', name: 'Offered', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { id: 'Rejected', name: 'Rejected', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
  ];

  const moveApplicationStatus = (appId, newStatus) => {
    setApplications(applications.map(app => {
      if (app.id === appId) {
        return { ...app, status: newStatus };
      }
      return app;
    }));
    onShowToast(`Application status moved to "${newStatus}"!`);
  };

  const handleAddApplication = (e) => {
    e.preventDefault();
    const newApp = {
      id: `app_${Date.now()}`,
      company: newAppForm.company,
      role: newAppForm.role,
      stipend: newAppForm.stipend,
      location: newAppForm.location,
      appliedDate: new Date().toISOString().split('T')[0],
      status: newAppForm.status,
      matchScore: 90,
      notes: newAppForm.notes
    };
    setApplications([newApp, ...applications]);
    setIsAddModalOpen(false);
    setNewAppForm({ company: '', role: '', stipend: '$35 / hr', location: 'Remote', status: 'Applied', notes: '' });
    onShowToast(`New application to ${newApp.company} created!`);
  };

  const filteredApps = applications.filter(app => 
    app.company.toLowerCase().includes(filterSearch.toLowerCase()) ||
    app.role.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div>
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white tracking-tight">Application Tracker Board</h1>
          <p className="text-gray-400 text-xs mt-0.5">Manage your internship application pipeline across hiring stages.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search company or role..."
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
            className="bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md flex items-center gap-1.5 transition-all whitespace-nowrap"
          >
            <span>+</span> Add Application
          </button>
        </div>
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map(col => {
          const colApps = filteredApps.filter(a => a.status === col.id);
          return (
            <div key={col.id} className="bg-slate-950/60 rounded-2xl p-4 border border-gray-800/80 flex flex-col min-h-[500px]">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${col.badge}`}>
                    {col.name}
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-500 px-2 py-0.5 rounded-full bg-gray-900">
                  {colApps.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colApps.map(app => (
                  <div
                    key={app.id}
                    className="glass-card glass-card-hover p-4 rounded-xl border border-gray-800/80 cursor-pointer relative group"
                    onClick={() => setSelectedAppModal(app)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-bold text-indigo-400">{app.company}</p>
                        <h4 className="text-sm font-extrabold text-white mt-0.5 leading-snug">{app.role}</h4>
                      </div>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-gray-800 text-emerald-400 border border-emerald-500/20">
                        {app.stipend}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <span>📍</span> {app.location}
                    </p>

                    {app.interviewDate && (
                      <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300">
                        🗓 Interview: {new Date(app.interviewDate).toLocaleDateString()}
                      </div>
                    )}

                    {/* Move Card Action Dropdown */}
                    <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs" onClick={(e) => e.stopPropagation()}>
                      <span className="text-gray-500 font-mono text-[10px]">Match: {app.matchScore}%</span>
                      
                      <select
                        value={app.status}
                        onChange={(e) => moveApplicationStatus(app.id, e.target.value)}
                        className="bg-gray-900 text-gray-300 border border-gray-700 rounded px-2 py-1 text-[11px] focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Applied">Move to Applied</option>
                        <option value="Interviewing">Move to Interviewing</option>
                        <option value="Offered">Move to Offered</option>
                        <option value="Rejected">Move to Rejected</option>
                      </select>
                    </div>
                  </div>
                ))}

                {colApps.length === 0 && (
                  <div className="text-center py-12 border border-dashed border-gray-800/60 rounded-xl">
                    <p className="text-xs text-gray-500">No applications in {col.name}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Add Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-card max-w-md w-full p-6 rounded-2xl border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">Add New Application</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddApplication} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newAppForm.company}
                  onChange={(e) => setNewAppForm({ ...newAppForm, company: e.target.value })}
                  placeholder="e.g. Google, Tesla, Stripe"
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={newAppForm.role}
                  onChange={(e) => setNewAppForm({ ...newAppForm, role: e.target.value })}
                  placeholder="e.g. Software Engineer Intern"
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Stipend Details</label>
                  <input
                    type="text"
                    value={newAppForm.stipend}
                    onChange={(e) => setNewAppForm({ ...newAppForm, stipend: e.target.value })}
                    className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Status Column</label>
                  <select
                    value={newAppForm.status}
                    onChange={(e) => setNewAppForm({ ...newAppForm, status: e.target.value })}
                    className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-xs text-gray-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-md">Save Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Application Detail Inspect Modal */}
      {selectedAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-card max-w-lg w-full p-6 rounded-2xl border border-indigo-500/40 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div>
                <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{selectedAppModal.company}</span>
                <h3 className="text-xl font-extrabold text-white">{selectedAppModal.role}</h3>
              </div>
              <button onClick={() => setSelectedAppModal(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4 mt-4 text-xs text-gray-300">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-900/60 rounded-xl border border-gray-800">
                <div>
                  <span className="text-gray-500 block">Stipend Rate:</span>
                  <span className="text-emerald-400 font-semibold">{selectedAppModal.stipend}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Location:</span>
                  <span className="text-white font-medium">{selectedAppModal.location}</span>
                </div>
              </div>

              {selectedAppModal.interviewer && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                  <span className="text-amber-300 font-bold block mb-1">Interview Assigned:</span>
                  <p>{selectedAppModal.interviewer}</p>
                </div>
              )}

              <div>
                <span className="text-gray-400 font-semibold block mb-1">Notes & Progress Summary:</span>
                <p className="p-3 bg-slate-900 rounded-xl border border-gray-800 text-gray-300">{selectedAppModal.notes || "No extra notes provided."}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-800 mt-4">
              <button onClick={() => setSelectedAppModal(null)} className="px-5 py-2 rounded-xl bg-gray-800 text-xs font-medium text-white">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
