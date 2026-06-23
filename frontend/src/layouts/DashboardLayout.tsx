import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  LogOut,
  UserCircle,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen] = React.useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', icon: <LayoutDashboard size={20} />, path: `/dashboard/${user?.role}` },
    { label: 'My Courses', icon: <BookOpen size={20} />, path: '/courses' },
    { label: 'Community', icon: <Users size={20} />, path: '/community' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-surface font-sans flex text-on-surface">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-surface-container-low transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col ghost-border border-y-0 border-l-0`}>
        <div className="p-6 flex items-center gap-4">
          <Link to="/" className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">C</Link>
          {isSidebarOpen && <span className="font-display font-bold text-xl tracking-tight">Cambridge</span>}
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${
                location.pathname === item.path 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-on-surface/60 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 space-y-1">
          <Link 
            to="/" 
            className="flex items-center gap-4 px-4 py-3 text-on-surface/40 hover:text-primary transition-all w-full rounded-lg"
          >
            <X size={20} />
            {isSidebarOpen && <span className="font-medium">Exit to Home</span>}
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 text-on-surface/40 hover:text-primary transition-all w-full rounded-lg"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} min-h-screen flex flex-col`}>
        {/* Header */}
        <header className="h-20 glass ghost-border border-x-0 border-t-0 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 bg-surface-container-high px-4 py-2 rounded-xl w-96 max-w-full">
            <Search size={18} className="text-on-surface/40" />
            <input 
              type="text" 
              placeholder="Search curriculum or scholars..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 rounded-full hover:bg-surface-container-low flex items-center justify-center transition-all">
              <Bell size={20} className="text-on-surface/60" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-surface"></span>
            </button>
            
            <div className="h-10 w-px bg-on-surface/10 mx-2"></div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-sm leading-none">{user?.name}</p>
                <p className="text-[10px] text-on-surface/50 uppercase tracking-widest mt-1">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <UserCircle size={28} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
