// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Button } from 'quarks/Inputs';

type Props = {
  screenSize: string;
}

export class Timeline extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  renderMobile() {
    const styles = {
      backgroundImage: `url('${require('../../../../assets/media/svg/icon-search.svg')}')`,
      backgroundSize: '20px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
    return (
      <section>
        <div className="container">
          <div className="container-timeline">
            <div className="list-timeline">
              <NavLink exact className="item-list-timeline is-active" to="#"><span>1</span>Escolha o produto</NavLink>
            </div>
            <form className="mol-action-button" onSubmit={this.handleSubmit}>
              <Input
                name="buscar"
                placeholder="Buscar gabaritos..."
                showLabel={true}
              />
              <input type="submit" value="" className="btn-default btn-secondary btn-lg" style={styles} />
            </form>
          </div>
        </div>
      </section>
    );
  }

  renderDesktop() {
    return (
      <section>
        <div className="container">
          <div className="container-timeline">
            <div className="list-timeline">
              <NavLink exact className="item-list-timeline is-active" to="#"><span>1</span>Escolha o produto</NavLink>
              <NavLink exact className="item-list-timeline" to="#"><span>2</span>Escolha as configurações</NavLink>
              <NavLink exact className="item-list-timeline" to="#"><span>3</span>Baixe o gabarito</NavLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  render() {
    const { screenSize } = this.props;
    return (
      <div>
        {
          ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
            ? this.renderMobile()
            : this.renderDesktop()
        }
      </div>
    );
  }
}

export default Timeline;
