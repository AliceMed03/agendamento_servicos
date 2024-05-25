import { Link } from "react-router-dom";

const MenuSuperior = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light sticky-top" >
      <div className="container" >
        <Link to="/" className="navbar-brand">Logout</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/prestador" className="nav-link">Cadastrar Prestador</Link>
          </li>
          <li className="nav-item">
            <Link to="/user" className="nav-link">Cadastrar Usuário</Link>
          </li>
          <li className="nav-item">
            <Link to="/agendamento" className="nav-link">Agendamento</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;