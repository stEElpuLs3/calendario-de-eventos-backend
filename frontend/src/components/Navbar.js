import { Link } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/calendar">Início</Link></li>
        <li><Link to="/criar">Criar Eventos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
