import './index.css'

const Header = () => (
  <nav className="nav-container">
    <button type="button" className="website-logo">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website-logo"
        className="logo"
      />
    </button>
    <div>
      <button type="button" className="button">
        Home
      </button>
      <button type="button" className="button">
        Jobs
      </button>
    </div>
    <button type="button" className="logout-button">
      Logout
    </button>
  </nav>
)

export default Header
