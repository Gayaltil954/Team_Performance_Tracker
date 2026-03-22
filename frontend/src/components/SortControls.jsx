function SortControls({ mode, onModeChange }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onModeChange('default')}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
            mode === 'default'
              ? 'bg-[#212121] text-[#F5F5F5]'
              : 'bg-[#E5E7EB] text-[#333333] hover:bg-[#D1D5DB]'
          }`}
        >
          Default Order
        </button>
        <button
          type="button"
          onClick={() => onModeChange('top')}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
            mode === 'top'
              ? 'bg-[#212121] text-[#F5F5F5]'
              : 'bg-[#E5E7EB] text-[#333333] hover:bg-[#D1D5DB]'
          }`}
        >
          Top Performers
        </button>
      </div>
    </div>
  );
}

export default SortControls;
