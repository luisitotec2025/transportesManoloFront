import { useState } from 'react';
import Login from './login';
import AdminVehiculos from '../admin/AdminVehiculos';

export default function ProtectedPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('adminAuthenticated') === 'true'
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <div className="p-4 bg-gray-800 text-white flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold"
        >
          Logout
        </button>
      </div>
      <AdminVehiculos />
    </div>
  );
}