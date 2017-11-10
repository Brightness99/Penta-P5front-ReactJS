// @flow
import React from 'react';
import { isMobile } from 'utils/helpers';
import { Select } from 'atoms/Inputs/Select';
import { Link } from 'react-router-dom';
import { SearchIcon } from 'components/Icons';

type Props = {
  screenSize: string,
};

export class Sidebar extends React.Component {
  props: Props;

  renderMobile() {
    return (
      <div className="atm-sidebar-tutorial">
        <Select
          className="atm-checkout-input atm-checkout-input-one"
          name="form"
          showLabel={true}
          id=""
          placeholder={'Selecione a categoria...'}
          required={false}
        >
          <option value="videos-products">{'Vídeos/Produtos'}</option>
          <option value="tools">{'Ferramentas'}</option>
        </Select>
      </div>
    );
  }

  renderDesktop() {
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

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}

export default Sidebar;
