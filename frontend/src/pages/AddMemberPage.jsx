import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import AddMemberForm from '../components/AddMemberForm';

function AddMemberPage() {
  const { addMember, loading, error } = useOutletContext();
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddMember = async (formData) => {
    try {
      await addMember(formData);
      setSuccessMessage(`${formData.name} has been successfully added to the team!`);
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    } catch (err) {
      console.error('Error adding member:', err);
    }
  };

  return (
    <div className="mx-auto max-w-7xl pt-2 pb-12">
      <header className="mb-6">
        <h1 className="text-[28px] font-extrabold tracking-tight text-[#212121] md:text-[32px]">Add Team Member</h1>
        <p className="mt-2 text-[15px] font-medium text-[#666666]">Create a new member profile for your team.</p>
      </header>

      {successMessage && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#16A34A] bg-[#F0FDF4] px-4 py-3 shadow-sm animate-fade-in">
          <svg className="h-5 w-5 text-[#16A34A]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-[#16A34A]">Success!</p>
            <p className="text-sm text-[#15803D]">{successMessage}</p>
          </div>
        </div>
      )}

      <AddMemberForm onSubmit={handleAddMember} isLoading={loading} />
      {error && <p className="mt-4 text-center text-sm text-rose-600">{error}</p>}
    </div>
  );
}

export default AddMemberPage;