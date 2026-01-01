
import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/* ---------- Theme Context ---------- */
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark(!dark);

  const themeStyles = {
    backgroundColor: dark ? "#1f2937" : "#f3f4f6",
    color: dark ? "#f3f4f6" : "#1f2937",
    minHeight: "100vh",
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ---------- Components ---------- */

function Sidebar() {
  const sidebarStyle = {
    width: "220px",
    backgroundColor: "#2d3748",
    color: "#f3f4f6",
    padding: "20px",
    minHeight: "100vh",
  };
  const linkStyle = { display: "block", color: "#f3f4f6", margin: "10px 0", textDecoration: "none" };

  return (
    <div style={sidebarStyle}>
      <h2 style={{ marginBottom: "20px" }}>Admin Panel</h2>
      <nav>
        <Link style={linkStyle} to="/">Dashboard</Link>
        <Link style={linkStyle} to="/users">Users</Link>
        <Link style={linkStyle} to="/revenue">Revenue</Link>
      </nav>
    </div>
  );
}

function Topbar() {
  const { toggleTheme } = useContext(ThemeContext);
  const style = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#edf2f7",
    borderBottom: "1px solid #ccc",
  };

  return (
    <div style={style}>
      <h2>React Admin Dashboard</h2>
      <button onClick={toggleTheme} style={{ padding: "5px 10px" }}>Toggle Theme</button>
    </div>
  );
}

function Card({ title, value }) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "10px",
    width: "150px",
    textAlign: "center",
    backgroundColor: "#fff",
  };
  return (
    <div style={cardStyle}>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

/* ---------- Pages ---------- */

function Dashboard() {
  const containerStyle = { display: "flex", flexWrap: "wrap" };
  return (
    <div>
      <h2>Dashboard</h2>
      <div style={containerStyle}>
        <Card title="Users" value="1200" />
        <Card title="Revenue" value="$75,000" />
        <Card title="Tickets" value="320" />
      </div>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h2>Users</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Role</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>Rahul</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>rahul@gmail.com</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>User</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Revenue() {
  return (
    <div>
      <h2>Revenue</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
          <h4>Total Revenue</h4>
          <p>₹75,000</p>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
          <h4>Today’s Revenue</h4>
          <p>₹3,200</p>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Movie Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Amount</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>10-12-2025</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>Pushpa 2</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>₹450</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>Paid</td>
          </tr>

          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>12-12-2025</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>Salaar</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>₹600</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Main App ---------- */

function AppLayout() {
  const { themeStyles } = useContext(ThemeContext);

  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: 1,
  };

  return (
    <div style={{ ...containerStyle, ...themeStyles }}>
      <Sidebar />
      <div style={contentStyle}>
        <Topbar />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/revenue" element={<Revenue />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}
