import { Link } from "react-router-dom";
import Logo from '../assets/deezer.png';


const Navbar = () => {
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center border-b border-gray-700">
      <Link to="/" className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="h-6" />
        <span className="text-xl font-bold">MusicApp</span>
      </Link>
      <ul className="flex gap-4">
        <li>
          <Link to="/search" className="hover:underline">
            🔍 Buscar       
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
