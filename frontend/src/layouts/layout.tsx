import type { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/auth.slice";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store:any) => store.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <button className="px-4 py-2 rounded hover:bg-gray-700 transition text-left">
            Home
          </button>
          <button className="px-4 py-2 rounded hover:bg-gray-700 transition text-left" onClick={() => navigate('/categories')}>
            Categories
          </button>
          {isLoggedIn && <button className="px-4 py-2 rounded hover:bg-gray-700 transition text-left" onClick={() => navigate('/category/add')}>
            Add Category
          </button>}
          {/* <button className="px-4 py-2 rounded hover:bg-gray-700 transition text-left">
            Services
          </button> */}
        </nav>
        {isLoggedIn ? <button className="bg-white px-5 py-1 rounded-md text-gray-700 hover:text-gray-900 font-bold mr-2 cursor-pointer absolute bottom-5" onClick={handleLogout}>Logout</button> :<div className="absolute bottom-5 gap-5">
              <button className="bg-white px-5 py-1 rounded-md text-gray-700 hover:text-gray-900 font-bold mr-2 cursor-pointer" onClick={() => navigate('/login')}>Login</button>
          <button className="bg-white px-5 py-1 rounded-md text-gray-700 hover:text-gray-900 font-bold cursor-pointer" onClick={() => navigate('/register')}>Register</button>
        </div>}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
