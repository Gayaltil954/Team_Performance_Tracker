import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MemberCard from '../components/MemberCard';
import SortControls from '../components/SortControls';

function ModernDropdown({ id, label, value, onSelect, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  const handleChoose = (nextValue) => {
    onSelect(nextValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" tabIndex={0} onBlur={() => setIsOpen(false)}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-[#666666]">
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[46px] w-full items-center justify-between rounded-xl border border-[#D4D4D4] bg-[#FAFAFA] px-3 text-left text-sm text-[#333333] shadow-sm transition-all focus:border-[#666666]"
      >
        <span className={selectedLabel ? 'text-[#333333]' : 'text-[#999999]'}>{selectedLabel || placeholder}</span>
        <svg
          className={`h-4 w-4 text-[#999999] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#D4D4D4] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
          <ul className="max-h-60 overflow-y-auto p-2">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onMouseDown={() => handleChoose(option.value)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    value === option.value
                      ? 'bg-[#F5F5F5] font-semibold text-[#212121]'
                      : 'text-[#333333] hover:bg-[#F5F5F5]'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [scoreRangeFilter, setScoreRangeFilter] = useState('all');
  const [sortMode, setSortMode] = useState('default');

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
    { value: 'analyst', label: 'Analyst' },
    { value: 'other', label: 'Other' },
  ];

  const scoreOptions = [
    { value: 'all', label: 'All Scores' },
    { value: '0-39', label: '0 - 39' },
    { value: '40-59', label: '40 - 59' },
    { value: '60-79', label: '60 - 79' },
    { value: '80-100', label: '80 - 100' },
  ];

  const {
    members,
    loading,
    error,
    hasMembers,
    changeScore,
    removeMember,
    averageTeamScore,
    totalMembers,
  } = useOutletContext();

  const filteredMembers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return members.filter((member) => {
      const name = (member.name || '').toLowerCase();
      const role = (member.role || '').toLowerCase();
      const score = Number(member.score ?? 0);

      const matchesSearch = normalizedQuery ? name.includes(normalizedQuery) : true;

      const matchesRole = roleFilter === 'all' ? true : role === roleFilter;

      const matchesScore =
        scoreRangeFilter === 'all'
          ? true
          : scoreRangeFilter === '0-39'
          ? score >= 0 && score <= 39
          : scoreRangeFilter === '40-59'
          ? score >= 40 && score <= 59
          : scoreRangeFilter === '60-79'
          ? score >= 60 && score <= 79
          : score >= 80 && score <= 100;

      return matchesSearch && matchesRole && matchesScore;
    });
  }, [members, roleFilter, scoreRangeFilter, searchQuery]);

  const topPerformers = useMemo(
    () => [...filteredMembers].sort((a, b) => b.score - a.score).slice(0, 3),
    [filteredMembers]
  );

  const displayedMembers = useMemo(() => {
    if (sortMode === 'top') {
      return [...filteredMembers].sort((a, b) => b.score - a.score);
    }
    return filteredMembers;
  }, [filteredMembers, sortMode]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setScoreRangeFilter('all');
  };

  return (
    <>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#212121] md:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-[#666666]">Review team members and update performance scores.</p>
        </div>

        <div className="flex gap-3">
          <div className="rounded-xl border border-[#D4D4D4] bg-white px-4 py-3 shadow-sm">
            <p className="text-sm font-semibold text-[#666666]">Average Score</p>
            <p className="mt-1 text-4xl font-bold leading-none text-[#212121]">{Math.round(Number(averageTeamScore || 0))}</p>
          </div>
          <div className="rounded-xl border border-[#D4D4D4] bg-white px-4 py-3 shadow-sm">
            <p className="text-sm font-semibold text-[#666666]">Team Members</p>
            <p className="mt-1 text-4xl font-bold leading-none text-[#212121]">{totalMembers}</p>
          </div>
        </div>
      </header>

      {loading && <p className="text-sm text-[#666666]">Loading team members...</p>}
      {!loading && error && <p className="text-sm text-rose-600">{error}</p>}
      {!loading && !error && !hasMembers && (
        <div className="rounded-xl border border-dashed border-[#999999] bg-white p-8 text-center text-[#666666]">
          No team members yet. Add your first member from the Add Member page.
        </div>
      )}

      {!loading && hasMembers && (
        <>
          <section className="rounded-xl border border-[#D4D4D4] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-[#212121]">Search & Filter</h2>
              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-lg bg-[#212121] px-3 py-2 text-sm font-semibold text-[#F5F5F5] transition-colors hover:bg-[#333333]"
              >
                Reset Filters
              </button>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div>
                <label htmlFor="member-search" className="mb-1 block text-sm font-medium text-[#666666]">
                  Search by name
                </label>
                <input
                  id="member-search"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Type member name"
                  className="h-[46px] w-full rounded-xl border border-[#D4D4D4] bg-[#FAFAFA] px-3 text-sm text-[#333333] shadow-sm outline-none transition-all focus:border-[#666666]"
                />
              </div>

              <ModernDropdown
                id="role-filter"
                label="Filter by role"
                value={roleFilter}
                onSelect={setRoleFilter}
                options={roleOptions}
                placeholder="Select role"
              />

              <ModernDropdown
                id="score-filter"
                label="Filter by score range"
                value={scoreRangeFilter}
                onSelect={setScoreRangeFilter}
                options={scoreOptions}
                placeholder="Select score range"
              />
            </div>

            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-[#666666]">Sort members</p>
              <SortControls mode={sortMode} onModeChange={setSortMode} />
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-[#212121]">Top Performers</h2>
            {topPerformers.length === 0 ? (
              <p className="text-sm text-[#666666]">No top performers match current filters.</p>
            ) : (
              <div className="grid gap-4 lg:grid-cols-3">
                {topPerformers.map((member, index) => (
                  <MemberCard
                    key={`top-${member._id}`}
                    member={member}
                    rank={index + 1}
                    variant="top"
                    onIncrease={() => changeScore(member._id, 5)}
                    onDecrease={() => changeScore(member._id, -5)}
                    onDelete={() => removeMember(member._id)}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-[#212121]">All Team Members</h2>
            {displayedMembers.length === 0 ? (
              <p className="text-sm text-[#666666]">No team members match current filters.</p>
            ) : (
              <div className="grid gap-4 lg:grid-cols-3">
                {displayedMembers.map((member) => (
                  <MemberCard
                    key={member._id}
                    member={member}
                    variant="default"
                    onIncrease={() => changeScore(member._id, 5)}
                    onDecrease={() => changeScore(member._id, -5)}
                    onDelete={() => removeMember(member._id)}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}

export default Dashboard;
