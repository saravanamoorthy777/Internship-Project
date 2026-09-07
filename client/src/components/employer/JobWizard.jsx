import React, { useState } from 'react';

export default function JobWizard({ jobs, setJobs, onShowToast }) {
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    company: 'Nexus Technologies',
    department: 'Engineering',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-Time',
    stipendType: 'Paid',
    stipendAmount: '$40 / hr',
    duration: '12 Weeks',
    requirements: 'React, Node.js, Tailwind CSS',
    description: ''
  });

  const handleCreateJob = (e) => {
    e.preventDefault();
    const newJob = {
      id: `job_${Date.now()}`,
      title: jobForm.title,
      company: jobForm.company,
      department: jobForm.department,
      location: jobForm.location,
      type: jobForm.type,
      stipendType: jobForm.stipendType,
      stipendAmount: jobForm.stipendAmount,
      duration: jobForm.duration,
      requirements: jobForm.requirements.split(',').map(s => s.trim()),
      description: jobForm.description,
      status: 'Active',
      postedDate: new Date().toISOString().split('T')[0],
      applicantCount: 0
    };
    setJobs([newJob, ...jobs]);
    setIsCreatingJob(false);
    onShowToast(`New job listing "${newJob.title}" published!`);
  };

  const toggleJobStatus = (id) => {
    setJobs(jobs.map(j => {
      if (j.id === id) {
        return { ...j, status: j.status === 'Active' ? 'Archived' : 'Active' };
      }
      return j;
    }));
    onShowToast("Job listing status updated!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white tracking-tight">Job Posting Wizard</h1>
          <p className="text-gray-400 text-xs mt-0.5">Create, edit, and archive company internship openings.</p>
        </div>

        <button
          onClick={() => setIsCreatingJob(!isCreatingJob)}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-all"
        >
          {isCreatingJob ? "✕ Cancel" : "+ Create Internship Listing"}
        </button>
      </div>

      {isCreatingJob && (
        <form onSubmit={handleCreateJob} className="glass-card p-6 rounded-2xl border border-cyan-500/40 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3">New Internship Listing Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Internship Position Title</label>
              <input
                type="text"
                required
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                placeholder="e.g. Full-Stack React Intern"
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Department</label>
              <input
                type="text"
                value={jobForm.department}
                onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Stipend Amount</label>
              <input
                type="text"
                value={jobForm.stipendAmount}
                onChange={(e) => setJobForm({ ...jobForm, stipendAmount: e.target.value })}
                placeholder="$40 / hr or $3,500 / mo"
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Duration</label>
              <input
                type="text"
                value={jobForm.duration}
                onChange={(e) => setJobForm({ ...jobForm, duration: e.target.value })}
                placeholder="e.g. 12 Weeks"
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Location</label>
              <input
                type="text"
                value={jobForm.location}
                onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Required Skills (Comma separated)</label>
            <input
              type="text"
              value={jobForm.requirements}
              onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
              placeholder="React, Node.js, Python"
              className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Role Description</label>
            <textarea
              rows="3"
              value={jobForm.description}
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>

          <div className="flex justify-end pt-3">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md">
              Publish Internship Opening
            </button>
          </div>
        </form>
      )}

      {/* Job Listings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map(j => (
          <div key={j.id} className="glass-card p-5 rounded-2xl border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-400">{j.company}</span>
                <button
                  onClick={() => toggleJobStatus(j.id)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    j.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-gray-800 text-gray-400 border-gray-700'
                  }`}
                >
                  {j.status} (Click to toggle)
                </button>
              </div>
              <h3 className="text-lg font-extrabold text-white">{j.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{j.location} • Stipend: <span className="text-emerald-400 font-semibold">{j.stipendAmount}</span></p>
              <p className="text-xs text-gray-300 mt-3">{j.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
              <span>Applicants: <strong className="text-white">{j.applicantCount}</strong></span>
              <span>Posted: {j.postedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
