import { useState } from 'react';

function MemberCard({ member, onIncrease, onDecrease, onDelete, variant = 'default', rank }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const scoreStyle =
    member.score < 40
      ? 'border-red-500 bg-red-50'
      : member.score > 80
      ? 'border-emerald-500 bg-emerald-50'
      : 'border-[#D4D4D4] bg-white';

  const progressColor =
    member.score < 40 ? '#DC2626' : member.score > 80 ? '#16A34A' : '#212121';

  const isTop = variant === 'top';

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  return (
    <div className={`group rounded-2xl border p-5 shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(0,0,0,0.14)] animate-card-in ${scoreStyle}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {member.avatar ? (
            <img src={member.avatar} alt={member.name} className="h-12 w-12 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#333333] text-sm font-semibold text-[#F5F5F5] transition-transform duration-300 group-hover:scale-105">
              {member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
          )}

          <div>
            <h3 className="text-2xl font-bold leading-none text-[#212121]">{member.name}</h3>
            <p className="mt-1 text-base text-[#666666]">{member.role}</p>
            <p className="text-sm text-[#999999]">
              {(member.department || 'Unassigned')} • {(member.team || 'No team')}
            </p>
          </div>
        </div>

        {isTop && rank ? (
          <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-sm font-bold text-[#666666]">#{rank}</span>
        ) : null}
      </div>

      <p className="mb-2 text-4xl font-bold leading-none text-[#212121]">
        {member.score}
        <span className="text-xl font-semibold text-[#999999]"> /100</span>
      </p>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-[#E5E5E5]">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${member.score}%`, backgroundColor: progressColor }}
        />
      </div>

      {!isTop && showDeleteConfirm ? (
        <div className="mb-3 rounded-xl border border-[#D1D5DB] bg-[#F5F5F5] p-3">
          <p className="text-sm font-medium text-[#333333]">Are you sure you want to delete this member?</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={handleConfirmDelete}
              className="rounded-lg bg-[#212121] px-3 py-2 text-sm font-semibold text-[#F5F5F5] transition-all duration-200 hover:bg-[#333333]"
            >
              Yes, Delete
            </button>
            <button
              onClick={handleCancelDelete}
              className="rounded-lg bg-[#D1D5DB] px-3 py-2 text-sm font-semibold text-[#333333] transition-all duration-200 hover:bg-[#9CA3AF]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {isTop ? (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onIncrease}
            className="rounded-lg bg-[#212121] px-3 py-2 text-sm font-semibold text-[#F5F5F5] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#333333] active:translate-y-0 active:scale-[0.98]"
          >
            + Add 5
          </button>
          <button
            onClick={onDecrease}
            className="rounded-lg bg-[#D1D5DB] px-3 py-2 text-sm font-semibold text-[#333333] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9CA3AF] active:translate-y-0 active:scale-[0.98]"
          >
            - Sub 5
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onIncrease}
            className="rounded-lg bg-[#212121] px-3 py-2 text-sm font-semibold text-[#F5F5F5] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#333333] active:translate-y-0 active:scale-[0.98]"
          >
            +
          </button>
          <button
            onClick={onDecrease}
            className="rounded-lg bg-[#D1D5DB] px-3 py-2 text-sm font-semibold text-[#333333] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9CA3AF] active:translate-y-0 active:scale-[0.98]"
          >
            -
          </button>
          <button
            onClick={handleDeleteClick}
            aria-label="Delete member"
            title="Delete"
            className="rounded-lg bg-[#E5E7EB] px-3 py-2 text-sm font-semibold text-[#666666] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D1D5DB] active:translate-y-0 active:scale-[0.98]"
          >
            <svg className="mx-auto h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default MemberCard;
