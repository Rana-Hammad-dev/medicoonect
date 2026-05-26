import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AfterLoginNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: "Hospitals", path: "/hospitals" },
    { name: "Contact Us", path: "/contactus" },
  ];

  // Role-based dashboard path
  const getDashboardPath = () => {
    if (!user) return "/auth";
    if (user.role === "doctor") return "/doctor-dashboard";
    if (user.role === "admin") return "/admin-dashboard";
    return "/dashboard";
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 w-full z-50 h-16 border-b border-slate-100"
      style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)" }}>
      <div className="flex justify-between items-center w-full px-6 sm:px-10 lg:px-18 h-full">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
            style={{ background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <Link to="/" className="text-2xl font-extrabold bg-clip-text text-transparent"
            style={{ fontFamily: "Manrope, sans-serif", backgroundImage: "linear-gradient(135deg, #005dac, #1976d2)" }}>
            MediConnect
          </Link>
        </div>
        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path}
                className={`text-sm font-semibold tracking-tight transition-all pb-1 ${isActive
                    ? "text-blue-700 border-b-2 border-blue-600"
                    : "text-slate-500 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-300"
                  }`}>
                {item.name}
              </Link>
            );
          })}
        </nav>
        {/* Right side */}
        <div className="flex items-center gap-3 border-l pl-4 border-slate-100">
          {user ? (
            <>
              {/* Dashboard button */}
              <Link to={getDashboardPath()}
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#005dac] hover:text-[#1976d2] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
              <button onClick={handleLogout}
                className="text-white text-sm font-bold px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all active:scale-95">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth">
              <button className="text-white text-sm font-bold px-4 py-2 rounded-xl transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #005dac 0%, #1976d2 100%)" }}>
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default AfterLoginNav;