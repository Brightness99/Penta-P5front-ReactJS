// @flow
import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs';
import { glossaryFetch, glossaryFilter } from 'actions';
import { filteredGlossarySelector } from 'selectors';
import { GlossaryListByLetter } from 'components/GlossaryListByLetter';
import { AlphabetList } from 'components/AlphabetList';
import ContentTextGlossary from './ContentTextGlossary';

type Props = {
  screenSize: string,
  glossaryList: [],
  availableIndexes: [],
  isLoaded: boolean,
  glossaryListFetch: () => void,
  glossaryListFilter: (query: string) => void,
};

export class Glossary extends React.Component {

  componentDidMount = () => {
    const { glossaryListFetch, isLoaded } = this.props;

    if (!isLoaded && typeof glossaryListFetch === 'function') {
      glossaryListFetch();
    }
  };

  static props: Props;

  renderList=() => {
    const { glossaryList, isLoaded } = this.props;
    if (!isLoaded) return '...loading';

    return glossaryList.map((x) =>
      <GlossaryListByLetter key={x.key}
                            letter={x.key}
                            items={x.value} />);
  };

  render() {
    const { screenSize, availableIndexes, glossaryListFilter } = this.props;
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
        <div className="template-glossary">
          <Breadcrumbs links={breadcrumb} />
          <div className="container">
            <h2 className="title-glossary">Glossário</h2>
            <p className="subtitle-glossary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum</p>
            <ContentTextGlossary />
            <AlphabetList filter={glossaryListFilter} indexes={availableIndexes} screenSize={screenSize} />
            {
              this.renderList()
            }
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  screenSize: state.app.screenSize,
  glossaryList: filteredGlossarySelector(state),
  availableIndexes: state.glossary.glossary.availableIndexes,
  isLoaded: state.glossary.glossary.isLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  glossaryListFetch: () => dispatch(glossaryFetch()),
  glossaryListFilter: (query) => dispatch(glossaryFilter(query)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Glossary);

