import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/map', label: 'Map', icon: '🗺️' },
    { to: '/search', label: 'Search', icon: '🔍' },
    { to: '/reservations', label: 'Reservations', icon: '📅' },
    { to: '/payments', label: 'Payments', icon: '💳' },
    { to: '/saved', label: 'Saved', icon: '❤️' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Memorial Map</h2>
        <p>Preserving Memories... Mapping History</p>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-user">Hello, {user?.name}</p>
        <button className="btn btn-outline sidebar-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
