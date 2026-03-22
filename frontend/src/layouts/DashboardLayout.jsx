import { useMemo } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import useMembers from '../hooks/useMembers';

function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    members,
    loading,
    error,
    hasMembers,
    addMember,
    changeScore,
    removeMember,
    sortTopPerformers,
  } = useMembers();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalMembers = members.length;

  const averageTeamScore = useMemo(() => {
    if (!members.length) {
      return '0.0';
    }

    const sum = members.reduce((total, member) => total + member.score, 0);
    return (sum / members.length).toFixed(1);
  }, [members]);

  const topPerformersCount = useMemo(
    () => members.filter((member) => member.score > 80).length,
    [members]
  );

  const atRiskCount = useMemo(
    () => members.filter((member) => member.score < 40).length,
    [members]
  );

  return (
    <main className="h-screen overflow-hidden bg-[#F5F5F5] py-6 pl-4 pr-4 md:px-6">
      <div className="flex h-full w-full flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="lg:h-full lg:w-80 lg:shrink-0">
          <div className="lg:h-full">
            <nav className="flex h-full flex-col space-y-4 rounded-3xl bg-[#212121] p-8 shadow-xl">
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-5 py-5 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#333333] text-[#F5F5F5] shadow-md'
                      : 'text-[#999999] hover:bg-[#333333] hover:text-[#F5F5F5]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <span className="text-base font-semibold">Home</span>
                    </div>
                    {isActive && (
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </>
                )}
              </NavLink>
              
              <NavLink 
                to="/add-member" 
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-5 py-5 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#333333] text-[#F5F5F5] shadow-md'
                      : 'text-[#999999] hover:bg-[#333333] hover:text-[#F5F5F5]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                      <span className="text-base font-semibold">Add Member</span>
                    </div>
                    {isActive && (
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </>
                )}
              </NavLink>
              
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-5 py-5 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#333333] text-[#F5F5F5] shadow-md'
                      : 'text-[#999999] hover:bg-[#333333] hover:text-[#F5F5F5]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      <span className="text-base font-semibold">Dashboard</span>
                    </div>
                    {isActive && (
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </>
                )}
              </NavLink>

              <div className="mt-auto pt-[19.5rem]">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-between rounded-xl px-5 py-5 text-[#999999] transition-all duration-200 hover:bg-[#333333] hover:text-[#F5F5F5]"
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-base font-semibold">Logout</span>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </aside>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="space-y-6 pb-8">
            <Navbar />
            <Outlet
              context={{
                members,
                loading,
                error,
                hasMembers,
                addMember,
                changeScore,
                removeMember,
                sortTopPerformers,
                totalMembers,
                averageTeamScore,
                topPerformersCount,
                atRiskCount,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;