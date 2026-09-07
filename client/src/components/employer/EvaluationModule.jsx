import React, { useState } from 'react';

export default function EvaluationModule({ evaluations, setEvaluations, onShowToast }) {
  const [evalForm, setEvalForm] = useState({
    studentName: 'Alex Rivera',
    internshipRole: 'Frontend Engineering Intern',
    evaluatorName: 'Sarah Jenkins',
    technicalScore: 5,
    communicationScore: 5,
    punctualityScore: 4,
    teamworkScore: 5,
    feedback: 'Alex demonstrated extraordinary code craftsmanship and architectural leadership.',
    recommendCredit: true
  });

  const handleAddEvaluation = (e) => {
    e.preventDefault();
    const avg = ((Number(evalForm.technicalScore) + Number(evalForm.communicationScore) + Number(evalForm.punctualityScore) + Number(evalForm.teamworkScore)) / 4).toFixed(1);
    const newEval = {
      id: `eval_${Date.now()}`,
      studentName: evalForm.studentName,
      internshipRole: evalForm.internshipRole,
      evaluatorName: evalForm.evaluatorName,
      evaluatorTitle: 'Engineering Lead',
      company: 'Nexus Technologies',
      evaluationDate: new Date().toISOString().split('T')[0],
      technicalScore: Number(evalForm.technicalScore),
      communicationScore: Number(evalForm.communicationScore),
      punctualityScore: Number(evalForm.punctualityScore),
      teamworkScore: Number(evalForm.teamworkScore),
      overallRating: parseFloat(avg),
      feedback: evalForm.feedback,
      recommendCredit: evalForm.recommendCredit
    };
    setEvaluations([newEval, ...evaluations]);
    onShowToast("Intern performance review & star ratings saved!");
  };

  const StarRating = ({ value, onChange }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-xl transition-all ${star <= value ? 'text-amber-400 scale-110' : 'text-gray-700'}`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-white tracking-tight">Intern Performance Evaluation Review</h1>
        <p className="text-gray-400 text-xs mt-0.5">End-of-tenure review system with star ratings and university credit recommendations.</p>
      </div>

      {/* New Review Form */}
      <form onSubmit={handleAddEvaluation} className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
        <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3">Submit Performance Review</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Intern Name</label>
            <input
              type="text"
              value={evalForm.studentName}
              onChange={(e) => setEvalForm({ ...evalForm, studentName: e.target.value })}
              className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Evaluator / Lead</label>
            <input
              type="text"
              value={evalForm.evaluatorName}
              onChange={(e) => setEvalForm({ ...evalForm, evaluatorName: e.target.value })}
              className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs"
            />
          </div>
        </div>

        {/* Star Rating Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-slate-950/60 rounded-xl border border-gray-800">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Technical Competency</label>
            <StarRating value={evalForm.technicalScore} onChange={(val) => setEvalForm({ ...evalForm, technicalScore: val })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Communication Skills</label>
            <StarRating value={evalForm.communicationScore} onChange={(val) => setEvalForm({ ...evalForm, communicationScore: val })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Punctuality & Reliability</label>
            <StarRating value={evalForm.punctualityScore} onChange={(val) => setEvalForm({ ...evalForm, punctualityScore: val })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Teamwork & Initiative</label>
            <StarRating value={evalForm.teamworkScore} onChange={(val) => setEvalForm({ ...evalForm, teamworkScore: val })} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">Qualitative Feedback & Comments</label>
          <textarea
            rows="3"
            value={evalForm.feedback}
            onChange={(e) => setEvalForm({ ...evalForm, feedback: e.target.value })}
            className="w-full bg-slate-900 border border-gray-800 rounded-xl px-3.5 py-2 text-white text-xs"
          ></textarea>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="creditCheck"
            checked={evalForm.recommendCredit}
            onChange={(e) => setEvalForm({ ...evalForm, recommendCredit: e.target.checked })}
            className="w-4 h-4 rounded bg-slate-900 border-gray-700 text-indigo-500 focus:ring-indigo-500"
          />
          <label htmlFor="creditCheck" className="text-xs text-gray-300 font-medium cursor-pointer">
            Recommend full university credit allocation for this intern
          </label>
        </div>

        <div className="flex justify-end pt-3">
          <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md">
            Submit Evaluation
          </button>
        </div>
      </form>

      {/* Past Evaluations Cards */}
      <div className="space-y-4">
        {evaluations.map(ev => (
          <div key={ev.id} className="glass-card p-5 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div>
                <h3 className="text-base font-extrabold text-white">{ev.studentName}</h3>
                <p className="text-xs text-gray-400">{ev.internshipRole} • Evaluated by {ev.evaluatorName}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-amber-400">★ {ev.overallRating}</span>
                <span className="text-xs text-gray-500 block">Overall Score</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 mt-3 italic">"{ev.feedback}"</p>

            {ev.recommendCredit && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <span>✓</span> Recommended for Full University Credit
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
