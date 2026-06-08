import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Topbar = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="admin-topbar">
      <div className="admin-breadcrumb">
        <Link to="/admin/dashboard">ShopFlow</Link>
        {pathnames.length > 1 && (
          <>
            <span>/</span>
            <span style={{color: 'var(--admin-text-main)', textTransform: 'capitalize'}}>
              {pathnames[1]}
            </span>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <button className="btn-icon" style={{width: 32, height: 32}}>
          <i className="bi bi-bell"></i>
        </button>
        <div className="flex items-center gap-2" style={{cursor: 'pointer'}}>
          <div style={{width: 32, height: 32, borderRadius: '50%', background: 'var(--admin-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600}}>
            A
          </div>
          <span className="text-sm" style={{fontWeight: 500}}>Admin User</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
