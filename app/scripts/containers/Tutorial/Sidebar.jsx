// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from 'components/Icons';

export class Sidebar extends React.Component {
  render() {
    return (
      <div className="atm-sidebar-tutorial">
        <form className="qrk-search-tutorial">
          <input
            type="text"
            placeholder="Buscar tutorial..."
          />
          <button>
            <SearchIcon />
          </button>
        </form>
        <ul className="qrk-list-sidebar">
          <li className="active-li"><Link to="#">Todos</Link></li>
          <li><Link to="#">Vídeos</Link></li>
          <li><Link to="#">Produtos</Link></li>
          <li><Link to="#">Ferramentas</Link></li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
