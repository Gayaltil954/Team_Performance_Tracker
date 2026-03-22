import { useState } from 'react';

const TEAM_OPTIONS = {
  Engineering: ['Project Alpha Team', 'Project Beta Team', 'Platform Team'],
  Product: ['Product Discovery Team', 'Product Delivery Team'],
  QA: ['Automation QA Team', 'Manual QA Team'],
  DevOps: ['Cloud Operations Team', 'Release Engineering Team'],
  Data: ['Analytics Team', 'ML Engineering Team'],
};

function ModernDropdown({ label, value, onSelect, options, placeholder, required, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChoose = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-sm" tabIndex={0} onBlur={() => setIsOpen(false)}>
      <label className="mb-2 flex items-center text-sm font-bold text-[#333333]">
        {label} {required ? <span className="ml-1 text-red-500">*</span> : null}
      </label>

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          className="flex h-14 w-full items-center justify-between rounded-2xl border border-[#D1D5DB] bg-[#FAFAFA] px-4 text-left text-[16px] text-[#333333] shadow-sm transition-all focus:border-[#212121] focus:bg-white focus:ring-2 focus:ring-[#212121]/10 disabled:cursor-not-allowed disabled:bg-[#ECECEC] disabled:text-[#999999]"
        >
          <span className={value ? 'text-[#333333]' : 'text-[#999999]'}>{value || placeholder}</span>
          <svg
            className={`h-4 w-4 text-[#999999] transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[#D1D5DB] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
            <ul className="max-h-60 overflow-y-auto p-2">
              {options.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onMouseDown={() => handleChoose(option)}
                    className={`w-full rounded-xl px-3 py-2 text-left text-[15px] transition-colors ${
                      value === option
                        ? 'bg-[#F5F5F5] font-semibold text-[#212121]'
                        : 'text-[#333333] hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function AddMemberForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState({
    name: '',
    role: '',
    department: '',
    team: '',
    score: 50,
  });
  const [localError, setLocalError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      ...(name === 'department' ? { team: '' } : {}),
      [name]: name === 'score' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    if (!form.name.trim()) {
      setLocalError('Please enter member name');
      return;
    }

    if (!form.role.trim()) {
      setLocalError('Please select a role');
      return;
    }

    if (!form.department.trim()) {
      setLocalError('Please select a department');
      return;
    }

    if (!form.team.trim()) {
      setLocalError('Please select a team');
      return;
    }

    if (form.score < 0 || form.score > 100) {
      setLocalError('Score must be between 0 and 100');
      return;
    }

    onSubmit(form);
    setForm({
      name: '',
      role: '',
      department: '',
      team: '',
      score: 50,
    });
    setLocalError('');
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] w-full">
      {localError && (
        <div className="mb-6 rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600">
          {localError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name Input */}
        <div>
          <label className="mb-2 flex items-center text-sm font-bold text-[#333333]">
            Member Name <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g., Sarah Johnson"
            className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-[#333333] placeholder-[#999999] outline-none transition-shadow focus:border-[#212121] focus:ring-1 focus:ring-[#212121]"
          />
        </div>

        <ModernDropdown
          label="Role"
          required
          value={form.role}
          placeholder="Select a role"
          options={['Developer', 'Designer', 'Manager', 'Analyst', 'Other']}
          onSelect={(value) => handleChange({ target: { name: 'role', value } })}
        />

        {/* Score Input */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm font-bold text-[#333333]">
              Performance Score <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="rounded-xl bg-[#F5F5F5] px-5 py-2 text-xl font-bold tracking-tight text-[#333333]">
              {form.score}
            </div>
          </div>
          <div className="relative flex items-center pb-6">
            <input
              type="range"
              name="score"
              min="0"
              max="100"
              value={form.score}
              onChange={handleChange}
              className="h-2 w-full appearance-none rounded-full bg-slate-200 outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#212121] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm"
              style={{
                background: `linear-gradient(to right, #212121 ${form.score}%, #e2e8f0 ${form.score}%)`
              }}
            />
            <span className="absolute -bottom-1 left-0 text-xs font-medium text-[#999999]">0</span>
            <span className="absolute -bottom-1 right-0 text-xs font-medium text-[#999999]">100</span>
          </div>
        </div>

        <ModernDropdown
          label="Department"
          required
          value={form.department}
          placeholder="Select department"
          options={Object.keys(TEAM_OPTIONS)}
          onSelect={(value) => handleChange({ target: { name: 'department', value } })}
        />

        <ModernDropdown
          label="Team / Project"
          required
          value={form.team}
          placeholder={form.department ? 'Select team/project' : 'Select department first'}
          options={TEAM_OPTIONS[form.department] || []}
          disabled={!form.department}
          onSelect={(value) => handleChange({ target: { name: 'team', value } })}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-[#212121] py-3.5 text-[15px] font-bold tracking-wide text-[#F5F5F5] shadow-md transition-colors hover:bg-[#333333] disabled:opacity-50"
        >
          {isLoading ? 'Adding member...' : 'Add Member to Team'}
        </button>
      </form>
    </div>
  );
}

export default AddMemberForm;
