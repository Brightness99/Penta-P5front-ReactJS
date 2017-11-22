// @flow
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { FadeToggle, SlideToggle } from 'animations';
import Overlay from 'components/Overlay';
import { WarningFilled } from 'components/Icons';
import BulletListIcon from 'components/Icons/BulletList';

type Props = {
  expectedDeliveryDate: string,
  subTotal: number,
  additionalOptions: {
    file_format: {},
    proof: {}
  },
  parts: Array<{
    name: string,
    options: Array<{ field: string, value: string }>
  }>,
  locale: {}
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

  renderOption = (option) => {
    const { locale: { box_additional_options: { FREE } } } = this.props;
    const title = option.name.split('(')[0];
    const price = option.price === 0 ? <span className="free">{FREE}</span> : <span className="cost">{`+R$${option.price}`}</span>;
    return <span className="price-title">{title}: {price}</span>;
  };

  render() {
    const { isOpen } = this.state;
    const { expectedDeliveryDate, subTotal, additionalOptions, locale: { sidebar } } = this.props;
    let total = subTotal;

    if (additionalOptions) {
      total += additionalOptions.file_format.price + additionalOptions.proof.price;
    }

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
                <aside className="cart-item-definitions-container">
                  <h4>{sidebar.TITLE}</h4>
                  <section className="options">
                    {this.renderParts()}
                  </section>
                  {
                    additionalOptions &&
                      [<hr key="horizontal-line" />,
                        <section className="additional-options" key="options">
                          <section>{this.renderOption(additionalOptions.file_format)}</section>
                          <section>{this.renderOption(additionalOptions.proof)}</section>
                        </section>]
                  }
                  <section className="delivery-info">
                    <section>
                      <WarningFilled />
                      <span>{sidebar.ESTIMATED_DELIVERY}:</span>
                      <span>{`${expectedDeliveryDate}`}</span>
                    </section>
                  </section>
                  <section className="total"><span>{`R$${total.toFixed(2)}`}</span></section>
                </aside>
              </section>
            </section>
          </SlideToggle>,
        ]}
      </TransitionGroup>
    </section>);
  }
}
