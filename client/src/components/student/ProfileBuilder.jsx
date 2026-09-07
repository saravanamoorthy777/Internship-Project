import React, { useState } from 'react';

export default function ProfileBuilder({ profile, onSave }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ ...profile });
  const [newSkillInput, setNewSkillInput] = useState('');

  const ALL_INDUSTRIES = [
    "Software & SaaS", "Artificial Intelligence", "Fintech", "Healthtech", 
    "Cybersecurity", "E-Commerce", "Gaming", "Robotics", "Biotech", "Edtech"
  ];

  const handleSkillAdd = (e) => {
    if (e.key === 'Enter' && newSkillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(newSkillInput.trim())) {
        setFormData({ ...formData, skills: [...formData.skills, newSkillInput.trim()] });
      }
      setNewSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  const toggleIndustry = (ind) => {
    const current = formData.industries || [];
    if (current.includes(ind)) {
      setFormData({ ...formData, industries: current.filter(i => i !== ind) });
    } else {
      setFormData({ ...formData, industries: [...current, ind] });
    }
  };

  const handleResumeSimulatedUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        resumeFileName: file.name,
        resumeUploadedAt: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">Student Profile Builder</h1>
        <p className="text-gray-400 text-sm mt-1">Build your professional intern profile to match with top engineering employers.</p>
      </div>

      {/* Multi-step Progress Bar */}
      <div className="mb-8 glass-card p-4 rounded-2xl">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: "Basic Info & Industries" },
            { num: 2, label: "Skills & Expertise" },
            { num: 3, label: "Portfolio & Socials" },
            { num: 4, label: "Resume Upload" },
            { num: 5, label: "Review & Save" }
          ].map((step) => (
            <div key={step.num} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep === step.num
                    ? 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-500/20'
                    : currentStep > step.num
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-800 text-gray-500 border border-gray-700'
                }`}>
                  {currentStep > step.num ? '✓' : step.num}
                </div>
                {step.num < 5 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    currentStep > step.num ? 'bg-emerald-500' : 'bg-gray-800'
                  }`}></div>
                )}
              </div>
              <span className={`text-xs mt-2 hidden sm:block font-medium ${
                currentStep === step.num ? 'text-indigo-300 font-semibold' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content Steps */}
      <form onSubmit={handleSubmitForm} className="glass-card p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-xl">
        
        {/* STEP 1: Personal Info & Industry Interest */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>👤</span> Basic Information & Target Industries
              </h2>
              <p className="text-xs text-gray-400">Enter your university contact details and industries of interest.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">University Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">University Name</label>
                <input
                  type="text"
                  required
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Major / Degree</label>
                <input
                  type="text"
                  required
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Short Bio</label>
              <textarea
                rows="3"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Industries of Interest</label>
              <div className="flex flex-wrap gap-2">
                {ALL_INDUSTRIES.map((ind) => {
                  const isSelected = (formData.industries || []).includes(ind);
                  return (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => toggleIndustry(ind)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md border border-indigo-400'
                          : 'bg-gray-900/60 text-gray-400 border border-gray-800 hover:text-white'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '} {ind}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Skills & Expertise */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>💡</span> Technical Skills & Stack Tags
              </h2>
              <p className="text-xs text-gray-400">Add key technical skills, frameworks, and programming languages.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Add Skill (Press Enter)</label>
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={handleSkillAdd}
                placeholder="e.g. React, Node.js, Python, PostgreSQL, Docker..."
                className="w-full bg-slate-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm mb-4"
              />
              
              <div className="flex flex-wrap gap-2 p-4 bg-slate-950/50 rounded-xl border border-gray-800 min-h-[100px]">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="hover:text-white text-indigo-400 ml-1 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Portfolio & Social Links */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🔗</span> Portfolio & Online Presence
              </h2>
              <p className="text-xs text-gray-400">Share your GitHub, LinkedIn, and personal portfolio links.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Portfolio Website URL</label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  placeholder="https://yourname.dev"
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">GitHub Profile URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/username"
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Resume Document Upload & Interactive Preview */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📄</span> Resume Uploader & Document Preview
              </h2>
              <p className="text-xs text-gray-400">Upload your latest PDF resume for employer applicant screening.</p>
            </div>

            <div className="border-2 border-dashed border-gray-800 rounded-2xl p-8 text-center hover:border-indigo-500/50 transition-all bg-slate-950/50">
              <div className="text-4xl mb-3">📁</div>
              <p className="text-sm font-semibold text-white mb-1">Drag and drop your PDF resume here</p>
              <p className="text-xs text-gray-500 mb-4">PDF format supported up to 10MB</p>
              
              <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md transition-all">
                <span>Select File</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeSimulatedUpload}
                  className="hidden"
                />
              </label>
            </div>

            {formData.resumeFileName && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                    📄
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{formData.resumeFileName}</p>
                    <p className="text-xs text-emerald-400">Uploaded on {formData.resumeUploadedAt || 'Today'}</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">Verified PDF</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Final Review & Save */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>✅</span> Profile Summary & Final Review
              </h2>
              <p className="text-xs text-gray-400">Review your profile details before saving to the database.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/60 p-6 rounded-xl border border-gray-800">
              <div>
                <h3 className="text-xs uppercase font-bold text-indigo-400 mb-2">Personal Details</h3>
                <p className="text-lg font-extrabold text-white">{formData.name}</p>
                <p className="text-xs text-gray-400">{formData.email} • {formData.phone}</p>
                <p className="text-xs text-gray-300 mt-2 font-medium">{formData.university} — {formData.major}</p>
                <p className="text-xs text-gray-400 mt-3 italic">"{formData.bio}"</p>
              </div>

              <div>
                <h3 className="text-xs uppercase font-bold text-indigo-400 mb-2">Skills & Resume</h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {formData.skills.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded bg-gray-800 text-gray-300 text-xs">{s}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400">Resume: <span className="text-emerald-400 font-semibold">{formData.resumeFileName}</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-800 mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium text-xs transition-all"
            >
              ← Back
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-all"
            >
              Next Step →
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs shadow-lg transition-all"
            >
              💾 Save Profile to Database
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
