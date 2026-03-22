function SortControls({ onSortTop }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <button
        onClick={onSortTop}
        className="rounded-md bg-[#212121] px-4 py-2 text-sm font-semibold text-[#F5F5F5] hover:bg-[#333333]"
      >
        Top Performers
      </button>
    </div>
  );
}

export default SortControls;
