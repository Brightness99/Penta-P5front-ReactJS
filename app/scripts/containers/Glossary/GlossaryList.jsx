// @flow
import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs';
import { glossaryFetch, glossaryFilter } from 'actions';
import { filteredGlossarySelector } from 'selectors';
import { GlossaryListByLetter } from 'components/GlossaryListByLetter';
import { AlphabetList } from 'components/AlphabetList';

type Props = {
  screenSize: string,
  glossaryList: [],
  availableIndexes: [],
  isLoaded: boolean,
  glossaryListFetch: () => void,
  glossaryListFilter: (query: string) => void,
};

class GlossaryList extends React.Component {

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
      <section className="template-glossary">
          <Breadcrumbs links={breadcrumb} />
          <div className="container">
            <h2 className="title-glossary">Glossário</h2>
            <AlphabetList filter={glossaryListFilter} indexes={availableIndexes} screenSize={screenSize} />
            {
              this.renderList()
            }
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


export default connect(mapStateToProps, mapDispatchToProps)(GlossaryList);

