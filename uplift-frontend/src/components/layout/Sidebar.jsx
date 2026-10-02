import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/donors", label: "Donors" },
  { to: "/donations", label: "Donations" },
  { to: "/transactions", label: "Transactions" },
    { to: "/contributions", label: "Contributions" },
  { to: "/import", label: "Import" },
  { to: "/communications", label: "Communications" },
  { to: "/engagements", label: "Engagements" },

];

function Sidebar({ open, onNavigate }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true">
          U
        </div>
        <div className="brand-text">
          <span className="brand-name">UPLIFT</span>
          <span className="brand-tag">Donor management</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={onNavigate}
          >
            <span className="nav-dot" aria-hidden="true" />
            {link.label}
          </NavLink>
        ))}
      </nav>

        <div className="sidebar-foot">
            <NavLink
                to="/donate"
                className="nav-link"
                onClick={onNavigate}
            >
                <span className="nav-dot" aria-hidden="true" />
                Public Donation Form
            </NavLink>

            <div>NGO operations console</div>
        </div>
    </aside>
  );
}

export default Sidebar;
