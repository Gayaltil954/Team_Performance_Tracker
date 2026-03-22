import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="rounded-xl bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-[#333333]">Manager: {user?.name || 'Manager'}</p>
    </nav>
  );
}

export default Navbar;