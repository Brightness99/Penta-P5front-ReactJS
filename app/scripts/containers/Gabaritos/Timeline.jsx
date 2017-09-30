// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Button } from 'quarks/Inputs';
import { SearchIcon } from 'components/Icons';
import { push } from 'modules/ReduxRouter';

type Props = {
  screenSize: string;
}

type State = {
  isFocused: boolean,
  isValid: boolean,
  dirty: boolean,
  value: string,
};

export class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isValid: false,
      dirty: false,
      value: '',
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  static state: State;

  handleChange = (ev) => {
    this.setState({
      value: ev.currentTarget.value,
    });
  };

  handleSubmit = (ev) => {
    const { value } = this.state;
    ev.preventDefault();

    push(`./busca?q=${value}`);
  };

  renderOneStep() {
    return (
      <div className="container-timeline">
        <div className="list-timeline">
          <NavLink exact className="item-list-timeline is-active" to="#"><span className="after">1</span>Escolha o produto</NavLink>
        </div>
      </div>
    );
  }

  renderSecondStep() {
    return (
      <div className="container-timeline">
        <div className="list-timeline">
          <NavLink exact className="item-list-timeline is-active" to="#"><span className="after-before">2</span>Escolha as configurações</NavLink>
        </div>
      </div>
    );
  }

  renderThirdStep() {
    return (
      <div className="container-timeline">
        <div className="list-timeline">
          <NavLink exact className="item-list-timeline is-active" to="#"><span className="before">3</span>Baixe o gabarito</NavLink>
        </div>
      </div>
    );
  }

  renderMobile() {
    return (
      <section>
        { this.renderThirdStep() }
        <div className="container">
          <div className="container-timeline">
            <form className="mol-action-button" onSubmit={this.handleSubmit}>
              <Input
                name="buscar"
                placeholder="Buscar gabaritos..."
                showLabel={true}
                onChange={this.handleChange}
              />
              <button onClick={this.handleSubmit} className="btn-default btn-secondary btn-lg">
                <SearchIcon />
              </button>
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
