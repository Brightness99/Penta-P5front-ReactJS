// @flow
import React from 'react';
import cx from 'classnames';
import CheckIcon from 'components/Icons/Check';
import { NavLink, Route } from 'react-router-dom';

type Props = {
  activeStep: 1 | 2 | 3,
  handleNavigation: (step: number) => void,
  screenSize: string,
  finalId: string,
}

type State = {
  isFocused: boolean,
  isValid: boolean,
  dirty: boolean,
  value: string,
};

export class Timeline extends React.PureComponent<Props, State> {
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

  static props: Props;

  static state: State;

  handleChange = (ev: Event) => {
    this.setState({
      value: ev.currentTarget.value,
    });
  };

  renderFirstStep() {
    return (
      <div className="container-timeline">
        <div className="list-timeline">
          <NavLink exact className="item-list-timeline is-active" to="#">
            <span className="after">1</span>{'Escolha o produto'}
          </NavLink>
        </div>
      </div>
    );
  }

  renderSecondStep() {
    return (
      <div className="container-timeline">
        <div className="list-timeline">
          <NavLink exact className="item-list-timeline is-active" to="#">
            <span className="after-before">2</span>{'Escolha as configurações'}
          </NavLink>
        </div>
      </div>
    );
  }

  renderThirdStep() {
    return (
      <div className="container-timeline">
        <div className="list-timeline">
          <NavLink exact className="item-list-timeline is-active" to="#">
            <span className="before">3</span>{'Baixe o gabarito'}
          </NavLink>
        </div>
      </div>
    );
  }

  handleClick = (e: Event, predicate: () => boolean, step: 1 | 2 | 3) => {
    if (predicate()) {
      e.preventDefault();
      return;
    }
    this.props.handleNavigation(step);
  };

  renderMobile() {
    return (
      <section>
        <Route
          path={'/download-de-gabaritos'}
          exact
          render={this.renderFirstStep}
        />
        <Route
          path={'/download-de-gabaritos/:slug'}
          exact
          render={this.renderSecondStep}
        />
        <Route
          path={'/download-de-gabaritos/:slug/baixar'}
          exact
          render={this.renderThirdStep}
        />
      </section>
    );
  }

  renderDesktop() {
    const { activeStep, finalId } = this.props;
    return (
      <section>
        <section className="container">
          <section className="container-timeline">
            <section className="list-timeline">
              <NavLink
                exact
                className={cx('item-list-timeline', activeStep === 1 && 'is-active', activeStep > 1 && 'submitted')}
                to={'/download-de-gabaritos'}
                onClick={(e: Event) => this.handleClick(e, () => activeStep < 1, 1)}
              >
                <span>{activeStep > 1 ? <CheckIcon /> : 1}</span>{'Escolha o produto'}
              </NavLink>
              <NavLink
                exact
                className={cx('item-list-timeline', activeStep === 2 && 'is-active', activeStep > 2 && 'submitted')}
                to={`/download-de-gabaritos/${finalId || ''}`}
                onClick={(e: Event) => this.handleClick(e, () => activeStep < 2, 2)}
              >
                <span>{activeStep > 2 ? <CheckIcon /> : 2}</span>{'Escolha as configurações'}
              </NavLink>
              <NavLink
                exact
                className={cx('item-list-timeline', activeStep === 3 && 'is-active', activeStep > 3 && 'submitted')}
                to={`/download-de-gabaritos/${finalId || ''}/baixar`}
                onClick={(e: Event) => this.handleClick(e, () => activeStep < 3, 3)}
              >
                <span>{activeStep > 3 ? <CheckIcon /> : 3}</span>{'Baixe o gabarito'}
              </NavLink>
            </section>
          </section>
        </section>
      </section>
    );
  }

  render() {
    const { screenSize } = this.props;
    return (
      <section>
        {
          ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
            ? this.renderMobile()
            : this.renderDesktop()
        }
      </section>
    );
  }
}

export default Timeline;
