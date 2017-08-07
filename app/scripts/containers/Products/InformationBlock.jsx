// @flow
// TODO: Carousel this
import React from 'react';

import Carousel from 'components/Carousel';
import TabNavigation from 'components/TabNavigation';

type Props = {
  screenSize: string;
  className: string,
  locale: {},
  button?: typeof React.Component,
  informations: {},
};

export class InformationBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      changeTab: String,
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  handleTabsNavigation = (ev) => {
    this.setState({
      activeSlide: ev.currentTarget.name,
    });
  }

  renderTips() {
    const { informations: { tips } } = this.props;
    // <img src={item.image.file} alt={item.image.title} />
    return tips.map((item, key) => (
      <div className="card-productInformation" key={item.id} name={key}>
        <div className="card-productInformation-image">
          <img src="https://www.printi.com.br/thumbs/272x269c/2016-06/banner-dica1.jpg" alt="Banner" />
        </div>
        <div className="card-productInformation-text">
          <h4 className="card-productInformation-title">{item.name}</h4>
          <p dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </div>
    ));
  }

  renderUtilizations() {
    const { informations: { utilizations } } = this.props;
    // <img src={item.image.file} alt={item.image.title} />
    return utilizations.map((item, key) => (
      <div className="card-productInformation" key={item.id} name={key}>
        <div className="card-productInformation-image">
          <img src="https://www.printi.com.br/thumbs/272x269c/2016-06/banner-dica1.jpg" alt="Banner" />
        </div>
        <div className="card-productInformation-text">
          <h4 className="card-productInformation-title">{item.name}</h4>
          <p dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </div>
    ));
  }

  renderMobile() {
    return (
      <section className="container-productInformation">
        <div className="box-productInformation">

          <div>
            <TabNavigation>
              <span>Dicas</span>
              <span>Como Utilizar</span>
            </TabNavigation>
            <div className="contentNavigation">
              <div id="tips">
                <Carousel>
                  {this.renderTips()}
                </Carousel>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }

  renderDesktop() {
    return (
      <section className="container-productInformation">
        <div className="box-productInformation">

          <div>
            <TabNavigation>
              <span>Dicas</span>
              <span>Como Utilizar</span>
            </TabNavigation>
            <div className="contentNavigation">
              <div id="tips">
                <Carousel>
                  {this.renderTips()}
                </Carousel>
              </div>
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

export default InformationBlock;
