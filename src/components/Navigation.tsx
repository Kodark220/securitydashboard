import { ShieldAlert, BarChart3, Settings, Home } from 'lucide-react';
import { useState } from 'react';

interface NavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation = ({ currentPage, onNavigate }: NavProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'scanner', label: 'Scanner', icon: ShieldAlert },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="glass sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-blue-400">SecurityGuard</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  currentPage === id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition"
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-400"></div>
              <div className="w-6 h-0.5 bg-gray-400"></div>
              <div className="w-6 h-0.5 bg-gray-400"></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  onNavigate(id);
                  setMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  currentPage === id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
