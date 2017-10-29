// @flow
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { FadeToggle, SlideToggle } from 'animations';
import Overlay from 'components/Overlay';
import TruckIcon from 'components/Icons/Truck';
import BulletListIcon from 'components/Icons/BulletList';

type Props = {
  expectedDeliveryDate: string,
  totalPrice: number,
  subTotal: number,
  additionalOptions: [],
  parts: Array<{
    name: string,
    options: Array<{ field: string, value: string }>
  }>,
  isMobile: boolean,
};

type State = {
  isOpen: boolean,
}

export default class CartItemDefinitionsPanel extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  props: Props;
  state: State;

  handleToggle = () => {
    const isOpen = !this.state.isOpen;
    this.setState({
      isOpen: !this.state.isOpen,
    });
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  };

  renderParts() {
    const { parts } = this.props;
    return parts.map(x => (
      <section key={x.name}>
        {parts.length > 1 && <h5>{x.name}</h5>}
        <ul>
          {
            x.options.map(y => <li key={y.field}><span><strong>{`${y.field}: `}</strong>{y.value}</span></li>)
          }
        </ul>
      </section>));
  }

  renderMobile() {
    const { isOpen } = this.state;

    return (<section className="side-panel-container">
      {!isOpen && <button className="side-panel-button" onClick={this.handleToggle}><BulletListIcon /></button>}
      <TransitionGroup>
        {isOpen && [
          <FadeToggle key="fade-toggle-header">
            <Overlay onClick={this.handleToggle} />
          </FadeToggle>,
          <SlideToggle key="slide-toggle-header" direction="rtl">
            <section className="side-panel-block">
              <button className="side-panel-button" onClick={this.handleToggle}><BulletListIcon /></button>
              <section className="side-panel-content">
                {this.renderDesktop()}
              </section>
            </section>
          </SlideToggle>,
        ]}
      </TransitionGroup>
    </section>);
  }

  renderDesktop() {
    const { expectedDeliveryDate, totalPrice, subTotal } = this.props;

    return (
      <aside className="cart-item-definitions-container">
        <h4>Resumo do produto</h4>
        <section className="options">
          {this.renderParts()}
        </section>
        <hr />
        <section className="sub-total">Sub-total: <span>{`R$${subTotal}`}</span>(R$0,18un)</section>
        <hr />
        <section className="additional-options">additional-options</section>
        <hr />
        <section className="total">Total: <span>{`R$${totalPrice}`}</span></section>
        <section className="delivery-info">
          <TruckIcon />
          <span>Previsão de entrega:</span>
          <span>{`${expectedDeliveryDate}`}</span>
        </section>
      </aside>
    );
  }

  render() {
    const { isMobile } = this.props;

    return isMobile ? this.renderMobile() : this.renderDesktop();
  }
}
