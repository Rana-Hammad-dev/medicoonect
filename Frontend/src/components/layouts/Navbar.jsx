import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: "Hospitals", path: "/hospitals" },
    { name: "Contact Us", path: "/contactus" },
  ];

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);
  const getDashboardPath = () => {
    if (!user) return "/auth";
    if (user.role === "doctor") return "/doctor-dashboard";
    if (user.role === "admin") return "/admin-dashboard";
    return "/dashboard";
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 h-16 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="flex justify-between items-center w-full px-6 sm:px-10 lg:px-18 h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
            style={{
              background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)",
            }}
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span
            className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent"
            style={{
              fontFamily: "Manrope, sans-serif",
              backgroundImage: "linear-gradient(135deg, #005dac, #1976d2)",
            }}
          >
            MediConnect
          </span>
        </Link>
        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-semibold pb-1 transition-all ${
                isActive(item.path)
                  ? "text-blue-700 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-3 border-l pl-4 border-slate-100">
          {user ? (
            <>
              {/* Dashboard */}
              <Link
                to={getDashboardPath()}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#005dac] hover:text-[#1976d2] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </Link>

              {/* User greeting */}
              <span className="hidden lg:block text-sm font-semibold text-slate-600 border-l border-slate-100 pl-3">
                Hi, {user.name.split(" ")[0]}
                {user.role !== "patient" && (
                  <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase">
                    {user.role}
                  </span>
                )}
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-white text-sm font-bold px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/auth"
                className="text-sm font-semibold text-slate-700 hover:text-[#005dac] transition-colors"
              >
                Login
              </Link>

              {/* Join as Doctor */}
              <Link
                to="/auth"
                className="flex items-center gap-2 text-white text-sm font-bold px-3 py-2 rounded-xl hover:opacity-90 transition-all"
                style={{
                  background: "linear-gradient(120deg, #f59e0b, #d97706)",
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    stroke="currentColor"
                    strokeWidth={2}
                    d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 22a8 8 0 0116 0"
                  />
                </svg>
                <span className="hidden lg:inline">Join as Doctor</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-700"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 shadow-sm">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium ${
                isActive(item.path) ? "text-blue-600" : "text-slate-600"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-semibold text-[#005dac]"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-white text-sm font-bold px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium text-slate-700"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="block text-center text-white font-bold px-3 py-2 rounded-lg text-sm"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  }}
                >
                  Join as Doctor
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default TopNav;
