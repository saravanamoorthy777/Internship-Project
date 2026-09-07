import React, { useState } from 'react';

export default function ApplicantScreening({ applications, setApplications, studentProfile, onShowToast }) {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [interviewForm, setInterviewForm] = useState({
    date: '2026-08-25',
    time: '14:00',
    interviewer: 'Sarah Jenkins (Tech Lead)',
    meetingLink: 'https://meet.google.com/abc-xyz-123'
  });

  const handleScheduleInterview = (e) => {
    e.preventDefault();
    setApplications(applications.map(a => {
      if (a.id === selectedApplicant.id) {
        return {
          ...a,
          status: 'Interviewing',
          interviewDate: `${interviewForm.date} T${interviewForm.time}:00`,
          interviewer: interviewForm.interviewer,
          notes: `Interview scheduled with ${interviewForm.interviewer}. Link: ${interviewForm.meetingLink}`
        };
      }
      return a;
    }));
    setScheduleModalOpen(false);
    setSelectedApplicant(null);
    onShowToast("Interview scheduled and candidate notified!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-white tracking-tight">Applicant Screening Dashboard</h1>
        <p className="text-gray-400 text-xs mt-0.5">Filter candidate applications, inspect PDF resumes, and schedule technical interviews.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidates List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider">Candidate Submissions</h3>
          {applications.map(app => (
            <div
              key={app.id}
              onClick={() => setSelectedApplicant(app)}
              className={`glass-card p-4 rounded-xl border cursor-pointer transition-all ${
                selectedApplicant?.id === app.id
                  ? 'border-cyan-500 bg-cyan-500/10 shadow-lg'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300">{studentProfile.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-800 text-gray-300">{app.status}</span>
              </div>
              <h4 className="text-sm font-extrabold text-white mt-1">{app.role}</h4>
              <p className="text-xs text-gray-400">{app.company} • Match Score: <strong className="text-emerald-400">{app.matchScore}%</strong></p>
            </div>
          ))}
        </div>

        {/* Candidate Inspector & Resume Viewer */}
        <div className="lg:col-span-2">
          {selectedApplicant ? (
            <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">{studentProfile.name}</h2>
                  <p className="text-xs text-gray-400">{studentProfile.university} • {studentProfile.major}</p>
                </div>
                <button
                  onClick={() => setScheduleModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md"
                >
                  🗓 Schedule Interview
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-gray-800">
                  <span className="text-gray-400 block font-semibold mb-1">Skills & Technical Stack:</span>
                  <div className="flex flex-wrap gap-1">
                    {studentProfile.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-gray-800">
                  <span className="text-gray-400 block font-semibold mb-1">Portfolio & GitHub:</span>
                  <a href={studentProfile.portfolioUrl} target="_blank" rel="noreferrer" className="text-cyan-400 underline block">{studentProfile.portfolioUrl}</a>
                  <a href={studentProfile.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 underline block mt-1">{studentProfile.githubUrl}</a>
                </div>
              </div>

              {/* Simulated PDF Resume Viewer */}
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Attached Resume Document</h4>
                <div className="p-6 bg-slate-900 rounded-xl border border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xl">
                      📄
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{studentProfile.resumeFileName}</p>
                      <p className="text-xs text-gray-400">PDF Document • 2.4 MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onShowToast("Downloading resume PDF...")}
                    className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold"
                  >
                    ⬇ Download PDF
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center rounded-2xl border border-gray-800 text-gray-500">
              Select a candidate from the left panel to inspect resume and schedule interview.
            </div>
          )}
        </div>
      </div>

      {/* Interview Scheduler Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-card max-w-md w-full p-6 rounded-2xl border border-cyan-500/40 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">Schedule Technical Interview</h3>
              <button onClick={() => setScheduleModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleScheduleInterview} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Interview Date</label>
                  <input
                    type="date"
                    value={interviewForm.date}
                    onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
                    className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Time</label>
                  <input
                    type="time"
                    value={interviewForm.time}
                    onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })}
                    className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Interviewer Name & Role</label>
                <input
                  type="text"
                  value={interviewForm.interviewer}
                  onChange={(e) => setInterviewForm({ ...interviewForm, interviewer: e.target.value })}
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Video Meeting Link</label>
                <input
                  type="text"
                  value={interviewForm.meetingLink}
                  onChange={(e) => setInterviewForm({ ...interviewForm, meetingLink: e.target.value })}
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
                <button type="button" onClick={() => setScheduleModalOpen(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-xs text-gray-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-cyan-600 text-xs font-semibold text-white shadow-md">Confirm & Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
