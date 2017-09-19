// @flow
import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs';

import AlphabetList from './AlphabetList';
import ContentAlphabetList from './ContentAlphabetList';
import ContentTextGlossary from './ContentTextGlossary';


type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class Glossary extends React.Component {

  static props: Props;

  renderMobile = () => {
    const { app: screenSize } = this.props;


    return (
      <div>
        <p>asdasasd</p>
      </div>
    );
  };

  renderDesktop = () => {
    const { app: { screenSize } } = this.props;

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Glossário',
      },
    ];

    return (
      <section>
        <div className="container">
          <div className="template-glossary">
            <Breadcrumbs links={breadcrumb} />
            <h2 className="title-glossary">Glossário</h2>
            <p className="subtitle-glossary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum</p>
            <ContentTextGlossary />
            <AlphabetList screenSize={screenSize} />
            <ContentAlphabetList />
          </div>
        </div>
      </section>
    );
  }

  render() {
    const { app: screenSize } = this.props;
    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Glossary);

